/* tslint:disable */
import { EntityModelTagDto } from './entity-model-tag-dto';
import { Links } from './links';
export interface CollectionModelEntityModelTagDto {
  '_embedded'?: { 'tagDtoes'?: Array<EntityModelTagDto> };
  '_links'?: Links;
}
