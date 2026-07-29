import React from 'react';
import { FileCheck2, Sparkles, RefreshCw, FileText, ShieldAlert, Sliders } from 'lucide-react';
import { SampleDocPair } from '../types';
import { SAMPLE_DOC_PAIRS } from '../data/sampleDocs';

interface HeaderProps {
  onSelectSample: (sample: SampleDocPair) => void;
  onReset: () => void;
  hasResult: boolean;
  showOptions: boolean;
  setShowOptions: (show: boolean) => void;
  complianceScore?: number;
  onOpenExportModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectSample,
  onReset,
  hasResult,
  showOptions,
  setShowOptions,
  complianceScore,
  onOpenExportModal
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0 sticky top-0 z-30 shadow-xs">
      
      {/* Brand & Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-sm flex items-center justify-center text-white font-bold text-sm tracking-tighter">
          R
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-900 flex items-center gap-2">
            <span>ReqCheck</span>
            <span className="text-slate-400 font-normal underline decoration-slate-200 underline-offset-4 text-base">Pro</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200 ml-1">
              Gemini 3.6
            </span>
          </h1>
        </div>
      </div>

      {/* Actions & Sample Switcher */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        
        {/* Compliance Score Display if available */}
        {complianceScore !== undefined && (
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Compliance Score</span>
            <span className="text-lg font-mono font-bold text-indigo-600 leading-none">{complianceScore.toFixed(1)}%</span>
          </div>
        )}

        {/* Sample Select Dropdown */}
        <div className="relative">
          <select
            onChange={(e) => {
              const found = SAMPLE_DOC_PAIRS.find(s => s.id === e.target.value);
              if (found) onSelectSample(found);
              e.target.value = '';
            }}
            defaultValue=""
            className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-md px-3 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-colors shadow-2xs"
          >
            <option value="" disabled>Load Sample Case...</option>
            {SAMPLE_DOC_PAIRS.map(sample => (
              <option key={sample.id} value={sample.id}>
                📄 {sample.title}
              </option>
            ))}
          </select>
        </div>

        {/* Options toggle button */}
        <button
          onClick={() => setShowOptions(!showOptions)}
          className={`inline-flex items-center space-x-1.5 text-xs font-medium px-3 py-2 rounded-md border transition-all ${
            showOptions 
              ? 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold' 
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
          }`}
          title="Audit parameters"
        >
          <Sliders className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Settings</span>
        </button>

        {/* Export / Reset buttons */}
        {hasResult && (
          <div className="flex items-center gap-2">
            {onOpenExportModal && (
              <button
                onClick={onOpenExportModal}
                className="px-3.5 py-2 bg-slate-900 text-white text-xs font-medium rounded-md hover:bg-slate-800 transition-colors shadow-2xs"
              >
                Export Audit PDF
              </button>
            )}
            <button
              onClick={onReset}
              className="p-2 text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors"
              title="New Audit"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
