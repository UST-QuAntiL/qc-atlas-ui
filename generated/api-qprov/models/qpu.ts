/* tslint:disable */
import { Gate } from './gate';
import { QpuProperties } from './qpu-properties';
export type Qpu = { 'id'?: number, 'provider'?: string, 'backendName'?: string, 'backendVersion'?: string, 'properties'?: QpuProperties, 'nQubits'?: number, 'basisGates'?: Array<string>, 'gates'?: Array<Gate>, 'memory'?: boolean, 'maxShots'?: number, 'nUchannels'?: number, 'dt'?: number, 'dtm'?: number, 'repTimes'?: Array<number>, 'measKernels'?: Array<string>, 'discriminators'?: Array<string>, 'description'?: string, 'maxExperiments'?: number, 'nRegisters'?: number, 'onlineDate'?: string, 'url'?: string, 'allowQCircuit'?: boolean, 'allowObjectStorage'?: boolean, 'nqubits'?: number, 'nuchannels'?: number, 'nregisters'?: number };
