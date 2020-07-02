/* tslint:disable */
import { Algorithm } from './algorithm';
import { Implementation } from './implementation';
export type Publication = { 'id'?: string, 'doi'?: string, 'url'?: string, 'title'?: string, 'authors'?: Array<string>, 'algorithms'?: Array<Algorithm>, 'implementations'?: Array<Implementation> };
