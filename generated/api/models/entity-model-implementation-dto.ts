/* tslint:disable */
import { Link } from './link';
export interface EntityModelImplementationDto {
  assumptions?: string;
  contributors?: string;
  dependencies?: string;
  description?: string;
  id?: string;
  inputFormat?: string;
  link: string;
  links?: Array<Link>;
  name: string;
  outputFormat?: string;
  parameter?: string;
}
