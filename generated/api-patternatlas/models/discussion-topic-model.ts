/* tslint:disable */
import { DiscussionComment } from './discussion-comment';
import { DiscussionTopic } from './discussion-topic';
export type DiscussionTopicModel = {
  discussionTopic?: DiscussionTopic;
  discussionComments?: Array<DiscussionComment>;
};
