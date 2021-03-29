/* tslint:disable */
export type ImplementationPackageDto = {
  id: string;
  name?: string;
  description?: string;
  packageType: 'FILE' | 'TOSCA' | 'FUNCTION';
};
