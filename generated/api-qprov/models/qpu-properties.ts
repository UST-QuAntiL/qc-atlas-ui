/* tslint:disable */
import { QpuPropsGate } from './qpu-props-gate';
import { Qubit } from './qubit';
export type QpuProperties = { 'id'?: number, 'backendName'?: string, 'lastUpdateDate'?: string, 'backendVersion'?: string, 'gates'?: Array<QpuPropsGate>, 'general'?: Array<Qubit> };
