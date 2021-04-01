/* tslint:disable */
import { ClassicAlgorithmDto } from './classic-algorithm-dto';
import { SoftwarePlatformDto } from './software-platform-dto';
export type ClassicImplementationDto = {
  id: string;
  implementedAlgorithmId?: string;
  name: string;
  inputFormat?: string;
  outputFormat?: string;
  description?: string;
  contributors?: string;
  assumptions?: string;
  parameter?: string;
  dependencies?: string;
  version?: string;
  license?: string;
  technology?: string;
  problemStatement?: string;
  softwarePlatforms?: Array<SoftwarePlatformDto>;
  algorithm?: ClassicAlgorithmDto;
};
