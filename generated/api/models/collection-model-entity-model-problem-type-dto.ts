/* tslint:disable */
import { EntityModelProblemTypeDto } from './entity-model-problem-type-dto';
import { Links } from './links';
export interface CollectionModelEntityModelProblemTypeDto {
  '_embedded'?: { 'problemTypeDtoes'?: Array<EntityModelProblemTypeDto> };
  '_links'?: Links;
}
