/* tslint:disable */
import { ImplementationDto } from './implementation-dto';
import { Links } from './links';
export type AnalysisResultDto = {
  implementation?: ImplementationDto;
  id?: string;
  inputParameters?: {};
  originalCircuitResultId?: string;
  qpuSelectionJobId?: string;
  correlationId?: string;
  _links?: Links;
};
