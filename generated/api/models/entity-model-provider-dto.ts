/* tslint:disable */
import { Link } from './link';
export interface EntityModelProviderDto {
  '_links'?: Array<Link>;
  accessKey: string;
  id?: string;
  name: string;
  secretKey: string;
}
