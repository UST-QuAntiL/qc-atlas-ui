/* tslint:disable */
import { DiscussionCommentDto } from './discussion-comment-dto';
import { DiscussionTopicDto } from './discussion-topic-dto';
import { Links } from './links';
export interface EntityModelDiscussionCommentDto {
  '_links'?: Links;
  date?: string;
  discussionTopic?: DiscussionTopicDto;
  id?: string;
  replyTo?: DiscussionCommentDto;
  text?: string;
}
