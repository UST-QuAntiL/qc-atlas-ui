/* tslint:disable */
import { EntityModelPublicationDto } from './entity-model-publication-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelPublicationDto {
  '_embedded'?: { 'publicationDtoes'?: Array<EntityModelPublicationDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
