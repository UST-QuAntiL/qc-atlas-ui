/* tslint:disable */
import { Links } from './links';
import { QpuDto } from './qpu-dto';
export interface QpuListDto {
  '_links'?: Links;
  qpuDtoList?: Array<QpuDto>;
}
