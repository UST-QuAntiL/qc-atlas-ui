/* tslint:disable */
import { Algorithm } from './algorithm';
import { ComputingResource } from './computing-resource';
export interface Implementation {
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
  requiredComputingResources?: Array<ComputingResource>;
}
