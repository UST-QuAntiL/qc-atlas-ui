/* tslint:disable */
import { ImplementationDto } from './implementation-dto';
import { QpuDto } from './qpu-dto';
export type AnalysisResultDto = {
  qpu?: QpuDto;
  implementation?: ImplementationDto;
  estimate?: boolean;
  analysedDepth?: number;
  analysedWidth?: number;
};
