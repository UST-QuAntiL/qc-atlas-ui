/* tslint:disable */
import { AlgorithmRelation } from './algorithm-relation';
import { ApplicationArea } from './application-area';
import { ComputingResource } from './computing-resource';
import { PatternRelation } from './pattern-relation';
import { ProblemType } from './problem-type';
import { Publication } from './publication';
import { Tag } from './tag';
export interface Algorithm {
  acronym?: string;
  algoParameter?: string;
  algorithmRelations?: Array<AlgorithmRelation>;
  applicationAreas?: Array<ApplicationArea>;
  assumptions?: string;
  computationModel?: 'CLASSIC' | 'QUANTUM' | 'HYBRID';
  id?: string;
  inputFormat?: string;
  intent?: string;
  name?: string;
  outputFormat?: string;
  problem?: string;
  problemTypes?: Array<ProblemType>;
  publications?: Array<Publication>;
  relatedPatterns?: Array<PatternRelation>;
  requiredComputingResources?: Array<ComputingResource>;
  sketch?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL';
  solution?: string;
  tags?: Array<Tag>;
}
