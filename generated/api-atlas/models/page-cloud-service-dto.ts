/* tslint:disable */
import { CloudServiceDto } from './cloud-service-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageCloudServiceDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<CloudServiceDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
