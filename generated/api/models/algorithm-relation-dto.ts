/* tslint:disable */
import { AlgoRelationTypeDto } from './algo-relation-type-dto';
import { AlgorithmDto } from './algorithm-dto';
export interface AlgorithmRelationDto {
  algoRelationType: AlgoRelationTypeDto;
  description?: string;
  id?: string;
  sourceAlgorithm: AlgorithmDto;
  targetAlgorithm: AlgorithmDto;
}
