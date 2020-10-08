/* tslint:disable */
import { Links } from './links';
export type ExecutionResultDto = {
  id?: string;
  status?: 'INITIALIZED' | 'RUNNING' | 'FAILED' | 'FINISHED';
  statusCode?: string;
  result?: string;
  _links?: Links;
};
