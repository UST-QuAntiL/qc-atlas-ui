/* tslint:disable */
import { Links } from './links';
export type CompilerAnalysisResultDto = {
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
  initialCircuit?: string;
  circuitName?: string;
  transpiledCircuit?: string;
  _links?: Links;
};
