/* tslint:disable */
import { Pageable } from './pageable';
import { PatternRelationDto } from './pattern-relation-dto';
import { Sort } from './sort';
export type PagePatternRelationDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<PatternRelationDto>;
  sort?: Sort;
  empty?: boolean;
};
