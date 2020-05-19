/* tslint:disable */
import { Links } from './links';
import { ProviderDto } from './provider-dto';
export interface ProviderListDto {
  '_links'?: Links;
  providerDtoList?: Array<ProviderDto>;
}
