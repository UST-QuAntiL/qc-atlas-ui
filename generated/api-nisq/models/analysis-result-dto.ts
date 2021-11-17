/* tslint:disable */
import { ImplementationDto } from './implementation-dto';
import { Links } from './links';
export type AnalysisResultDto = {
  id?: string;
  provider?: string;
  qpu?: string;
  compiler?: string;
  analyzedDepth?: number;
  analyzedWidth?: number;
  analyzedTotalNumberOfOperations?: number;
  analyzedNumberOfSingleQubitGates?: number;
  analyzedNumberOfMultiQubitGates?: number;
  analyzedNumberOfMeasurementOperations?: number;
  analyzedMultiQubitGateDepth?: number;
  time?: string;
  implementation?: ImplementationDto;
  inputParameters?: {};
  _links?: Links;
};
