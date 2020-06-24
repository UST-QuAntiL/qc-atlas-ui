/* tslint:disable */
import { EntityModelPatternRelationTypeDto } from './entity-model-pattern-relation-type-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelPatternRelationTypeDto {
  '_embedded'?: { 'patternRelationTypeDtoes'?: Array<EntityModelPatternRelationTypeDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
