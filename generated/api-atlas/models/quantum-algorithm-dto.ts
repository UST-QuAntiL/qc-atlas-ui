/* tslint:disable */
import { Sketch } from './sketch';
export type QuantumAlgorithmDto = {
  id: string;
  name: string;
  acronym?: string;
  intent?: string;
  problem?: string;
  inputFormat?: string;
  algoParameter?: string;
  outputFormat?: string;
  sketches?: Array<Sketch>;
  solution?: string;
  assumptions?: string;
  computationModel: 'QUANTUM';
  nisqReady?: boolean;
  quantumComputationModel:
    | 'GATE_BASED'
    | 'MEASUREMENT_BASED'
    | 'QUANTUM_ANNEALING';
  speedUp?: string;
};
