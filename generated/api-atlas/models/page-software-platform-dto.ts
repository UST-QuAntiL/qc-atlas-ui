/* tslint:disable */
import { Pageable } from './pageable';
import { SoftwarePlatformDto } from './software-platform-dto';
import { Sort } from './sort';
export type PageSoftwarePlatformDto = {
  totalPages?: number;
  totalElements?: number;
  pageable?: Pageable;
  first?: boolean;
  sort?: Sort;
  number?: number;
  numberOfElements?: number;
  last?: boolean;
  size?: number;
  content?: Array<SoftwarePlatformDto>;
  empty?: boolean;
};
