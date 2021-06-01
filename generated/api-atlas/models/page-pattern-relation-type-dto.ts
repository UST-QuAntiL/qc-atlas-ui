/* tslint:disable */
import { Pageable } from './pageable';
import { PatternRelationTypeDto } from './pattern-relation-type-dto';
import { Sort } from './sort';
export type PagePatternRelationTypeDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<PatternRelationTypeDto>;
  sort?: Sort;
  empty?: boolean;
};
