/* tslint:disable */
import { Pageable } from './pageable';
import { PublicationDto } from './publication-dto';
import { Sort } from './sort';
export type PagePublicationDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<PublicationDto>;
  number?: number;
  sort?: string[];
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
  search?: string;
};
