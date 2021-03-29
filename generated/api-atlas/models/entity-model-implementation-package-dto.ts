/* tslint:disable */
import { Link } from './link';
export type EntityModelImplementationPackageDto = {
  id: string;
  name?: string;
  description?: string;
  packageType: 'FILE' | 'TOSCA' | 'FUNCTION';
  _links?: Array<Link>;
};
