/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AlgorithmDto } from '../models/algorithm-dto';
import { ImplementationDto } from '../models/implementation-dto';
import { PageTagDto } from '../models/page-tag-dto';
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
  static readonly GetTagsPath = '/tags';

  /**
   * Retrieve all created tags.
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

  }): Observable<StrictHttpResponse<PageTagDto>> {

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
        return r as StrictHttpResponse<PageTagDto>;
      })
    );
  }

  /**
   * Retrieve all created tags.
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

  }): Observable<PageTagDto> {

    return this.getTags$Response(params).pipe(
      map((r: StrictHttpResponse<PageTagDto>) => r.body as PageTagDto)
    );
  }

  /**
   * Path part for operation createTag
   */
  static readonly CreateTagPath = '/tags';

  /**
   * Create a new tag with its value and category.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTag()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTag$Response(params: {
      body: TagDto
  }): Observable<StrictHttpResponse<TagDto>> {

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
        return r as StrictHttpResponse<TagDto>;
      })
    );
  }

  /**
   * Create a new tag with its value and category.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createTag$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTag(params: {
      body: TagDto
  }): Observable<TagDto> {

    return this.createTag$Response(params).pipe(
      map((r: StrictHttpResponse<TagDto>) => r.body as TagDto)
    );
  }

  /**
   * Path part for operation getTag
   */
  static readonly GetTagPath = '/tags/{value}';

  /**
   * Retrieve a specific tag.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTag$Response(params: {
    value: string;

  }): Observable<StrictHttpResponse<TagDto>> {

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
        return r as StrictHttpResponse<TagDto>;
      })
    );
  }

  /**
   * Retrieve a specific tag.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTag$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTag(params: {
    value: string;

  }): Observable<TagDto> {

    return this.getTag$Response(params).pipe(
      map((r: StrictHttpResponse<TagDto>) => r.body as TagDto)
    );
  }

  /**
   * Path part for operation getAlgorithmsOfTag
   */
  static readonly GetAlgorithmsOfTagPath = '/tags/{value}/algorithms';

  /**
   * Retrieve all algorithms under a specific tag.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmsOfTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmsOfTag$Response(params: {
    value: string;

  }): Observable<StrictHttpResponse<Array<AlgorithmDto>>> {

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
        return r as StrictHttpResponse<Array<AlgorithmDto>>;
      })
    );
  }

  /**
   * Retrieve all algorithms under a specific tag.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmsOfTag$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmsOfTag(params: {
    value: string;

  }): Observable<Array<AlgorithmDto>> {

    return this.getAlgorithmsOfTag$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AlgorithmDto>>) => r.body as Array<AlgorithmDto>)
    );
  }

  /**
   * Path part for operation getImplementationsOfTag
   */
  static readonly GetImplementationsOfTagPath = '/tags/{value}/implementations';

  /**
   * Retrieve all implementations under a specific tag.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationsOfTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfTag$Response(params: {
    value: string;

  }): Observable<StrictHttpResponse<Array<ImplementationDto>>> {

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
        return r as StrictHttpResponse<Array<ImplementationDto>>;
      })
    );
  }

  /**
   * Retrieve all implementations under a specific tag.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationsOfTag$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfTag(params: {
    value: string;

  }): Observable<Array<ImplementationDto>> {

    return this.getImplementationsOfTag$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ImplementationDto>>) => r.body as Array<ImplementationDto>)
    );
  }

}
