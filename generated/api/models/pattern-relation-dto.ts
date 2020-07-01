/* tslint:disable */
import { AlgorithmDto } from './algorithm-dto';
import { PatternRelationTypeDto } from './pattern-relation-type-dto';
export type PatternRelationDto = { 'id'?: string, 'algorithm': AlgorithmDto, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string };
