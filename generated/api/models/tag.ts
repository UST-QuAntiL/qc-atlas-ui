/* tslint:disable */
import { Algorithm } from './algorithm';
import { Implementation } from './implementation';
export type Tag = {
  category?: string;
  value?: string;
  algorithms?: Array<Algorithm>;
  implementations?: Array<Implementation>;
};
