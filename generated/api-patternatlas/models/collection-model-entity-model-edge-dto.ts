/* tslint:disable */
import { EntityModelEdgeDto } from './entity-model-edge-dto';
import { Links } from './links';
export type CollectionModelEntityModelEdgeDto = {
  _embedded?: { edges?: Array<EntityModelEdgeDto> };
  _links?: Links;
};
