/* tslint:disable */
import { EntityModelProblemTypeDto } from './entity-model-problem-type-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelProblemTypeDto {
  '_embedded'?: { 'problemTypeDtoes'?: Array<EntityModelProblemTypeDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
