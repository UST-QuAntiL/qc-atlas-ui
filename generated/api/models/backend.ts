/* tslint:disable */
import { BackendProperty } from './backend-property';
import { ComputingResourceProperty } from './computing-resource-property';
export type Backend = { 'id'?: string, 'name'?: string, 'vendor'?: string, 'technology'?: string, 'providedQuantumResources'?: Array<ComputingResourceProperty>, 'quantumComputationModel'?: 'GATE_BASED' | 'MEASUREMENT_BASED' | 'QUANTUM_ANNEALING', 'backendProperties'?: Array<BackendProperty> };
