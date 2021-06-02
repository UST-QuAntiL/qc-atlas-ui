/* tslint:disable */
import { Pageable } from './pageable';
import { PatternRelationDto } from './pattern-relation-dto';
import { Sort } from './sort';
export type PagePatternRelationDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<PatternRelationDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
