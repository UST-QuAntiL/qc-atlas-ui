/* tslint:disable */
import { Link } from './link';
export interface EntityModelQpuDto {
  '_links'?: Array<Link>;
  id?: string;
  maxGateTime?: number;
  name: string;
  numberOfQubits?: number;
  t1?: number;
}
