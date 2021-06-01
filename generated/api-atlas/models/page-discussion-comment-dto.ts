/* tslint:disable */
import { DiscussionCommentDto } from './discussion-comment-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageDiscussionCommentDto = { 'totalPages'?: number, 'totalElements'?: number, 'pageable'?: Pageable, 'first'?: boolean, 'sort'?: Sort, 'number'?: number, 'numberOfElements'?: number, 'last'?: boolean, 'size'?: number, 'content'?: Array<DiscussionCommentDto>, 'empty'?: boolean };
