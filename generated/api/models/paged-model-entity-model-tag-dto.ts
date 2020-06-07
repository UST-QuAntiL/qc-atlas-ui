/* tslint:disable */
import { EntityModelTagDto } from './entity-model-tag-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelTagDto {
  '_embedded'?: { 'tagDtoes'?: Array<EntityModelTagDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
