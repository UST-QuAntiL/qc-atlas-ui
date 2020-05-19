/* tslint:disable */
import { Links } from './links';
import { TagDto } from './tag-dto';
export interface AlgorithmDto {
  '_links'?: Links;
  id?: string;
  inputFormat?: string;
  name?: string;
  outputFormat?: string;
  tags?: Array<TagDto>;
}
