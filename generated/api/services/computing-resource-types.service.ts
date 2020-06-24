/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { EntityModelComputingResourceTypeDto } from '../models/entity-model-computing-resource-type-dto';
import { PagedModelEntityModelComputingResourceTypeDto } from '../models/paged-model-entity-model-computing-resource-type-dto';

@Injectable({
  providedIn: 'root',
})
export class ComputingResourceTypesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getComputingResourceType
   */
  static readonly GetComputingResourceTypePath = '/computing-resource-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputingResourceType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResourceType$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<EntityModelComputingResourceTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, ComputingResourceTypesService.GetComputingResourceTypePath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelComputingResourceTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputingResourceType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResourceType(params: {
    id: string;

  }): Observable<EntityModelComputingResourceTypeDto> {

    return this.getComputingResourceType$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelComputingResourceTypeDto>) => r.body as EntityModelComputingResourceTypeDto)
    );
  }

  /**
   * Path part for operation deleteComputingResourceType
   */
  static readonly DeleteComputingResourceTypePath = '/computing-resource-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComputingResourceType()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputingResourceType$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, ComputingResourceTypesService.DeleteComputingResourceTypePath, 'delete');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{  }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteComputingResourceType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputingResourceType(params: {
    id: string;

  }): Observable<{  }> {

    return this.deleteComputingResourceType$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

  /**
   * Path part for operation getResourceTypes
   */
  static readonly GetResourceTypesPath = '/computing-resource-types/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResourceTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourceTypes$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<PagedModelEntityModelComputingResourceTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, ComputingResourceTypesService.GetResourceTypesPath, 'get');
    if (params) {

      rb.query('page', params.page, {});
      rb.query('size', params.size, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PagedModelEntityModelComputingResourceTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getResourceTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourceTypes(params?: {
    page?: number;
    size?: number;

  }): Observable<PagedModelEntityModelComputingResourceTypeDto> {

    return this.getResourceTypes$Response(params).pipe(
      map((r: StrictHttpResponse<PagedModelEntityModelComputingResourceTypeDto>) => r.body as PagedModelEntityModelComputingResourceTypeDto)
    );
  }

}
