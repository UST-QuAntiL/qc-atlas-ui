/* tslint:disable */
import { Links } from './links';
import { ParameterListDto } from './parameter-list-dto';
export type ImplementationDto = {
  id?: string;
  name?: string;
  implementedAlgorithm?: string;
  selectionRule?: string;
  widthRule?: string;
  depthRule?: string;
  sdk?: string;
  fileLocation?: string;
  inputParameters?: ParameterListDto;
  outputParameters?: ParameterListDto;
  _links?: Links;
};
