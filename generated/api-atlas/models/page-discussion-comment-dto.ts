/* tslint:disable */
import { DiscussionCommentDto } from './discussion-comment-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageDiscussionCommentDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<DiscussionCommentDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
