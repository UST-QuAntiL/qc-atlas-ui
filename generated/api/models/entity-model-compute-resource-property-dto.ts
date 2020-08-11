/* tslint:disable */
import { ComputeResourcePropertyTypeDto } from './compute-resource-property-type-dto';
import { Link } from './link';
export type EntityModelComputeResourcePropertyDto = {
  id?: string;
  value?: string;
  type: ComputeResourcePropertyTypeDto;
  _links?: Array<Link>;
};
