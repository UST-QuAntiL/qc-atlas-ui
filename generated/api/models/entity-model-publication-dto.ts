/* tslint:disable */
import { Links } from './links';
export interface EntityModelPublicationDto {
  '_links'?: Links;
  authors?: Array<string>;
  doi?: string;
  id?: string;
  title?: string;

  /**
   * URL
   */
  url?: string;
}
