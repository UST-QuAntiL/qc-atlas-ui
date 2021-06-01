/* tslint:disable */
import { LearningMethodDto } from './learning-method-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageLearningMethodDto = { 'totalPages'?: number, 'totalElements'?: number, 'pageable'?: Pageable, 'first'?: boolean, 'sort'?: Sort, 'number'?: number, 'numberOfElements'?: number, 'last'?: boolean, 'size'?: number, 'content'?: Array<LearningMethodDto>, 'empty'?: boolean };
