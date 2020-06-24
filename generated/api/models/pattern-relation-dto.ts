/* tslint:disable */
import { AlgorithmDto } from './algorithm-dto';
import { PatternRelationTypeDto } from './pattern-relation-type-dto';
export interface PatternRelationDto {
  algorithm?: AlgorithmDto;
  algorithmId: string;
  description?: string;
  id?: string;
  pattern: string;
  patternRelationType: PatternRelationTypeDto;
}
