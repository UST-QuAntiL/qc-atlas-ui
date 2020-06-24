/* tslint:disable */
import { AlgorithmRelation } from './algorithm-relation';
import { ApplicationArea } from './application-area';
import { ComputingResource } from './computing-resource';
import { PatternRelation } from './pattern-relation';
import { ProblemType } from './problem-type';
import { Publication } from './publication';
import { QuantumImplementation } from './quantum-implementation';
import { Tag } from './tag';
export interface QuantumAlgorithm {
  acronym?: string;
  algoParameter?: string;
  algorithmRelations?: Array<AlgorithmRelation>;
  applicationAreas?: Array<ApplicationArea>;
  assumptions?: string;
  computationModel?: 'CLASSIC' | 'QUANTUM' | 'HYBRID';
  id?: string;
  implementations?: Array<QuantumImplementation>;
  inputFormat?: string;
  intent?: string;
  name?: string;
  nisqReady?: boolean;
  outputFormat?: string;
  problem?: string;
  problemTypes?: Array<ProblemType>;
  publications?: Array<Publication>;
  quantumComputationModel?: 'GATE_BASED' | 'MEASUREMENT_BASED' | 'QUANTUM_ANNEALING';
  relatedPatterns?: Array<PatternRelation>;
  requiredComputingResources?: Array<ComputingResource>;
  sketch?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL';
  solution?: string;
  speedUp?: string;
  tags?: Array<Tag>;
}
