/* tslint:disable */
import { Links } from './links';
export interface EntityModelComputingResourceTypeDto {
  '_links'?: Links;
  datatype?: 'INTEGER' | 'STRING' | 'FLOAT';
  description?: string;
  id?: string;
  name?: string;
}
