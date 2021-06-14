/* tslint:disable */
import { Pageable } from './pageable';
import { Sort } from './sort';
import { TagDto } from './tag-dto';
export type PageTagDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<TagDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
