/* tslint:disable */
import { Algorithm } from './algorithm';
export interface Publication {
  algorithms?: Array<Algorithm>;
  authors?: Array<string>;
  doi?: string;
  id?: string;
  title?: string;
  url?: string;
}
