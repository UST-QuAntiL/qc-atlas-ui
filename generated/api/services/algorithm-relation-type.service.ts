/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AlgoRelationTypeDto } from '../models/algo-relation-type-dto';
import { EntityModelAlgoRelationTypeDto } from '../models/entity-model-algo-relation-type-dto';
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
   * Path part for operation getAlgoRelationTypes
   */
  static readonly GetAlgoRelationTypesPath = '/v1/algorithm-relation-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgoRelationTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgoRelationTypes$Response(params?: {
    page?: number;
    size?: number;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { algoRelationTypes?: Array<EntityModelAlgoRelationTypeDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmRelationTypeService.GetAlgoRelationTypesPath,
      'get'
    );
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
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
              algoRelationTypes?: Array<EntityModelAlgoRelationTypeDto>;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgoRelationTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgoRelationTypes(params?: {
    page?: number;
    size?: number;
  }): Observable<{
    _embedded?: { algoRelationTypes?: Array<EntityModelAlgoRelationTypeDto> };
    page?: PageMetadata;
  }> {
    return this.getAlgoRelationTypes$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              algoRelationTypes?: Array<EntityModelAlgoRelationTypeDto>;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              algoRelationTypes?: Array<EntityModelAlgoRelationTypeDto>;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation createAlgoRelationType
   */
  static readonly CreateAlgoRelationTypePath = '/v1/algorithm-relation-types';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAlgoRelationType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgoRelationType$Response(params: {
    body: AlgoRelationTypeDto;
  }): Observable<
    StrictHttpResponse<{ id?: string; name: string; _links?: Array<Link> }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmRelationTypeService.CreateAlgoRelationTypePath,
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
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAlgoRelationType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgoRelationType(params: {
    body: AlgoRelationTypeDto;
  }): Observable<{ id?: string; name: string; _links?: Array<Link> }> {
    return this.createAlgoRelationType$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            _links?: Array<Link>;
          }>
        ) => r.body as { id?: string; name: string; _links?: Array<Link> }
      )
    );
  }

  /**
   * Path part for operation getAlgoRelationTypeById
   */
  static readonly GetAlgoRelationTypeByIdPath =
    '/v1/algorithm-relation-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgoRelationTypeById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgoRelationTypeById$Response(params: {
    id: string;
  }): Observable<
    StrictHttpResponse<{ id?: string; name: string; _links?: Array<Link> }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmRelationTypeService.GetAlgoRelationTypeByIdPath,
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
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgoRelationTypeById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgoRelationTypeById(params: {
    id: string;
  }): Observable<{ id?: string; name: string; _links?: Array<Link> }> {
    return this.getAlgoRelationTypeById$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            _links?: Array<Link>;
          }>
        ) => r.body as { id?: string; name: string; _links?: Array<Link> }
      )
    );
  }

  /**
   * Path part for operation updateAlgoRelationType
   */
  static readonly UpdateAlgoRelationTypePath =
    '/v1/algorithm-relation-types/{id}';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAlgoRelationType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgoRelationType$Response(params: {
    id: string;
    body: AlgoRelationTypeDto;
  }): Observable<
    StrictHttpResponse<{ id?: string; name: string; _links?: Array<Link> }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmRelationTypeService.UpdateAlgoRelationTypePath,
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
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAlgoRelationType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgoRelationType(params: {
    id: string;
    body: AlgoRelationTypeDto;
  }): Observable<{ id?: string; name: string; _links?: Array<Link> }> {
    return this.updateAlgoRelationType$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            _links?: Array<Link>;
          }>
        ) => r.body as { id?: string; name: string; _links?: Array<Link> }
      )
    );
  }

  /**
   * Path part for operation deleteAlgoRelationType
   */
  static readonly DeleteAlgoRelationTypePath =
    '/v1/algorithm-relation-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAlgoRelationType()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgoRelationType$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmRelationTypeService.DeleteAlgoRelationTypePath,
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
   * To access the full response (for headers, for example), `deleteAlgoRelationType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgoRelationType(params: { id: string }): Observable<void> {
    return this.deleteAlgoRelationType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
