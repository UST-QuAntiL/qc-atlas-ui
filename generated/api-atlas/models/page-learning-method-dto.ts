/* tslint:disable */
import { LearningMethodDto } from './learning-method-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageLearningMethodDto = {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  pageable?: Pageable;
  last?: boolean;
  numberOfElements?: number;
  first?: boolean;
  size?: number;
  content?: Array<LearningMethodDto>;
  sort?: Sort;
  empty?: boolean;
};
