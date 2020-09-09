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
import { AlgorithmRelationDto } from '../models/algorithm-relation-dto';
import { AlgorithmRelationTypeDto } from '../models/algorithm-relation-type-dto';
import { ApplicationAreaDto } from '../models/application-area-dto';
import { ClassicAlgorithmDto } from '../models/classic-algorithm-dto';
import { ClassicImplementationDto } from '../models/classic-implementation-dto';
import { ComputeResourcePropertyDto } from '../models/compute-resource-property-dto';
import { ComputeResourcePropertyTypeDto } from '../models/compute-resource-property-type-dto';
import { EntityModelAlgorithmDto } from '../models/entity-model-algorithm-dto';
import { EntityModelAlgorithmRelationDto } from '../models/entity-model-algorithm-relation-dto';
import { EntityModelApplicationAreaDto } from '../models/entity-model-application-area-dto';
import { EntityModelComputeResourcePropertyDto } from '../models/entity-model-compute-resource-property-dto';
import { EntityModelImplementationDto } from '../models/entity-model-implementation-dto';
import { EntityModelPatternRelationDto } from '../models/entity-model-pattern-relation-dto';
import { EntityModelProblemTypeDto } from '../models/entity-model-problem-type-dto';
import { EntityModelPublicationDto } from '../models/entity-model-publication-dto';
import { EntityModelSoftwarePlatformDto } from '../models/entity-model-software-platform-dto';
import { EntityModelTagDto } from '../models/entity-model-tag-dto';
import { ImplementationDto } from '../models/implementation-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';
import { PatternRelationDto } from '../models/pattern-relation-dto';
import { PatternRelationTypeDto } from '../models/pattern-relation-type-dto';
import { ProblemTypeDto } from '../models/problem-type-dto';
import { PublicationDto } from '../models/publication-dto';
import { QuantumAlgorithmDto } from '../models/quantum-algorithm-dto';
import { QuantumImplementationDto } from '../models/quantum-implementation-dto';
import { SoftwarePlatformDto } from '../models/software-platform-dto';
import { TagDto } from '../models/tag-dto';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getAlgorithms
   */
  static readonly GetAlgorithmsPath = '/v1/algorithms';

  /**
   * Retrieve all algorithms (quantum, hybrid and classic).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithms()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithms$Response(params?: {
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
      _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetAlgorithmsPath,
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
            _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Retrieve all algorithms (quantum, hybrid and classic).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithms(params?: {
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
    _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
    page?: PageMetadata;
  }> {
    return this.getAlgorithms$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation createAlgorithm
   */
  static readonly CreateAlgorithmPath = '/v1/algorithms';

  /**
   * Define the basic properties of an algorithm. References to sub-objects (e.g. a ProblemType) can be added via sub-routes (e.g. POST on /algorithms/{algorithmId}/problem-types).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgorithm$Response(params: {
    body: AlgorithmDto;
  }): Observable<
    StrictHttpResponse<
      { _links?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)
    >
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.CreateAlgorithmPath,
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
          return r as StrictHttpResponse<
            { _links?: Array<Link> } & (
              | ClassicAlgorithmDto
              | QuantumAlgorithmDto
            )
          >;
        })
      );
  }

  /**
   * Define the basic properties of an algorithm. References to sub-objects (e.g. a ProblemType) can be added via sub-routes (e.g. POST on /algorithms/{algorithmId}/problem-types).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgorithm(params: {
    body: AlgorithmDto;
  }): Observable<
    { _links?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)
  > {
    return this.createAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<
            { _links?: Array<Link> } & (
              | ClassicAlgorithmDto
              | QuantumAlgorithmDto
            )
          >
        ) =>
          r.body as { _links?: Array<Link> } & (
            | ClassicAlgorithmDto
            | QuantumAlgorithmDto
          )
      )
    );
  }

  /**
   * Path part for operation getAlgorithm
   */
  static readonly GetAlgorithmPath = '/v1/algorithms/{algorithmId}';

  /**
   * Retrieve a specific algorithm and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithm$Response(params: {
    algorithmId: string;
  }): Observable<
    StrictHttpResponse<
      { _links?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)
    >
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
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
          return r as StrictHttpResponse<
            { _links?: Array<Link> } & (
              | ClassicAlgorithmDto
              | QuantumAlgorithmDto
            )
          >;
        })
      );
  }

  /**
   * Retrieve a specific algorithm and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithm(params: {
    algorithmId: string;
  }): Observable<
    { _links?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)
  > {
    return this.getAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<
            { _links?: Array<Link> } & (
              | ClassicAlgorithmDto
              | QuantumAlgorithmDto
            )
          >
        ) =>
          r.body as { _links?: Array<Link> } & (
            | ClassicAlgorithmDto
            | QuantumAlgorithmDto
          )
      )
    );
  }

  /**
   * Path part for operation updateAlgorithm
   */
  static readonly UpdateAlgorithmPath = '/v1/algorithms/{algorithmId}';

  /**
   * Update the basic properties of an algorithm (e.g. name). References to sub-objects (e.g. a ProblemType) are not updated via this operation - use the corresponding sub-route for updating them (e.g. /problem-types).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithm$Response(params: {
    algorithmId: string;
    body: AlgorithmDto;
  }): Observable<
    StrictHttpResponse<
      { _links?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)
    >
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdateAlgorithmPath,
      'put'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});

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
          return r as StrictHttpResponse<
            { _links?: Array<Link> } & (
              | ClassicAlgorithmDto
              | QuantumAlgorithmDto
            )
          >;
        })
      );
  }

  /**
   * Update the basic properties of an algorithm (e.g. name). References to sub-objects (e.g. a ProblemType) are not updated via this operation - use the corresponding sub-route for updating them (e.g. /problem-types).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithm(params: {
    algorithmId: string;
    body: AlgorithmDto;
  }): Observable<
    { _links?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)
  > {
    return this.updateAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<
            { _links?: Array<Link> } & (
              | ClassicAlgorithmDto
              | QuantumAlgorithmDto
            )
          >
        ) =>
          r.body as { _links?: Array<Link> } & (
            | ClassicAlgorithmDto
            | QuantumAlgorithmDto
          )
      )
    );
  }

  /**
   * Path part for operation deleteAlgorithm
   */
  static readonly DeleteAlgorithmPath = '/v1/algorithms/{algorithmId}';

  /**
   * Delete an algorithm. This also deletes all entities that depend on it (e.g., the algorithm's relations to other algorithms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithm$Response(params: {
    algorithmId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteAlgorithmPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
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
   * Delete an algorithm. This also deletes all entities that depend on it (e.g., the algorithm's relations to other algorithms).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithm(params: { algorithmId: string }): Observable<void> {
    return this.deleteAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAlgorithmRelationsOfAlgorithm
   */
  static readonly GetAlgorithmRelationsOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/algorithm-relations';

  /**
   * Retrieve all relations for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmRelationsOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelationsOfAlgorithm$Response(params: {
    algorithmId: string;

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
        algorithmRelations?: Array<EntityModelAlgorithmRelationDto>;
      };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetAlgorithmRelationsOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
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
              algorithmRelations?: Array<EntityModelAlgorithmRelationDto>;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Retrieve all relations for an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmRelationsOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelationsOfAlgorithm(params: {
    algorithmId: string;

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
    _embedded?: { algorithmRelations?: Array<EntityModelAlgorithmRelationDto> };
    page?: PageMetadata;
  }> {
    return this.getAlgorithmRelationsOfAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              algorithmRelations?: Array<EntityModelAlgorithmRelationDto>;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              algorithmRelations?: Array<EntityModelAlgorithmRelationDto>;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation createAlgorithmRelation
   */
  static readonly CreateAlgorithmRelationPath =
    '/v1/algorithms/{algorithmId}/algorithm-relations';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAlgorithmRelation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgorithmRelation$Response(params: {
    algorithmId: string;
    body: AlgorithmRelationDto;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      sourceAlgorithmId: string;
      targetAlgorithmId: string;
      algoRelationType: AlgorithmRelationTypeDto;
      description?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.CreateAlgorithmRelationPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});

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
            sourceAlgorithmId: string;
            targetAlgorithmId: string;
            algoRelationType: AlgorithmRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAlgorithmRelation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgorithmRelation(params: {
    algorithmId: string;
    body: AlgorithmRelationDto;
  }): Observable<{
    id: string;
    sourceAlgorithmId: string;
    targetAlgorithmId: string;
    algoRelationType: AlgorithmRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.createAlgorithmRelation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            sourceAlgorithmId: string;
            targetAlgorithmId: string;
            algoRelationType: AlgorithmRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            sourceAlgorithmId: string;
            targetAlgorithmId: string;
            algoRelationType: AlgorithmRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation getAlgorithmRelation
   */
  static readonly GetAlgorithmRelationPath =
    '/v1/algorithms/{algorithmId}/algorithm-relations/{algorithmRelationId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelation$Response(params: {
    algorithmId: string;
    algorithmRelationId: string;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      sourceAlgorithmId: string;
      targetAlgorithmId: string;
      algoRelationType: AlgorithmRelationTypeDto;
      description?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetAlgorithmRelationPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('algorithmRelationId', params.algorithmRelationId, {});
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
            sourceAlgorithmId: string;
            targetAlgorithmId: string;
            algoRelationType: AlgorithmRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelation(params: {
    algorithmId: string;
    algorithmRelationId: string;
  }): Observable<{
    id: string;
    sourceAlgorithmId: string;
    targetAlgorithmId: string;
    algoRelationType: AlgorithmRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.getAlgorithmRelation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            sourceAlgorithmId: string;
            targetAlgorithmId: string;
            algoRelationType: AlgorithmRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            sourceAlgorithmId: string;
            targetAlgorithmId: string;
            algoRelationType: AlgorithmRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updateAlgorithmRelation
   */
  static readonly UpdateAlgorithmRelationPath =
    '/v1/algorithms/{algorithmId}/algorithm-relations/{algorithmRelationId}';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAlgorithmRelation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithmRelation$Response(params: {
    algorithmId: string;
    algorithmRelationId: string;
    body: AlgorithmRelationDto;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      sourceAlgorithmId: string;
      targetAlgorithmId: string;
      algoRelationType: AlgorithmRelationTypeDto;
      description?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdateAlgorithmRelationPath,
      'put'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('algorithmRelationId', params.algorithmRelationId, {});

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
            sourceAlgorithmId: string;
            targetAlgorithmId: string;
            algoRelationType: AlgorithmRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAlgorithmRelation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithmRelation(params: {
    algorithmId: string;
    algorithmRelationId: string;
    body: AlgorithmRelationDto;
  }): Observable<{
    id: string;
    sourceAlgorithmId: string;
    targetAlgorithmId: string;
    algoRelationType: AlgorithmRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.updateAlgorithmRelation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            sourceAlgorithmId: string;
            targetAlgorithmId: string;
            algoRelationType: AlgorithmRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            sourceAlgorithmId: string;
            targetAlgorithmId: string;
            algoRelationType: AlgorithmRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deleteAlgorithmRelation
   */
  static readonly DeleteAlgorithmRelationPath =
    '/v1/algorithms/{algorithmId}/algorithm-relations/{algorithmRelationId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAlgorithmRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithmRelation$Response(params: {
    algorithmId: string;
    algorithmRelationId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteAlgorithmRelationPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('algorithmRelationId', params.algorithmRelationId, {});
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
   * To access the full response (for headers, for example), `deleteAlgorithmRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithmRelation(params: {
    algorithmId: string;
    algorithmRelationId: string;
  }): Observable<void> {
    return this.deleteAlgorithmRelation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getApplicationAreasOfAlgorithm
   */
  static readonly GetApplicationAreasOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/application-areas';

  /**
   * Get the application areas for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationAreasOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreasOfAlgorithm$Response(params: {
    algorithmId: string;

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
      _embedded?: { applicationAreas?: Array<EntityModelApplicationAreaDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetApplicationAreasOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
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
              applicationAreas?: Array<EntityModelApplicationAreaDto>;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Get the application areas for an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplicationAreasOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreasOfAlgorithm(params: {
    algorithmId: string;

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
    _embedded?: { applicationAreas?: Array<EntityModelApplicationAreaDto> };
    page?: PageMetadata;
  }> {
    return this.getApplicationAreasOfAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              applicationAreas?: Array<EntityModelApplicationAreaDto>;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              applicationAreas?: Array<EntityModelApplicationAreaDto>;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation linkAlgorithmAndApplicationArea
   */
  static readonly LinkAlgorithmAndApplicationAreaPath =
    '/v1/algorithms/{algorithmId}/application-areas';

  /**
   * Add a reference to an existing application area (that was previously created via a POST on /application-areas). For application area only ID is required, other attributes will not change. If the applicationArea doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkAlgorithmAndApplicationArea()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndApplicationArea$Response(params: {
    algorithmId: string;
    body?: ApplicationAreaDto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.LinkAlgorithmAndApplicationAreaPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
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
   * Add a reference to an existing application area (that was previously created via a POST on /application-areas). For application area only ID is required, other attributes will not change. If the applicationArea doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkAlgorithmAndApplicationArea$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndApplicationArea(params: {
    algorithmId: string;
    body?: ApplicationAreaDto;
  }): Observable<void> {
    return this.linkAlgorithmAndApplicationArea$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getApplicationAreaOfAlgorithm
   */
  static readonly GetApplicationAreaOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/application-areas/{applicationAreaId}';

  /**
   * Get a specific application area of an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationAreaOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreaOfAlgorithm$Response(params: {
    algorithmId: string;
    applicationAreaId: string;
  }): Observable<
    StrictHttpResponse<{ id: string; name: string; _links?: Array<Link> }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetApplicationAreaOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('applicationAreaId', params.applicationAreaId, {});
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
   * Get a specific application area of an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplicationAreaOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreaOfAlgorithm(params: {
    algorithmId: string;
    applicationAreaId: string;
  }): Observable<{ id: string; name: string; _links?: Array<Link> }> {
    return this.getApplicationAreaOfAlgorithm$Response(params).pipe(
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
   * Path part for operation unlinkAlgorithmAndApplicationArea
   */
  static readonly UnlinkAlgorithmAndApplicationAreaPath =
    '/v1/algorithms/{algorithmId}/application-areas/{applicationAreaId}';

  /**
   * Delete a reference to an application area of an algorithm. The reference has to be previously created via a POST on /algorithms/{algorithmId}/problem-types/{problemTypeId}).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlinkAlgorithmAndApplicationArea()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkAlgorithmAndApplicationArea$Response(params: {
    algorithmId: string;
    applicationAreaId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UnlinkAlgorithmAndApplicationAreaPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('applicationAreaId', params.applicationAreaId, {});
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
   * Delete a reference to an application area of an algorithm. The reference has to be previously created via a POST on /algorithms/{algorithmId}/problem-types/{problemTypeId}).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unlinkAlgorithmAndApplicationArea$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkAlgorithmAndApplicationArea(params: {
    algorithmId: string;
    applicationAreaId: string;
  }): Observable<void> {
    return this.unlinkAlgorithmAndApplicationArea$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getComputeResourcePropertiesOfAlgorithm
   */
  static readonly GetComputeResourcePropertiesOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/compute-resource-properties';

  /**
   * Retrieve the required compute resource properties of an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputeResourcePropertiesOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcePropertiesOfAlgorithm$Response(params: {
    algorithmId: string;

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
        computeResourceProperties?: Array<
          EntityModelComputeResourcePropertyDto
        >;
      };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetComputeResourcePropertiesOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
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
              computeResourceProperties?: Array<
                EntityModelComputeResourcePropertyDto
              >;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Retrieve the required compute resource properties of an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputeResourcePropertiesOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcePropertiesOfAlgorithm(params: {
    algorithmId: string;

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
      computeResourceProperties?: Array<EntityModelComputeResourcePropertyDto>;
    };
    page?: PageMetadata;
  }> {
    return this.getComputeResourcePropertiesOfAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              computeResourceProperties?: Array<
                EntityModelComputeResourcePropertyDto
              >;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              computeResourceProperties?: Array<
                EntityModelComputeResourcePropertyDto
              >;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation createComputeResourcePropertyForAlgorithm
   */
  static readonly CreateComputeResourcePropertyForAlgorithmPath =
    '/v1/algorithms/{algorithmId}/compute-resource-properties';

  /**
   * Add a compute resource property (e.g. a certain number of qubits) that is required by an algorithm. For compute resource property type only ID is required, other compute resource property type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createComputeResourcePropertyForAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputeResourcePropertyForAlgorithm$Response(params: {
    algorithmId: string;
    body: ComputeResourcePropertyDto;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      value?: string;
      type: ComputeResourcePropertyTypeDto;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.CreateComputeResourcePropertyForAlgorithmPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});

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
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Add a compute resource property (e.g. a certain number of qubits) that is required by an algorithm. For compute resource property type only ID is required, other compute resource property type attributes will not change.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createComputeResourcePropertyForAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputeResourcePropertyForAlgorithm(params: {
    algorithmId: string;
    body: ComputeResourcePropertyDto;
  }): Observable<{
    id: string;
    value?: string;
    type: ComputeResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.createComputeResourcePropertyForAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation getComputeResourcePropertyOfAlgorithm
   */
  static readonly GetComputeResourcePropertyOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Retrieve a specific compute resource property of an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputeResourcePropertyOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcePropertyOfAlgorithm$Response(params: {
    algorithmId: string;
    computeResourcePropertyId: string;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      value?: string;
      type: ComputeResourcePropertyTypeDto;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetComputeResourcePropertyOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path(
        'computeResourcePropertyId',
        params.computeResourcePropertyId,
        {}
      );
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
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Retrieve a specific compute resource property of an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputeResourcePropertyOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcePropertyOfAlgorithm(params: {
    algorithmId: string;
    computeResourcePropertyId: string;
  }): Observable<{
    id: string;
    value?: string;
    type: ComputeResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.getComputeResourcePropertyOfAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updateComputeResourcePropertyOfAlgorithm
   */
  static readonly UpdateComputeResourcePropertyOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Update a Compute resource property of an algorithm. For compute resource property type only ID is required, other compute resource property type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComputeResourcePropertyOfAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputeResourcePropertyOfAlgorithm$Response(params: {
    algorithmId: string;
    computeResourcePropertyId: string;
    body: ComputeResourcePropertyDto;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      value?: string;
      type: ComputeResourcePropertyTypeDto;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdateComputeResourcePropertyOfAlgorithmPath,
      'put'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path(
        'computeResourcePropertyId',
        params.computeResourcePropertyId,
        {}
      );

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
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Update a Compute resource property of an algorithm. For compute resource property type only ID is required, other compute resource property type attributes will not change.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateComputeResourcePropertyOfAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputeResourcePropertyOfAlgorithm(params: {
    algorithmId: string;
    computeResourcePropertyId: string;
    body: ComputeResourcePropertyDto;
  }): Observable<{
    id: string;
    value?: string;
    type: ComputeResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.updateComputeResourcePropertyOfAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deleteComputeResourcePropertyOfAlgorithm
   */
  static readonly DeleteComputeResourcePropertyOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Delete a Compute resource property of an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComputeResourcePropertyOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputeResourcePropertyOfAlgorithm$Response(params: {
    algorithmId: string;
    computeResourcePropertyId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteComputeResourcePropertyOfAlgorithmPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path(
        'computeResourcePropertyId',
        params.computeResourcePropertyId,
        {}
      );
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
   * Delete a Compute resource property of an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteComputeResourcePropertyOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputeResourcePropertyOfAlgorithm(params: {
    algorithmId: string;
    computeResourcePropertyId: string;
  }): Observable<void> {
    return this.deleteComputeResourcePropertyOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getImplementationsOfAlgorithm
   */
  static readonly GetImplementationsOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/implementations';

  /**
   * Retrieve all implementations for an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationsOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfAlgorithm$Response(params: {
    algorithmId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { implementations?: Array<EntityModelImplementationDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetImplementationsOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
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
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Retrieve all implementations for an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationsOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfAlgorithm(params: {
    algorithmId: string;
  }): Observable<{
    _embedded?: { implementations?: Array<EntityModelImplementationDto> };
    page?: PageMetadata;
  }> {
    return this.getImplementationsOfAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              implementations?: Array<EntityModelImplementationDto>;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              implementations?: Array<EntityModelImplementationDto>;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation createImplementation
   */
  static readonly CreateImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations';

  /**
   * Create a new implementation for the algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImplementation$Response(params: {
    algorithmId: string;
    body: ImplementationDto;
  }): Observable<
    StrictHttpResponse<
      { _links?: Array<Link> } & (
        | ClassicImplementationDto
        | QuantumImplementationDto
      )
    >
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.CreateImplementationPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});

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
          return r as StrictHttpResponse<
            { _links?: Array<Link> } & (
              | ClassicImplementationDto
              | QuantumImplementationDto
            )
          >;
        })
      );
  }

  /**
   * Create a new implementation for the algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImplementation(params: {
    algorithmId: string;
    body: ImplementationDto;
  }): Observable<
    { _links?: Array<Link> } & (
      | ClassicImplementationDto
      | QuantumImplementationDto
    )
  > {
    return this.createImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<
            { _links?: Array<Link> } & (
              | ClassicImplementationDto
              | QuantumImplementationDto
            )
          >
        ) =>
          r.body as { _links?: Array<Link> } & (
            | ClassicImplementationDto
            | QuantumImplementationDto
          )
      )
    );
  }

  /**
   * Path part for operation getImplementation
   */
  static readonly GetImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}';

  /**
   * Retrieve a specific implementation of the algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
  }): Observable<
    StrictHttpResponse<
      { _links?: Array<Link> } & (
        | ClassicImplementationDto
        | QuantumImplementationDto
      )
    >
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
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
          return r as StrictHttpResponse<
            { _links?: Array<Link> } & (
              | ClassicImplementationDto
              | QuantumImplementationDto
            )
          >;
        })
      );
  }

  /**
   * Retrieve a specific implementation of the algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementation(params: {
    algorithmId: string;
    implementationId: string;
  }): Observable<
    { _links?: Array<Link> } & (
      | ClassicImplementationDto
      | QuantumImplementationDto
    )
  > {
    return this.getImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<
            { _links?: Array<Link> } & (
              | ClassicImplementationDto
              | QuantumImplementationDto
            )
          >
        ) =>
          r.body as { _links?: Array<Link> } & (
            | ClassicImplementationDto
            | QuantumImplementationDto
          )
      )
    );
  }

  /**
   * Path part for operation updateImplementation
   */
  static readonly UpdateImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    body: ImplementationDto;
  }): Observable<
    StrictHttpResponse<
      { _links?: Array<Link> } & (
        | ClassicImplementationDto
        | QuantumImplementationDto
      )
    >
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdateImplementationPath,
      'put'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

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
          return r as StrictHttpResponse<
            { _links?: Array<Link> } & (
              | ClassicImplementationDto
              | QuantumImplementationDto
            )
          >;
        })
      );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImplementation(params: {
    algorithmId: string;
    implementationId: string;
    body: ImplementationDto;
  }): Observable<
    { _links?: Array<Link> } & (
      | ClassicImplementationDto
      | QuantumImplementationDto
    )
  > {
    return this.updateImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<
            { _links?: Array<Link> } & (
              | ClassicImplementationDto
              | QuantumImplementationDto
            )
          >
        ) =>
          r.body as { _links?: Array<Link> } & (
            | ClassicImplementationDto
            | QuantumImplementationDto
          )
      )
    );
  }

  /**
   * Path part for operation deleteImplementation
   */
  static readonly DeleteImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteImplementationPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
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
   * To access the full response (for headers, for example), `deleteImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImplementation(params: {
    algorithmId: string;
    implementationId: string;
  }): Observable<void> {
    return this.deleteImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getComputeResourcePropertiesOfImplementation
   */
  static readonly GetComputeResourcePropertiesOfImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties';

  /**
   * Retrieve the required computing resources of an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputeResourcePropertiesOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcePropertiesOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;

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
        computeResourceProperties?: Array<
          EntityModelComputeResourcePropertyDto
        >;
      };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetComputeResourcePropertiesOfImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
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
              computeResourceProperties?: Array<
                EntityModelComputeResourcePropertyDto
              >;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Retrieve the required computing resources of an implementation
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputeResourcePropertiesOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcePropertiesOfImplementation(params: {
    algorithmId: string;
    implementationId: string;

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
      computeResourceProperties?: Array<EntityModelComputeResourcePropertyDto>;
    };
    page?: PageMetadata;
  }> {
    return this.getComputeResourcePropertiesOfImplementation$Response(
      params
    ).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              computeResourceProperties?: Array<
                EntityModelComputeResourcePropertyDto
              >;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              computeResourceProperties?: Array<
                EntityModelComputeResourcePropertyDto
              >;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation createComputeResourcePropertyForImplementation
   */
  static readonly CreateComputeResourcePropertyForImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties';

  /**
   * Add a computing resource (e.g. a certain number of qubits) that is required by an implementation. Custom ID will be ignored. For computing resource type only ID is required, other computing resource type attributes will not change
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createComputeResourcePropertyForImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputeResourcePropertyForImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    body: ComputeResourcePropertyDto;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      value?: string;
      type: ComputeResourcePropertyTypeDto;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.CreateComputeResourcePropertyForImplementationPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

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
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Add a computing resource (e.g. a certain number of qubits) that is required by an implementation. Custom ID will be ignored. For computing resource type only ID is required, other computing resource type attributes will not change
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createComputeResourcePropertyForImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputeResourcePropertyForImplementation(params: {
    algorithmId: string;
    implementationId: string;
    body: ComputeResourcePropertyDto;
  }): Observable<{
    id: string;
    value?: string;
    type: ComputeResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.createComputeResourcePropertyForImplementation$Response(
      params
    ).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation getComputeResourcePropertyOfImplementation
   */
  static readonly GetComputeResourcePropertyOfImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Retrieve a specific compute resource property of an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputeResourcePropertyOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcePropertyOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    computeResourcePropertyId: string;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      value?: string;
      type: ComputeResourcePropertyTypeDto;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetComputeResourcePropertyOfImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path(
        'computeResourcePropertyId',
        params.computeResourcePropertyId,
        {}
      );
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
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Retrieve a specific compute resource property of an implementation
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputeResourcePropertyOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcePropertyOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    computeResourcePropertyId: string;
  }): Observable<{
    id: string;
    value?: string;
    type: ComputeResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.getComputeResourcePropertyOfImplementation$Response(
      params
    ).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updateComputeResourcePropertyOfImplementation
   */
  static readonly UpdateComputeResourcePropertyOfImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Update a Compute resource property of an implementation. For compute resource property type only ID is required, other compute resource property type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComputeResourcePropertyOfImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputeResourcePropertyOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    computeResourcePropertyId: string;
    body: ComputeResourcePropertyDto;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      value?: string;
      type: ComputeResourcePropertyTypeDto;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdateComputeResourcePropertyOfImplementationPath,
      'put'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path(
        'computeResourcePropertyId',
        params.computeResourcePropertyId,
        {}
      );

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
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Update a Compute resource property of an implementation. For compute resource property type only ID is required, other compute resource property type attributes will not change.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateComputeResourcePropertyOfImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputeResourcePropertyOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    computeResourcePropertyId: string;
    body: ComputeResourcePropertyDto;
  }): Observable<{
    id: string;
    value?: string;
    type: ComputeResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.updateComputeResourcePropertyOfImplementation$Response(
      params
    ).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deleteComputeResourcePropertyOfImplementation
   */
  static readonly DeleteComputeResourcePropertyOfImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Delete a Compute resource property of an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComputeResourcePropertyOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputeResourcePropertyOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    computeResourcePropertyId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteComputeResourcePropertyOfImplementationPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path(
        'computeResourcePropertyId',
        params.computeResourcePropertyId,
        {}
      );
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
   * Delete a Compute resource property of an implementation
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteComputeResourcePropertyOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputeResourcePropertyOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    computeResourcePropertyId: string;
  }): Observable<void> {
    return this.deleteComputeResourcePropertyOfImplementation$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation getPublicationsOfImplementation
   */
  static readonly GetPublicationsOfImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/publications';

  /**
   * Get referenced publications for an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublicationsOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationsOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;

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
      _embedded?: { publications?: Array<EntityModelPublicationDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetPublicationsOfImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
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
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Get referenced publications for an implementation
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublicationsOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationsOfImplementation(params: {
    algorithmId: string;
    implementationId: string;

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
    _embedded?: { publications?: Array<EntityModelPublicationDto> };
    page?: PageMetadata;
  }> {
    return this.getPublicationsOfImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation linkImplementationAndPublication
   */
  static readonly LinkImplementationAndPublicationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/publications';

  /**
   * Add a reference to an existing publication (that was previously created via a POST on /publications/). Custom ID will be ignored. For publication only ID is required, other publication attributes will not change. If the publication doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkImplementationAndPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkImplementationAndPublication$Response(params: {
    algorithmId: string;
    implementationId: string;
    body: PublicationDto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.LinkImplementationAndPublicationPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

      rb.body(params.body, 'application/json');
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
   * Add a reference to an existing publication (that was previously created via a POST on /publications/). Custom ID will be ignored. For publication only ID is required, other publication attributes will not change. If the publication doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkImplementationAndPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkImplementationAndPublication(params: {
    algorithmId: string;
    implementationId: string;
    body: PublicationDto;
  }): Observable<void> {
    return this.linkImplementationAndPublication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPublicationOfImplementation
   */
  static readonly GetPublicationOfImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/publications/{publicationId}';

  /**
   * Retrieve a publication of an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublicationOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    publicationId: string;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      title: string;
      doi?: string;
      url?: string;
      authors: Array<string>;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetPublicationOfImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('publicationId', params.publicationId, {});
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
            title: string;
            doi?: string;
            url?: string;
            authors: Array<string>;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Retrieve a publication of an implementation
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublicationOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    publicationId: string;
  }): Observable<{
    id: string;
    title: string;
    doi?: string;
    url?: string;
    authors: Array<string>;
    _links?: Array<Link>;
  }> {
    return this.getPublicationOfImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            title: string;
            doi?: string;
            url?: string;
            authors: Array<string>;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            title: string;
            doi?: string;
            url?: string;
            authors: Array<string>;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation unlinkImplementationAndPublication
   */
  static readonly UnlinkImplementationAndPublicationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/publications/{publicationId}';

  /**
   * Delete a reference to a publication of the implementation.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlinkImplementationAndPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkImplementationAndPublication$Response(params: {
    algorithmId: string;
    implementationId: string;
    publicationId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UnlinkImplementationAndPublicationPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('publicationId', params.publicationId, {});
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
   * Delete a reference to a publication of the implementation.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unlinkImplementationAndPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkImplementationAndPublication(params: {
    algorithmId: string;
    implementationId: string;
    publicationId: string;
  }): Observable<void> {
    return this.unlinkImplementationAndPublication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getSoftwarePlatformsOfImplementation
   */
  static readonly GetSoftwarePlatformsOfImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/software-platforms';

  /**
   * Get referenced software platform for an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatformsOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformsOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;

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
      _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetSoftwarePlatformsOfImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
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
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
          }>;
        })
      );
  }

  /**
   * Get referenced software platform for an implementation
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoftwarePlatformsOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformsOfImplementation(params: {
    algorithmId: string;
    implementationId: string;

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
    _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
  }> {
    return this.getSoftwarePlatformsOfImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
          }>
        ) =>
          r.body as {
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
          }
      )
    );
  }

  /**
   * Path part for operation linkImplementationAndSoftwarePlatform
   */
  static readonly LinkImplementationAndSoftwarePlatformPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/software-platforms';

  /**
   * Add a reference to an existing software platform(that was previously created via a POST on /software-platforms/).Custom ID will be ignored. For software platform only ID is required,other software platform attributes will not change.If the software platform doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkImplementationAndSoftwarePlatform()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkImplementationAndSoftwarePlatform$Response(params: {
    algorithmId: string;
    implementationId: string;
    body?: SoftwarePlatformDto;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.LinkImplementationAndSoftwarePlatformPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

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
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
          }>;
        })
      );
  }

  /**
   * Add a reference to an existing software platform(that was previously created via a POST on /software-platforms/).Custom ID will be ignored. For software platform only ID is required,other software platform attributes will not change.If the software platform doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkImplementationAndSoftwarePlatform$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkImplementationAndSoftwarePlatform(params: {
    algorithmId: string;
    implementationId: string;
    body?: SoftwarePlatformDto;
  }): Observable<{
    _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
  }> {
    return this.linkImplementationAndSoftwarePlatform$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
          }>
        ) =>
          r.body as {
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
          }
      )
    );
  }

  /**
   * Path part for operation getSoftwarePlatformOfImplementation
   */
  static readonly GetSoftwarePlatformOfImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/software-platforms/{softwarePlatformId}';

  /**
   * Retrieve a specific software platform and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatformOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    softwarePlatformId: string;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      name: string;
      link?: string;
      licence?: string;
      version?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetSoftwarePlatformOfImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('softwarePlatformId', params.softwarePlatformId, {});
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
            link?: string;
            licence?: string;
            version?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Retrieve a specific software platform and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoftwarePlatformOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    softwarePlatformId: string;
  }): Observable<{
    id: string;
    name: string;
    link?: string;
    licence?: string;
    version?: string;
    _links?: Array<Link>;
  }> {
    return this.getSoftwarePlatformOfImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            name: string;
            link?: string;
            licence?: string;
            version?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            name: string;
            link?: string;
            licence?: string;
            version?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation unlinkImplementationAndSoftwarePlatform
   */
  static readonly UnlinkImplementationAndSoftwarePlatformPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/software-platforms/{softwarePlatformId}';

  /**
   * Delete a reference to a software platform of the implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlinkImplementationAndSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkImplementationAndSoftwarePlatform$Response(params: {
    algorithmId: string;
    implementationId: string;
    softwarePlatformId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UnlinkImplementationAndSoftwarePlatformPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('softwarePlatformId', params.softwarePlatformId, {});
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
   * Delete a reference to a software platform of the implementation
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unlinkImplementationAndSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkImplementationAndSoftwarePlatform(params: {
    algorithmId: string;
    implementationId: string;
    softwarePlatformId: string;
  }): Observable<void> {
    return this.unlinkImplementationAndSoftwarePlatform$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getTagsOfImplementation
   */
  static readonly GetTagsOfImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/tags';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTagsOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTagsOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
  }): Observable<
    StrictHttpResponse<{ _embedded?: { tags?: Array<EntityModelTagDto> } }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetTagsOfImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
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
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTagsOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTagsOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
  }): Observable<{ _embedded?: { tags?: Array<EntityModelTagDto> } }> {
    return this.getTagsOfImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { tags?: Array<EntityModelTagDto> };
          }>
        ) => r.body as { _embedded?: { tags?: Array<EntityModelTagDto> } }
      )
    );
  }

  /**
   * Path part for operation addTagToImplementation
   */
  static readonly AddTagToImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/tags';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addTagToImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTagToImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    body: TagDto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.AddTagToImplementationPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

      rb.body(params.body, 'application/json');
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
   * To access the full response (for headers, for example), `addTagToImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTagToImplementation(params: {
    algorithmId: string;
    implementationId: string;
    body: TagDto;
  }): Observable<void> {
    return this.addTagToImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeTagFromImplementation
   */
  static readonly RemoveTagFromImplementationPath =
    '/v1/algorithms/{algorithmId}/implementations/{implementationId}/tags';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeTagFromImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  removeTagFromImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    body: TagDto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.RemoveTagFromImplementationPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

      rb.body(params.body, 'application/json');
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
   * To access the full response (for headers, for example), `removeTagFromImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  removeTagFromImplementation(params: {
    algorithmId: string;
    implementationId: string;
    body: TagDto;
  }): Observable<void> {
    return this.removeTagFromImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPatternRelationsOfAlgorithm
   */
  static readonly GetPatternRelationsOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/pattern-relations';

  /**
   * Retrieve pattern relations for an algorithms.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelationsOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationsOfAlgorithm$Response(params: {
    algorithmId: string;

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
      _embedded?: { patternRelations?: Array<EntityModelPatternRelationDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetPatternRelationsOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
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
              patternRelations?: Array<EntityModelPatternRelationDto>;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Retrieve pattern relations for an algorithms.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternRelationsOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationsOfAlgorithm(params: {
    algorithmId: string;

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
    _embedded?: { patternRelations?: Array<EntityModelPatternRelationDto> };
    page?: PageMetadata;
  }> {
    return this.getPatternRelationsOfAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              patternRelations?: Array<EntityModelPatternRelationDto>;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              patternRelations?: Array<EntityModelPatternRelationDto>;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation createPatternRelationForAlgorithm
   */
  static readonly CreatePatternRelationForAlgorithmPath =
    '/v1/algorithms/{algorithmId}/pattern-relations';

  /**
   * Add a pattern relation from an algorithm to a given pattern.Custom ID will be ignored. For pattern relation type only ID is required,other pattern relation type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPatternRelationForAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelationForAlgorithm$Response(params: {
    algorithmId: string;
    body: PatternRelationDto;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      algorithmId: string;
      pattern: string;
      patternRelationType: PatternRelationTypeDto;
      description?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.CreatePatternRelationForAlgorithmPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});

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
            algorithmId: string;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Add a pattern relation from an algorithm to a given pattern.Custom ID will be ignored. For pattern relation type only ID is required,other pattern relation type attributes will not change.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPatternRelationForAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelationForAlgorithm(params: {
    algorithmId: string;
    body: PatternRelationDto;
  }): Observable<{
    id: string;
    algorithmId: string;
    pattern: string;
    patternRelationType: PatternRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.createPatternRelationForAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            algorithmId: string;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            algorithmId: string;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation getPatternRelationOfAlgorithm
   */
  static readonly GetPatternRelationOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/pattern-relations/{patternRelationId}';

  /**
   * Retrieve a specific pattern relation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelationOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationOfAlgorithm$Response(params: {
    algorithmId: string;
    patternRelationId: string;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      algorithmId: string;
      pattern: string;
      patternRelationType: PatternRelationTypeDto;
      description?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetPatternRelationOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('patternRelationId', params.patternRelationId, {});
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
            algorithmId: string;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Retrieve a specific pattern relation
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternRelationOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationOfAlgorithm(params: {
    algorithmId: string;
    patternRelationId: string;
  }): Observable<{
    id: string;
    algorithmId: string;
    pattern: string;
    patternRelationType: PatternRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.getPatternRelationOfAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            algorithmId: string;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            algorithmId: string;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updatePatternRelationOfAlgorithm
   */
  static readonly UpdatePatternRelationOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/pattern-relations/{patternRelationId}';

  /**
   * Update a reference to a pattern. Custom ID will be ignored. For pattern relation type only ID is required, other pattern relation type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatternRelationOfAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelationOfAlgorithm$Response(params: {
    algorithmId: string;
    patternRelationId: string;
    body: PatternRelationDto;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      algorithmId: string;
      pattern: string;
      patternRelationType: PatternRelationTypeDto;
      description?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdatePatternRelationOfAlgorithmPath,
      'put'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('patternRelationId', params.patternRelationId, {});

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
            algorithmId: string;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Update a reference to a pattern. Custom ID will be ignored. For pattern relation type only ID is required, other pattern relation type attributes will not change.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePatternRelationOfAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelationOfAlgorithm(params: {
    algorithmId: string;
    patternRelationId: string;
    body: PatternRelationDto;
  }): Observable<{
    id: string;
    algorithmId: string;
    pattern: string;
    patternRelationType: PatternRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.updatePatternRelationOfAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            algorithmId: string;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            algorithmId: string;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deletePatternRelationOfAlgorithm
   */
  static readonly DeletePatternRelationOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/pattern-relations/{patternRelationId}';

  /**
   * Delete a pattern relation of an specific algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePatternRelationOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelationOfAlgorithm$Response(params: {
    algorithmId: string;
    patternRelationId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeletePatternRelationOfAlgorithmPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('patternRelationId', params.patternRelationId, {});
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
   * Delete a pattern relation of an specific algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deletePatternRelationOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelationOfAlgorithm(params: {
    algorithmId: string;
    patternRelationId: string;
  }): Observable<void> {
    return this.deletePatternRelationOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProblemTypesOfAlgorithm
   */
  static readonly GetProblemTypesOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/problem-types';

  /**
   * Get the problem types for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProblemTypesOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypesOfAlgorithm$Response(params: {
    algorithmId: string;

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
      AlgorithmService.GetProblemTypesOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
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
   * Get the problem types for an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProblemTypesOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypesOfAlgorithm(params: {
    algorithmId: string;

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
    return this.getProblemTypesOfAlgorithm$Response(params).pipe(
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
   * Path part for operation linkAlgorithmAndProblemType
   */
  static readonly LinkAlgorithmAndProblemTypePath =
    '/v1/algorithms/{algorithmId}/problem-types';

  /**
   * Add a reference to an existing ProblemType (that was previously created via a POST on /problem-types). For problem type only ID is required, other problem type attributes will not change. If the ProblemType doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkAlgorithmAndProblemType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndProblemType$Response(params: {
    algorithmId: string;
    body: ProblemTypeDto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.LinkAlgorithmAndProblemTypePath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
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
   * Add a reference to an existing ProblemType (that was previously created via a POST on /problem-types). For problem type only ID is required, other problem type attributes will not change. If the ProblemType doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkAlgorithmAndProblemType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndProblemType(params: {
    algorithmId: string;
    body: ProblemTypeDto;
  }): Observable<void> {
    return this.linkAlgorithmAndProblemType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProblemType
   */
  static readonly GetProblemTypePath =
    '/v1/algorithms/{algorithmId}/problem-types/{problemTypeId}';

  /**
   * Retrieve a specific problem type of an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProblemType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemType$Response(params: {
    algorithmId: string;
    problemTypeId: string;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      name: string;
      parentProblemType?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetProblemTypePath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('problemTypeId', params.problemTypeId, {});
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
            parentProblemType?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Retrieve a specific problem type of an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProblemType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemType(params: {
    algorithmId: string;
    problemTypeId: string;
  }): Observable<{
    id: string;
    name: string;
    parentProblemType?: string;
    _links?: Array<Link>;
  }> {
    return this.getProblemType$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            name: string;
            parentProblemType?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            name: string;
            parentProblemType?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation unlinkAlgorithmAndProblemType
   */
  static readonly UnlinkAlgorithmAndProblemTypePath =
    '/v1/algorithms/{algorithmId}/problem-types/{problemTypeId}';

  /**
   * Delete a reference to a problem types of an algorithm. The reference has to be previously created via a POST on /algorithms/{algorithmId}/problem-types/{problemTypeId}).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlinkAlgorithmAndProblemType()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkAlgorithmAndProblemType$Response(params: {
    algorithmId: string;
    problemTypeId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UnlinkAlgorithmAndProblemTypePath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('problemTypeId', params.problemTypeId, {});
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
   * Delete a reference to a problem types of an algorithm. The reference has to be previously created via a POST on /algorithms/{algorithmId}/problem-types/{problemTypeId}).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unlinkAlgorithmAndProblemType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkAlgorithmAndProblemType(params: {
    algorithmId: string;
    problemTypeId: string;
  }): Observable<void> {
    return this.unlinkAlgorithmAndProblemType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPublicationsOfAlgorithm
   */
  static readonly GetPublicationsOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/publications';

  /**
   * Get referenced publications for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublicationsOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationsOfAlgorithm$Response(params: {
    algorithmId: string;

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
      _embedded?: { publications?: Array<EntityModelPublicationDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetPublicationsOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
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
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Get referenced publications for an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublicationsOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationsOfAlgorithm(params: {
    algorithmId: string;

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
    _embedded?: { publications?: Array<EntityModelPublicationDto> };
    page?: PageMetadata;
  }> {
    return this.getPublicationsOfAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation linkAlgorithmAndPublication
   */
  static readonly LinkAlgorithmAndPublicationPath =
    '/v1/algorithms/{algorithmId}/publications';

  /**
   * Add a reference to an existing publication (that was previously created via a POST on /publications). For publication only ID is required, other publication attributes will not change. If the publication doesn't exist yet, a 404 error is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkAlgorithmAndPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndPublication$Response(params: {
    algorithmId: string;
    body: PublicationDto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.LinkAlgorithmAndPublicationPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
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
   * Add a reference to an existing publication (that was previously created via a POST on /publications). For publication only ID is required, other publication attributes will not change. If the publication doesn't exist yet, a 404 error is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkAlgorithmAndPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndPublication(params: {
    algorithmId: string;
    body: PublicationDto;
  }): Observable<void> {
    return this.linkAlgorithmAndPublication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPublicationOfAlgorithm
   */
  static readonly GetPublicationOfAlgorithmPath =
    '/v1/algorithms/{algorithmId}/publications/{publicationId}';

  /**
   * Retrieve a publication of an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublicationOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationOfAlgorithm$Response(params: {
    algorithmId: string;
    publicationId: string;
  }): Observable<
    StrictHttpResponse<{
      id: string;
      title: string;
      doi?: string;
      url?: string;
      authors: Array<string>;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetPublicationOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('publicationId', params.publicationId, {});
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
            title: string;
            doi?: string;
            url?: string;
            authors: Array<string>;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Retrieve a publication of an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublicationOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationOfAlgorithm(params: {
    algorithmId: string;
    publicationId: string;
  }): Observable<{
    id: string;
    title: string;
    doi?: string;
    url?: string;
    authors: Array<string>;
    _links?: Array<Link>;
  }> {
    return this.getPublicationOfAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id: string;
            title: string;
            doi?: string;
            url?: string;
            authors: Array<string>;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id: string;
            title: string;
            doi?: string;
            url?: string;
            authors: Array<string>;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation unlinkAlgorithmAndPublication
   */
  static readonly UnlinkAlgorithmAndPublicationPath =
    '/v1/algorithms/{algorithmId}/publications/{publicationId}';

  /**
   * Delete a reference to a publication of an algorithm. The reference has to be previously created via a POST on /algorithms/{algorithmId}/publications/{publicationId}).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlinkAlgorithmAndPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkAlgorithmAndPublication$Response(params: {
    algorithmId: string;
    publicationId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UnlinkAlgorithmAndPublicationPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('publicationId', params.publicationId, {});
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
   * Delete a reference to a publication of an algorithm. The reference has to be previously created via a POST on /algorithms/{algorithmId}/publications/{publicationId}).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unlinkAlgorithmAndPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkAlgorithmAndPublication(params: {
    algorithmId: string;
    publicationId: string;
  }): Observable<void> {
    return this.unlinkAlgorithmAndPublication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getTagsOfAlgorithm
   */
  static readonly GetTagsOfAlgorithmPath = '/v1/algorithms/{algorithmId}/tags';

  /**
   * Retrieve all tags associated with a specific algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTagsOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTagsOfAlgorithm$Response(params: {
    algorithmId: string;
  }): Observable<
    StrictHttpResponse<{ _embedded?: { tags?: Array<EntityModelTagDto> } }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetTagsOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
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
          }>;
        })
      );
  }

  /**
   * Retrieve all tags associated with a specific algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTagsOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTagsOfAlgorithm(params: {
    algorithmId: string;
  }): Observable<{ _embedded?: { tags?: Array<EntityModelTagDto> } }> {
    return this.getTagsOfAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { tags?: Array<EntityModelTagDto> };
          }>
        ) => r.body as { _embedded?: { tags?: Array<EntityModelTagDto> } }
      )
    );
  }

  /**
   * Path part for operation addTagToAlgorithm
   */
  static readonly AddTagToAlgorithmPath = '/v1/algorithms/{algorithmId}/tags';

  /**
   * Add a tag to an algorithm. The tag does not have to exist before adding it.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addTagToAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTagToAlgorithm$Response(params: {
    algorithmId: string;
    body: TagDto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.AddTagToAlgorithmPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
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
   * Add a tag to an algorithm. The tag does not have to exist before adding it.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addTagToAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTagToAlgorithm(params: {
    algorithmId: string;
    body: TagDto;
  }): Observable<void> {
    return this.addTagToAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeTagFromAlgorithm
   */
  static readonly RemoveTagFromAlgorithmPath =
    '/v1/algorithms/{algorithmId}/tags';

  /**
   * Remove a tag from an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeTagFromAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  removeTagFromAlgorithm$Response(params: {
    algorithmId: string;
    body: TagDto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.RemoveTagFromAlgorithmPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
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
   * Remove a tag from an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeTagFromAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  removeTagFromAlgorithm(params: {
    algorithmId: string;
    body: TagDto;
  }): Observable<void> {
    return this.removeTagFromAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
