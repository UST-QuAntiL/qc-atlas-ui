/* tslint:disable */
import { AlgorithmRelationDto } from './algorithm-relation-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageAlgorithmRelationDto = {
  totalPages?: number;
  totalElements?: number;
  pageable?: Pageable;
  first?: boolean;
  sort?: Sort;
  number?: number;
  numberOfElements?: number;
  last?: boolean;
  size?: number;
  content?: Array<AlgorithmRelationDto>;
  empty?: boolean;
};
