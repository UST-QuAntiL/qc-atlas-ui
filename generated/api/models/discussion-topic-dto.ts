/* tslint:disable */
export interface DiscussionTopicDto {
  date: string;
  description?: string;
  id?: string;
  status: 'OPEN' | 'CLOSED';
  title: string;
}
