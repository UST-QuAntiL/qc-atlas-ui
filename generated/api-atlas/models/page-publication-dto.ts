/* tslint:disable */
import { Pageable } from './pageable';
import { PublicationDto } from './publication-dto';
import { Sort } from './sort';
export type PagePublicationDto = {
  totalPages?: number;
  totalElements?: number;
  pageable?: Pageable;
  first?: boolean;
  sort?: Sort;
  number?: number;
  numberOfElements?: number;
  last?: boolean;
  size?: number;
  content?: Array<PublicationDto>;
  empty?: boolean;
};
