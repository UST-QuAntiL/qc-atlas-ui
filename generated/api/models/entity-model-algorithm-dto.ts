/* tslint:disable */
import { Links } from './links';
import { ProblemTypeDto } from './problem-type-dto';
export interface EntityModelAlgorithmDto {
  '_links'?: Links;
  acronym?: string;
  algoParameter?: string;
  applicationAreas?: Array<string>;
  assumptions?: string;
  computationModel?: 'CLASSIC' | 'QUANTUM' | 'HYBRID';
  id?: string;
  inputFormat?: string;
  intent?: string;
  name?: string;
  outputFormat?: string;
  problem?: string;
  problemTypes?: Array<ProblemTypeDto>;
  sketch?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL';
  solution?: string;
}
