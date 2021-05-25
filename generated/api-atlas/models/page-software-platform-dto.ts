/* tslint:disable */
import { Pageable } from './pageable';
import { SoftwarePlatformDto } from './software-platform-dto';
import { Sort } from './sort';
export type PageSoftwarePlatformDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<SoftwarePlatformDto>;
  sort?: Sort;
  empty?: boolean;
};
