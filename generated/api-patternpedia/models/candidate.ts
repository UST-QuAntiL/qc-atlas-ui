/* tslint:disable */
import { CandidateComment } from './candidate-comment';
export type Candidate = {
  id?: string;
  uri?: string;
  name?: string;
  iconUrl?: string;
  content?: string;
  rating?: number;
  version?: string;
  comments?: Array<CandidateComment>;
};
