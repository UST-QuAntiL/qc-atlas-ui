/* tslint:disable */
import { Links } from './links';
export type EntityModelGateDto = {
  id?: string;
  name?: string;
  multiQubitGate?: boolean;
  operatingQubits?: Array<string>;
  _links?: Links;
};
