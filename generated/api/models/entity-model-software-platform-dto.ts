/* tslint:disable */
import { Link } from './link';
export type EntityModelSoftwarePlatformDto = {
  id?: string;
  name: string;
  link?: string;
  version?: string;
  licence?: string;
  _links?: Array<Link>;
};
