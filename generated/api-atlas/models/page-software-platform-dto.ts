/* tslint:disable */
import { Pageable } from './pageable';
import { SoftwarePlatformDto } from './software-platform-dto';
import { Sort } from './sort';
export type PageSoftwarePlatformDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<SoftwarePlatformDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
