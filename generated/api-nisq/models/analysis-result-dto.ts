/* tslint:disable */
import { ImplementationDto } from './implementation-dto';
import { Links } from './links';
import { QpuDto } from './qpu-dto';
export type AnalysisResultDto = {
  id?: string;
  qpu?: QpuDto;
  implementation?: ImplementationDto;
  estimate?: boolean;
  analysedDepth?: number;
  analysedWidth?: number;
  inputParameters?: {};
  time?: string;
  _links?: Links;
};
