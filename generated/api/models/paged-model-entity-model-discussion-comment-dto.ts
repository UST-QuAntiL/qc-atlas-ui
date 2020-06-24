/* tslint:disable */
import { EntityModelDiscussionCommentDto } from './entity-model-discussion-comment-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelDiscussionCommentDto {
  '_embedded'?: { 'discussionCommentDtoes'?: Array<EntityModelDiscussionCommentDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
