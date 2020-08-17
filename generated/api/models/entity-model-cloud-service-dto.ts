/* tslint:disable */
import { Link } from './link';
export type EntityModelCloudServiceDto = {
  id?: string;
  name: string;
  provider?: string;
  url?: string;
  description?: string;
  costModel?: string;
  _links?: Array<Link>;
};
