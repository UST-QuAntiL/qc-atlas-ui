/* tslint:disable */
import { ImplementationPackageDto } from './implementation-package-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageImplementationPackageDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<ImplementationPackageDto>;
  sort?: Sort;
  empty?: boolean;
};
