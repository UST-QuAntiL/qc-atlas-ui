/* tslint:disable */
import { Link } from './link';
export interface EntityModelProblemTypeDto {
  '_links'?: Array<Link>;
  id?: string;
  name: string;
  parentProblemType?: string;
}
