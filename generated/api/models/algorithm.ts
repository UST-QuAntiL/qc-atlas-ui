/* tslint:disable */
import { AlgorithmRelation } from './algorithm-relation';
import { ApplicationArea } from './application-area';
import { ComputingResourceProperty } from './computing-resource-property';
import { PatternRelation } from './pattern-relation';
import { ProblemType } from './problem-type';
import { Publication } from './publication';
import { Tag } from './tag';
export type Algorithm = { 'id'?: string, 'name'?: string, 'inputFormat'?: string, 'outputFormat'?: string, 'acronym'?: string, 'publications'?: Array<Publication>, 'intent'?: string, 'problem'?: string, 'algorithmRelations'?: Array<AlgorithmRelation>, 'requiredComputingResourceProperties'?: Array<ComputingResourceProperty>, 'algoParameter'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel'?: 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'relatedPatterns'?: Array<PatternRelation>, 'problemTypes'?: Array<ProblemType>, 'applicationAreas'?: Array<ApplicationArea>, 'tags'?: Array<Tag> };
