/* tslint:disable */
import { EntityModelConcreteSolution } from './entity-model-concrete-solution';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export type PagedModelEntityModelConcreteSolution = {
  _embedded?: { concreteSolutions?: Array<EntityModelConcreteSolution> };
  _links?: Links;
  page?: PageMetadata;
};
