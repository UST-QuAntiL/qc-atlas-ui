/* tslint:disable */
import { Algorithm } from './algorithm';
import { ComputingResourceProperty } from './computing-resource-property';
import { SoftwarePlatform } from './software-platform';
export type Implementation = { 'id'?: string, 'name'?: string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'link'?: string, 'dependencies'?: string, 'implementedAlgorithm'?: Algorithm, 'requiredComputingResourceProperties'?: Array<ComputingResourceProperty>, 'softwarePlatforms'?: Array<SoftwarePlatform> };
