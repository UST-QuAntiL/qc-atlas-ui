/* tslint:disable */
import { Link } from './link';
export interface EntityModelQpuDto {
  id?: string;
  links?: Array<Link>;
  maxGateTime?: number;
  name: string;
  numberOfQubits?: number;
  t1?: number;
}
