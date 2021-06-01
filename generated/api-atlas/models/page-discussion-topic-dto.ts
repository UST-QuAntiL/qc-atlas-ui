/* tslint:disable */
import { DiscussionTopicDto } from './discussion-topic-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageDiscussionTopicDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<DiscussionTopicDto>;
  sort?: Sort;
  empty?: boolean;
};
