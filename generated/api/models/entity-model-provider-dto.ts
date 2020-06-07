/* tslint:disable */
import { Link } from './link';
export interface EntityModelProviderDto {
  accessKey: string;
  id?: string;
  links?: Array<Link>;
  name: string;
  secretKey: string;
}
