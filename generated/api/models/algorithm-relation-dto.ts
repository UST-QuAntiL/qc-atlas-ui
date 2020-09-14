/* tslint:disable */
import { AlgoRelationTypeDto } from './algo-relation-type-dto';
import { AlgorithmDto } from './algorithm-dto';
export type AlgorithmRelationDto = {
  id?: string;
  sourceAlgorithm: AlgorithmDto;
  targetAlgorithm: AlgorithmDto;
  algoRelationType: AlgoRelationTypeDto;
  description?: string;
};
