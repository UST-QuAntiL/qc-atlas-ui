/* tslint:disable */
import { AbstractJsonSchemaPropertyObject } from './abstract-json-schema-property-object';
import { Item } from './item';
export type JsonSchema = {
  title?: string;
  description?: string;
  properties?: {};
  requiredProperties?: Array<string>;
  definitions?: {};
  type?: string;
  $schema?: string;
};
