import { Pageable } from 'api-atlas/models';
export interface PagingInfo<T> {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: T[];
  number?: number;
  sort?: string[];
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
  search?: string;
}
