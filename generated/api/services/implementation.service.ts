/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CollectionModelEntityModelImplementationDto } from '../models/collection-model-entity-model-implementation-dto';
import { CollectionModelEntityModelTagDto } from '../models/collection-model-entity-model-tag-dto';
import { ImplementationDto } from '../models/implementation-dto';
import { Link } from '../models/link';

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
   * Path part for operation getImplementation
   */
  static readonly GetImplementationPath = '/implementations/v1/{implId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementation$Response(params: {
    implId: string;

  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, ImplementationService.GetImplementationPath, 'get');
    if (params) {

      rb.path('implId', params.implId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> }>;
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
    implId: string;

  }): Observable<{ 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> }> {

    return this.getImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getTags1
   */
  static readonly GetTags1Path = '/implementations/v1/{implId}/tags';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTags1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags1$Response(params: {
    implId: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelTagDto>> {

    const rb = new RequestBuilder(this.rootUrl, ImplementationService.GetTags1Path, 'get');
    if (params) {

      rb.path('implId', params.implId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelTagDto>;
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
    implId: string;

  }): Observable<CollectionModelEntityModelTagDto> {

    return this.getTags1$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelTagDto>) => r.body as CollectionModelEntityModelTagDto)
    );
  }

  /**
   * Path part for operation getImplementations
   */
  static readonly GetImplementationsPath = '/implementations/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementations$Response(params: {
    algoId: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelImplementationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ImplementationService.GetImplementationsPath, 'get');
    if (params) {

      rb.query('algoId', params.algoId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelImplementationDto>;
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

  }): Observable<CollectionModelEntityModelImplementationDto> {

    return this.getImplementations$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelImplementationDto>) => r.body as CollectionModelEntityModelImplementationDto)
    );
  }

  /**
   * Path part for operation updateImplementation
   */
  static readonly UpdateImplementationPath = '/implementations/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImplementation$Response(params: {
      body: ImplementationDto
  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, ImplementationService.UpdateImplementationPath, 'put');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImplementation(params: {
      body: ImplementationDto
  }): Observable<{ 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> }> {

    return this.updateImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation createImplementation
   */
  static readonly CreateImplementationPath = '/implementations/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImplementation$Response(params: {
    algoId: string;
      body: ImplementationDto
  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, ImplementationService.CreateImplementationPath, 'post');
    if (params) {

      rb.query('algoId', params.algoId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> }>;
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
  }): Observable<{ 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> }> {

    return this.createImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name': string, 'link': string, 'inputFormat'?: string, 'outputFormat'?: string, 'description'?: string, 'contributors'?: string, 'assumptions'?: string, 'parameter'?: string, 'dependencies'?: string, 'links'?: Array<Link> })
    );
  }

}
