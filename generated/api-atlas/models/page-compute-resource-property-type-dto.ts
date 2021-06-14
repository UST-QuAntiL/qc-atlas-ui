/* tslint:disable */
import { ComputeResourcePropertyTypeDto } from './compute-resource-property-type-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageComputeResourcePropertyTypeDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<ComputeResourcePropertyTypeDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
