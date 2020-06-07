/* tslint:disable */
import { Link } from './link';
import { ProblemTypeDto } from './problem-type-dto';
import { TagDto } from './tag-dto';
export interface EntityModelAlgorithmDto {
  acronym?: string;
  algoParameter?: string;
  applicationAreas?: Array<string>;
  assumptions?: string;
  computationModel: 'CLASSIC' | 'QUANTUM' | 'HYBRID';
  id?: string;
  inputFormat?: string;
  intent?: string;
  links?: Array<Link>;
  name: string;
  outputFormat?: string;
  problem?: string;
  problemTypes?: Array<ProblemTypeDto>;
  sketch?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL';
  solution?: string;
  tags?: Array<TagDto>;
}
