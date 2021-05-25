/* tslint:disable */
import { AlgorithmRelationTypeDto } from './algorithm-relation-type-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageAlgorithmRelationTypeDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<AlgorithmRelationTypeDto>;
  sort?: Sort;
  empty?: boolean;
};
