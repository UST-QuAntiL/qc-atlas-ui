/* tslint:disable */
import { ApplicationAreaDto } from './application-area-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageApplicationAreaDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<ApplicationAreaDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
