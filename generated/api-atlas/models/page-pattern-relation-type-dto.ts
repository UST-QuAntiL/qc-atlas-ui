/* tslint:disable */
import { Pageable } from './pageable';
import { PatternRelationTypeDto } from './pattern-relation-type-dto';
import { Sort } from './sort';
export type PagePatternRelationTypeDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<PatternRelationTypeDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
