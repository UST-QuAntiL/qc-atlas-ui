/* tslint:disable */
import { ComputeResourcePropertyTypeDto } from './compute-resource-property-type-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageComputeResourcePropertyTypeDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<ComputeResourcePropertyTypeDto>;
  sort?: Sort;
  empty?: boolean;
};
