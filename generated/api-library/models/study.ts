/* tslint:disable */
import { StudyDatabase } from './study-database';
import { StudyQuery } from './study-query';
export type Study = {
  authors?: Array<string>;
  title?: string;
  'last-search-date'?: string;
  'research-questions'?: Array<string>;
  queries?: Array<StudyQuery>;
  databases?: Array<StudyDatabase>;
};
