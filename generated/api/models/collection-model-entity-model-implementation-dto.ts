/* tslint:disable */
import { EntityModelImplementationDto } from './entity-model-implementation-dto';
import { Links } from './links';
export interface CollectionModelEntityModelImplementationDto {
  '_embedded'?: { 'implementationDtoes'?: Array<EntityModelImplementationDto> };
  '_links'?: Links;
}
