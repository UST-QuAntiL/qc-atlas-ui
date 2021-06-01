/* tslint:disable */
import { ApplicationAreaDto } from './application-area-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageApplicationAreaDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<ApplicationAreaDto>;
  sort?: Sort;
  empty?: boolean;
};
