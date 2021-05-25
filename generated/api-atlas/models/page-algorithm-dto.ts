/* tslint:disable */
import { AlgorithmDto } from './algorithm-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageAlgorithmDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<AlgorithmDto>;
  sort?: Sort;
  empty?: boolean;
};
