/* tslint:disable */
import { Algorithm } from './algorithm';
export interface ProblemType {
  algorithms?: Array<Algorithm>;
  id?: string;
  name?: string;
  parentProblemType?: string;
}
