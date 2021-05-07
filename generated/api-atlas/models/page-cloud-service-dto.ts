/* tslint:disable */
import { CloudServiceDto } from './cloud-service-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageCloudServiceDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<CloudServiceDto>;
  sort?: Sort;
  empty?: boolean;
};
