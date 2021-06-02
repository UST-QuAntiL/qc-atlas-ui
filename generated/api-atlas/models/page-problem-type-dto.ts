/* tslint:disable */
import { Pageable } from './pageable';
import { ProblemTypeDto } from './problem-type-dto';
import { Sort } from './sort';
export type PageProblemTypeDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<ProblemTypeDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
