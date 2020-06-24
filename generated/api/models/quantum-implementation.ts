/* tslint:disable */
import { Algorithm } from './algorithm';
import { ComputingResource } from './computing-resource';
import { Publication } from './publication';
import { QuantumAlgorithm } from './quantum-algorithm';
import { SoftwarePlatform } from './software-platform';
export interface QuantumImplementation {
  algorithm?: QuantumAlgorithm;
  assumptions?: string;
  contributors?: string;
  dependencies?: string;
  description?: string;
  id?: string;
  implementedAlgorithm?: Algorithm;
  inputFormat?: string;
  link?: string;
  name?: string;
  outputFormat?: string;
  parameter?: string;
  publications?: Array<Publication>;
  requiredComputingResources?: Array<ComputingResource>;
  usedSoftwarePlatform?: SoftwarePlatform;
}
