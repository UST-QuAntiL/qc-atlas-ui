/* tslint:disable */
import { DiscussionTopicDto } from './discussion-topic-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageDiscussionTopicDto = { 'totalPages'?: number, 'totalElements'?: number, 'pageable'?: Pageable, 'first'?: boolean, 'sort'?: Sort, 'number'?: number, 'numberOfElements'?: number, 'last'?: boolean, 'size'?: number, 'content'?: Array<DiscussionTopicDto>, 'empty'?: boolean };
