/* tslint:disable */
import { EntityModelDiscussionTopicDto } from './entity-model-discussion-topic-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelDiscussionTopicDto {
  '_embedded'?: { 'discussionTopicDtoes'?: Array<EntityModelDiscussionTopicDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
