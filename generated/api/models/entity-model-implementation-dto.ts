/* tslint:disable */
import { Links } from './links';
import { Publication } from './publication';
export interface EntityModelImplementationDto {
  '_links'?: Links;
  assumptions?: string;
  contributors?: string;
  dependencies?: string;
  description?: string;
  id?: string;
  inputFormat?: string;

  /**
   * URL of implementation
   */
  link?: string;
  name?: string;
  outputFormat?: string;
  parameter?: string;
  publications?: Array<Publication>;
}
