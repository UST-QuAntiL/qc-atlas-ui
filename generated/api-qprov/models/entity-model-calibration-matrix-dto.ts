/* tslint:disable */
import { Links } from './links';
export type EntityModelCalibrationMatrixDto = {
  id?: string;
  calibrationTime?: string;
  calibrationMatrix?: Array<Array<number>>;
  _links?: Links;
};
