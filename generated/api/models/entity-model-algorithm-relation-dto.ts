/* tslint:disable */
import { AlgoRelationTypeDto } from './algo-relation-type-dto';
import { AlgorithmDto } from './algorithm-dto';
import { Links } from './links';
export interface EntityModelAlgorithmRelationDto {
  '_links'?: Links;
  algoRelationType?: AlgoRelationTypeDto;
  description?: string;
  id?: string;
  sourceAlgorithm?: AlgorithmDto;
  sourceAlgorithmId?: string;
  targetAlgorithm?: AlgorithmDto;
  targetAlgorithmId?: string;
}
