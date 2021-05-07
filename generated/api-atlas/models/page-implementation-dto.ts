/* tslint:disable */
import { ImplementationDto } from './implementation-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageImplementationDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<ImplementationDto>;
  sort?: Sort;
  empty?: boolean;
};
