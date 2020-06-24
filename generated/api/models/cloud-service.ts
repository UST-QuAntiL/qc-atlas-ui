/* tslint:disable */
import { Backend } from './backend';
import { SoftwarePlatform } from './software-platform';
export interface CloudService {
  costModel?: string;
  description?: string;
  id?: string;
  name?: string;
  providedBackends?: Array<Backend>;
  provider?: string;
  softwarePlatforms?: Array<SoftwarePlatform>;
  url?: string;
}
