/* tslint:disable */
import { BackendDto } from './backend-dto';
import { Links } from './links';
export interface CloudServiceDto {
  '_links'?: Links;
  costModel?: string;
  id: string;
  name: string;
  providedBackends?: Array<BackendDto>;
  provider?: string;
  url?: string;
}
