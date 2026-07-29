import React from 'react';
import { X, FileText, CheckCircle2, AlertTriangle, XCircle, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { RequirementItem, UploadedDoc } from '../types';

interface DocumentViewerModalProps {
  reqItem: RequirementItem;
  reqDoc: UploadedDoc | null;
  propDoc: UploadedDoc | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  reqItem,
  reqDoc,
  propDoc,
  onClose
}) => {
  const activeStatus = reqItem.reviewerOverrideStatus || reqItem.status;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-5xl h-[85vh] flex flex-col shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50">
          <div className="flex items-center space-x-3">
            <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-100 text-xs">
              {reqItem.id}
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>{reqItem.title}</span>
                <span className="text-xs font-normal text-slate-500">({reqItem.category})</span>
              </h3>
              <p className="text-[11px] text-slate-400">Side-by-side Evidence Verification</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side-by-side Split Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 flex-1 overflow-hidden">
          
          {/* Left: Requirements Document Clause */}
          <div className="p-4 flex flex-col h-full overflow-y-auto space-y-3.5 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>RFP Document: {reqDoc?.name || 'RFP Doc'}</span>
              </span>
              <span className="text-xs text-indigo-600 font-mono font-semibold">
                📍 {reqItem.reqPageLocation || 'Page Ref'}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded p-3.5 space-y-1.5">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Extracted RFP Requirement:</span>
              <p className="text-xs text-slate-800 leading-relaxed font-mono whitespace-pre-wrap">
                {reqItem.originalText}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded p-3.5 space-y-1.5 text-xs text-slate-600">
              <span className="font-bold text-slate-700 block">RFP Document Context Preview:</span>
              <div className="max-h-60 overflow-y-auto font-mono text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
                {reqDoc?.text || 'Full document text attached to audit context.'}
              </div>
            </div>
          </div>

          {/* Right: Proposal Document Evidence Match */}
          <div className="p-4 flex flex-col h-full overflow-y-auto space-y-3.5 bg-slate-50/50">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Proposal Response: {propDoc?.name || 'Proposal Doc'}</span>
              </span>
              <span className="text-xs text-emerald-600 font-mono font-semibold">
                📄 {reqItem.propPageLocation || 'Page Ref'}
              </span>
            </div>

            {/* Matched Quote Highlight Box */}
            <div className="bg-emerald-50/60 border border-emerald-100 rounded p-3.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  Supporting Evidence Quote:
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                  {activeStatus}
                </span>
              </div>
              <p className="text-xs text-emerald-950 font-mono italic leading-relaxed bg-white p-3 rounded border border-emerald-200">
                "{reqItem.evidenceExcerpt || reqItem.proposalMatch || 'No evidence snippet found in proposal.'}"
              </p>
            </div>

            {reqItem.gapDescription && (
              <div className="bg-rose-50 border border-rose-200 rounded p-3 text-xs text-rose-900 space-y-1">
                <span className="font-bold text-rose-600 block uppercase text-[10px] tracking-wider">Identified Compliance Gap:</span>
                <p>{reqItem.gapDescription}</p>
              </div>
            )}

            <div className="bg-indigo-50/60 border border-indigo-100 rounded p-3 text-xs text-indigo-900 space-y-1">
              <span className="font-bold text-indigo-700 block uppercase text-[10px] tracking-wider">Negotiator Advice:</span>
              <p>{reqItem.recommendation}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded p-3.5 space-y-1.5 text-xs text-slate-600 mt-auto">
              <span className="font-bold text-slate-700 block">Proposal Document Preview:</span>
              <div className="max-h-48 overflow-y-auto font-mono text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
                {propDoc?.text || 'Full proposal text attached to audit context.'}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
