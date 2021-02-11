/* tslint:disable */
import { EntityModelGateDto } from './entity-model-gate-dto';
import { Links } from './links';
export type CollectionModelEntityModelGateDto = {
  _embedded?: { gateDtoes?: Array<EntityModelGateDto> };
  _links?: Links;
};
