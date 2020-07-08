/* tslint:disable */
export type ClassicAlgorithmDto = {
  id?: string;
  name: string;
  acronym?: string;
  intent?: string;
  problem?: string;
  inputFormat?: string;
  algoParameter?: string;
  outputFormat?: string;
  sketch?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL';
  solution?: string;
  assumptions?: string;
  computationModel: 'CLASSIC';
};
