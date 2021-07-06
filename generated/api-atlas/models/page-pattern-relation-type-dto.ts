/* tslint:disable */
import { Pageable } from './pageable';
import { PatternRelationTypeDto } from './pattern-relation-type-dto';
import { Sort } from './sort';
export type PagePatternRelationTypeDto = {
  totalPages?: number;
  totalElements?: number;
  pageable?: Pageable;
  first?: boolean;
  sort?: Sort;
  number?: number;
  numberOfElements?: number;
  last?: boolean;
  size?: number;
  content?: Array<PatternRelationTypeDto>;
  empty?: boolean;
};
