/* tslint:disable */
export type UserEntity = {
  id?: string;
  roles?: Array<'MEMBER' | 'EXPERT' | 'AUTHOR' | 'LIBRARIAN' | 'ADMIN'>;
  email?: string;
  name?: string;
  password?: string;
};
