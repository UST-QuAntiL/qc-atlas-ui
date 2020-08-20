/* tslint:disable */
import { CandidateComment } from './candidate-comment';
import { Link } from './link';
export type EntityModelCandidateModel = {
  id?: string;
  uri?: string;
  name?: string;
  iconUrl?: string;
  patternLanguageId?: string;
  patternLanguageName?: string;
  content?: string;
  version?: string;
  rating?: number;
  comments?: Array<CandidateComment>;
  links?: Array<Link>;
};
