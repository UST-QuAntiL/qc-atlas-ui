/* tslint:disable */
import { ComputeResourcePropertyTypeDto } from './compute-resource-property-type-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageComputeResourcePropertyTypeDto = { 'totalPages'?: number, 'totalElements'?: number, 'pageable'?: Pageable, 'first'?: boolean, 'sort'?: Sort, 'number'?: number, 'numberOfElements'?: number, 'last'?: boolean, 'size'?: number, 'content'?: Array<ComputeResourcePropertyTypeDto>, 'empty'?: boolean };
