/* tslint:disable */
import { ComputeResourceDto } from './compute-resource-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageComputeResourceDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<ComputeResourceDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
