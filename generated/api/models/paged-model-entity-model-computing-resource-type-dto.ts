/* tslint:disable */
import { EntityModelComputingResourceTypeDto } from './entity-model-computing-resource-type-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelComputingResourceTypeDto {
  '_embedded'?: { 'computingResourceTypeDtoes'?: Array<EntityModelComputingResourceTypeDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
