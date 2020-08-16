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
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getTags2
   */
  static readonly GetTags2Path = '/v1/tags/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTags2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags2$Response(params?: {}): Observable<
    StrictHttpResponse<{
      _embedded?: { tags?: Array<EntityModelTagDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(this.rootUrl, TagService.GetTags2Path, 'get');
    if (params) {
    }
    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/hal+json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<{
            _embedded?: { tags?: Array<EntityModelTagDto> };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTags2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags2(params?: {}): Observable<{
    _embedded?: { tags?: Array<EntityModelTagDto> };
    page?: PageMetadata;
  }> {
    return this.getTags2$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { tags?: Array<EntityModelTagDto> };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: { tags?: Array<EntityModelTagDto> };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation createTag
   */
  static readonly CreateTagPath = '/v1/tags/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTag()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTag$Response(params: {
    body: TagDto;
  }): Observable<
    StrictHttpResponse<{
      category?: string;
      value: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      TagService.CreateTagPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }
    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/hal+json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<{
            category?: string;
            value: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createTag$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTag(params: {
    body: TagDto;
  }): Observable<{ category?: string; value: string; _links?: Array<Link> }> {
    return this.createTag$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            category?: string;
            value: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as { category?: string; value: string; _links?: Array<Link> }
      )
    );
  }

  /**
   * Path part for operation getTag
   */
  static readonly GetTagPath = '/v1/tags/{tagId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTag$Response(params: {
    name: string;
  }): Observable<
    StrictHttpResponse<{
      category?: string;
      value: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(this.rootUrl, TagService.GetTagPath, 'get');
    if (params) {
      rb.path('name', params.name, {});
    }
    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/hal+json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<{
            category?: string;
            value: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTag$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTag(params: {
    name: string;
  }): Observable<{ category?: string; value: string; _links?: Array<Link> }> {
    return this.getTag$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            category?: string;
            value: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as { category?: string; value: string; _links?: Array<Link> }
      )
    );
  }

  /**
   * Path part for operation getAlgorithmsOfTag
   */
  static readonly GetAlgorithmsOfTagPath = '/v1/tags/{tagId}/algorithms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmsOfTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmsOfTag$Response(params: {
    value: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      TagService.GetAlgorithmsOfTagPath,
      'get'
    );
    if (params) {
      rb.path('value', params.value, {});
    }
    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/hal+json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<{
            _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmsOfTag$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmsOfTag(params: {
    value: string;
  }): Observable<{
    _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
  }> {
    return this.getAlgorithmsOfTag$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
          }>
        ) =>
          r.body as {
            _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
          }
      )
    );
  }

  /**
   * Path part for operation getImplementationsOfTag
   */
  static readonly GetImplementationsOfTagPath =
    '/v1/tags/{tagId}/implementations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationsOfTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfTag$Response(params: {
    value: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { implementations?: Array<EntityModelImplementationDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      TagService.GetImplementationsOfTagPath,
      'get'
    );
    if (params) {
      rb.path('value', params.value, {});
    }
    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/hal+json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<{
            _embedded?: {
              implementations?: Array<EntityModelImplementationDto>;
            };
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationsOfTag$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfTag(params: {
    value: string;
  }): Observable<{
    _embedded?: { implementations?: Array<EntityModelImplementationDto> };
  }> {
    return this.getImplementationsOfTag$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              implementations?: Array<EntityModelImplementationDto>;
            };
          }>
        ) =>
          r.body as {
            _embedded?: {
              implementations?: Array<EntityModelImplementationDto>;
            };
          }
      )
    );
  }
}
