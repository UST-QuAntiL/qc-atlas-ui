/* tslint:disable */
import { Links } from './links';
export type QpuSelectionResultDto = {
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
  queueSize?: number;
  transpiledCircuit?: string;
  transpiledLanguage?: string;
  circuitName?: string;
  qpuSelectionJobId?: string;
  _links?: Links;
};
