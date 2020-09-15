/* tslint:disable */
import { Links } from './links';
export type CreateQpuRequestDto = {
  id?: string;
  name?: string;
  numberOfQubits?: number;
  t1?: number;
  maxGateTime?: number;
  supportedSdkIds?: Array<string>;
  _links?: Links;
};
