/* tslint:disable */
import { Sort } from 'api-atlas/models/sort';
import { Pageable } from 'api-atlas/models/pageable';
import { QAIAppDto } from './qai-app-dto';

export interface PageQAIAppDto {
  totalPages?: number;
  totalElements?: number;
  last?: boolean;
  first?: boolean;
  numberOfElements?: number;
  pageable?: Pageable;
  number?: number;
  sort?: Sort;
  size?: number;
  content?: QAIAppDto[];
  empty?: boolean;
}
