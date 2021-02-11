/* tslint:disable */
import { EntityModelProvDocumentDto } from './entity-model-prov-document-dto';
import { Links } from './links';
export type CollectionModelEntityModelProvDocumentDto = {
  _embedded?: { provDocumentDtoes?: Array<EntityModelProvDocumentDto> };
  _links?: Links;
};
