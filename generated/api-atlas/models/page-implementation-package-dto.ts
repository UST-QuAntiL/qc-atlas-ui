/* tslint:disable */
import { ImplementationPackageDto } from './implementation-package-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageImplementationPackageDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<ImplementationPackageDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
