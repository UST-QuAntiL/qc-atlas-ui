/* tslint:disable */
import { AlgoRelationTypeDto } from './algo-relation-type-dto';
import { AlgorithmDto } from './algorithm-dto';
import { Link } from './link';
export type EntityModelAlgorithmRelationDto = {
  id?: string;
  sourceAlgorithm: AlgorithmDto;
  targetAlgorithm: AlgorithmDto;
  algoRelationType: AlgoRelationTypeDto;
  description?: string;
  _links?: Array<Link>;
};
