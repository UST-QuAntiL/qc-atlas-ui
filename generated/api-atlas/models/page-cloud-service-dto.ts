/* tslint:disable */
import { CloudServiceDto } from './cloud-service-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export type PageCloudServiceDto = { 'totalPages'?: number, 'totalElements'?: number, 'pageable'?: Pageable, 'first'?: boolean, 'sort'?: Sort, 'number'?: number, 'numberOfElements'?: number, 'last'?: boolean, 'size'?: number, 'content'?: Array<CloudServiceDto>, 'empty'?: boolean };
