/* tslint:disable */
import { Link } from './link';
export type EntityModelDiscussionTopicDto = {
  id: string;
  title: string;
  description?: string;
  status: 'OPEN' | 'CLOSED';
  date: string;
  _links?: Array<Link>;
};
