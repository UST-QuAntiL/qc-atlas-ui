/* tslint:disable */
import { AlgorithmDto } from './algorithm-dto';
import { Link } from './link';
import { PatternRelationTypeDto } from './pattern-relation-type-dto';
export type EntityModelPatternRelationDto = {
  id?: string;
  algorithm: AlgorithmDto;
  pattern: string;
  patternRelationType: PatternRelationTypeDto;
  description?: string;
  _links?: Array<Link>;
};
