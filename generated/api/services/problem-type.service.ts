/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { EntityModelProblemTypeDto } from '../models/entity-model-problem-type-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';
import { ProblemTypeDto } from '../models/problem-type-dto';

@Injectable({
  providedIn: 'root',
})
export class ProblemTypeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getProblemTypes
   */
  static readonly GetProblemTypesPath = '/v1/problem-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProblemTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypes$Response(params?: {
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
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProblemTypeService.GetProblemTypesPath,
      'get'
    );
    if (params) {
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
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
            _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProblemTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypes(params?: {
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
  }): Observable<{
    _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
    page?: PageMetadata;
  }> {
    return this.getProblemTypes$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation createProblemType
   */
  static readonly CreateProblemTypePath = '/v1/problem-types';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProblemType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProblemType$Response(params: {
    body: ProblemTypeDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      parentProblemType?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProblemTypeService.CreateProblemTypePath,
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
            id?: string;
            name: string;
            parentProblemType?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createProblemType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProblemType(params: {
    body: ProblemTypeDto;
  }): Observable<{
    id?: string;
    name: string;
    parentProblemType?: string;
    _links?: Array<Link>;
  }> {
    return this.createProblemType$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            parentProblemType?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            parentProblemType?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation getProblemTypeById
   */
  static readonly GetProblemTypeByIdPath = '/v1/problem-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProblemTypeById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypeById$Response(params: {
    id: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      parentProblemType?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProblemTypeService.GetProblemTypeByIdPath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
            id?: string;
            name: string;
            parentProblemType?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProblemTypeById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypeById(params: {
    id: string;
  }): Observable<{
    id?: string;
    name: string;
    parentProblemType?: string;
    _links?: Array<Link>;
  }> {
    return this.getProblemTypeById$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            parentProblemType?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            parentProblemType?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updateProblemType
   */
  static readonly UpdateProblemTypePath = '/v1/problem-types/{id}';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProblemType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProblemType$Response(params: {
    id: string;
    body: ProblemTypeDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      parentProblemType?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProblemTypeService.UpdateProblemTypePath,
      'put'
    );
    if (params) {
      rb.path('id', params.id, {});

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
            id?: string;
            name: string;
            parentProblemType?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateProblemType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProblemType(params: {
    id: string;
    body: ProblemTypeDto;
  }): Observable<{
    id?: string;
    name: string;
    parentProblemType?: string;
    _links?: Array<Link>;
  }> {
    return this.updateProblemType$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            parentProblemType?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            parentProblemType?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deleteProblemType
   */
  static readonly DeleteProblemTypePath = '/v1/problem-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProblemType()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProblemType$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProblemTypeService.DeleteProblemTypePath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
    }
    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteProblemType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProblemType(params: { id: string }): Observable<void> {
    return this.deleteProblemType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProblemTypeParentList
   */
  static readonly GetProblemTypeParentListPath =
    '/v1/problem-types/{id}/problem-type-parent-tree';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProblemTypeParentList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypeParentList$Response(params: {
    id: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProblemTypeService.GetProblemTypeParentListPath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
            _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProblemTypeParentList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypeParentList(params: {
    id: string;
  }): Observable<{
    _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
  }> {
    return this.getProblemTypeParentList$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
          }>
        ) =>
          r.body as {
            _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
          }
      )
    );
  }
}
