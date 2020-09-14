/* tslint:disable */
import { Sketch } from './sketch';
export type ClassicAlgorithmDto = {
  id?: string;
  name: string;
  acronym?: string;
  intent?: string;
  problem?: string;
  inputFormat?: string;
  algoParameter?: string;
  outputFormat?: string;
  sketches?: Array<Sketch>;
  solution?: string;
  assumptions?: string;
  computationModel: 'CLASSIC';
};
