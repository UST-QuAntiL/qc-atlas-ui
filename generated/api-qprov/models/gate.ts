/* tslint:disable */
import { Parameter } from './parameter';
export type Gate = { 'gateId'?: string, 'name'?: string, 'qubits'?: Array<number>, 'qasmDef'?: string, 'gateParameters'?: Array<Parameter> };
