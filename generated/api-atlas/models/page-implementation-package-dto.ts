/* tslint:disable */
import { ImplementationPackageDto } from './implementation-package-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageImplementationPackageDto = {
  totalPages?: number;
  totalElements?: number;
  pageable?: Pageable;
  first?: boolean;
  sort?: Sort;
  number?: number;
  numberOfElements?: number;
  last?: boolean;
  size?: number;
  content?: Array<ImplementationPackageDto>;
  empty?: boolean;
};
