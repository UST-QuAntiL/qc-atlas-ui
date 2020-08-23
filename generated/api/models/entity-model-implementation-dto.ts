/* tslint:disable */
import { Link } from './link';
export type EntityModelImplementationDto = {
  id?: string;
  name: string;
  link?: string;
  inputFormat?: string;
  outputFormat?: string;
  description?: string;
  contributors?: string;
  assumptions?: string;
  parameter?: string;
  dependencies?: string;
  _links?: Array<Link>;
};
