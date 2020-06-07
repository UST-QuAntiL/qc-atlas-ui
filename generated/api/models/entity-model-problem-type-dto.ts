/* tslint:disable */
import { Link } from './link';
export interface EntityModelProblemTypeDto {
  id?: string;
  links?: Array<Link>;
  name: string;
  parentProblemType?: string;
}
