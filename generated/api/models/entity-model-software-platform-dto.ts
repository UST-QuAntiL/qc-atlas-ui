/* tslint:disable */
import { Links } from './links';
export interface EntityModelSoftwarePlatformDto {
  '_links'?: Links;
  id?: string;
  licence?: string;

  /**
   * URL
   */
  link?: string;
  name?: string;
  version?: string;
}
