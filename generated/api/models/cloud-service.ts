/* tslint:disable */
import { Backend } from './backend';
import { SoftwarePlatform } from './software-platform';
export type CloudService = {
  id?: string;
  name?: string;
  provider?: string;
  url?: string;
  description?: string;
  costModel?: string;
  providedBackends?: Array<Backend>;
  softwarePlatforms?: Array<SoftwarePlatform>;
};
