/* tslint:disable */
import { EntityModelApplicationAreaDto } from './entity-model-application-area-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelApplicationAreaDto {
  '_embedded'?: { 'applicationAreaDtoes'?: Array<EntityModelApplicationAreaDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
