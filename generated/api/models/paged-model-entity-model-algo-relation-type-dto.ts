/* tslint:disable */
import { EntityModelAlgoRelationTypeDto } from './entity-model-algo-relation-type-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelAlgoRelationTypeDto {
  '_embedded'?: { 'algoRelationTypeDtoes'?: Array<EntityModelAlgoRelationTypeDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
