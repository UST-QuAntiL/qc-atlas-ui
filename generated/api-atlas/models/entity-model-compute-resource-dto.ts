/* tslint:disable */
import { Link } from './link';
export type EntityModelComputeResourceDto = {
  id: string;
  name: string;
  vendor?: string;
  technology?: string;
  quantumComputationModel?:
    | 'GATE_BASED'
    | 'MEASUREMENT_BASED'
    | 'QUANTUM_ANNEALING';
  _links?: Array<Link>;
};
