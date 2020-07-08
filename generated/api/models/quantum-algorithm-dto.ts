/* tslint:disable */
import { QuantumImplementation } from './quantum-implementation';
export type QuantumAlgorithmDto = {
  id?: string;
  name: string;
  acronym?: string;
  intent?: string;
  problem?: string;
  inputFormat?: string;
  algoParameter?: string;
  outputFormat?: string;
  sketch?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL';
  solution?: string;
  assumptions?: string;
  computationModel: 'QUANTUM';
  nisqReady?: boolean;
  quantumComputationModel:
    | 'GATE_BASED'
    | 'MEASUREMENT_BASED'
    | 'QUANTUM_ANNEALING';
  speedUp?: string;
  implementations?: Array<QuantumImplementation>;
};
