/* tslint:disable */
import { Algorithm } from './algorithm';
import { PatternRelationType } from './pattern-relation-type';
export interface PatternRelation {
  algorithm?: Algorithm;
  description?: string;
  id?: string;
  pattern?: string;
  patternRelationType?: PatternRelationType;
}
