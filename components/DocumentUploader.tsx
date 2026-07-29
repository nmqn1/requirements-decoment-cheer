import React, { useRef, useState } from 'react';
import { Upload, FileText, X, Eye, Edit3, Check, Sparkles, HelpCircle, FileCheck, Layers, AlertCircle } from 'lucide-react';
import { UploadedDoc, AnalysisOptions } from '../types';

interface DocumentUploaderProps {
  reqDoc: UploadedDoc | null;
  propDoc: UploadedDoc | null;
  onReqDocChange: (doc: UploadedDoc | null) => void;
  onPropDocChange: (doc: UploadedDoc | null) => void;
  options: AnalysisOptions;
  onOptionsChange: (options: AnalysisOptions) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  showOptions: boolean;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  reqDoc,
  propDoc,
  onReqDocChange,
  onPropDocChange,
  options,
  onOptionsChange,
  onAnalyze,
  isAnalyzing,
  showOptions
}) => {
  const reqInputRef = useRef<HTMLInputElement>(null);
  const propInputRef = useRef<HTMLInputElement>(null);

  const [editingDocType, setEditingDocType] = useState<'req' | 'prop' | null>(null);
  const [editText, setEditText] = useState<string>('');

  // Handle file drop/select
  const handleFile = async (file: File, type: 'req' | 'prop') => {
    if (!file) return;

    const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
    const isTxt = file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md');

    if (!isPdf && !isTxt) {
      alert('Please upload a PDF or plain text document.');
      return;
    }

    try {
      if (isPdf) {
        // Read PDF as Base64 for Gemini
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const base64Data = result.split(',')[1];

          // Estimate pages from size (approx ~20KB per page average)
          const estPages = Math.max(1, Math.round(file.size / 25000));

          const doc: UploadedDoc = {
            name: file.name,
            size: file.size,
            mimeType: 'application/pdf',
            base64: base64Data,
            pageCount: estPages,
            text: `[PDF Document Attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB, ~${estPages} pages)]`
          };

          if (type === 'req') onReqDocChange(doc);
          else onPropDocChange(doc);
        };
        reader.readAsDataURL(file);
      } else {
        // Plain text file
        const text = await file.text();
        const estPages = Math.max(1, Math.ceil(text.length / 2500));
        const doc: UploadedDoc = {
          name: file.name,
          size: file.size,
          mimeType: 'text/plain',
          text,
          pageCount: estPages
        };
        if (type === 'req') onReqDocChange(doc);
        else onPropDocChange(doc);
      }
    } catch (err) {
      console.error('File reading error:', err);
      alert('Failed to read file. Please try again.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, type: 'req' | 'prop') => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], type);
    }
  };

  const startEditDoc = (type: 'req' | 'prop') => {
    const targetDoc = type === 'req' ? reqDoc : propDoc;
    if (targetDoc) {
      setEditText(targetDoc.text || '');
      setEditingDocType(type);
    }
  };

  const saveEditedDoc = () => {
    if (!editingDocType) return;
    const targetDoc = editingDocType === 'req' ? reqDoc : propDoc;
    if (targetDoc) {
      const updatedDoc: UploadedDoc = {
        ...targetDoc,
        text: editText,
        size: new Blob([editText]).size
      };
      if (editingDocType === 'req') onReqDocChange(updatedDoc);
      else onPropDocChange(updatedDoc);
    }
    setEditingDocType(null);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span>Source Files & Audit Configuration</span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 normal-case">
              PDF or Text Files
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Provide the master Requirements Spec (RFP) and Vendor Response to execute automated extraction and verification.
          </p>
        </div>

        {reqDoc && propDoc && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-semibold text-[11px]">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Both Files Loaded
            </span>
          </div>
        )}
      </div>

      {/* Two Dropzone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Requirements Document Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-indigo-50 border border-indigo-200 text-indigo-600 text-[11px] flex items-center justify-center font-bold">1</span>
              Requirements Spec (RFP / SOW)
            </label>
            {reqDoc && (
              <button
                onClick={() => onReqDocChange(null)}
                className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>

          <input
            type="file"
            ref={reqInputRef}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], 'req')}
            accept=".pdf,.txt,.md"
            className="hidden"
          />

          {!reqDoc ? (
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'req')}
              onClick={() => reqInputRef.current?.click()}
              className="p-4 border-2 border-dashed border-indigo-100 hover:border-indigo-300 bg-indigo-50/50 hover:bg-indigo-50 rounded-lg text-center cursor-pointer transition-all group flex flex-col items-center justify-center min-h-[140px]"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs text-indigo-900 font-semibold">
                Upload <span className="text-indigo-600">Requirements Spec</span> PDF / TXT
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Click or drag & drop file</p>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2 relative">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2.5">
                  <div className="p-2 rounded bg-indigo-50 text-indigo-600 border border-indigo-100">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 truncate max-w-[200px]" title={reqDoc.name}>
                      {reqDoc.name}
                    </p>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-mono mt-0.5">
                      <span>{(reqDoc.size / 1024).toFixed(1)} KB</span>
                      <span>•</span>
                      <span>{reqDoc.pageCount ? `~${reqDoc.pageCount} pages` : 'Text File'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => startEditDoc('req')}
                    className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded transition-colors"
                    title="View or Edit Text"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded p-2 text-[11px] text-slate-500 line-clamp-2 font-mono border border-slate-200">
                {reqDoc.text || '[PDF Document Attached]'}
              </div>
            </div>
          )}
        </div>

        {/* Proposal Document Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-emerald-50 border border-emerald-200 text-emerald-600 text-[11px] flex items-center justify-center font-bold">2</span>
              Vendor Proposal Response
            </label>
            {propDoc && (
              <button
                onClick={() => onPropDocChange(null)}
                className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>

          <input
            type="file"
            ref={propInputRef}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], 'prop')}
            accept=".pdf,.txt,.md"
            className="hidden"
          />

          {!propDoc ? (
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'prop')}
              onClick={() => propInputRef.current?.click()}
              className="p-4 border-2 border-dashed border-slate-200 hover:border-slate-300 bg-slate-50/80 hover:bg-slate-50 rounded-lg text-center cursor-pointer transition-all group flex flex-col items-center justify-center min-h-[140px]"
            >
              <div className="w-10 h-10 rounded-full bg-slate-200/80 text-slate-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-800 font-semibold">
                Upload <span className="text-slate-600">Vendor Proposal</span> PDF / TXT
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Click or drag & drop file</p>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2 relative">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2.5">
                  <div className="p-2 rounded bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 truncate max-w-[200px]" title={propDoc.name}>
                      {propDoc.name}
                    </p>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-mono mt-0.5">
                      <span>{(propDoc.size / 1024).toFixed(1)} KB</span>
                      <span>•</span>
                      <span>{propDoc.pageCount ? `~${propDoc.pageCount} pages` : 'Text File'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => startEditDoc('prop')}
                    className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded transition-colors"
                    title="View or Edit Text"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded p-2 text-[11px] text-slate-500 line-clamp-2 font-mono border border-slate-200">
                {propDoc.text || '[PDF Document Attached]'}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Audit Settings Panel */}
      {showOptions && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" /> Audit Configuration & Strictness Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Strictness Level */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Compliance Evaluation Strictness</label>
              <div className="grid grid-cols-3 gap-2">
                {(['strict', 'standard', 'lenient'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onOptionsChange({ ...options, strictness: s })}
                    className={`py-1.5 px-3 rounded text-center capitalize font-bold text-xs transition-all ${
                      options.strictness === s
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {options.strictness === 'strict' && 'Strict: Requires explicit written proof for COMPLIANT status.'}
                {options.strictness === 'standard' && 'Standard: Balanced evaluation of explicit and clear evidence.'}
                {options.strictness === 'lenient' && 'Lenient: Allows standard industry defaults and implied compliance.'}
              </p>
            </div>

            {/* Custom Focus Prompt */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Custom Focus Guidelines (Optional)</label>
              <input
                type="text"
                value={options.customInstructions || ''}
                onChange={(e) => onOptionsChange({ ...options, customInstructions: e.target.value })}
                placeholder="e.g. Focus heavily on SLA downtime penalties and SOC2 certifications..."
                className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-600 text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* Primary Action Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <div className="flex items-center text-xs text-slate-500 gap-1.5">
          <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Gemini will map requirements, pull exact page evidence, and highlight missing items.</span>
        </div>

        <button
          onClick={onAnalyze}
          disabled={!reqDoc || !propDoc || isAnalyzing}
          className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-md font-semibold text-xs transition-all ${
            reqDoc && propDoc && !isAnalyzing
              ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-2xs cursor-pointer'
              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{isAnalyzing ? 'Analyzing Documents...' : 'Run Extraction Matrix & Compliance Audit'}</span>
        </button>
      </div>

      {/* Document Text View / Edit Modal */}
      {editingDocType && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-3xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>
                  {editingDocType === 'req' ? 'Requirements Document Text' : 'Proposal Document Text'}
                </span>
              </h3>
              <button
                onClick={() => setEditingDocType(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Review or edit the raw text extracted from this document prior to analysis.
            </p>

            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={12}
              className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setEditingDocType(null)}
                className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedDoc}
                className="px-4 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded shadow-2xs"
              >
                Save Document Text
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
