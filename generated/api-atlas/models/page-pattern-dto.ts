/* tslint:disable */
import { Pageable } from './pageable';
import { PatternDto } from './pattern-dto';
import { Sort } from './sort';
export type PagePatternDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<PatternDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
