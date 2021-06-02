/* tslint:disable */
import { LearningMethodDto } from './learning-method-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageLearningMethodDto = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: Array<LearningMethodDto>;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
};
