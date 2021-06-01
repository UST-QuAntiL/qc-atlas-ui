/* tslint:disable */
import { ComputeResourcePropertyDto } from './compute-resource-property-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageComputeResourcePropertyDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<ComputeResourcePropertyDto>;
  sort?: Sort;
  empty?: boolean;
};
