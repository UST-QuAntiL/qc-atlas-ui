/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ImplementationDto } from '../models/implementation-dto';
import { ImplementationListDto } from '../models/implementation-list-dto';
import { TagListDto } from '../models/tag-list-dto';

@Injectable({
  providedIn: 'root',
})
export class ImplementationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTags1
   */
  static readonly GetTags1Path = '/algorithms/{algoId}/implementations/{implId}/tags';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTags1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags1$Response(params: {
    algoId: string;
    implId: string;

  }): Observable<StrictHttpResponse<TagListDto>> {

    const rb = new RequestBuilder(this.rootUrl, ImplementationService.GetTags1Path, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TagListDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTags1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags1(params: {
    algoId: string;
    implId: string;

  }): Observable<TagListDto> {

    return this.getTags1$Response(params).pipe(
      map((r: StrictHttpResponse<TagListDto>) => r.body as TagListDto)
    );
  }

  /**
   * Path part for operation getImplementation
   */
  static readonly GetImplementationPath = '/algorithms/{algoId}/implementations/{implId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementation$Response(params: {
    algoId: string;
    implId: string;

  }): Observable<StrictHttpResponse<ImplementationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ImplementationService.GetImplementationPath, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ImplementationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementation(params: {
    algoId: string;
    implId: string;

  }): Observable<ImplementationDto> {

    return this.getImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<ImplementationDto>) => r.body as ImplementationDto)
    );
  }

  /**
   * Path part for operation getImplementations
   */
  static readonly GetImplementationsPath = '/algorithms/{algoId}/implementations/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementations$Response(params: {
    algoId: string;

  }): Observable<StrictHttpResponse<ImplementationListDto>> {

    const rb = new RequestBuilder(this.rootUrl, ImplementationService.GetImplementationsPath, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ImplementationListDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementations(params: {
    algoId: string;

  }): Observable<ImplementationListDto> {

    return this.getImplementations$Response(params).pipe(
      map((r: StrictHttpResponse<ImplementationListDto>) => r.body as ImplementationListDto)
    );
  }

  /**
   * Path part for operation createImplementation
   */
  static readonly CreateImplementationPath = '/algorithms/{algoId}/implementations/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImplementation$Response(params: {
    algoId: string;
      body: ImplementationDto
  }): Observable<StrictHttpResponse<ImplementationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ImplementationService.CreateImplementationPath, 'post');
    if (params) {

      rb.path('algoId', params.algoId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ImplementationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImplementation(params: {
    algoId: string;
      body: ImplementationDto
  }): Observable<ImplementationDto> {

    return this.createImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<ImplementationDto>) => r.body as ImplementationDto)
    );
  }

}
