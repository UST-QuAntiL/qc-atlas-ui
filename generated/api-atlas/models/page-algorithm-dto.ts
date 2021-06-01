/* tslint:disable */
import { AlgorithmDto } from './algorithm-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageAlgorithmDto = { 'totalPages'?: number, 'totalElements'?: number, 'pageable'?: Pageable, 'first'?: boolean, 'sort'?: Sort, 'number'?: number, 'numberOfElements'?: number, 'last'?: boolean, 'size'?: number, 'content'?: Array<AlgorithmDto>, 'empty'?: boolean };
