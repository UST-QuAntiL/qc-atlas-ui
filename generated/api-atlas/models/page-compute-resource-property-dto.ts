/* tslint:disable */
import { ComputeResourcePropertyDto } from './compute-resource-property-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageComputeResourcePropertyDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<ComputeResourcePropertyDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
