/* tslint:disable */
import { DiscussionCommentDto } from './discussion-comment-dto';
import { Link } from './link';
export type EntityModelDiscussionCommentDto = { 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> };
