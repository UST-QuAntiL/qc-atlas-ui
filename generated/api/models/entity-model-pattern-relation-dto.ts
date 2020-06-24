/* tslint:disable */
import { AlgorithmDto } from './algorithm-dto';
import { Links } from './links';
import { PatternRelationTypeDto } from './pattern-relation-type-dto';
export interface EntityModelPatternRelationDto {
  '_links'?: Links;
  algorithm?: AlgorithmDto;
  algorithmId?: string;
  description?: string;
  id?: string;
  pattern?: string;
  patternRelationType?: PatternRelationTypeDto;
}
