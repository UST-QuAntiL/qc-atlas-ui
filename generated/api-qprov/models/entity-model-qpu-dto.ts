/* tslint:disable */
import { Links } from './links';
export type EntityModelQpuDto = {
  id?: string;
  name?: string;
  version?: string;
  lastUpdated?: string;
  lastCalibrated?: string;
  maxShots?: number;
  queueSize?: number;
  numberOfQubits?: number;
  avgT1Time?: number;
  maxGateTime?: number;
  simulator?: boolean;
  _links?: Links;
};
