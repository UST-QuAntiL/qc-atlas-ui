/* tslint:disable */
import { EntityModelPatternInstanceDto } from './entity-model-pattern-instance-dto';
import { Links } from './links';
export type CollectionModelEntityModelPatternInstanceDto = {
  _embedded?: { patterns?: Array<EntityModelPatternInstanceDto> };
  _links?: Links;
};
