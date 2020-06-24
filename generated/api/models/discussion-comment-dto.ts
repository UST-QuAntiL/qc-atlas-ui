/* tslint:disable */
import { DiscussionTopicDto } from './discussion-topic-dto';
export interface DiscussionCommentDto {
  date: string;
  discussionTopic?: DiscussionTopicDto;
  id?: string;
  replyTo?: DiscussionCommentDto;
  text: string;
}
