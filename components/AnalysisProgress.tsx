import React, { useEffect, useState } from 'react';
import { Sparkles, FileSearch, CheckCircle2, ShieldCheck, Scale, Cpu } from 'lucide-react';

interface AnalysisProgressProps {
  reqDocName: string;
  propDocName: string;
}

const STEPS = [
  { id: 1, title: 'Inquiring Gemini Multimodal Engine', desc: 'Processing PDF streams & document layout tokens' },
  { id: 2, title: 'Extracting Requirements Catalog', desc: 'Cataloging REQ clauses, priority levels, and categories' },
  { id: 3, title: 'Scanning Proposal Document Response', desc: 'Mapping text excerpts and matching proposal clauses' },
  { id: 4, title: 'Evaluating Compliance & Page Evidence', desc: 'Verifying section references, page numbers, and gaps' },
  { id: 5, title: 'Synthesizing Audit Metrics & Recommendations', desc: 'Calculating completion rates & strategic advice' }
];

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({
  reqDocName,
  propDocName
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length) return prev + 1;
        return prev;
      });
      setProgress((prev) => {
        if (prev < 90) return prev + 18;
        return prev;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-8 max-w-3xl mx-auto my-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-500 mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-pulse">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          Audit & Gap Analysis in Progress
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Comparing <span className="text-indigo-300 font-semibold">{reqDocName}</span> against{' '}
          <span className="text-emerald-300 font-semibold">{propDocName}</span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-400">
          <span>Analysis Progress</span>
          <span className="text-indigo-400">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500 rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step List */}
      <div className="space-y-3 pt-2">
        {STEPS.map((step) => {
          const isDone = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div
              key={step.id}
              className={`flex items-start space-x-3.5 p-3 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-slate-800/90 border-indigo-500/50 ring-1 ring-indigo-500/30 shadow-md'
                  : isDone
                  ? 'bg-slate-900/60 border-slate-800 opacity-80'
                  : 'bg-slate-900/30 border-slate-800/50 opacity-40'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-colors ${
                  isDone
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : isCurrent
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.id}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold ${isCurrent ? 'text-indigo-300' : isDone ? 'text-slate-200' : 'text-slate-500'}`}>
                  {step.title}
                </p>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{step.desc}</p>
              </div>

              {isCurrent && (
                <div className="shrink-0 flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
