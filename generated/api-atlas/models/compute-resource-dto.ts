/* tslint:disable */
export type ComputeResourceDto = {
  id: string;
  name: string;
  vendor?: string;
  technology?: string;
  quantumComputationModel?:
    | 'GATE_BASED'
    | 'MEASUREMENT_BASED'
    | 'QUANTUM_ANNEALING';
};
