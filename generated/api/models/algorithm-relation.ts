/* tslint:disable */
import { AlgoRelationType } from './algo-relation-type';
import { Algorithm } from './algorithm';
export type AlgorithmRelation = {
  id?: string;
  sourceAlgorithm?: Algorithm;
  targetAlgorithm?: Algorithm;
  algoRelationType?: AlgoRelationType;
  description?: string;
};
