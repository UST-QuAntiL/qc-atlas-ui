/* tslint:disable */
import { Pageable } from './pageable';
import { ProblemTypeDto } from './problem-type-dto';
import { Sort } from './sort';
export type PageProblemTypeDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<ProblemTypeDto>;
  sort?: Sort;
  empty?: boolean;
};
