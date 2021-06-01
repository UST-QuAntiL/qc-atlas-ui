/* tslint:disable */
import { Pageable } from './pageable';
import { RevisionDto } from './revision-dto';
import { Sort } from './sort';
export type PageRevisionDto = { 'totalPages'?: number, 'totalElements'?: number, 'pageable'?: Pageable, 'first'?: boolean, 'sort'?: Sort, 'number'?: number, 'numberOfElements'?: number, 'last'?: boolean, 'size'?: number, 'content'?: Array<RevisionDto>, 'empty'?: boolean };
