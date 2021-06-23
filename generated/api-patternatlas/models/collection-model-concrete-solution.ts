/* tslint:disable */
import { ConcreteSolution } from './concrete-solution';
import { Links } from './links';
export type CollectionModelConcreteSolution = {
  _embedded?: { concreteSolutions?: Array<ConcreteSolution> };
  _links?: Links;
};
