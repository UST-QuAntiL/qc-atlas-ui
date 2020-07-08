/* tslint:disable */
import { ComputingResourcePropertyTypeDto } from './computing-resource-property-type-dto';
import { Link } from './link';
export type EntityModelComputingResourcePropertyDto = {
  id?: string;
  value?: string;
  type: ComputingResourcePropertyTypeDto;
  _links?: Array<Link>;
};
