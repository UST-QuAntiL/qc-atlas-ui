/* tslint:disable */
import { EntityModelPatternRelationDto } from './entity-model-pattern-relation-dto';
import { Links } from './links';
export interface CollectionModelEntityModelPatternRelationDto {
  '_embedded'?: { 'patternRelationDtoes'?: Array<EntityModelPatternRelationDto> };
  '_links'?: Links;
}
