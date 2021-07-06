/* tslint:disable */
import { ImplementationDto } from './implementation-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageImplementationDto = {
  totalPages?: number;
  totalElements?: number;
  pageable?: Pageable;
  first?: boolean;
  sort?: Sort;
  number?: number;
  numberOfElements?: number;
  last?: boolean;
  size?: number;
  content?: Array<ImplementationDto>;
  empty?: boolean;
};
