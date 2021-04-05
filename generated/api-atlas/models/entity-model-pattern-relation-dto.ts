/* tslint:disable */
import { Link } from './link';
import { PatternRelationTypeDto } from './pattern-relation-type-dto';
export type EntityModelPatternRelationDto = { 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> };
