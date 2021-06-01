/* tslint:disable */
import { ComputeResourceDto } from './compute-resource-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageComputeResourceDto = { 'totalPages'?: number, 'totalElements'?: number, 'pageable'?: Pageable, 'first'?: boolean, 'sort'?: Sort, 'number'?: number, 'numberOfElements'?: number, 'last'?: boolean, 'size'?: number, 'content'?: Array<ComputeResourceDto>, 'empty'?: boolean };
