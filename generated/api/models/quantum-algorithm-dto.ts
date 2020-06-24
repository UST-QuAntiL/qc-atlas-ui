/* tslint:disable */
import { AlgorithmDto } from './algorithm-dto';
import { QuantumImplementation } from './quantum-implementation';
export interface QuantumAlgorithmDto extends AlgorithmDto {
  implementations?: Array<QuantumImplementation>;
  nisqReady?: boolean;
  quantumComputationModel?: 'GATE_BASED' | 'MEASUREMENT_BASED' | 'QUANTUM_ANNEALING';
  speedUp?: string;
}
