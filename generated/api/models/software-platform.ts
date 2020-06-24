/* tslint:disable */
import { Backend } from './backend';
import { CloudService } from './cloud-service';
export interface SoftwarePlatform {
  id?: string;
  licence?: string;
  link?: string;
  name?: string;
  supportedBackends?: Array<Backend>;
  supportedCloudServices?: Array<CloudService>;
  version?: string;
}
