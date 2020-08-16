/* tslint:disable */
import { Algorithm } from './algorithm';
import { ComputeResourceProperty } from './compute-resource-property';
import { SoftwarePlatform } from './software-platform';
import { Tag } from './tag';
export type Implementation = {
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
  implementedAlgorithm?: Algorithm;
  tags?: Array<Tag>;
  requiredComputeResourceProperties?: Array<ComputeResourceProperty>;
  softwarePlatforms?: Array<SoftwarePlatform>;
};
