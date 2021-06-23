/* tslint:disable */
import { CandidateComment } from './candidate-comment';
import { Links } from './links';
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
  _links?: Links;
};
