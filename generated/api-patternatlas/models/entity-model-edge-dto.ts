/* tslint:disable */
import { Links } from './links';
export type EntityModelEdgeDto = {
  sourcePatternId?: string;
  targetPatternId?: string;
  pattern1Id?: string;
  pattern2Id?: string;
  type?: string;
  description?: string;
  directedEdge?: boolean;
  _links?: Links;
};
