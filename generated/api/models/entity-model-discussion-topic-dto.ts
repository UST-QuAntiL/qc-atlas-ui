/* tslint:disable */
import { Links } from './links';
export interface EntityModelDiscussionTopicDto {
  '_links'?: Links;
  date?: string;
  description?: string;
  id?: string;
  status?: 'OPEN' | 'CLOSED';
  title?: string;
}
