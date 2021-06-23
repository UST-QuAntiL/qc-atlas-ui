/* tslint:disable */
import { EntityModelDesignModel } from './entity-model-design-model';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export type PagedModelEntityModelDesignModel = {
  _embedded?: { designModels?: Array<EntityModelDesignModel> };
  _links?: Links;
  page?: PageMetadata;
};
