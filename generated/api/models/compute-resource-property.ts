/* tslint:disable */
import { Algorithm } from './algorithm';
import { ComputeResource } from './compute-resource';
import { ComputeResourcePropertyType } from './compute-resource-property-type';
import { Implementation } from './implementation';
export type ComputeResourceProperty = {
  id?: string;
  computeResourcePropertyType?: ComputeResourcePropertyType;
  algorithm?: Algorithm;
  implementation?: Implementation;
  computeResource?: ComputeResource;
  value?: string;
};
