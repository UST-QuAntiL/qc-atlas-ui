/* tslint:disable */
import { Link } from './link';
export type EntityModelDirectedEdgeModel = {
  id?: string;
  description?: {};
  type?: string;
  sourcePatternName?: string;
  sourcePatternId?: string;
  sourcePatternUri?: string;
  targetPatternName?: string;
  targetPatternId?: string;
  targetPatternUri?: string;
  links?: Array<Link>;
};
