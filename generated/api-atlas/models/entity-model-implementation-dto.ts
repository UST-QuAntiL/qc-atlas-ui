/* tslint:disable */
import { ClassicImplementationDto } from './classic-implementation-dto';
import { Link } from './link';
import { QuantumImplementationDto } from './quantum-implementation-dto';

/**
 * Either a quantum or a classic implementation
 */
export type EntityModelImplementationDto = { _links?: Array<Link> } & (
  | ClassicImplementationDto
  | QuantumImplementationDto
);
