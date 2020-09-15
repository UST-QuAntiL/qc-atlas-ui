/* tslint:disable */
import { Links } from './links';
export type QpuDto = {
  id?: string;
  name?: string;
  numberOfQubits?: number;
  t1?: number;
  maxGateTime?: number;
  _links?: Links;
};
