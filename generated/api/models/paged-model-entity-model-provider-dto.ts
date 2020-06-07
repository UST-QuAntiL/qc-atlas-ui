/* tslint:disable */
import { EntityModelProviderDto } from './entity-model-provider-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelProviderDto {
  '_embedded'?: { 'providerDtoes'?: Array<EntityModelProviderDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
