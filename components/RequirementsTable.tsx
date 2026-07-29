import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, CheckCircle2, AlertTriangle, XCircle, HelpCircle, 
  ChevronDown, ChevronUp, FileText, ArrowUpDown, ExternalLink, 
  MessageSquare, Edit3, Bookmark, AlertCircle, ShieldAlert, Download, Printer
} from 'lucide-react';
import { RequirementItem, RequirementStatus, PriorityLevel } from '../types';

interface RequirementsTableProps {
  requirements: RequirementItem[];
  onUpdateRequirement: (reqId: string, overrides: Partial<RequirementItem>) => void;
  onOpenExportModal: () => void;
  onOpenDocViewerModal: (req: RequirementItem) => void;
}

export const RequirementsTable: React.FC<RequirementsTableProps> = ({
  requirements,
  onUpdateRequirement,
  onOpenExportModal,
  onOpenDocViewerModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [expandedReqId, setExpandedReqId] = useState<string | null>(null);

  const [sortField, setSortField] = useState<'id' | 'status' | 'priority' | 'category'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    requirements.forEach(r => set.add(r.category));
    return Array.from(set);
  }, [requirements]);

  // Priority weight for sorting
  const priorityWeight: Record<PriorityLevel, number> = {
    CRITICAL: 4,
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1
  };

  // Status weight for sorting
  const statusWeight: Record<RequirementStatus, number> = {
    MISSING: 4,
    PARTIAL: 3,
    UNCLEAR: 2,
    COMPLIANT: 1
  };

  // Filtered and Sorted list
  const filteredAndSorted = useMemo(() => {
    return requirements
      .filter((req) => {
        const activeStatus = req.reviewerOverrideStatus || req.status;

        // Search term
        const matchesSearch =
          searchTerm === '' ||
          req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.originalText.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (req.proposalMatch && req.proposalMatch.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (req.evidenceExcerpt && req.evidenceExcerpt.toLowerCase().includes(searchTerm.toLowerCase()));

        // Status filter
        const matchesStatus = statusFilter === 'ALL' || activeStatus === statusFilter;

        // Category filter
        const matchesCategory = categoryFilter === 'ALL' || req.category === categoryFilter;

        // Priority filter
        const matchesPriority = priorityFilter === 'ALL' || req.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
      })
      .sort((a, b) => {
        let comp = 0;
        if (sortField === 'id') {
          comp = a.id.localeCompare(b.id);
        } else if (sortField === 'category') {
          comp = a.category.localeCompare(b.category);
        } else if (sortField === 'priority') {
          comp = priorityWeight[b.priority] - priorityWeight[a.priority];
        } else if (sortField === 'status') {
          const aStat = a.reviewerOverrideStatus || a.status;
          const bStat = b.reviewerOverrideStatus || b.status;
          comp = statusWeight[bStat] - statusWeight[aStat];
        }

        return sortOrder === 'asc' ? comp : -comp;
      });
  }, [requirements, searchTerm, statusFilter, categoryFilter, priorityFilter, sortField, sortOrder]);

  const toggleSort = (field: 'id' | 'status' | 'priority' | 'category') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const renderStatusBadge = (status: RequirementStatus) => {
    switch (status) {
      case 'COMPLIANT':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-100 uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" /> PASS
          </span>
        );
      case 'PARTIAL':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded border border-amber-100 uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" /> PARTIAL
          </span>
        );
      case 'MISSING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-rose-50 text-rose-700 text-[10px] font-bold rounded border border-rose-100 uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" /> FAIL
          </span>
        );
      case 'UNCLEAR':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded border border-slate-200 uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" /> UNCLEAR
          </span>
        );
    }
  };

  const renderPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'CRITICAL':
        return <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-mono">CRITICAL</span>;
      case 'HIGH':
        return <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 font-mono">HIGH</span>;
      case 'MEDIUM':
        return <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-mono">MEDIUM</span>;
      case 'LOW':
        return <span className="text-[10px] uppercase font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">LOW</span>;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col space-y-0">
      
      {/* Control Toolbar */}
      <div className="p-4 border-b border-slate-100 space-y-3">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <span>Extraction Matrix</span>
              <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                {filteredAndSorted.length} / {requirements.length} Items
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex gap-1.5 text-[10px] font-bold">
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-100">PASS</span>
              <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded border border-rose-100">FAIL</span>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-100">PARTIAL</span>
            </div>
            
            <button
              onClick={onOpenExportModal}
              className="px-3 py-1.5 text-xs font-medium bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors shrink-0 shadow-2xs"
            >
              Export Report
            </button>
          </div>
        </div>

        {/* Filters & Search Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 text-xs">
          
          {/* Search Box (4 cols) */}
          <div className="lg:col-span-4 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search clause ID, description, quote..."
              className="w-full bg-slate-50 border border-slate-200 rounded pl-8 pr-3 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-600 text-xs"
            />
          </div>

          {/* Status Select (3 cols) */}
          <div className="lg:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-600 text-xs font-medium cursor-pointer"
            >
              <option value="ALL">Status: All Statuses</option>
              <option value="COMPLIANT">✅ PASS (Compliant)</option>
              <option value="PARTIAL">⚠️ PARTIAL Compliance</option>
              <option value="MISSING">❌ FAIL (Missing)</option>
              <option value="UNCLEAR">❓ UNCLEAR</option>
            </select>
          </div>

          {/* Category Select (3 cols) */}
          <div className="lg:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-600 text-xs font-medium cursor-pointer"
            >
              <option value="ALL">Category: All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Select (2 cols) */}
          <div className="lg:col-span-2">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-600 text-xs font-medium cursor-pointer"
            >
              <option value="ALL">Priority: All</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
              <th 
                onClick={() => toggleSort('id')} 
                className="w-16 px-4 py-3 cursor-pointer hover:text-slate-700 transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <span>ID</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>

              <th className="px-4 py-3 min-w-[220px]">Requirement Description</th>

              <th 
                onClick={() => toggleSort('status')} 
                className="w-28 px-4 py-3 text-center cursor-pointer hover:text-slate-700 transition-colors"
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>Status</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>

              <th 
                onClick={() => toggleSort('priority')} 
                className="w-24 px-4 py-3 text-center cursor-pointer hover:text-slate-700 transition-colors"
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>Priority</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>

              <th className="px-4 py-3 min-w-[260px]">Proposal Evidence Snippet</th>
              <th className="w-16 px-4 py-3 text-center">Page</th>
              <th className="w-20 px-4 py-3 text-right">Details</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredAndSorted.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-400 space-y-2">
                  <AlertCircle className="w-6 h-6 mx-auto text-slate-300" />
                  <p>No requirement items match the selected filters.</p>
                </td>
              </tr>
            ) : (
              filteredAndSorted.map((req) => {
                const isExpanded = expandedReqId === req.id;
                const activeStatus = req.reviewerOverrideStatus || req.status;
                const isFail = activeStatus === 'MISSING';

                return (
                  <React.Fragment key={req.id}>
                    <tr className={`hover:bg-slate-50 transition-colors ${isFail ? 'bg-rose-50/20' : ''} ${isExpanded ? 'bg-slate-50/80' : ''}`}>
                      
                      {/* Req ID */}
                      <td className="px-4 py-3 font-mono text-slate-400 text-xs font-semibold">
                        {req.id}
                      </td>

                      {/* Requirement Title */}
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-800 leading-snug">{req.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {req.category}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {renderStatusBadge(activeStatus)}
                      </td>

                      {/* Priority */}
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {renderPriorityBadge(req.priority)}
                      </td>

                      {/* Proposal Match Quote */}
                      <td className="px-4 py-3">
                        <div className={`text-xs ${isFail ? 'text-rose-700 font-semibold' : 'text-slate-500 italic'} line-clamp-2`}>
                          "{req.evidenceExcerpt || req.proposalMatch || 'No evidence snippet found in proposal.'}"
                        </div>
                      </td>

                      {/* Page */}
                      <td className="px-4 py-3 font-mono text-center text-slate-500 whitespace-nowrap">
                        {req.propPageLocation ? req.propPageLocation.replace(/page\s*/i, '') : '—'}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right whitespace-nowrap space-x-1">
                        <button
                          onClick={() => onOpenDocViewerModal(req)}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
                          title="View in Document Viewer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setExpandedReqId(isExpanded ? null : req.id)}
                          className="p-1 rounded text-slate-500 hover:text-slate-900 font-medium"
                        >
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </td>

                    </tr>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <tr className="bg-slate-50/90 border-b border-slate-200">
                        <td colSpan={7} className="p-4 space-y-3">
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            
                            {/* Requirements Clause Box */}
                            <div className="bg-white border border-slate-200 rounded p-3 space-y-1">
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                Original RFP Text ({req.reqPageLocation || 'RFP Doc'})
                              </span>
                              <p className="text-xs text-slate-800 leading-relaxed font-mono bg-slate-50 p-2.5 rounded border border-slate-100">
                                {req.originalText}
                              </p>
                            </div>

                            {/* Proposal Evidence Match Box */}
                            <div className="bg-white border border-slate-200 rounded p-3 space-y-1">
                              <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">
                                Proposal Response ({req.propPageLocation || 'Proposal Doc'})
                              </span>
                              <p className="text-xs text-slate-800 leading-relaxed font-mono bg-slate-50 p-2.5 rounded border border-slate-100">
                                {req.evidenceExcerpt || req.proposalMatch || 'No evidence snippet found in proposal.'}
                              </p>
                            </div>

                          </div>

                          {/* Gap & Recommendation Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            
                            {req.gapDescription && (
                              <div className="bg-rose-50 border border-rose-200 rounded p-3 text-xs text-rose-900">
                                <span className="font-bold text-[10px] uppercase tracking-wider text-rose-600 block mb-0.5">Identified Gap:</span>
                                {req.gapDescription}
                              </div>
                            )}

                            <div className="bg-indigo-50/50 border border-indigo-100 rounded p-3 text-xs text-indigo-900">
                              <span className="font-bold text-[10px] uppercase tracking-wider text-indigo-600 block mb-0.5">Negotiation Advice:</span>
                              {req.recommendation}
                            </div>

                          </div>

                          {/* Manual Review Notes */}
                          <div className="bg-white border border-slate-200 rounded p-3 space-y-2">
                            <span className="text-xs font-bold text-slate-700 block">Auditor Manual Note & Override</span>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              <div>
                                <select
                                  value={req.reviewerOverrideStatus || req.status}
                                  onChange={(e) => onUpdateRequirement(req.id, { reviewerOverrideStatus: e.target.value as RequirementStatus })}
                                  className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800"
                                >
                                  <option value="COMPLIANT">PASS (Compliant)</option>
                                  <option value="PARTIAL">PARTIAL</option>
                                  <option value="MISSING">FAIL (Missing)</option>
                                  <option value="UNCLEAR">UNCLEAR</option>
                                </select>
                              </div>
                              <div className="md:col-span-2">
                                <input
                                  type="text"
                                  value={req.reviewerNote || ''}
                                  onChange={(e) => onUpdateRequirement(req.id, { reviewerNote: e.target.value })}
                                  placeholder="Auditor comment..."
                                  className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800"
                                />
                              </div>
                            </div>
                          </div>

                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
