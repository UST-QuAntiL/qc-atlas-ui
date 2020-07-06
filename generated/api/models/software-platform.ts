/* tslint:disable */
import { Backend } from './backend';
import { CloudService } from './cloud-service';
import { Implementation } from './implementation';
export type SoftwarePlatform = {
  id?: string;
  name?: string;
  link?: string;
  version?: string;
  licence?: string;
  supportedBackends?: Array<Backend>;
  supportedCloudServices?: Array<CloudService>;
  implementations?: Array<Implementation>;
};
