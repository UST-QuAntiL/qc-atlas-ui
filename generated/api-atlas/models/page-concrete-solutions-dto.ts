/* tslint:disable */
import { Sort } from 'api-atlas/models/sort';
import { Pageable } from 'api-atlas/models/pageable';
import { ConcreteSolutionDto } from './concrete-solution-dto';

export type PageConcreteSolutionDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<ConcreteSolutionDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
