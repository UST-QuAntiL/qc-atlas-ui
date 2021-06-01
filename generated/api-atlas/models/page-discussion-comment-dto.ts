/* tslint:disable */
import { DiscussionCommentDto } from './discussion-comment-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageDiscussionCommentDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<DiscussionCommentDto>;
  sort?: Sort;
  empty?: boolean;
};
