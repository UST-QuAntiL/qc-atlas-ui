/* tslint:disable */
import { EntityModelPatternView } from './entity-model-pattern-view';
import { Links } from './links';
export type CollectionModelEntityModelPatternView = {
  _embedded?: { patternViews?: Array<EntityModelPatternView> };
  _links?: Links;
};
