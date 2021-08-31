/* tslint:disable */
import { ClassicImplementationDto } from './classic-implementation-dto';
import { QuantumImplementationDto } from './quantum-implementation-dto';

/**
 * Either a quantum, hybrid or a classic implementation
 */
export type ImplementationDto =
  | ClassicImplementationDto
  | QuantumImplementationDto;
