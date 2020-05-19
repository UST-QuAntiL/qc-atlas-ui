/* tslint:disable */
import { Links } from './links';
import { TagDto } from './tag-dto';
export interface TagListDto {
  '_links'?: Links;
  tagsDtos?: Array<TagDto>;
}
