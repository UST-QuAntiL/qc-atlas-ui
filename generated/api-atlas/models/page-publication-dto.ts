/* tslint:disable */
import { Pageable } from './pageable';
import { PublicationDto } from './publication-dto';
import { Sort } from './sort';
export type PagePublicationDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<PublicationDto>;
  sort?: Sort;
  empty?: boolean;
};
