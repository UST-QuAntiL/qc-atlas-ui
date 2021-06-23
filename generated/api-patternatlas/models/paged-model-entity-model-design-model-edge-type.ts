/* tslint:disable */
import { EntityModelDesignModelEdgeType } from './entity-model-design-model-edge-type';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export type PagedModelEntityModelDesignModelEdgeType = {
  _embedded?: { designModelEdgeTypes?: Array<EntityModelDesignModelEdgeType> };
  _links?: Links;
  page?: PageMetadata;
};
