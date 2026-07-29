import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, ShieldAlert, Award, FileSpreadsheet, ChevronRight, Lightbulb, BarChart3, ArrowUpRight } from 'lucide-react';
import { AnalysisResult } from '../types';

interface DashboardSummaryProps {
  result: AnalysisResult;
  onFilterStatus: (status: string | null) => void;
  activeStatusFilter: string | null;
}

export const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  result,
  onFilterStatus,
  activeStatusFilter
}) => {
  const percentage = Math.round(result.completionPercentage);

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Overall Score, Summary Stats & Dark Recommendations Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Summary Stats & Progress Gauges (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          
          {/* Main Score KPI Banner */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              {/* Circular score callout */}
              <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100 stroke-current"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-current transition-all duration-1000 ease-out"
                    strokeWidth="3.5"
                    strokeDasharray={`${percentage}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      stroke: percentage >= 80 ? '#10b981' : percentage >= 60 ? '#f59e0b' : '#f43f5e'
                    }}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-mono font-bold text-indigo-600 leading-none">{percentage}%</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Compliance Score</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {percentage >= 80 ? 'High Compliance Rate' : percentage >= 60 ? 'Moderate Compliance' : 'Critical Gaps Detected'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  {result.compliantCount} of {result.totalRequirements} extracted requirements matched with verified proposal evidence.
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-end gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto">
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Critical Gaps</span>
                <span className="text-sm font-mono font-bold text-rose-500">{result.criticalGapsCount} Items</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Evaluation Mode</span>
                <span className="text-xs font-semibold text-slate-700 uppercase">Standard</span>
              </div>
            </div>
          </div>

          {/* Interactive Status Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Total Requirements */}
            <div
              onClick={() => onFilterStatus(null)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeStatusFilter === null
                  ? 'bg-white border-indigo-600 shadow-sm ring-1 ring-indigo-600/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-500 text-[11px] font-semibold">Requirement Count</span>
                <span className="font-bold font-mono text-slate-900">{result.totalRequirements}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                <div className="w-full h-full bg-slate-400 rounded-full" />
              </div>
            </div>

            {/* Fulfilled / Compliant */}
            <div
              onClick={() => onFilterStatus('COMPLIANT')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeStatusFilter === 'COMPLIANT'
                  ? 'bg-emerald-50/50 border-emerald-600 shadow-sm ring-1 ring-emerald-600/20'
                  : 'bg-white border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-500 text-[11px] font-semibold">Fulfilled Items</span>
                <span className="font-bold font-mono text-emerald-600">{result.compliantCount}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${Math.round((result.compliantCount / (result.totalRequirements || 1)) * 100)}%` }}
                />
              </div>
            </div>

            {/* Partial */}
            <div
              onClick={() => onFilterStatus('PARTIAL')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeStatusFilter === 'PARTIAL'
                  ? 'bg-amber-50/50 border-amber-500 shadow-sm ring-1 ring-amber-500/20'
                  : 'bg-white border-slate-200 hover:border-amber-300'
              }`}
            >
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-500 text-[11px] font-semibold">Partial Items</span>
                <span className="font-bold font-mono text-amber-600">{result.partialCount}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${Math.round((result.partialCount / (result.totalRequirements || 1)) * 100)}%` }}
                />
              </div>
            </div>

            {/* Missing */}
            <div
              onClick={() => onFilterStatus('MISSING')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeStatusFilter === 'MISSING'
                  ? 'bg-rose-50/50 border-rose-500 shadow-sm ring-1 ring-rose-500/20'
                  : 'bg-white border-slate-200 hover:border-rose-300'
              }`}
            >
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-500 text-[11px] font-semibold">Missing Items</span>
                <span className="font-bold font-mono text-rose-500">{result.missingCount}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-rose-400 rounded-full"
                  style={{ width: `${Math.round((result.missingCount / (result.totalRequirements || 1)) * 100)}%` }}
                />
              </div>
            </div>

          </div>

          {/* Executive Overview Box */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-1 shadow-sm">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-indigo-600" /> Executive Audit Executive Summary
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {result.summary}
            </p>
          </div>

        </div>

        {/* Right Column: Dark Slate Recommendations Card (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 rounded-xl p-5 text-white shadow-lg overflow-hidden flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3 flex items-center justify-between">
              <span>Recommendations</span>
              <span className="text-[10px] font-mono text-slate-400">{result.globalRecommendations.length} Actions</span>
            </h2>
            <ul className="space-y-3">
              {result.globalRecommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-3 items-start text-xs text-slate-300 leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>RFP Negotiator Guidance</span>
            <span className="font-mono text-indigo-300 font-bold">ReqCheck AI</span>
          </div>
        </div>

      </div>

      {/* Category Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span>Category Fulfillment Breakdown</span>
          </h3>
          <span className="text-[10px] uppercase font-bold text-slate-400">{result.categoriesBreakdown.length} Categories</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {result.categoriesBreakdown.map((cat, idx) => {
            const catPct = Math.round(cat.percentage);
            let barBg = 'bg-emerald-500';
            if (catPct < 60) barBg = 'bg-rose-400';
            else if (catPct < 85) barBg = 'bg-amber-500';

            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">{cat.category}</span>
                  <div className="flex items-center space-x-2 text-[11px]">
                    <span className="text-slate-400 font-mono">
                      {cat.compliant}/{cat.total}
                    </span>
                    <span className="font-mono font-bold text-slate-900">{catPct}%</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barBg} rounded-full transition-all duration-500`}
                    style={{ width: `${catPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
