/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { EntityModelAlgorithmDto } from '../models/entity-model-algorithm-dto';
import { EntityModelImplementationDto } from '../models/entity-model-implementation-dto';
import { EntityModelTagDto } from '../models/entity-model-tag-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';
import { TagDto } from '../models/tag-dto';

@Injectable({
  providedIn: 'root',
})
export class TagService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTags
   */
  static readonly GetTagsPath = '/v1/tags';

  /**
   * Retrieve all created tags
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTags()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags$Response(params?: {

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'tags'?: Array<EntityModelTagDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.GetTagsPath, 'get');
    if (params) {

      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_embedded'?: { 'tags'?: Array<EntityModelTagDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve all created tags
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTags$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags(params?: {

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<{ '_embedded'?: { 'tags'?: Array<EntityModelTagDto> }, 'page'?: PageMetadata }> {

    return this.getTags$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'tags'?: Array<EntityModelTagDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'tags'?: Array<EntityModelTagDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation createTag
   */
  static readonly CreateTagPath = '/v1/tags';

  /**
   * Create a new tag
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTag()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTag$Response(params: {
      body: TagDto
  }): Observable<StrictHttpResponse<{ 'category'?: string, 'value': string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.CreateTagPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'category'?: string, 'value': string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Create a new tag
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createTag$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTag(params: {
      body: TagDto
  }): Observable<{ 'category'?: string, 'value': string, '_links'?: Array<Link> }> {

    return this.createTag$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'category'?: string, 'value': string, '_links'?: Array<Link> }>) => r.body as { 'category'?: string, 'value': string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getTag
   */
  static readonly GetTagPath = '/v1/tags/{value}';

  /**
   * Retrieve a specific tag
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTag$Response(params: {
    value: string;

  }): Observable<StrictHttpResponse<{ 'category'?: string, 'value': string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.GetTagPath, 'get');
    if (params) {

      rb.path('value', params.value, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'category'?: string, 'value': string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve a specific tag
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTag$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTag(params: {
    value: string;

  }): Observable<{ 'category'?: string, 'value': string, '_links'?: Array<Link> }> {

    return this.getTag$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'category'?: string, 'value': string, '_links'?: Array<Link> }>) => r.body as { 'category'?: string, 'value': string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getAlgorithmsOfTag
   */
  static readonly GetAlgorithmsOfTagPath = '/v1/tags/{value}/algorithms';

  /**
   * Retrieve all algorithms under a specific tag
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmsOfTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmsOfTag$Response(params: {
    value: string;

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'algorithms'?: Array<EntityModelAlgorithmDto> } }>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.GetAlgorithmsOfTagPath, 'get');
    if (params) {

      rb.path('value', params.value, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_embedded'?: { 'algorithms'?: Array<EntityModelAlgorithmDto> } }>;
      })
    );
  }

  /**
   * Retrieve all algorithms under a specific tag
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmsOfTag$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmsOfTag(params: {
    value: string;

  }): Observable<{ '_embedded'?: { 'algorithms'?: Array<EntityModelAlgorithmDto> } }> {

    return this.getAlgorithmsOfTag$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'algorithms'?: Array<EntityModelAlgorithmDto> } }>) => r.body as { '_embedded'?: { 'algorithms'?: Array<EntityModelAlgorithmDto> } })
    );
  }

  /**
   * Path part for operation getImplementationsOfTag
   */
  static readonly GetImplementationsOfTagPath = '/v1/tags/{value}/implementations';

  /**
   * Retrieve all implementations under a specific tag
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationsOfTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfTag$Response(params: {
    value: string;

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'implementations'?: Array<EntityModelImplementationDto> } }>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.GetImplementationsOfTagPath, 'get');
    if (params) {

      rb.path('value', params.value, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_embedded'?: { 'implementations'?: Array<EntityModelImplementationDto> } }>;
      })
    );
  }

  /**
   * Retrieve all implementations under a specific tag
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationsOfTag$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfTag(params: {
    value: string;

  }): Observable<{ '_embedded'?: { 'implementations'?: Array<EntityModelImplementationDto> } }> {

    return this.getImplementationsOfTag$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'implementations'?: Array<EntityModelImplementationDto> } }>) => r.body as { '_embedded'?: { 'implementations'?: Array<EntityModelImplementationDto> } })
    );
  }

}
