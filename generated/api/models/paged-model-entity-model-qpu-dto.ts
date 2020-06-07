/* tslint:disable */
import { EntityModelQpuDto } from './entity-model-qpu-dto';
import { Links } from './links';
import { PageMetadata } from './page-metadata';
export interface PagedModelEntityModelQpuDto {
  '_embedded'?: { 'qpuDtoes'?: Array<EntityModelQpuDto> };
  '_links'?: Links;
  page?: PageMetadata;
}
