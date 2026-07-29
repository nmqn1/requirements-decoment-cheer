import React from 'react';
import { X, FileSpreadsheet, FileJson, Printer, CheckCircle2, ShieldAlert, FileText } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ExportModalProps {
  result: AnalysisResult;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ result, onClose }) => {
  
  // Export CSV
  const exportCSV = () => {
    const headers = [
      'Requirement ID',
      'Category',
      'Priority',
      'Requirement Title',
      'Original RFP Text',
      'RFP Location',
      'Audit Status',
      'Proposal Evidence Match',
      'Proposal Location',
      'Gap Description',
      'Recommendation',
      'Reviewer Override Status',
      'Reviewer Notes'
    ];

    const rows = result.requirements.map(r => [
      `"${r.id}"`,
      `"${r.category}"`,
      `"${r.priority}"`,
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.originalText.replace(/"/g, '""')}"`,
      `"${r.reqPageLocation || ''}"`,
      `"${r.status}"`,
      `"${(r.evidenceExcerpt || r.proposalMatch || '').replace(/"/g, '""')}"`,
      `"${r.propPageLocation || ''}"`,
      `"${(r.gapDescription || '').replace(/"/g, '""')}"`,
      `"${r.recommendation.replace(/"/g, '""')}"`,
      `"${r.reviewerOverrideStatus || ''}"`,
      `"${(r.reviewerNote || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Compliance_Report_${result.reqDocName.replace(/\.pdf$/i, '')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export JSON
  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Compliance_Audit_${result.reqDocName.replace(/\.pdf$/i, '')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Print PDF Report
  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-xl p-5 space-y-5 shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Export Compliance Audit Findings</h3>
              <p className="text-xs text-slate-500">
                Generate audit artifacts for procurement and legal teams.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audit Stats Preview */}
        <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-100 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Requirements Document:</span>
            <span className="font-medium text-slate-800 font-mono">{result.reqDocName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Proposal Document:</span>
            <span className="font-medium text-slate-800 font-mono">{result.propDocName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Compliance Score:</span>
            <span className="font-bold font-mono text-emerald-600">{Math.round(result.completionPercentage)}% ({result.compliantCount}/{result.totalRequirements} Compliant)</span>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* CSV Download */}
          <button
            onClick={exportCSV}
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-center space-y-1.5 group transition-all"
          >
            <div className="p-2.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800">Export CSV</span>
            <span className="text-[10px] text-slate-400">Excel / Spreadsheets</span>
          </button>

          {/* JSON Export */}
          <button
            onClick={exportJSON}
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-center space-y-1.5 group transition-all"
          >
            <div className="p-2.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:scale-105 transition-transform">
              <FileJson className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800">Export JSON</span>
            <span className="text-[10px] text-slate-400">Raw Data Format</span>
          </button>

          {/* Print / Save PDF */}
          <button
            onClick={triggerPrint}
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-center space-y-1.5 group transition-all"
          >
            <div className="p-2.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 group-hover:scale-105 transition-transform">
              <Printer className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800">Print / PDF</span>
            <span className="text-[10px] text-slate-400">Printable Layout</span>
          </button>

        </div>

        <div className="pt-2 flex justify-end border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
