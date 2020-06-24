/* tslint:disable */
import { EntityModelComputingResourceDto } from './entity-model-computing-resource-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelComputingResourceDto {
  '_embedded'?: { 'computingResourceDtoes'?: Array<EntityModelComputingResourceDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
