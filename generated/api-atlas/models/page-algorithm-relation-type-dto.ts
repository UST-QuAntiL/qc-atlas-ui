/* tslint:disable */
import { AlgorithmRelationTypeDto } from './algorithm-relation-type-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageAlgorithmRelationTypeDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<AlgorithmRelationTypeDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
