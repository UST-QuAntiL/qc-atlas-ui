/* tslint:disable */
import { Links } from './links';
export type CompilerAnalysisResultDto = {
  id?: string;
  provider?: string;
  qpu?: string;
  compiler?: string;
  analyzedDepth?: number;
  analyzedWidth?: number;
  circuitName?: string;
  initialCircuit?: string;
  transpiledCircuit?: string;
  _links?: Links;
};
