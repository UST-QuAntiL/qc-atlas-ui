/* tslint:disable */
import { Pageable } from './pageable';
import { Sort } from './sort';
import { TagDto } from './tag-dto';
export type PageTagDto = {
  totalPages?: number;
  totalElements?: number;
  pageable?: Pageable;
  first?: boolean;
  sort?: Sort;
  number?: number;
  numberOfElements?: number;
  last?: boolean;
  size?: number;
  content?: Array<TagDto>;
  empty?: boolean;
};
