/* tslint:disable */
import { ComputeResource } from './compute-resource';
import { SoftwarePlatform } from './software-platform';
export type CloudService = {
  id?: string;
  name?: string;
  provider?: string;
  url?: string;
  description?: string;
  costModel?: string;
  providedComputeResources?: Array<ComputeResource>;
  softwarePlatforms?: Array<SoftwarePlatform>;
};
