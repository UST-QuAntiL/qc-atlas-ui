/* tslint:disable */
import { BackendProperty } from './backend-property';
import { ComputingResource } from './computing-resource';
export interface Backend {
  backendProperties?: Array<BackendProperty>;
  id?: string;
  name?: string;
  providedQuantumResources?: Array<ComputingResource>;
  quantumComputationModel?: 'GATE_BASED' | 'MEASUREMENT_BASED' | 'QUANTUM_ANNEALING';
  technology?: string;
  vendor?: string;
}
