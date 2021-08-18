/* tslint:disable */
import { ImplementationDto } from './implementation-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageImplementationDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<ImplementationDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
