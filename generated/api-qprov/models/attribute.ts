/* tslint:disable */
import { QualifiedName } from './qualified-name';
export type Attribute = {
  value?: {};
  type?: QualifiedName;
  convertedValue?: {};
  kind?:
    | 'PROV_TYPE'
    | 'PROV_LABEL'
    | 'PROV_ROLE'
    | 'PROV_LOCATION'
    | 'PROV_VALUE'
    | 'PROV_KEY'
    | 'OTHER';
  elementName?: QualifiedName;
  valueFromObject?: {};
};
