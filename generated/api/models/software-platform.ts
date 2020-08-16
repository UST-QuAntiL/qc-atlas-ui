/* tslint:disable */
import { CloudService } from './cloud-service';
import { ComputeResource } from './compute-resource';
import { Implementation } from './implementation';
export type SoftwarePlatform = {
  id?: string;
  name?: string;
  link?: string;
  licence?: string;
  version?: string;
  supportedComputeResources?: Array<ComputeResource>;
  supportedCloudServices?: Array<CloudService>;
  implementations?: Array<Implementation>;
};
