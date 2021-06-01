/* tslint:disable */
import { Pageable } from './pageable';
import { PatternRelationDto } from './pattern-relation-dto';
import { Sort } from './sort';
export type PagePatternRelationDto = { 'totalPages'?: number, 'totalElements'?: number, 'pageable'?: Pageable, 'first'?: boolean, 'sort'?: Sort, 'number'?: number, 'numberOfElements'?: number, 'last'?: boolean, 'size'?: number, 'content'?: Array<PatternRelationDto>, 'empty'?: boolean };
