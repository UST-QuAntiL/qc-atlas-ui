/* tslint:disable */
import { BackendDto } from './backend-dto';
import { CloudServiceDto } from './cloud-service-dto';
import { Links } from './links';
export interface SoftwarePlatformDto {
  '_links'?: Links;
  id: string;
  link?: string;
  name: string;
  supportedBackends?: Array<BackendDto>;
  supportedCloudServices?: Array<CloudServiceDto>;
  version?: string;
}
