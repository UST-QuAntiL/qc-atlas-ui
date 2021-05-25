/* tslint:disable */
import { ComputeResourceDto } from './compute-resource-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageComputeResourceDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<ComputeResourceDto>;
  sort?: Sort;
  empty?: boolean;
};
