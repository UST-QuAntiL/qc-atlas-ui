/* tslint:disable */
import { ClassicAlgorithmDto } from './classic-algorithm-dto';
import { Link } from './link';
import { QuantumAlgorithmDto } from './quantum-algorithm-dto';

/**
 * Either a quantum or a classic algorithm
 */
export type EntityModelAlgorithmDto = { _links?: Array<Link> } & (
  | ClassicAlgorithmDto
  | QuantumAlgorithmDto
);
