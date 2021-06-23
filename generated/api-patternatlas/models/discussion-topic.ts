/* tslint:disable */
export type DiscussionTopic = {
  id?: string;
  title?: string;
  description?: string;
  status?: 'OPEN' | 'CLOSED';
  date?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  imageId?: string;
};
