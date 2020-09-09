/* tslint:disable */
import { PatternRelationTypeDto } from './pattern-relation-type-dto';
export type PatternRelationDto = {
  id: string;
  algorithmId: string;
  pattern: string;
  patternRelationType: PatternRelationTypeDto;
  description?: string;
};
