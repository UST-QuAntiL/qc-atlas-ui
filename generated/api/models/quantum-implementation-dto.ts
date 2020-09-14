/* tslint:disable */
import { ComputeResourcePropertyDto } from './compute-resource-property-dto';
import { QuantumAlgorithmDto } from './quantum-algorithm-dto';
import { SoftwarePlatformDto } from './software-platform-dto';
export type QuantumImplementationDto = {
  id?: string;
  name: string;
  link?: string;
  inputFormat?: string;
  outputFormat?: string;
  description?: string;
  contributors?: string;
  assumptions?: string;
  parameter?: string;
  dependencies?: string;
  algorithm?: QuantumAlgorithmDto;
  requiredQuantumResources?: Array<ComputeResourcePropertyDto>;
  usedSoftwarePlatform?: SoftwarePlatformDto;
};
