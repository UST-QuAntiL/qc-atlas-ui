/* tslint:disable */
import { Algorithm } from './algorithm';
import { ComputingResourceProperty } from './computing-resource-property';
import { Publication } from './publication';
import { QuantumAlgorithm } from './quantum-algorithm';
import { SoftwarePlatform } from './software-platform';
export type QuantumImplementation = { 'id'?: string, 'name'?: string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'link'?: string, 'dependencies'?: string, 'publications'?: Array<Publication>, 'implementedAlgorithm'?: Algorithm, 'requiredComputingResourceProperties'?: Array<ComputingResourceProperty>, 'softwarePlatforms'?: Array<SoftwarePlatform>, 'algorithm'?: QuantumAlgorithm };
