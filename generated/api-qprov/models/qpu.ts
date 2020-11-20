/* tslint:disable */
import { Gate } from './gate';
import { Qubit } from './qubit';
export type Qpu = { 'qpuId'?: string, 'qubits'?: Array<Qubit>, 'gates'?: Array<Gate>, 'backendVersion'?: string, 'lastUpdateDate'?: string, 'onlineDate'?: string, 'description'?: string, 'maxExperiments'?: number, 'maxShots'?: number, 'dt'?: number, 'dtm'?: number, 'nqubits'?: number, 'nregisters'?: number, 'providerId'?: string, 'backendName'?: string };
