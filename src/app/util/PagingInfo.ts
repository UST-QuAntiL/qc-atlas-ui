import { Pageable } from 'api-atlas/models';
export interface PagingInfo {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: any[];
  number?: number;
  sort?: string[];
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
  search?: string;
}