/* tslint:disable */
import { AlgoRelationTypeDto } from './algo-relation-type-dto';
import { AlgorithmDto } from './algorithm-dto';
import { Link } from './link';
export interface EntityModelAlgorithmRelationDto {
  algoRelationType: AlgoRelationTypeDto;
  description?: string;
  id?: string;
  links?: Array<Link>;
  sourceAlgorithm: AlgorithmDto;
  targetAlgorithm: AlgorithmDto;
}
