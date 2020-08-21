/* tslint:disable */
import { CloudService } from './cloud-service';
import { ComputeResourceProperty } from './compute-resource-property';
import { SoftwarePlatform } from './software-platform';
export type ComputeResource = {
  id?: string;
  name?: string;
  vendor?: string;
  technology?: string;
  providedComputingResourceProperties?: Array<ComputeResourceProperty>;
  quantumComputationModel?:
    | 'GATE_BASED'
    | 'MEASUREMENT_BASED'
    | 'QUANTUM_ANNEALING';
  softwarePlatforms?: Array<SoftwarePlatform>;
  cloudServices?: Array<CloudService>;
};
