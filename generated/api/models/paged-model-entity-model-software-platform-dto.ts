/* tslint:disable */
import { EntityModelSoftwarePlatformDto } from './entity-model-software-platform-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelSoftwarePlatformDto {
  '_embedded'?: { 'softwarePlatformDtoes'?: Array<EntityModelSoftwarePlatformDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
