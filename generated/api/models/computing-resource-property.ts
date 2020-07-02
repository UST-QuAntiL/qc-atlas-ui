/* tslint:disable */
import { Algorithm } from './algorithm';
import { Backend } from './backend';
import { ComputingResourcePropertyType } from './computing-resource-property-type';
import { Implementation } from './implementation';
export type ComputingResourceProperty = { 'id'?: string, 'computingResourcePropertyType'?: ComputingResourcePropertyType, 'algorithm'?: Algorithm, 'implementation'?: Implementation, 'backend'?: Backend, 'value'?: string };
