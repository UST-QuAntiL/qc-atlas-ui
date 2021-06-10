/* tslint:disable */
import { AlgorithmRelationDto } from './algorithm-relation-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageAlgorithmRelationDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<AlgorithmRelationDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
