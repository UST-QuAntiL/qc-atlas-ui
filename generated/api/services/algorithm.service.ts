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
import { AlgorithmDto } from '../models/algorithm-dto';
import { AlgorithmRelationDto } from '../models/algorithm-relation-dto';
import { ApplicationAreaDto } from '../models/application-area-dto';
import { ClassicAlgorithmDto } from '../models/classic-algorithm-dto';
import { ComputingResourcePropertyDto } from '../models/computing-resource-property-dto';
import { ComputingResourcePropertyTypeDto } from '../models/computing-resource-property-type-dto';
import { EntityModelAlgorithmDto } from '../models/entity-model-algorithm-dto';
import { EntityModelAlgorithmRelationDto } from '../models/entity-model-algorithm-relation-dto';
import { EntityModelApplicationAreaDto } from '../models/entity-model-application-area-dto';
import { EntityModelComputingResourcePropertyDto } from '../models/entity-model-computing-resource-property-dto';
import { EntityModelImplementationDto } from '../models/entity-model-implementation-dto';
import { EntityModelPatternRelationDto } from '../models/entity-model-pattern-relation-dto';
import { EntityModelProblemTypeDto } from '../models/entity-model-problem-type-dto';
import { EntityModelPublicationDto } from '../models/entity-model-publication-dto';
import { EntityModelSoftwarePlatformDto } from '../models/entity-model-software-platform-dto';
import { ImplementationDto } from '../models/implementation-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';
import { PatternRelationDto } from '../models/pattern-relation-dto';
import { PatternRelationTypeDto } from '../models/pattern-relation-type-dto';
import { ProblemTypeDto } from '../models/problem-type-dto';
import { PublicationDto } from '../models/publication-dto';
import { QuantumAlgorithmDto } from '../models/quantum-algorithm-dto';
import { SoftwarePlatformDto } from '../models/software-platform-dto';

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
   * Define the basic properties of an algorithm. References to subobjects (e.g. a problemtype) can be added via subroutes (e.g. /algorithm/id/problem-types). Custom ID will be ignored.
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
   * Define the basic properties of an algorithm. References to subobjects (e.g. a problemtype) can be added via subroutes (e.g. /algorithm/id/problem-types). Custom ID will be ignored.
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
  static readonly GetAlgorithmPath = '/v1/algorithms/{algoId}';

  /**
   * Retrieve a specific algorithm and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithm$Response(params: {
    algoId: string;
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
      rb.path('algoId', params.algoId, {});
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
    algoId: string;
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
  static readonly UpdateAlgorithmPath = '/v1/algorithms/{algoId}';

  /**
   * Update the basic properties of an algorithm (e.g. name). References to subobjects (e.g. a problemtype) are not updated via this operation - use the corresponding subroute for updating them (e.g. algorithm/{id}/problem-type). Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithm$Response(params: {
    algoId: string;
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
      rb.path('algoId', params.algoId, {});

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
   * Update the basic properties of an algorithm (e.g. name). References to subobjects (e.g. a problemtype) are not updated via this operation - use the corresponding subroute for updating them (e.g. algorithm/{id}/problem-type). Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithm(params: {
    algoId: string;
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
  static readonly DeleteAlgorithmPath = '/v1/algorithms/{algoId}';

  /**
   * Delete an algorithm. This also deletes all entities that depend on it (e.g., the algorithm's relation to another algorithm).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithm$Response(params: {
    algoId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteAlgorithmPath,
      'delete'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
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
   * Delete an algorithm. This also deletes all entities that depend on it (e.g., the algorithm's relation to another algorithm).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithm(params: { algoId: string }): Observable<void> {
    return this.deleteAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAlgorithmRelations
   */
  static readonly GetAlgorithmRelationsPath =
    '/v1/algorithms/{algoId}/algorithm-relations';

  /**
   * Retrieve all relations for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmRelations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelations$Response(params: {
    algoId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: {
        algorithmRelations?: Array<EntityModelAlgorithmRelationDto>;
      };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetAlgorithmRelationsPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
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
          }>;
        })
      );
  }

  /**
   * Retrieve all relations for an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmRelations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelations(params: {
    algoId: string;
  }): Observable<{
    _embedded?: { algorithmRelations?: Array<EntityModelAlgorithmRelationDto> };
  }> {
    return this.getAlgorithmRelations$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              algorithmRelations?: Array<EntityModelAlgorithmRelationDto>;
            };
          }>
        ) =>
          r.body as {
            _embedded?: {
              algorithmRelations?: Array<EntityModelAlgorithmRelationDto>;
            };
          }
      )
    );
  }

  /**
   * Path part for operation addAlgorithmRelation
   */
  static readonly AddAlgorithmRelationPath =
    '/v1/algorithms/{algoId}/algorithm-relations';

  /**
   * Add an algorithm relation from this algorithm to another given algorithm. Custom ID will be ignored. For algorithm relation type only ID is required, other algorithm relation type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addAlgorithmRelation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addAlgorithmRelation$Response(params: {
    algoId: string;
    body: AlgorithmRelationDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      sourceAlgorithm: AlgorithmDto;
      targetAlgorithm: AlgorithmDto;
      algoRelationType: AlgoRelationTypeDto;
      description?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.AddAlgorithmRelationPath,
      'post'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});

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
            sourceAlgorithm: AlgorithmDto;
            targetAlgorithm: AlgorithmDto;
            algoRelationType: AlgoRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Add an algorithm relation from this algorithm to another given algorithm. Custom ID will be ignored. For algorithm relation type only ID is required, other algorithm relation type attributes will not change.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addAlgorithmRelation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addAlgorithmRelation(params: {
    algoId: string;
    body: AlgorithmRelationDto;
  }): Observable<{
    id?: string;
    sourceAlgorithm: AlgorithmDto;
    targetAlgorithm: AlgorithmDto;
    algoRelationType: AlgoRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.addAlgorithmRelation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            sourceAlgorithm: AlgorithmDto;
            targetAlgorithm: AlgorithmDto;
            algoRelationType: AlgoRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            sourceAlgorithm: AlgorithmDto;
            targetAlgorithm: AlgorithmDto;
            algoRelationType: AlgoRelationTypeDto;
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
    '/v1/algorithms/{algoId}/algorithm-relations/{relationId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelation$Response(params: {
    algoId: string;
    relationId: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      sourceAlgorithm: AlgorithmDto;
      targetAlgorithm: AlgorithmDto;
      algoRelationType: AlgoRelationTypeDto;
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
      rb.path('algoId', params.algoId, {});
      rb.path('relationId', params.relationId, {});
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
            sourceAlgorithm: AlgorithmDto;
            targetAlgorithm: AlgorithmDto;
            algoRelationType: AlgoRelationTypeDto;
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
    algoId: string;
    relationId: string;
  }): Observable<{
    id?: string;
    sourceAlgorithm: AlgorithmDto;
    targetAlgorithm: AlgorithmDto;
    algoRelationType: AlgoRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.getAlgorithmRelation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            sourceAlgorithm: AlgorithmDto;
            targetAlgorithm: AlgorithmDto;
            algoRelationType: AlgoRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            sourceAlgorithm: AlgorithmDto;
            targetAlgorithm: AlgorithmDto;
            algoRelationType: AlgoRelationTypeDto;
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
    '/v1/algorithms/{algoId}/algorithm-relations/{relationId}';

  /**
   * Change an algorithm relation from this algorithm to another given algorithm. Custom ID will be ignored. For algorithm relation type only ID is required, other algorithm relation type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAlgorithmRelation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithmRelation$Response(params: {
    algoId: string;
    relationId: string;
    body: AlgorithmRelationDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      sourceAlgorithm: AlgorithmDto;
      targetAlgorithm: AlgorithmDto;
      algoRelationType: AlgoRelationTypeDto;
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
      rb.path('algoId', params.algoId, {});
      rb.path('relationId', params.relationId, {});

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
            sourceAlgorithm: AlgorithmDto;
            targetAlgorithm: AlgorithmDto;
            algoRelationType: AlgoRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Change an algorithm relation from this algorithm to another given algorithm. Custom ID will be ignored. For algorithm relation type only ID is required, other algorithm relation type attributes will not change.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAlgorithmRelation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithmRelation(params: {
    algoId: string;
    relationId: string;
    body: AlgorithmRelationDto;
  }): Observable<{
    id?: string;
    sourceAlgorithm: AlgorithmDto;
    targetAlgorithm: AlgorithmDto;
    algoRelationType: AlgoRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.updateAlgorithmRelation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            sourceAlgorithm: AlgorithmDto;
            targetAlgorithm: AlgorithmDto;
            algoRelationType: AlgoRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            sourceAlgorithm: AlgorithmDto;
            targetAlgorithm: AlgorithmDto;
            algoRelationType: AlgoRelationTypeDto;
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
    '/v1/algorithms/{algoId}/algorithm-relations/{relationId}';

  /**
   * Delete a relation of the algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAlgorithmRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithmRelation$Response(params: {
    algoId: string;
    relationId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteAlgorithmRelationPath,
      'delete'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('relationId', params.relationId, {});
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
   * Delete a relation of the algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAlgorithmRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithmRelation(params: {
    algoId: string;
    relationId: string;
  }): Observable<void> {
    return this.deleteAlgorithmRelation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getApplicationAreasByAlgorithm
   */
  static readonly GetApplicationAreasByAlgorithmPath =
    '/v1/algorithms/{algoId}/application-areas';

  /**
   * Get the problem types for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationAreasByAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreasByAlgorithm$Response(params: {
    algoId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { applicationAreas?: Array<EntityModelApplicationAreaDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetApplicationAreasByAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
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
          }>;
        })
      );
  }

  /**
   * Get the problem types for an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplicationAreasByAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreasByAlgorithm(params: {
    algoId: string;
  }): Observable<{
    _embedded?: { applicationAreas?: Array<EntityModelApplicationAreaDto> };
  }> {
    return this.getApplicationAreasByAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              applicationAreas?: Array<EntityModelApplicationAreaDto>;
            };
          }>
        ) =>
          r.body as {
            _embedded?: {
              applicationAreas?: Array<EntityModelApplicationAreaDto>;
            };
          }
      )
    );
  }

  /**
   * Path part for operation addApplicationArea
   */
  static readonly AddApplicationAreaPath =
    '/v1/algorithms/{algoId}/application-areas';

  /**
   * Add a reference to an existing application area (that was previously created via a POST on /application-area/). For application area only ID is required, other attributes will not change. If the applicationArea doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addApplicationArea()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addApplicationArea$Response(params: {
    algoId: string;
    body: ApplicationAreaDto;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { applicationAreas?: Array<EntityModelApplicationAreaDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.AddApplicationAreaPath,
      'post'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});

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
              applicationAreas?: Array<EntityModelApplicationAreaDto>;
            };
          }>;
        })
      );
  }

  /**
   * Add a reference to an existing application area (that was previously created via a POST on /application-area/). For application area only ID is required, other attributes will not change. If the applicationArea doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addApplicationArea$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addApplicationArea(params: {
    algoId: string;
    body: ApplicationAreaDto;
  }): Observable<{
    _embedded?: { applicationAreas?: Array<EntityModelApplicationAreaDto> };
  }> {
    return this.addApplicationArea$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              applicationAreas?: Array<EntityModelApplicationAreaDto>;
            };
          }>
        ) =>
          r.body as {
            _embedded?: {
              applicationAreas?: Array<EntityModelApplicationAreaDto>;
            };
          }
      )
    );
  }

  /**
   * Path part for operation getApplicationArea
   */
  static readonly GetApplicationAreaPath =
    '/v1/algorithms/{algoId}/application-areas/{applicationAreaId}';

  /**
   * Get a specific applicationArea of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationArea()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationArea$Response(params: {
    algoId: string;
    applicationAreaId: string;
  }): Observable<
    StrictHttpResponse<{ id?: string; name: string; _links?: Array<Link> }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetApplicationAreaPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
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
            id?: string;
            name: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Get a specific applicationArea of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplicationArea$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationArea(params: {
    algoId: string;
    applicationAreaId: string;
  }): Observable<{ id?: string; name: string; _links?: Array<Link> }> {
    return this.getApplicationArea$Response(params).pipe(
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
   * Path part for operation deleteReferenceToApplicationArea
   */
  static readonly DeleteReferenceToApplicationAreaPath =
    '/v1/algorithms/{algoId}/application-areas/{applicationAreaId}';

  /**
   * Delete a reference to a applicationArea of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteReferenceToApplicationArea()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToApplicationArea$Response(params: {
    algoId: string;
    applicationAreaId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteReferenceToApplicationAreaPath,
      'delete'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
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
   * Delete a reference to a applicationArea of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteReferenceToApplicationArea$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToApplicationArea(params: {
    algoId: string;
    applicationAreaId: string;
  }): Observable<void> {
    return this.deleteReferenceToApplicationArea$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getComputingResourcesByAlgorithm
   */
  static readonly GetComputingResourcesByAlgorithmPath =
    '/v1/algorithms/{algoId}/computing-resource-properties';

  /**
   * Retrieve the required computing resources of an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputingResourcesByAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResourcesByAlgorithm$Response(params: {
    algoId: string;
    page?: number;
    size?: number;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: {
        computingResourceProperties?: Array<
          EntityModelComputingResourcePropertyDto
        >;
      };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetComputingResourcesByAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
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
              computingResourceProperties?: Array<
                EntityModelComputingResourcePropertyDto
              >;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Retrieve the required computing resources of an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputingResourcesByAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResourcesByAlgorithm(params: {
    algoId: string;
    page?: number;
    size?: number;
  }): Observable<{
    _embedded?: {
      computingResourceProperties?: Array<
        EntityModelComputingResourcePropertyDto
      >;
    };
    page?: PageMetadata;
  }> {
    return this.getComputingResourcesByAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              computingResourceProperties?: Array<
                EntityModelComputingResourcePropertyDto
              >;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              computingResourceProperties?: Array<
                EntityModelComputingResourcePropertyDto
              >;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation addComputingResource
   */
  static readonly AddComputingResourcePath =
    '/v1/algorithms/{algoId}/computing-resource-properties';

  /**
   * Add a computing resource (e.g. a certain number of qubits) that is required by an algorithm. Custom ID will be ignored. For computing resource type only ID is required, other computing resource type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addComputingResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addComputingResource$Response(params: {
    algoId: string;
    body: ComputingResourcePropertyDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      value?: string;
      type: ComputingResourcePropertyTypeDto;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.AddComputingResourcePath,
      'post'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});

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
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Add a computing resource (e.g. a certain number of qubits) that is required by an algorithm. Custom ID will be ignored. For computing resource type only ID is required, other computing resource type attributes will not change.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addComputingResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addComputingResource(params: {
    algoId: string;
    body: ComputingResourcePropertyDto;
  }): Observable<{
    id?: string;
    value?: string;
    type: ComputingResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.addComputingResource$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation getComputingResource
   */
  static readonly GetComputingResourcePath =
    '/v1/algorithms/{algoId}/computing-resource-properties/{resourceId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputingResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResource$Response(params: {
    algoId: string;
    resourceId: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      value?: string;
      type: ComputingResourcePropertyTypeDto;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetComputingResourcePath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('resourceId', params.resourceId, {});
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
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputingResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResource(params: {
    algoId: string;
    resourceId: string;
  }): Observable<{
    id?: string;
    value?: string;
    type: ComputingResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.getComputingResource$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updateComputingResource
   */
  static readonly UpdateComputingResourcePath =
    '/v1/algorithms/{algoId}/computing-resource-properties/{resourceId}';

  /**
   * Update a computing resource of the algorithm. Custom ID will be ignored. For computing resource type only ID is required, other computing resource type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComputingResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputingResource$Response(params: {
    algoId: string;
    resourceId: string;
    body: ComputingResourcePropertyDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      value?: string;
      type: ComputingResourcePropertyTypeDto;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdateComputingResourcePath,
      'put'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('resourceId', params.resourceId, {});

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
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Update a computing resource of the algorithm. Custom ID will be ignored. For computing resource type only ID is required, other computing resource type attributes will not change.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateComputingResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputingResource(params: {
    algoId: string;
    resourceId: string;
    body: ComputingResourcePropertyDto;
  }): Observable<{
    id?: string;
    value?: string;
    type: ComputingResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.updateComputingResource$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deleteComputingResource
   */
  static readonly DeleteComputingResourcePath =
    '/v1/algorithms/{algoId}/computing-resource-properties/{resourceId}';

  /**
   * Delete a computing resource of the algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComputingResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputingResource$Response(params: {
    algoId: string;
    resourceId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteComputingResourcePath,
      'delete'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('resourceId', params.resourceId, {});
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
   * Delete a computing resource of the algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteComputingResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputingResource(params: {
    algoId: string;
    resourceId: string;
  }): Observable<void> {
    return this.deleteComputingResource$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getImplementations
   */
  static readonly GetImplementationsPath =
    '/v1/algorithms/{algoId}/implementations';

  /**
   * Retrieve all implementations for the algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementations$Response(params: {
    algoId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { implementations?: Array<EntityModelImplementationDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetImplementationsPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
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
   * Retrieve all implementations for the algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementations(params: {
    algoId: string;
  }): Observable<{
    _embedded?: { implementations?: Array<EntityModelImplementationDto> };
  }> {
    return this.getImplementations$Response(params).pipe(
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

  /**
   * Path part for operation createImplementation
   */
  static readonly CreateImplementationPath =
    '/v1/algorithms/{algoId}/implementations';

  /**
   * Create a new implementation for the algorithm. Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImplementation$Response(params: {
    algoId: string;
    body: ImplementationDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      link?: string;
      inputFormat?: string;
      outputFormat?: string;
      description?: string;
      contributors?: string;
      assumptions?: string;
      parameter?: string;
      dependencies?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.CreateImplementationPath,
      'post'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});

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
            link?: string;
            inputFormat?: string;
            outputFormat?: string;
            description?: string;
            contributors?: string;
            assumptions?: string;
            parameter?: string;
            dependencies?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Create a new implementation for the algorithm. Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImplementation(params: {
    algoId: string;
    body: ImplementationDto;
  }): Observable<{
    id?: string;
    name: string;
    link?: string;
    inputFormat?: string;
    outputFormat?: string;
    description?: string;
    contributors?: string;
    assumptions?: string;
    parameter?: string;
    dependencies?: string;
    _links?: Array<Link>;
  }> {
    return this.createImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            inputFormat?: string;
            outputFormat?: string;
            description?: string;
            contributors?: string;
            assumptions?: string;
            parameter?: string;
            dependencies?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            link?: string;
            inputFormat?: string;
            outputFormat?: string;
            description?: string;
            contributors?: string;
            assumptions?: string;
            parameter?: string;
            dependencies?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation getImplementation
   */
  static readonly GetImplementationPath =
    '/v1/algorithms/{algoId}/implementations/{implId}';

  /**
   * Retrieve a specific implemention of the algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementation$Response(params: {
    algoId: string;
    implId: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      link?: string;
      inputFormat?: string;
      outputFormat?: string;
      description?: string;
      contributors?: string;
      assumptions?: string;
      parameter?: string;
      dependencies?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
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
            link?: string;
            inputFormat?: string;
            outputFormat?: string;
            description?: string;
            contributors?: string;
            assumptions?: string;
            parameter?: string;
            dependencies?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Retrieve a specific implemention of the algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementation(params: {
    algoId: string;
    implId: string;
  }): Observable<{
    id?: string;
    name: string;
    link?: string;
    inputFormat?: string;
    outputFormat?: string;
    description?: string;
    contributors?: string;
    assumptions?: string;
    parameter?: string;
    dependencies?: string;
    _links?: Array<Link>;
  }> {
    return this.getImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            inputFormat?: string;
            outputFormat?: string;
            description?: string;
            contributors?: string;
            assumptions?: string;
            parameter?: string;
            dependencies?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            link?: string;
            inputFormat?: string;
            outputFormat?: string;
            description?: string;
            contributors?: string;
            assumptions?: string;
            parameter?: string;
            dependencies?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updateImplementation
   */
  static readonly UpdateImplementationPath =
    '/v1/algorithms/{algoId}/implementations/{implId}';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImplementation$Response(params: {
    algoId: string;
    implId: string;
    body: ImplementationDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      link?: string;
      inputFormat?: string;
      outputFormat?: string;
      description?: string;
      contributors?: string;
      assumptions?: string;
      parameter?: string;
      dependencies?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdateImplementationPath,
      'put'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});

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
            link?: string;
            inputFormat?: string;
            outputFormat?: string;
            description?: string;
            contributors?: string;
            assumptions?: string;
            parameter?: string;
            dependencies?: string;
            _links?: Array<Link>;
          }>;
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
    algoId: string;
    implId: string;
    body: ImplementationDto;
  }): Observable<{
    id?: string;
    name: string;
    link?: string;
    inputFormat?: string;
    outputFormat?: string;
    description?: string;
    contributors?: string;
    assumptions?: string;
    parameter?: string;
    dependencies?: string;
    _links?: Array<Link>;
  }> {
    return this.updateImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            inputFormat?: string;
            outputFormat?: string;
            description?: string;
            contributors?: string;
            assumptions?: string;
            parameter?: string;
            dependencies?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            link?: string;
            inputFormat?: string;
            outputFormat?: string;
            description?: string;
            contributors?: string;
            assumptions?: string;
            parameter?: string;
            dependencies?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deleteImplementation
   */
  static readonly DeleteImplementationPath =
    '/v1/algorithms/{algoId}/implementations/{implId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImplementation$Response(params: {
    algoId: string;
    implId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteImplementationPath,
      'delete'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
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
    algoId: string;
    implId: string;
  }): Observable<void> {
    return this.deleteImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getComputingResources
   */
  static readonly GetComputingResourcesPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/computing-resource-properties';

  /**
   * Retrieve the required computing resources of an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputingResources()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResources$Response(params: {
    algoId: string;
    implId: string;
    page?: number;
    size?: number;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: {
        computingResourceProperties?: Array<
          EntityModelComputingResourcePropertyDto
        >;
      };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetComputingResourcesPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
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
              computingResourceProperties?: Array<
                EntityModelComputingResourcePropertyDto
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
   * To access the full response (for headers, for example), `getComputingResources$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResources(params: {
    algoId: string;
    implId: string;
    page?: number;
    size?: number;
  }): Observable<{
    _embedded?: {
      computingResourceProperties?: Array<
        EntityModelComputingResourcePropertyDto
      >;
    };
    page?: PageMetadata;
  }> {
    return this.getComputingResources$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              computingResourceProperties?: Array<
                EntityModelComputingResourcePropertyDto
              >;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              computingResourceProperties?: Array<
                EntityModelComputingResourcePropertyDto
              >;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation addComputingResourceByImplementation
   */
  static readonly AddComputingResourceByImplementationPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/computing-resource-properties';

  /**
   * Add a computing resource (e.g. a certain number of qubits) that is requiered by an implementation. Custom ID will be ignored. For computing resource type only ID is required, other computing resource type attributes will not change
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addComputingResourceByImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addComputingResourceByImplementation$Response(params: {
    algoId: string;
    implId: string;
    body: ComputingResourcePropertyDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      value?: string;
      type: ComputingResourcePropertyTypeDto;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.AddComputingResourceByImplementationPath,
      'post'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});

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
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Add a computing resource (e.g. a certain number of qubits) that is requiered by an implementation. Custom ID will be ignored. For computing resource type only ID is required, other computing resource type attributes will not change
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addComputingResourceByImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addComputingResourceByImplementation(params: {
    algoId: string;
    implId: string;
    body: ComputingResourcePropertyDto;
  }): Observable<{
    id?: string;
    value?: string;
    type: ComputingResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.addComputingResourceByImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation getComputingResourceByImplementation
   */
  static readonly GetComputingResourceByImplementationPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/computing-resource-properties/{resourceId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputingResourceByImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResourceByImplementation$Response(params: {
    algoId: string;
    implId: string;
    resourceId: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      value?: string;
      type: ComputingResourcePropertyTypeDto;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetComputingResourceByImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
      rb.path('resourceId', params.resourceId, {});
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
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputingResourceByImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResourceByImplementation(params: {
    algoId: string;
    implId: string;
    resourceId: string;
  }): Observable<{
    id?: string;
    value?: string;
    type: ComputingResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.getComputingResourceByImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updateComputingResourceByImplementation
   */
  static readonly UpdateComputingResourceByImplementationPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/computing-resource-properties/{resourceId}';

  /**
   * Update a computing resource of the implementation. Custom ID will be ignored. For computing resource type only ID is required, other computing resource type attributes will not change
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComputingResourceByImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputingResourceByImplementation$Response(params: {
    algoId: string;
    implId: string;
    resourceId: string;
    body: ComputingResourcePropertyDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      value?: string;
      type: ComputingResourcePropertyTypeDto;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdateComputingResourceByImplementationPath,
      'put'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
      rb.path('resourceId', params.resourceId, {});

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
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Update a computing resource of the implementation. Custom ID will be ignored. For computing resource type only ID is required, other computing resource type attributes will not change
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateComputingResourceByImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputingResourceByImplementation(params: {
    algoId: string;
    implId: string;
    resourceId: string;
    body: ComputingResourcePropertyDto;
  }): Observable<{
    id?: string;
    value?: string;
    type: ComputingResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.updateComputingResourceByImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            value?: string;
            type: ComputingResourcePropertyTypeDto;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deleteComputingResourceByImplementation
   */
  static readonly DeleteComputingResourceByImplementationPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/computing-resource-properties/{resourceId}';

  /**
   * Delete a computing resource of the implementation.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComputingResourceByImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputingResourceByImplementation$Response(params: {
    algoId: string;
    implId: string;
    resourceId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteComputingResourceByImplementationPath,
      'delete'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
      rb.path('resourceId', params.resourceId, {});
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
   * Delete a computing resource of the implementation.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteComputingResourceByImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputingResourceByImplementation(params: {
    algoId: string;
    implId: string;
    resourceId: string;
  }): Observable<void> {
    return this.deleteComputingResourceByImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPublicationsByImplementation
   */
  static readonly GetPublicationsByImplementationPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/publications';

  /**
   * Get referenced publications for an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublicationsByImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationsByImplementation$Response(params: {
    algoId: string;
    implId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { publications?: Array<EntityModelPublicationDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetPublicationsByImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
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
          }>;
        })
      );
  }

  /**
   * Get referenced publications for an implementation
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublicationsByImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationsByImplementation(params: {
    algoId: string;
    implId: string;
  }): Observable<{
    _embedded?: { publications?: Array<EntityModelPublicationDto> };
  }> {
    return this.getPublicationsByImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
          }>
        ) =>
          r.body as {
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
          }
      )
    );
  }

  /**
   * Path part for operation getPublicationByImplementation
   */
  static readonly GetPublicationByImplementationPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/publications/{publId}';

  /**
   * Get a specific referenced publication of an implementation.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublicationByImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationByImplementation$Response(params: {
    algoId: string;
    implId: string;
    publId: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      title: string;
      doi?: string;
      url?: string;
      authors: Array<string>;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetPublicationByImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
      rb.path('publId', params.publId, {});
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
   * Get a specific referenced publication of an implementation.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublicationByImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationByImplementation(params: {
    algoId: string;
    implId: string;
    publId: string;
  }): Observable<{
    id?: string;
    title: string;
    doi?: string;
    url?: string;
    authors: Array<string>;
    _links?: Array<Link>;
  }> {
    return this.getPublicationByImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            title: string;
            doi?: string;
            url?: string;
            authors: Array<string>;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
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
   * Path part for operation addPublicationByImplementation
   */
  static readonly AddPublicationByImplementationPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/publications/{publId}';

  /**
   * Add a reference to an existing publication (that was previously created via a POST on /publications/). Custom ID will be ignored. For publication only ID is required, other publication attributes will not change. If the publication doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPublicationByImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  addPublicationByImplementation$Response(params: {
    algoId: string;
    implId: string;
    publId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { publications?: Array<EntityModelPublicationDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.AddPublicationByImplementationPath,
      'post'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
      rb.path('publId', params.publId, {});
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
          }>;
        })
      );
  }

  /**
   * Add a reference to an existing publication (that was previously created via a POST on /publications/). Custom ID will be ignored. For publication only ID is required, other publication attributes will not change. If the publication doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addPublicationByImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addPublicationByImplementation(params: {
    algoId: string;
    implId: string;
    publId: string;
  }): Observable<{
    _embedded?: { publications?: Array<EntityModelPublicationDto> };
  }> {
    return this.addPublicationByImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
          }>
        ) =>
          r.body as {
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
          }
      )
    );
  }

  /**
   * Path part for operation deleteReferenceToPublicationByImplementation
   */
  static readonly DeleteReferenceToPublicationByImplementationPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/publications/{publId}';

  /**
   * Delete a reference to a publication of the implementation.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteReferenceToPublicationByImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToPublicationByImplementation$Response(params: {
    algoId: string;
    implId: string;
    publId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteReferenceToPublicationByImplementationPath,
      'delete'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
      rb.path('publId', params.publId, {});
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
   * To access the full response (for headers, for example), `deleteReferenceToPublicationByImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToPublicationByImplementation(params: {
    algoId: string;
    implId: string;
    publId: string;
  }): Observable<void> {
    return this.deleteReferenceToPublicationByImplementation$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation getSoftwarePlatformsByImplementation
   */
  static readonly GetSoftwarePlatformsByImplementationPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/software-platforms';

  /**
   * Get referenced software platform for an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatformsByImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformsByImplementation$Response(params: {
    algoId: string;
    implId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetSoftwarePlatformsByImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
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
   * To access the full response (for headers, for example), `getSoftwarePlatformsByImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformsByImplementation(params: {
    algoId: string;
    implId: string;
  }): Observable<{
    _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
  }> {
    return this.getSoftwarePlatformsByImplementation$Response(params).pipe(
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
   * Path part for operation addSoftwarePlatformByImplementation
   */
  static readonly AddSoftwarePlatformByImplementationPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/software-platforms';

  /**
   * Add a reference to an existing software platform (that was previously created via a POST on /software-platforms/). Custom ID will be ignored. For software platform only ID is required, other software platform attributes will not change. If the software platform doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSoftwarePlatformByImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSoftwarePlatformByImplementation$Response(params: {
    algoId: string;
    implId: string;
    body: SoftwarePlatformDto;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.AddSoftwarePlatformByImplementationPath,
      'post'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});

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
   * Add a reference to an existing software platform (that was previously created via a POST on /software-platforms/). Custom ID will be ignored. For software platform only ID is required, other software platform attributes will not change. If the software platform doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addSoftwarePlatformByImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSoftwarePlatformByImplementation(params: {
    algoId: string;
    implId: string;
    body: SoftwarePlatformDto;
  }): Observable<{
    _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
  }> {
    return this.addSoftwarePlatformByImplementation$Response(params).pipe(
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
   * Path part for operation getSoftwarePlatformByImplementation
   */
  static readonly GetSoftwarePlatformByImplementationPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/software-platforms/{platformId}';

  /**
   * Get a specific referenced software platform of an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatformByImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformByImplementation$Response(params: {
    algoId: string;
    implId: string;
    platformId: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      link?: string;
      version?: string;
      licence?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetSoftwarePlatformByImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
      rb.path('platformId', params.platformId, {});
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
            link?: string;
            version?: string;
            licence?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Get a specific referenced software platform of an implementation
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoftwarePlatformByImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformByImplementation(params: {
    algoId: string;
    implId: string;
    platformId: string;
  }): Observable<{
    id?: string;
    name: string;
    link?: string;
    version?: string;
    licence?: string;
    _links?: Array<Link>;
  }> {
    return this.getSoftwarePlatformByImplementation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            version?: string;
            licence?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            link?: string;
            version?: string;
            licence?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deleteReferenceToSoftwarePlatform
   */
  static readonly DeleteReferenceToSoftwarePlatformPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/software-platforms/{platformId}';

  /**
   * Delete a reference to a software platform of the implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteReferenceToSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToSoftwarePlatform$Response(params: {
    algoId: string;
    implId: string;
    platformId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteReferenceToSoftwarePlatformPath,
      'delete'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
      rb.path('platformId', params.platformId, {});
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
   * To access the full response (for headers, for example), `deleteReferenceToSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToSoftwarePlatform(params: {
    algoId: string;
    implId: string;
    platformId: string;
  }): Observable<void> {
    return this.deleteReferenceToSoftwarePlatform$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPatternRelations
   */
  static readonly GetPatternRelationsPath =
    '/v1/algorithms/{algoId}/pattern-relations';

  /**
   * Get pattern relations for an algorithms.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelations$Response(params: {
    algoId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { patternRelations?: Array<EntityModelPatternRelationDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetPatternRelationsPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
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
          }>;
        })
      );
  }

  /**
   * Get pattern relations for an algorithms.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternRelations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelations(params: {
    algoId: string;
  }): Observable<{
    _embedded?: { patternRelations?: Array<EntityModelPatternRelationDto> };
  }> {
    return this.getPatternRelations$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              patternRelations?: Array<EntityModelPatternRelationDto>;
            };
          }>
        ) =>
          r.body as {
            _embedded?: {
              patternRelations?: Array<EntityModelPatternRelationDto>;
            };
          }
      )
    );
  }

  /**
   * Path part for operation createPatternRelationByAlgorithm
   */
  static readonly CreatePatternRelationByAlgorithmPath =
    '/v1/algorithms/{algoId}/pattern-relations';

  /**
   * Add a Pattern Relation from this Algorithm to a given Pattern. Custom ID will be ignored. For pattern relation type only ID is required, other pattern relation type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPatternRelationByAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelationByAlgorithm$Response(params: {
    algoId: string;
    body: PatternRelationDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      algorithm: AlgorithmDto;
      pattern: string;
      patternRelationType: PatternRelationTypeDto;
      description?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.CreatePatternRelationByAlgorithmPath,
      'post'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});

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
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Add a Pattern Relation from this Algorithm to a given Pattern. Custom ID will be ignored. For pattern relation type only ID is required, other pattern relation type attributes will not change.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPatternRelationByAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelationByAlgorithm(params: {
    algoId: string;
    body: PatternRelationDto;
  }): Observable<{
    id?: string;
    algorithm: AlgorithmDto;
    pattern: string;
    patternRelationType: PatternRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.createPatternRelationByAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation getPatternRelationByAlgorithm
   */
  static readonly GetPatternRelationByAlgorithmPath =
    '/v1/algorithms/{algoId}/pattern-relations/{relationId}';

  /**
   * Get a certain pattern relation for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelationByAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationByAlgorithm$Response(params: {
    algoId: string;
    relationId: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      algorithm: AlgorithmDto;
      pattern: string;
      patternRelationType: PatternRelationTypeDto;
      description?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetPatternRelationByAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('relationId', params.relationId, {});
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
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Get a certain pattern relation for an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternRelationByAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationByAlgorithm(params: {
    algoId: string;
    relationId: string;
  }): Observable<{
    id?: string;
    algorithm: AlgorithmDto;
    pattern: string;
    patternRelationType: PatternRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.getPatternRelationByAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updatePatternRelations
   */
  static readonly UpdatePatternRelationsPath =
    '/v1/algorithms/{algoId}/pattern-relations/{relationId}';

  /**
   * Update a references to a pattern. Custom ID will be ignored. For pattern relation type only ID is required, other pattern relation type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatternRelations()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelations$Response(params: {
    algoId: string;
    relationId: string;
    body: PatternRelationDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      algorithm: AlgorithmDto;
      pattern: string;
      patternRelationType: PatternRelationTypeDto;
      description?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdatePatternRelationsPath,
      'put'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('relationId', params.relationId, {});

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
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Update a references to a pattern. Custom ID will be ignored. For pattern relation type only ID is required, other pattern relation type attributes will not change.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePatternRelations$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelations(params: {
    algoId: string;
    relationId: string;
    body: PatternRelationDto;
  }): Observable<{
    id?: string;
    algorithm: AlgorithmDto;
    pattern: string;
    patternRelationType: PatternRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.updatePatternRelations$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deletePatternRelationByAlgorithm
   */
  static readonly DeletePatternRelationByAlgorithmPath =
    '/v1/algorithms/{algoId}/pattern-relations/{relationId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePatternRelationByAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelationByAlgorithm$Response(params: {
    algoId: string;
    relationId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeletePatternRelationByAlgorithmPath,
      'delete'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('relationId', params.relationId, {});
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
   * To access the full response (for headers, for example), `deletePatternRelationByAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelationByAlgorithm(params: {
    algoId: string;
    relationId: string;
  }): Observable<void> {
    return this.deletePatternRelationByAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProblemTypesByAlgorithm
   */
  static readonly GetProblemTypesByAlgorithmPath =
    '/v1/algorithms/{algoId}/problem-types';

  /**
   * Get the problem types for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProblemTypesByAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypesByAlgorithm$Response(params: {
    algoId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetProblemTypesByAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
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
   * Get the problem types for an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProblemTypesByAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypesByAlgorithm(params: {
    algoId: string;
  }): Observable<{
    _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
  }> {
    return this.getProblemTypesByAlgorithm$Response(params).pipe(
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

  /**
   * Path part for operation addProblemType
   */
  static readonly AddProblemTypePath = '/v1/algorithms/{algoId}/problem-types';

  /**
   * Add a reference to an existing problemType (that was previously created via a POST on /problem-types/). Custom ID will be ignored. For problem type only ID is required, other problem type attributes will not change. If the problemType doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addProblemType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProblemType$Response(params: {
    algoId: string;
    body: ProblemTypeDto;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.AddProblemTypePath,
      'post'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});

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
            _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
          }>;
        })
      );
  }

  /**
   * Add a reference to an existing problemType (that was previously created via a POST on /problem-types/). Custom ID will be ignored. For problem type only ID is required, other problem type attributes will not change. If the problemType doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addProblemType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProblemType(params: {
    algoId: string;
    body: ProblemTypeDto;
  }): Observable<{
    _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
  }> {
    return this.addProblemType$Response(params).pipe(
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

  /**
   * Path part for operation getSpecificProblemTypes
   */
  static readonly GetSpecificProblemTypesPath =
    '/v1/algorithms/{algoId}/problem-types/{problemTypeId}';

  /**
   * Get a specific problem type for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSpecificProblemTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSpecificProblemTypes$Response(params: {
    algoId: string;
    problemTypeId: string;
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
      AlgorithmService.GetSpecificProblemTypesPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
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
            id?: string;
            name: string;
            parentProblemType?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Get a specific problem type for an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSpecificProblemTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSpecificProblemTypes(params: {
    algoId: string;
    problemTypeId: string;
  }): Observable<{
    id?: string;
    name: string;
    parentProblemType?: string;
    _links?: Array<Link>;
  }> {
    return this.getSpecificProblemTypes$Response(params).pipe(
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
   * Path part for operation deleteReferenceToProblemTypes
   */
  static readonly DeleteReferenceToProblemTypesPath =
    '/v1/algorithms/{algoId}/problem-types/{problemTypeId}';

  /**
   * Delete a reference to a problem types of the algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteReferenceToProblemTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToProblemTypes$Response(params: {
    algoId: string;
    problemTypeId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteReferenceToProblemTypesPath,
      'delete'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
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
   * Delete a reference to a problem types of the algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteReferenceToProblemTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToProblemTypes(params: {
    algoId: string;
    problemTypeId: string;
  }): Observable<void> {
    return this.deleteReferenceToProblemTypes$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPublicationsByAlgorithm
   */
  static readonly GetPublicationsByAlgorithmPath =
    '/v1/algorithms/{algoId}/publications';

  /**
   * Get referenced publications for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublicationsByAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationsByAlgorithm$Response(params: {
    algoId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { publications?: Array<EntityModelPublicationDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetPublicationsByAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
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
          }>;
        })
      );
  }

  /**
   * Get referenced publications for an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublicationsByAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationsByAlgorithm(params: {
    algoId: string;
  }): Observable<{
    _embedded?: { publications?: Array<EntityModelPublicationDto> };
  }> {
    return this.getPublicationsByAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
          }>
        ) =>
          r.body as {
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
          }
      )
    );
  }

  /**
   * Path part for operation addPublication
   */
  static readonly AddPublicationPath = '/v1/algorithms/{algoId}/publications';

  /**
   * Add a reference to an existing publication (that was previously created via a POST on /publications/). Custom ID will be ignored. For publication only ID is required, other publication attributes will not change. If the publication doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPublication$Response(params: {
    algoId: string;
    body: PublicationDto;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { publications?: Array<EntityModelPublicationDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.AddPublicationPath,
      'post'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});

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
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
          }>;
        })
      );
  }

  /**
   * Add a reference to an existing publication (that was previously created via a POST on /publications/). Custom ID will be ignored. For publication only ID is required, other publication attributes will not change. If the publication doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPublication(params: {
    algoId: string;
    body: PublicationDto;
  }): Observable<{
    _embedded?: { publications?: Array<EntityModelPublicationDto> };
  }> {
    return this.addPublication$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
          }>
        ) =>
          r.body as {
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
          }
      )
    );
  }

  /**
   * Path part for operation getPublicationByAlgorithm
   */
  static readonly GetPublicationByAlgorithmPath =
    '/v1/algorithms/{algoId}/publications/{publicationId}';

  /**
   * Get a specific referenced publication of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublicationByAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationByAlgorithm$Response(params: {
    algoId: string;
    publicationId: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      title: string;
      doi?: string;
      url?: string;
      authors: Array<string>;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetPublicationByAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
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
            id?: string;
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
   * Get a specific referenced publication of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublicationByAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationByAlgorithm(params: {
    algoId: string;
    publicationId: string;
  }): Observable<{
    id?: string;
    title: string;
    doi?: string;
    url?: string;
    authors: Array<string>;
    _links?: Array<Link>;
  }> {
    return this.getPublicationByAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            title: string;
            doi?: string;
            url?: string;
            authors: Array<string>;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
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
   * Path part for operation deleteReferenceToPublication
   */
  static readonly DeleteReferenceToPublicationPath =
    '/v1/algorithms/{algoId}/publications/{publicationId}';

  /**
   * Delete a reference to a publication of the algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteReferenceToPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToPublication$Response(params: {
    algoId: string;
    publicationId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteReferenceToPublicationPath,
      'delete'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
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
   * Delete a reference to a publication of the algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteReferenceToPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToPublication(params: {
    algoId: string;
    publicationId: string;
  }): Observable<void> {
    return this.deleteReferenceToPublication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
