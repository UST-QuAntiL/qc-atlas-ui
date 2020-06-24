/* tslint:disable */
import { AlgoRelationType } from './algo-relation-type';
import { Algorithm } from './algorithm';
export interface AlgorithmRelation {
  algoRelationType?: AlgoRelationType;
  description?: string;
  id?: string;
  sourceAlgorithm?: Algorithm;
  targetAlgorithm?: Algorithm;
}
