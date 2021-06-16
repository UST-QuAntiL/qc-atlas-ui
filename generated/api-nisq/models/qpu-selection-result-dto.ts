/* tslint:disable */
import { Links } from './links';
export type QpuSelectionResultDto = {
  id?: string;
  provider?: string;
  qpu?: string;
  queueSize?: number;
  time?: string;
  circuitName?: string;
  transpiledCircuit?: string;
  transpiledLanguage?: string;
  compiler?: string;
  analyzedDepth?: number;
  analyzedWidth?: number;
  _links?: Links;
};
