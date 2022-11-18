/* tslint:disable */
export interface QAIAppDto {
  id: string;
  name?: string;
  importId?: string;
  toscaId?: string;
  toscaName?: string;
  toscaNamespace?: string;
  createdBy?: string;
  createdAt?: string;
  modifiedBy?: string;
  modifiedAt?: string;
  accessPermissionOfLoggedInUser?: 'VIEWER' | 'MAINTAINER' | 'OWNER';
}
