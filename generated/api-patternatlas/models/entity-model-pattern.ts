/* tslint:disable */
import { Links } from './links';
export type EntityModelPattern = {
  id?: string;
  uri?: string;
  name?: string;
  iconUrl?: string;
  content: {};
  renderedContent?: {};
  _links?: Links;
};
