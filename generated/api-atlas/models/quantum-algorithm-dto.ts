/* tslint:disable */
import { SketchDto } from './sketch-dto';
export type QuantumAlgorithmDto = {
  id: string;
  creationDate?: string;
  lastModifiedAt?: string;
  name?: string;
  acronym?: string;
  intent?: string;
  problem?: string;
  inputFormat?: string;
  algoParameter?: string;
  outputFormat?: string;
  sketches?: Array<SketchDto>;
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
