/* tslint:disable */
import { AlgorithmDto } from './algorithm-dto';
import { Links } from './links';
export interface AlgorithmListDto {
  '_links'?: Links;
  algorithmDtos?: Array<AlgorithmDto>;
}
