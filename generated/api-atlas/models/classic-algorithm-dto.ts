/* tslint:disable */
import { SketchDto } from './sketch-dto';
export type ClassicAlgorithmDto = {
  id: string;
  creationDate?: string;
  lastModifiedAt?: string;
  name?: string;
  acronym?: string;
  intent?: string;
  problem?: string;
  inputFormat?: string;
  algoParameter?: string;
  outputFormat?: string;
  sketches?: Array<SketchDto>;
  solution?: string;
  assumptions?: string;
  computationModel: 'CLASSIC';
};
