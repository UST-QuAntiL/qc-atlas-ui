/* tslint:disable */
import { Pageable } from './pageable';
import { Sort } from './sort';
import { TagDto } from './tag-dto';
export type PageTagDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<TagDto>;
  sort?: Sort;
  empty?: boolean;
};
