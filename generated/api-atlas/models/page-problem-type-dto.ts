/* tslint:disable */
import { Pageable } from './pageable';
import { ProblemTypeDto } from './problem-type-dto';
import { Sort } from './sort';
export type PageProblemTypeDto = {
  totalPages?: number;
  totalElements?: number;
  pageable?: Pageable;
  first?: boolean;
  sort?: Sort;
  number?: number;
  numberOfElements?: number;
  last?: boolean;
  size?: number;
  content?: Array<ProblemTypeDto>;
  empty?: boolean;
};
