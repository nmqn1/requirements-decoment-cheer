export type RequirementStatus = 'COMPLIANT' | 'PARTIAL' | 'MISSING' | 'UNCLEAR';
export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface RequirementItem {
  id: string;
  category: string;
  title: string;
  originalText: string;
  reqPageLocation: string; // e.g. "Page 3, Section 2.1"
  status: RequirementStatus;
  proposalMatch?: string; // Text quote or summary from proposal
  propPageLocation?: string; // e.g. "Page 12, Section 4.3"
  evidenceExcerpt?: string; // Direct snippet from proposal
  gapDescription?: string; // Explanation if missing or partial
  confidence: ConfidenceLevel;
  recommendation: string; // Follow up / action item
  priority: PriorityLevel;
  reviewerNote?: string;
  reviewerOverrideStatus?: RequirementStatus;
}

export interface CategoryBreakdown {
  category: string;
  total: number;
  compliant: number;
  partial: number;
  missing: number;
  unclear: number;
  percentage: number;
}

export interface AnalysisResult {
  summary: string;
  completionPercentage: number;
  totalRequirements: number;
  compliantCount: number;
  partialCount: number;
  missingCount: number;
  unclearCount: number;
  criticalGapsCount: number;
  categoriesBreakdown: CategoryBreakdown[];
  requirements: RequirementItem[];
  globalRecommendations: string[];
  analyzedAt: string;
  reqDocName: string;
  propDocName: string;
}

export interface UploadedDoc {
  name: string;
  size: number;
  mimeType: string;
  text: string;
  base64?: string;
  pageCount?: number;
}

export interface AnalysisOptions {
  strictness: 'strict' | 'standard' | 'lenient';
  focusCategories: string[];
  customInstructions?: string;
}

export interface SampleDocPair {
  id: string;
  title: string;
  description: string;
  reqDoc: UploadedDoc;
  propDoc: UploadedDoc;
  precomputedResult?: AnalysisResult;
}
