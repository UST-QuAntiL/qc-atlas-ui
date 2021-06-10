/* tslint:disable */
import { Pageable } from './pageable';
import { RevisionDto } from './revision-dto';
import { Sort } from './sort';
export type PageRevisionDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<RevisionDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
