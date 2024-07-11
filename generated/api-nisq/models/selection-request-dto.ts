/* tslint:disable */
export type SelectionRequestDto = {
  parameters?: {};
  allowedProviders?: Array<string>;
  compilers?: Array<string>;
  preciseResultsPreference?: boolean;
  shortWaitingTimesPreference?: boolean;
  queueImportanceRatio?: number;
  maxNumberOfCompiledCircuits?: number;
  predictionAlgorithm?: string;
  metaOptimizer?: string;
  tokens?: {};
  algorithmId?: string;
  refreshToken?: string;
  mcdaMethodName?: string;
  mcdaWeightLearningMethod?: string;
};
