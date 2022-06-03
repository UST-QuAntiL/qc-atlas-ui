/* tslint:disable */
/* eslint-disable */
import { StudyDatabase } from './study-database';
import { StudyQuery } from './study-query';
export interface Study {
  authors?: Array<string>;
  databases?: Array<StudyDatabase>;
  'last-search-date'?: string;
  queries?: Array<StudyQuery>;
  'research-questions'?: Array<string>;
  title?: string;
}
