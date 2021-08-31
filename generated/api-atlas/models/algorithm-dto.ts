/* tslint:disable */
import { ClassicAlgorithmDto } from './classic-algorithm-dto';
import { QuantumAlgorithmDto } from './quantum-algorithm-dto';

/**
 * Either a quantum, hybrid or a classic algorithm
 */
export type AlgorithmDto = ClassicAlgorithmDto | QuantumAlgorithmDto;
