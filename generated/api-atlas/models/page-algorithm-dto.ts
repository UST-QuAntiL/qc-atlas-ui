/* tslint:disable */
import { AlgorithmDto } from './algorithm-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageAlgorithmDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<AlgorithmDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
