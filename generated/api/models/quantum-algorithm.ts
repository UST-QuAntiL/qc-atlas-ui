/* tslint:disable */
import { AlgorithmRelation } from './algorithm-relation';
import { ApplicationArea } from './application-area';
import { ComputeResourceProperty } from './compute-resource-property';
import { PatternRelation } from './pattern-relation';
import { ProblemType } from './problem-type';
import { Publication } from './publication';
import { QuantumImplementation } from './quantum-implementation';
import { Sketch } from './sketch';
import { Tag } from './tag';
export type QuantumAlgorithm = {
  id?: string;
  name?: string;
  inputFormat?: string;
  outputFormat?: string;
  acronym?: string;
  publications?: Array<Publication>;
  intent?: string;
  problem?: string;
  algorithmRelations?: Array<AlgorithmRelation>;
  requiredComputeResourceProperties?: Array<ComputeResourceProperty>;
  algoParameter?: string;
  sketches?: Array<Sketch>;
  solution?: string;
  assumptions?: string;
  computationModel?: 'CLASSIC' | 'QUANTUM' | 'HYBRID';
  relatedPatterns?: Array<PatternRelation>;
  problemTypes?: Array<ProblemType>;
  applicationAreas?: Array<ApplicationArea>;
  tags?: Array<Tag>;
  nisqReady?: boolean;
  quantumComputationModel?:
    | 'GATE_BASED'
    | 'MEASUREMENT_BASED'
    | 'QUANTUM_ANNEALING';
  speedUp?: string;
  implementations?: Array<QuantumImplementation>;
};
