/* tslint:disable */
export interface ConcreteSolutionDto {
  id: string;
  name?: string;
  description?: string;
  concreteSolutionType?: 'FILE';
  qubitCount?: number;
  inputParameterFormat?: string;
  hasHeader?: boolean;
  hasMeasurement?: boolean;
  startPattern?: boolean;
  endPattern?: boolean;
}

