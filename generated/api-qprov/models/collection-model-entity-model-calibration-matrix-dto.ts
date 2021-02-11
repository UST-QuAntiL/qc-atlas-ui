/* tslint:disable */
import { EntityModelCalibrationMatrixDto } from './entity-model-calibration-matrix-dto';
import { Links } from './links';
export type CollectionModelEntityModelCalibrationMatrixDto = {
  _embedded?: {
    calibrationMatrixDtoes?: Array<EntityModelCalibrationMatrixDto>;
  };
  _links?: Links;
};
