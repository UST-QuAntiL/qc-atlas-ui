/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Link } from '../models/link';
import { PagedModelEntityModelProviderDto } from '../models/paged-model-entity-model-provider-dto';
import { ProviderDto } from '../models/provider-dto';

@Injectable({
  providedIn: 'root',
})
export class ProviderService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getProviders
   */
  static readonly GetProvidersPath = '/providers/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProviders()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProviders$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<PagedModelEntityModelProviderDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProviderService.GetProvidersPath, 'get');
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
        return r as StrictHttpResponse<PagedModelEntityModelProviderDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProviders$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProviders(params?: {
    page?: number;
    size?: number;

  }): Observable<PagedModelEntityModelProviderDto> {

    return this.getProviders$Response(params).pipe(
      map((r: StrictHttpResponse<PagedModelEntityModelProviderDto>) => r.body as PagedModelEntityModelProviderDto)
    );
  }

  /**
   * Path part for operation createProvider
   */
  static readonly CreateProviderPath = '/providers/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProvider()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProvider$Response(params: {
      body: ProviderDto
  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name': string, 'accessKey': string, 'secretKey': string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, ProviderService.CreateProviderPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name': string, 'accessKey': string, 'secretKey': string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createProvider$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProvider(params: {
      body: ProviderDto
  }): Observable<{ 'id'?: string, 'name': string, 'accessKey': string, 'secretKey': string, '_links'?: Array<Link> }> {

    return this.createProvider$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name': string, 'accessKey': string, 'secretKey': string, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name': string, 'accessKey': string, 'secretKey': string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getProvider
   */
  static readonly GetProviderPath = '/providers/v1/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvider()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvider$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name': string, 'accessKey': string, 'secretKey': string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, ProviderService.GetProviderPath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name': string, 'accessKey': string, 'secretKey': string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvider$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvider(params: {
    id: string;

  }): Observable<{ 'id'?: string, 'name': string, 'accessKey': string, 'secretKey': string, '_links'?: Array<Link> }> {

    return this.getProvider$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name': string, 'accessKey': string, 'secretKey': string, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name': string, 'accessKey': string, 'secretKey': string, '_links'?: Array<Link> })
    );
  }

}
