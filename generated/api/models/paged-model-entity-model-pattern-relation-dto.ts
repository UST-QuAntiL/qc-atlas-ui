/* tslint:disable */
import { EntityModelPatternRelationDto } from './entity-model-pattern-relation-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelPatternRelationDto {
  '_embedded'?: { 'patternRelationDtoes'?: Array<EntityModelPatternRelationDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
