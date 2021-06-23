/* tslint:disable */
import { UserEntity } from './user-entity';
export type IssueComment = {
  id?: string;
  text?: string;
  rating?: number;
  user?: UserEntity;
};
