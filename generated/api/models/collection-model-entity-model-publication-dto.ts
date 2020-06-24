/* tslint:disable */
import { EntityModelPublicationDto } from './entity-model-publication-dto';
import { Links } from './links';
export interface CollectionModelEntityModelPublicationDto {
  '_embedded'?: { 'publicationDtoes'?: Array<EntityModelPublicationDto> };
  '_links'?: Links;
}
