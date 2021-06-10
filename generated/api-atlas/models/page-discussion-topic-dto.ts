/* tslint:disable */
import { DiscussionTopicDto } from './discussion-topic-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageDiscussionTopicDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<DiscussionTopicDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
