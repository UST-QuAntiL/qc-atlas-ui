/* tslint:disable */
import { Algorithm } from './algorithm';
import { Backend } from './backend';
import { ComputingResourceType } from './computing-resource-type';
import { Implementation } from './implementation';
export interface ComputingResource {
  algorithm?: Algorithm;
  backend?: Backend;
  computingResourceType?: ComputingResourceType;
  id?: string;
  implementation?: Implementation;
  value?: {  };
}
