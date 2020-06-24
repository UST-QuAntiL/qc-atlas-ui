/* tslint:disable */
import { EntityModelAlgorithmDto } from './entity-model-algorithm-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelAlgorithmDto {
  '_embedded'?: { 'algorithmDtoes'?: Array<EntityModelAlgorithmDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
