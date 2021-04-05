/* tslint:disable */
import { AlgorithmRelationTypeDto } from './algorithm-relation-type-dto';
import { Link } from './link';
export type EntityModelAlgorithmRelationDto = { 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> };
