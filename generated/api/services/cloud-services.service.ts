/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BackendDto } from '../models/backend-dto';
import { CloudServiceDto } from '../models/cloud-service-dto';
import { Link } from '../models/link';
import { Links } from '../models/links';

@Injectable({
  providedIn: 'root',
})
export class CloudServicesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getCloudService
   */
  static readonly GetCloudServicePath = '/cloud-services/v1/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCloudService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudService$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<{ 'id': string, 'name': string, 'provider'?: string, 'url'?: string, 'costModel'?: string, 'providedBackends'?: Array<BackendDto>, '_links'?: Links, 'links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, CloudServicesService.GetCloudServicePath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'name': string, 'provider'?: string, 'url'?: string, 'costModel'?: string, 'providedBackends'?: Array<BackendDto>, '_links'?: Links, 'links'?: Array<Link> }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCloudService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudService(params: {
    id: string;

  }): Observable<{ 'id': string, 'name': string, 'provider'?: string, 'url'?: string, 'costModel'?: string, 'providedBackends'?: Array<BackendDto>, '_links'?: Links, 'links'?: Array<Link> }> {

    return this.getCloudService$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'name': string, 'provider'?: string, 'url'?: string, 'costModel'?: string, 'providedBackends'?: Array<BackendDto>, '_links'?: Links, 'links'?: Array<Link> }>) => r.body as { 'id': string, 'name': string, 'provider'?: string, 'url'?: string, 'costModel'?: string, 'providedBackends'?: Array<BackendDto>, '_links'?: Links, 'links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteCloudService
   */
  static readonly DeleteCloudServicePath = '/cloud-services/v1/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCloudService()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCloudService$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<CloudServiceDto>> {

    const rb = new RequestBuilder(this.rootUrl, CloudServicesService.DeleteCloudServicePath, 'delete');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CloudServiceDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteCloudService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCloudService(params: {
    id: string;

  }): Observable<CloudServiceDto> {

    return this.deleteCloudService$Response(params).pipe(
      map((r: StrictHttpResponse<CloudServiceDto>) => r.body as CloudServiceDto)
    );
  }

  /**
   * Path part for operation getCloudServices
   */
  static readonly GetCloudServicesPath = '/cloud-services/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCloudServices()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudServices$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, CloudServicesService.GetCloudServicesPath, 'get');
    if (params) {

      rb.query('page', params.page, {});
      rb.query('size', params.size, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{  }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCloudServices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudServices(params?: {
    page?: number;
    size?: number;

  }): Observable<{  }> {

    return this.getCloudServices$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

  /**
   * Path part for operation addCloudService
   */
  static readonly AddCloudServicePath = '/cloud-services/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCloudService()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCloudService$Response(params: {
      body: CloudServiceDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'name': string, 'provider'?: string, 'url'?: string, 'costModel'?: string, 'providedBackends'?: Array<BackendDto>, '_links'?: Links, 'links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, CloudServicesService.AddCloudServicePath, 'put');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'name': string, 'provider'?: string, 'url'?: string, 'costModel'?: string, 'providedBackends'?: Array<BackendDto>, '_links'?: Links, 'links'?: Array<Link> }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addCloudService$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCloudService(params: {
      body: CloudServiceDto
  }): Observable<{ 'id': string, 'name': string, 'provider'?: string, 'url'?: string, 'costModel'?: string, 'providedBackends'?: Array<BackendDto>, '_links'?: Links, 'links'?: Array<Link> }> {

    return this.addCloudService$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'name': string, 'provider'?: string, 'url'?: string, 'costModel'?: string, 'providedBackends'?: Array<BackendDto>, '_links'?: Links, 'links'?: Array<Link> }>) => r.body as { 'id': string, 'name': string, 'provider'?: string, 'url'?: string, 'costModel'?: string, 'providedBackends'?: Array<BackendDto>, '_links'?: Links, 'links'?: Array<Link> })
    );
  }

}
