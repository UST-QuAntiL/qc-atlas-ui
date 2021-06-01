/* tslint:disable */
import { AlgorithmRelationTypeDto } from './algorithm-relation-type-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageAlgorithmRelationTypeDto = { 'totalPages'?: number, 'totalElements'?: number, 'pageable'?: Pageable, 'first'?: boolean, 'sort'?: Sort, 'number'?: number, 'numberOfElements'?: number, 'last'?: boolean, 'size'?: number, 'content'?: Array<AlgorithmRelationTypeDto>, 'empty'?: boolean };
