/* tslint:disable */
import { ClassicAlgorithmDto } from './classic-algorithm-dto';
export type ClassicImplementationDto = {
  id: string;
  implementedAlgorithmId?: string;
  name: string;
  link?: string;
  inputFormat?: string;
  outputFormat?: string;
  description?: string;
  contributors?: string;
  assumptions?: string;
  parameter?: string;
  dependencies?: string;
  version?: string;
  license?: string;
  problemStatement?: string;
  algorithm?: ClassicAlgorithmDto;
};
