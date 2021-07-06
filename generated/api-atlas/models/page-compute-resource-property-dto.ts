/* tslint:disable */
import { ComputeResourcePropertyDto } from './compute-resource-property-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageComputeResourcePropertyDto = {
  totalPages?: number;
  totalElements?: number;
  pageable?: Pageable;
  first?: boolean;
  sort?: Sort;
  number?: number;
  numberOfElements?: number;
  last?: boolean;
  size?: number;
  content?: Array<ComputeResourcePropertyDto>;
  empty?: boolean;
};
