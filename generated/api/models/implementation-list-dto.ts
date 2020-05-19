/* tslint:disable */
import { ImplementationDto } from './implementation-dto';
import { Links } from './links';
export interface ImplementationListDto {
  '_links'?: Links;
  implementationDtos?: Array<ImplementationDto>;
}
