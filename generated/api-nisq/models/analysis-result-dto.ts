/* tslint:disable */
import { ImplementationDto } from './implementation-dto';
import { Links } from './links';
export type AnalysisResultDto = {
  id?: string;
  qpu?: string;
  provider?: string;
  compiler?: string;
  implementation?: ImplementationDto;
  analyzedDepth?: number;
  analyzedWidth?: number;
  inputParameters?: {};
  time?: string;
  _links?: Links;
};
