/* tslint:disable */
import { ComputingResourceTypeDto } from './computing-resource-type-dto';
import { Links } from './links';
export interface EntityModelComputingResourceDto {
  '_links'?: Links;
  id?: string;
  type?: ComputingResourceTypeDto;
  value?: {  };
}
