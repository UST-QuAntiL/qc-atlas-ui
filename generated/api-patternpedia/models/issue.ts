/* tslint:disable */
import { IssueComment } from './issue-comment';
export type Issue = {
  id?: string;
  uri?: string;
  name?: string;
  description?: string;
  rating?: number;
  version?: string;
  comments?: Array<IssueComment>;
};
