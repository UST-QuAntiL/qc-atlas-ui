/* tslint:disable */
import { AlgoRelationTypeDto } from './algo-relation-type-dto';
import { AlgorithmDto } from './algorithm-dto';
import { Link } from './link';
export interface EntityModelAlgorithmRelationDto {
  '_links'?: Array<Link>;
  algoRelationType: AlgoRelationTypeDto;
  description?: string;
  id?: string;
  sourceAlgorithm: AlgorithmDto;
  targetAlgorithm: AlgorithmDto;
}
