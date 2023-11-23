/* tslint:disable */
export type QpuSelectionDto = {
  allowedProviders?: Array<string>;
  circuitLanguage?: string;
  circuitUrl?: string;
  qasmCode?: string;
  tokens?: Map<string, Map<string, string>>;
  refreshToken?: string;
  circuitName?: string;
  preciseResultsPreference?: boolean;
  shortWaitingTimesPreference?: boolean;
  queueImportanceRatio?: number;
  maxNumberOfCompiledCircuits?: number;
  predictionAlgorithm?: string;
  metaOptimizer?: string;
  userId?: string;
  compilers?: Array<string>;
};
