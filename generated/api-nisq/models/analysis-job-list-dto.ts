/* tslint:disable */
import { AnalysisJobDto } from './analysis-job-dto';
import { Links } from './links';
export type AnalysisJobListDto = {
  implementationSelectionJobList?: Array<AnalysisJobDto>;
  _links?: Links;
};
