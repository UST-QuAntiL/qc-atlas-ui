/* tslint:disable */
import { AlgorithmRelationDto } from './algorithm-relation-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageAlgorithmRelationDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<AlgorithmRelationDto>;
  sort?: Sort;
  empty?: boolean;
};
