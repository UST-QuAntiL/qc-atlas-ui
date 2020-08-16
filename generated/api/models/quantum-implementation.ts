/* tslint:disable */
import { Algorithm } from './algorithm';
import { ComputeResourceProperty } from './compute-resource-property';
import { Publication } from './publication';
import { QuantumAlgorithm } from './quantum-algorithm';
import { SoftwarePlatform } from './software-platform';
import { Tag } from './tag';
export type QuantumImplementation = {
  id?: string;
  name?: string;
  inputFormat?: string;
  outputFormat?: string;
  description?: string;
  contributors?: string;
  assumptions?: string;
  parameter?: string;
  link?: string;
  dependencies?: string;
  publications?: Array<Publication>;
  implementedAlgorithm?: Algorithm;
  tags?: Array<Tag>;
  requiredComputeResourceProperties?: Array<ComputeResourceProperty>;
  softwarePlatforms?: Array<SoftwarePlatform>;
  algorithm?: QuantumAlgorithm;
};
