/* tslint:disable */
import { ApplicationAreaDto } from './application-area-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageApplicationAreaDto = { 'totalPages'?: number, 'totalElements'?: number, 'pageable'?: Pageable, 'first'?: boolean, 'sort'?: Sort, 'number'?: number, 'numberOfElements'?: number, 'last'?: boolean, 'size'?: number, 'content'?: Array<ApplicationAreaDto>, 'empty'?: boolean };
