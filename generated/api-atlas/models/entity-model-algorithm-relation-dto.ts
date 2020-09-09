/* tslint:disable */
import { AlgorithmRelationTypeDto } from './algorithm-relation-type-dto';
import { Link } from './link';
export type EntityModelAlgorithmRelationDto = {
  id: string;
  sourceAlgorithmId: string;
  targetAlgorithmId: string;
  algoRelationType: AlgorithmRelationTypeDto;
  description?: string;
  _links?: Array<Link>;
};
