import React, { useState } from 'react';
import { Header } from './components/Header';
import { DocumentUploader } from './components/DocumentUploader';
import { AnalysisProgress } from './components/AnalysisProgress';
import { DashboardSummary } from './components/DashboardSummary';
import { RequirementsTable } from './components/RequirementsTable';
import { ExportModal } from './components/ExportModal';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { UploadedDoc, AnalysisResult, AnalysisOptions, SampleDocPair, RequirementItem } from './types';
import { SAMPLE_DOC_PAIRS } from './data/sampleDocs';
import { AlertCircle, RefreshCw, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Initial default sample
  const defaultSample = SAMPLE_DOC_PAIRS[0];

  const [reqDoc, setReqDoc] = useState<UploadedDoc | null>(defaultSample.reqDoc);
  const [propDoc, setPropDoc] = useState<UploadedDoc | null>(defaultSample.propDoc);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(defaultSample.precomputedResult || null);

  const [options, setOptions] = useState<AnalysisOptions>({
    strictness: 'standard',
    focusCategories: [],
    customInstructions: ''
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStatusFilter, setActiveStatusFilter] = useState<string | null>(null);

  const [showExportModal, setShowExportModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedReqForViewer, setSelectedReqForViewer] = useState<RequirementItem | null>(null);

  // Select Sample Pair
  const handleSelectSample = (sample: SampleDocPair) => {
    setReqDoc(sample.reqDoc);
    setPropDoc(sample.propDoc);
    setAnalysisResult(sample.precomputedResult || null);
    setError(null);
  };

  // Reset Audit
  const handleReset = () => {
    setReqDoc(null);
    setPropDoc(null);
    setAnalysisResult(null);
    setError(null);
    setActiveStatusFilter(null);
  };

  // Run Gemini Analysis
  const handleRunAnalysis = async () => {
    if (!reqDoc || !propDoc) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reqDoc,
          propDoc,
          options
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server returned error status ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setAnalysisResult(data);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setError(err.message || 'Failed to complete document analysis. Please check your network connection or try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Update requirement overrides / notes
  const handleUpdateRequirement = (reqId: string, overrides: Partial<RequirementItem>) => {
    if (!analysisResult) return;

    const updatedReqs = analysisResult.requirements.map(r => {
      if (r.id === reqId) {
        return { ...r, ...overrides };
      }
      return r;
    });

    setAnalysisResult({
      ...analysisResult,
      requirements: updatedReqs
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Header Bar */}
      <Header
        onSelectSample={handleSelectSample}
        onReset={handleReset}
        hasResult={!!analysisResult}
        showOptions={showOptions}
        setShowOptions={setShowOptions}
        complianceScore={analysisResult ? Math.round(analysisResult.completionPercentage) : undefined}
        onOpenExportModal={() => setShowExportModal(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        
        {/* Document Uploader & Audit Settings */}
        <DocumentUploader
          reqDoc={reqDoc}
          propDoc={propDoc}
          onReqDocChange={setReqDoc}
          onPropDocChange={setPropDoc}
          options={options}
          onOptionsChange={setOptions}
          onAnalyze={handleRunAnalysis}
          isAnalyzing={isAnalyzing}
          showOptions={showOptions}
        />

        {/* Error Banner */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start space-x-3 text-rose-800 text-xs shadow-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block text-sm text-rose-900">Analysis Error</span>
              <p className="mt-0.5 text-rose-700">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-500 hover:text-rose-800 font-bold px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Progress Screen when Analyzing */}
        {isAnalyzing && reqDoc && propDoc && (
          <AnalysisProgress
            reqDocName={reqDoc.name}
            propDocName={propDoc.name}
          />
        )}

        {/* Results Dashboard */}
        {!isAnalyzing && analysisResult && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Dashboard Summary & Score Gauge */}
            <DashboardSummary
              result={analysisResult}
              onFilterStatus={setActiveStatusFilter}
              activeStatusFilter={activeStatusFilter}
            />

            {/* Requirements Matrix Table */}
            <RequirementsTable
              requirements={analysisResult.requirements}
              onUpdateRequirement={handleUpdateRequirement}
              onOpenExportModal={() => setShowExportModal(true)}
              onOpenDocViewerModal={setSelectedReqForViewer}
            />

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Requirements & Document Checker <span className="text-slate-300">•</span> Geometric Balance UI</span>
          <span>Powered by Gemini 3.6 Flash</span>
        </div>
      </footer>

      {/* Export Modal */}
      {showExportModal && analysisResult && (
        <ExportModal
          result={analysisResult}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* Document Evidence Viewer Modal */}
      {selectedReqForViewer && (
        <DocumentViewerModal
          reqItem={selectedReqForViewer}
          reqDoc={reqDoc}
          propDoc={propDoc}
          onClose={() => setSelectedReqForViewer(null)}
        />
      )}

    </div>
  );
}
