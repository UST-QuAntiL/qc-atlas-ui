/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AlgorithmRelationTypeDto } from '../models/algorithm-relation-type-dto';
import { EntityModelAlgorithmRelationTypeDto } from '../models/entity-model-algorithm-relation-type-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmRelationTypeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getAlgorithmRelationTypes
   */
  static readonly GetAlgorithmRelationTypesPath =
    '/v1/algorithm-relation-types';

  /**
   * Retrieve all algorithm relation types.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmRelationTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelationTypes$Response(params?: {
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
      _embedded?: {
        algoRelationTypes?: Array<EntityModelAlgorithmRelationTypeDto>;
      };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmRelationTypeService.GetAlgorithmRelationTypesPath,
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
            _embedded?: {
              algoRelationTypes?: Array<EntityModelAlgorithmRelationTypeDto>;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Retrieve all algorithm relation types.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmRelationTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelationTypes(params?: {
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
    _embedded?: {
      algoRelationTypes?: Array<EntityModelAlgorithmRelationTypeDto>;
    };
    page?: PageMetadata;
  }> {
    return this.getAlgorithmRelationTypes$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              algoRelationTypes?: Array<EntityModelAlgorithmRelationTypeDto>;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              algoRelationTypes?: Array<EntityModelAlgorithmRelationTypeDto>;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation createAlgorithmRelationType
   */
  static readonly CreateAlgorithmRelationTypePath =
    '/v1/algorithm-relation-types';

  /**
   * Define the basic properties of an algorithm relation type.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAlgorithmRelationType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgorithmRelationType$Response(params: {
    body: AlgorithmRelationTypeDto;
  }): Observable<
    StrictHttpResponse<{ id: string; name: string; _links?: Array<Link> }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmRelationTypeService.CreateAlgorithmRelationTypePath,
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
            id: string;
            name: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Define the basic properties of an algorithm relation type.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAlgorithmRelationType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgorithmRelationType(params: {
    body: AlgorithmRelationTypeDto;
  }): Observable<{ id: string; name: string; _links?: Array<Link> }> {
    return this.createAlgorithmRelationType$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            name: string;
            _links?: Array<Link>;
          }>
        ) => r.body as { id: string; name: string; _links?: Array<Link> }
      )
    );
  }

  /**
   * Path part for operation getAlgorithmRelationType
   */
  static readonly GetAlgorithmRelationTypePath =
    '/v1/algorithm-relation-types/{algorithmRelationTypeId}';

  /**
   * Retrieve a specific algorithm relation type and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmRelationType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelationType$Response(params: {
    algorithmRelationTypeId: string;
  }): Observable<
    StrictHttpResponse<{ id: string; name: string; _links?: Array<Link> }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmRelationTypeService.GetAlgorithmRelationTypePath,
      'get'
    );
    if (params) {
      rb.path('algorithmRelationTypeId', params.algorithmRelationTypeId, {});
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
            id: string;
            name: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Retrieve a specific algorithm relation type and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmRelationType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelationType(params: {
    algorithmRelationTypeId: string;
  }): Observable<{ id: string; name: string; _links?: Array<Link> }> {
    return this.getAlgorithmRelationType$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            name: string;
            _links?: Array<Link>;
          }>
        ) => r.body as { id: string; name: string; _links?: Array<Link> }
      )
    );
  }

  /**
   * Path part for operation updateAlgorithmRelationType
   */
  static readonly UpdateAlgorithmRelationTypePath =
    '/v1/algorithm-relation-types/{algorithmRelationTypeId}';

  /**
   * Update the basic properties of an algorithm relation type (e.g. name).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAlgorithmRelationType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithmRelationType$Response(params: {
    algorithmRelationTypeId: string;
    body: AlgorithmRelationTypeDto;
  }): Observable<
    StrictHttpResponse<{ id: string; name: string; _links?: Array<Link> }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmRelationTypeService.UpdateAlgorithmRelationTypePath,
      'put'
    );
    if (params) {
      rb.path('algorithmRelationTypeId', params.algorithmRelationTypeId, {});

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
            id: string;
            name: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Update the basic properties of an algorithm relation type (e.g. name).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAlgorithmRelationType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithmRelationType(params: {
    algorithmRelationTypeId: string;
    body: AlgorithmRelationTypeDto;
  }): Observable<{ id: string; name: string; _links?: Array<Link> }> {
    return this.updateAlgorithmRelationType$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            name: string;
            _links?: Array<Link>;
          }>
        ) => r.body as { id: string; name: string; _links?: Array<Link> }
      )
    );
  }

  /**
   * Path part for operation deleteAlgorithmRelationType
   */
  static readonly DeleteAlgorithmRelationTypePath =
    '/v1/algorithm-relation-types/{algorithmRelationTypeId}';

  /**
   * Delete an algorithm relation type.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAlgorithmRelationType()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithmRelationType$Response(params: {
    algorithmRelationTypeId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmRelationTypeService.DeleteAlgorithmRelationTypePath,
      'delete'
    );
    if (params) {
      rb.path('algorithmRelationTypeId', params.algorithmRelationTypeId, {});
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
   * Delete an algorithm relation type.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAlgorithmRelationType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithmRelationType(params: {
    algorithmRelationTypeId: string;
  }): Observable<void> {
    return this.deleteAlgorithmRelationType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
