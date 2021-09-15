/* tslint:disable */
import { AnalysisResultDto } from './analysis-result-dto';
import { Links } from './links';
export type AnalysisJobDto = {
  analysisResultList?: Array<AnalysisResultDto>;
  id?: string;
  implementedAlgorithm?: string;
  time?: string;
  inputParameters?: Map<string, string>;
  ready?: boolean;
  _links?: Links;
};
