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
import { DiscussionCommentDto } from '../models/discussion-comment-dto';
import { DiscussionTopicDto } from '../models/discussion-topic-dto';
import { EntityModelAlgorithmDto } from '../models/entity-model-algorithm-dto';
import { EntityModelAlgorithmRelationDto } from '../models/entity-model-algorithm-relation-dto';
import { EntityModelApplicationAreaDto } from '../models/entity-model-application-area-dto';
import { EntityModelComputeResourcePropertyDto } from '../models/entity-model-compute-resource-property-dto';
import { EntityModelDiscussionCommentDto } from '../models/entity-model-discussion-comment-dto';
import { EntityModelDiscussionTopicDto } from '../models/entity-model-discussion-topic-dto';
import { EntityModelImplementationDto } from '../models/entity-model-implementation-dto';
import { EntityModelImplementationPackageDto } from '../models/entity-model-implementation-package-dto';
import { EntityModelPatternRelationDto } from '../models/entity-model-pattern-relation-dto';
import { EntityModelProblemTypeDto } from '../models/entity-model-problem-type-dto';
import { EntityModelPublicationDto } from '../models/entity-model-publication-dto';
import { EntityModelRevisionDto } from '../models/entity-model-revision-dto';
import { EntityModelSketchDto } from '../models/entity-model-sketch-dto';
import { EntityModelSoftwarePlatformDto } from '../models/entity-model-software-platform-dto';
import { EntityModelTagDto } from '../models/entity-model-tag-dto';
import { ImplementationDto } from '../models/implementation-dto';
import { ImplementationPackageDto } from '../models/implementation-package-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';
import { PatternRelationDto } from '../models/pattern-relation-dto';
import { PatternRelationTypeDto } from '../models/pattern-relation-type-dto';
import { ProblemTypeDto } from '../models/problem-type-dto';
import { PublicationDto } from '../models/publication-dto';
import { QuantumAlgorithmDto } from '../models/quantum-algorithm-dto';
import { QuantumImplementationDto } from '../models/quantum-implementation-dto';
import { SketchDto } from '../models/sketch-dto';
import { SoftwarePlatformDto } from '../models/software-platform-dto';
import { TagDto } from '../models/tag-dto';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'algorithms'?: Array<EntityModelAlgorithmDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetAlgorithmsPath, 'get');
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'algorithms'?: Array<EntityModelAlgorithmDto> }, 'page'?: PageMetadata }>;
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

  }): Observable<{ '_embedded'?: { 'algorithms'?: Array<EntityModelAlgorithmDto> }, 'page'?: PageMetadata }> {

    return this.getAlgorithms$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'algorithms'?: Array<EntityModelAlgorithmDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'algorithms'?: Array<EntityModelAlgorithmDto> }, 'page'?: PageMetadata })
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
      body: AlgorithmDto
  }): Observable<StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateAlgorithmPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)>;
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
      body: AlgorithmDto
  }): Observable<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)> {

    return this.createAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)>) => r.body as { '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto))
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

  }): Observable<StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)>;
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

  }): Observable<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)> {

    return this.getAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)>) => r.body as { '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto))
    );
  }

  /**
   * Path part for operation updateAlgorithm
   */
  static readonly UpdateAlgorithmPath = '/v1/algorithms/{algorithmId}';

  /**
   * Update the basic properties of an algorithm (e.g. name). References to sub-objects (e.g. a ProblemType) are not updated via this operation - use the corresponding sub-route for updating them (e.g. PUT on /problem-types/{problemTypeId}).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithm$Response(params: {
    algorithmId: string;
      body: AlgorithmDto
  }): Observable<StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateAlgorithmPath, 'put');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)>;
      })
    );
  }

  /**
   * Update the basic properties of an algorithm (e.g. name). References to sub-objects (e.g. a ProblemType) are not updated via this operation - use the corresponding sub-route for updating them (e.g. PUT on /problem-types/{problemTypeId}).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithm(params: {
    algorithmId: string;
      body: AlgorithmDto
  }): Observable<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)> {

    return this.updateAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)>) => r.body as { '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto))
    );
  }

  /**
   * Path part for operation deleteAlgorithm
   */
  static readonly DeleteAlgorithmPath = '/v1/algorithms/{algorithmId}';

  /**
   * Delete an algorithm. This also deletes all entities that depend on it (e.g. the algorithm's relations to other algorithms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithm$Response(params: {
    algorithmId: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteAlgorithmPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete an algorithm. This also deletes all entities that depend on it (e.g. the algorithm's relations to other algorithms).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithm(params: {
    algorithmId: string;

  }): Observable<void> {

    return this.deleteAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAlgorithmRelationsOfAlgorithm
   */
  static readonly GetAlgorithmRelationsOfAlgorithmPath = '/v1/algorithms/{algorithmId}/algorithm-relations';

  /**
   * Retrieve all relations of an algorithm.
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'algorithmRelations'?: Array<EntityModelAlgorithmRelationDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetAlgorithmRelationsOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'algorithmRelations'?: Array<EntityModelAlgorithmRelationDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve all relations of an algorithm.
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

  }): Observable<{ '_embedded'?: { 'algorithmRelations'?: Array<EntityModelAlgorithmRelationDto> }, 'page'?: PageMetadata }> {

    return this.getAlgorithmRelationsOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'algorithmRelations'?: Array<EntityModelAlgorithmRelationDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'algorithmRelations'?: Array<EntityModelAlgorithmRelationDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation createAlgorithmRelation
   */
  static readonly CreateAlgorithmRelationPath = '/v1/algorithms/{algorithmId}/algorithm-relations';

  /**
   * Create a relation between two algorithms.The algorithm relation type has to be already created (e.g. via POST on /algorithm-relation-types). As a result only the ID is required for the algorithm relation type, other attributes will be ignored not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAlgorithmRelation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgorithmRelation$Response(params: {
    algorithmId: string;
      body: AlgorithmRelationDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateAlgorithmRelationPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Create a relation between two algorithms.The algorithm relation type has to be already created (e.g. via POST on /algorithm-relation-types). As a result only the ID is required for the algorithm relation type, other attributes will be ignored not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAlgorithmRelation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgorithmRelation(params: {
    algorithmId: string;
      body: AlgorithmRelationDto
  }): Observable<{ 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> }> {

    return this.createAlgorithmRelation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getAlgorithmRelation
   */
  static readonly GetAlgorithmRelationPath = '/v1/algorithms/{algorithmId}/algorithm-relations/{algorithmRelationId}';

  /**
   * Retrieve a specific relation between two algorithms.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelation$Response(params: {
    algorithmId: string;
    algorithmRelationId: string;

  }): Observable<StrictHttpResponse<{ 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetAlgorithmRelationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('algorithmRelationId', params.algorithmRelationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve a specific relation between two algorithms.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelation(params: {
    algorithmId: string;
    algorithmRelationId: string;

  }): Observable<{ 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> }> {

    return this.getAlgorithmRelation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation updateAlgorithmRelation
   */
  static readonly UpdateAlgorithmRelationPath = '/v1/algorithms/{algorithmId}/algorithm-relations/{algorithmRelationId}';

  /**
   * Update a relation between two algorithms. For the algorithm relation type only the ID is required,other algorithm relation type attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAlgorithmRelation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithmRelation$Response(params: {
    algorithmId: string;
    algorithmRelationId: string;
      body: AlgorithmRelationDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateAlgorithmRelationPath, 'put');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('algorithmRelationId', params.algorithmRelationId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Update a relation between two algorithms. For the algorithm relation type only the ID is required,other algorithm relation type attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAlgorithmRelation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithmRelation(params: {
    algorithmId: string;
    algorithmRelationId: string;
      body: AlgorithmRelationDto
  }): Observable<{ 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> }> {

    return this.updateAlgorithmRelation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'sourceAlgorithmId': string, 'targetAlgorithmId': string, 'description'?: string, 'algoRelationType': AlgorithmRelationTypeDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteAlgorithmRelation
   */
  static readonly DeleteAlgorithmRelationPath = '/v1/algorithms/{algorithmId}/algorithm-relations/{algorithmRelationId}';

  /**
   * Delete a specific relation between a two algorithms. The algorithm relation type is not affected by this.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAlgorithmRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithmRelation$Response(params: {
    algorithmId: string;
    algorithmRelationId: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteAlgorithmRelationPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('algorithmRelationId', params.algorithmRelationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a specific relation between a two algorithms. The algorithm relation type is not affected by this.
   *
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
  static readonly GetApplicationAreasOfAlgorithmPath = '/v1/algorithms/{algorithmId}/application-areas';

  /**
   * Retrieve application areas of an algorithm. If none are found an empty list is returned.
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'applicationAreas'?: Array<EntityModelApplicationAreaDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetApplicationAreasOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'applicationAreas'?: Array<EntityModelApplicationAreaDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve application areas of an algorithm. If none are found an empty list is returned.
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

  }): Observable<{ '_embedded'?: { 'applicationAreas'?: Array<EntityModelApplicationAreaDto> }, 'page'?: PageMetadata }> {

    return this.getApplicationAreasOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'applicationAreas'?: Array<EntityModelApplicationAreaDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'applicationAreas'?: Array<EntityModelApplicationAreaDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation linkAlgorithmAndApplicationArea
   */
  static readonly LinkAlgorithmAndApplicationAreaPath = '/v1/algorithms/{algorithmId}/application-areas';

  /**
   * Add a reference to an existing application area (that was previously created via a POST on e.g. /application-areas). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkAlgorithmAndApplicationArea()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndApplicationArea$Response(params: {
    algorithmId: string;
      body: ApplicationAreaDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.LinkAlgorithmAndApplicationAreaPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Add a reference to an existing application area (that was previously created via a POST on e.g. /application-areas). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkAlgorithmAndApplicationArea$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndApplicationArea(params: {
    algorithmId: string;
      body: ApplicationAreaDto
  }): Observable<void> {

    return this.linkAlgorithmAndApplicationArea$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getApplicationAreaOfAlgorithm
   */
  static readonly GetApplicationAreaOfAlgorithmPath = '/v1/algorithms/{algorithmId}/application-areas/{applicationAreaId}';

  /**
   * Retrieve a specific application area of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationAreaOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreaOfAlgorithm$Response(params: {
    algorithmId: string;
    applicationAreaId: string;

  }): Observable<StrictHttpResponse<{ 'id': string, 'name': string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetApplicationAreaOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('applicationAreaId', params.applicationAreaId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'name': string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve a specific application area of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplicationAreaOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreaOfAlgorithm(params: {
    algorithmId: string;
    applicationAreaId: string;

  }): Observable<{ 'id': string, 'name': string, '_links'?: Array<Link> }> {

    return this.getApplicationAreaOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'name': string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'name': string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation unlinkAlgorithmAndApplicationArea
   */
  static readonly UnlinkAlgorithmAndApplicationAreaPath = '/v1/algorithms/{algorithmId}/application-areas/{applicationAreaId}';

  /**
   * Delete a reference to an application area of an algorithm. The reference has to be previously created via a POST on /algorithms/{algorithmId}/application-areas).
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

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UnlinkAlgorithmAndApplicationAreaPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('applicationAreaId', params.applicationAreaId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a reference to an application area of an algorithm. The reference has to be previously created via a POST on /algorithms/{algorithmId}/application-areas).
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
  static readonly GetComputeResourcePropertiesOfAlgorithmPath = '/v1/algorithms/{algorithmId}/compute-resource-properties';

  /**
   * Retrieve the required compute resource properties of an algorithm. If none are found an empty list is returned.
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'computeResourceProperties'?: Array<EntityModelComputeResourcePropertyDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetComputeResourcePropertiesOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'computeResourceProperties'?: Array<EntityModelComputeResourcePropertyDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve the required compute resource properties of an algorithm. If none are found an empty list is returned.
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

  }): Observable<{ '_embedded'?: { 'computeResourceProperties'?: Array<EntityModelComputeResourcePropertyDto> }, 'page'?: PageMetadata }> {

    return this.getComputeResourcePropertiesOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'computeResourceProperties'?: Array<EntityModelComputeResourcePropertyDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'computeResourceProperties'?: Array<EntityModelComputeResourcePropertyDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation createComputeResourcePropertyForAlgorithm
   */
  static readonly CreateComputeResourcePropertyForAlgorithmPath = '/v1/algorithms/{algorithmId}/compute-resource-properties';

  /**
   * Add a compute resource property (e.g. a certain number of qubits) that is required by an algorithm. The compute resource property type has to be already created (e.g. via POST on /compute-resource-property-types). As a result only the ID is required for the compute resource property type, other attributes will be ignored not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createComputeResourcePropertyForAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputeResourcePropertyForAlgorithm$Response(params: {
    algorithmId: string;
      body: ComputeResourcePropertyDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateComputeResourcePropertyForAlgorithmPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Add a compute resource property (e.g. a certain number of qubits) that is required by an algorithm. The compute resource property type has to be already created (e.g. via POST on /compute-resource-property-types). As a result only the ID is required for the compute resource property type, other attributes will be ignored not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createComputeResourcePropertyForAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputeResourcePropertyForAlgorithm(params: {
    algorithmId: string;
      body: ComputeResourcePropertyDto
  }): Observable<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }> {

    return this.createComputeResourcePropertyForAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getComputeResourcePropertyOfAlgorithm
   */
  static readonly GetComputeResourcePropertyOfAlgorithmPath = '/v1/algorithms/{algorithmId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Retrieve a specific compute resource property of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputeResourcePropertyOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcePropertyOfAlgorithm$Response(params: {
    algorithmId: string;
    computeResourcePropertyId: string;

  }): Observable<StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetComputeResourcePropertyOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('computeResourcePropertyId', params.computeResourcePropertyId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve a specific compute resource property of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputeResourcePropertyOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcePropertyOfAlgorithm(params: {
    algorithmId: string;
    computeResourcePropertyId: string;

  }): Observable<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }> {

    return this.getComputeResourcePropertyOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation updateComputeResourcePropertyOfAlgorithm
   */
  static readonly UpdateComputeResourcePropertyOfAlgorithmPath = '/v1/algorithms/{algorithmId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Update a Compute resource property of an algorithm. For the compute resource property type only the ID is required, other compute resource property type attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComputeResourcePropertyOfAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputeResourcePropertyOfAlgorithm$Response(params: {
    algorithmId: string;
    computeResourcePropertyId: string;
      body: ComputeResourcePropertyDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateComputeResourcePropertyOfAlgorithmPath, 'put');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('computeResourcePropertyId', params.computeResourcePropertyId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Update a Compute resource property of an algorithm. For the compute resource property type only the ID is required, other compute resource property type attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateComputeResourcePropertyOfAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputeResourcePropertyOfAlgorithm(params: {
    algorithmId: string;
    computeResourcePropertyId: string;
      body: ComputeResourcePropertyDto
  }): Observable<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }> {

    return this.updateComputeResourcePropertyOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteComputeResourcePropertyOfAlgorithm
   */
  static readonly DeleteComputeResourcePropertyOfAlgorithmPath = '/v1/algorithms/{algorithmId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Delete a Compute resource property of an algorithm. The compute resource property type is not affected by this.
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

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteComputeResourcePropertyOfAlgorithmPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('computeResourcePropertyId', params.computeResourcePropertyId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a Compute resource property of an algorithm. The compute resource property type is not affected by this.
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
   * Path part for operation getDiscussionTopicsOfAlgorithm
   */
  static readonly GetDiscussionTopicsOfAlgorithmPath = '/v1/algorithms/{algorithmId}/discussion-topics';

  /**
   * Retrieve discussion topics of an algorithm. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionTopicsOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopicsOfAlgorithm$Response(params: {
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'discussionTopics'?: Array<EntityModelDiscussionTopicDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetDiscussionTopicsOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'discussionTopics'?: Array<EntityModelDiscussionTopicDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve discussion topics of an algorithm. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionTopicsOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopicsOfAlgorithm(params: {
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

  }): Observable<{ '_embedded'?: { 'discussionTopics'?: Array<EntityModelDiscussionTopicDto> }, 'page'?: PageMetadata }> {

    return this.getDiscussionTopicsOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'discussionTopics'?: Array<EntityModelDiscussionTopicDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'discussionTopics'?: Array<EntityModelDiscussionTopicDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation createDiscussionTopicOfAlgorithm
   */
  static readonly CreateDiscussionTopicOfAlgorithmPath = '/v1/algorithms/{algorithmId}/discussion-topics';

  /**
   * Create a discussion topic of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDiscussionTopicOfAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionTopicOfAlgorithm$Response(params: {
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
      body: DiscussionTopicDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateDiscussionTopicOfAlgorithmPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Create a discussion topic of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createDiscussionTopicOfAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionTopicOfAlgorithm(params: {
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
      body: DiscussionTopicDto
  }): Observable<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }> {

    return this.createDiscussionTopicOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getDiscussionTopicOfAlgorithm
   */
  static readonly GetDiscussionTopicOfAlgorithmPath = '/v1/algorithms/{algorithmId}/discussion-topics/{topicId}';

  /**
   * Retrieve discussion topic of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionTopicOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopicOfAlgorithm$Response(params: {
    algorithmId: string;
    topicId: string;

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

  }): Observable<StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetDiscussionTopicOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
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
        return r as StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve discussion topic of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionTopicOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopicOfAlgorithm(params: {
    algorithmId: string;
    topicId: string;

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

  }): Observable<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }> {

    return this.getDiscussionTopicOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation updateDiscussionTopicOfAlgorithm
   */
  static readonly UpdateDiscussionTopicOfAlgorithmPath = '/v1/algorithms/{algorithmId}/discussion-topics/{topicId}';

  /**
   * Update discussion topic of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDiscussionTopicOfAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionTopicOfAlgorithm$Response(params: {
    algorithmId: string;
    topicId: string;

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
      body: DiscussionTopicDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateDiscussionTopicOfAlgorithmPath, 'put');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Update discussion topic of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateDiscussionTopicOfAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionTopicOfAlgorithm(params: {
    algorithmId: string;
    topicId: string;

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
      body: DiscussionTopicDto
  }): Observable<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }> {

    return this.updateDiscussionTopicOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteDiscussionTopicOfAlgorithm
   */
  static readonly DeleteDiscussionTopicOfAlgorithmPath = '/v1/algorithms/{algorithmId}/discussion-topics/{topicId}';

  /**
   * Delete discussion topic of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDiscussionTopicOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionTopicOfAlgorithm$Response(params: {
    algorithmId: string;
    topicId: string;

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

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteDiscussionTopicOfAlgorithmPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete discussion topic of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDiscussionTopicOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionTopicOfAlgorithm(params: {
    algorithmId: string;
    topicId: string;

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

  }): Observable<void> {

    return this.deleteDiscussionTopicOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getDiscussionCommentsOfDiscussionTopicOfAlgorithm
   */
  static readonly GetDiscussionCommentsOfDiscussionTopicOfAlgorithmPath = '/v1/algorithms/{algorithmId}/discussion-topics/{topicId}/discussion-comments';

  /**
   * Retrieve discussion comments of a discussion topic of an algorithm. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionCommentsOfDiscussionTopicOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionCommentsOfDiscussionTopicOfAlgorithm$Response(params: {
    algorithmId: string;
    topicId: string;

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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'discussionComments'?: Array<EntityModelDiscussionCommentDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetDiscussionCommentsOfDiscussionTopicOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'discussionComments'?: Array<EntityModelDiscussionCommentDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve discussion comments of a discussion topic of an algorithm. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionCommentsOfDiscussionTopicOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionCommentsOfDiscussionTopicOfAlgorithm(params: {
    algorithmId: string;
    topicId: string;

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

  }): Observable<{ '_embedded'?: { 'discussionComments'?: Array<EntityModelDiscussionCommentDto> }, 'page'?: PageMetadata }> {

    return this.getDiscussionCommentsOfDiscussionTopicOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'discussionComments'?: Array<EntityModelDiscussionCommentDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'discussionComments'?: Array<EntityModelDiscussionCommentDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation createDiscussionCommentOfDiscussionTopicOfAlgorithm
   */
  static readonly CreateDiscussionCommentOfDiscussionTopicOfAlgorithmPath = '/v1/algorithms/{algorithmId}/discussion-topics/{topicId}/discussion-comments';

  /**
   * Create discussion comment of a discussion topic of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDiscussionCommentOfDiscussionTopicOfAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionCommentOfDiscussionTopicOfAlgorithm$Response(params: {
    algorithmId: string;
    topicId: string;

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
      body: DiscussionCommentDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateDiscussionCommentOfDiscussionTopicOfAlgorithmPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Create discussion comment of a discussion topic of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createDiscussionCommentOfDiscussionTopicOfAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionCommentOfDiscussionTopicOfAlgorithm(params: {
    algorithmId: string;
    topicId: string;

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
      body: DiscussionCommentDto
  }): Observable<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }> {

    return this.createDiscussionCommentOfDiscussionTopicOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getDiscussionCommentOfDiscussionTopicOfAlgorithm
   */
  static readonly GetDiscussionCommentOfDiscussionTopicOfAlgorithmPath = '/v1/algorithms/{algorithmId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

  /**
   * Retrieve discussion comment of a discussion topic of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionCommentOfDiscussionTopicOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionCommentOfDiscussionTopicOfAlgorithm$Response(params: {
    algorithmId: string;
    topicId: string;
    commentId: string;

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

  }): Observable<StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetDiscussionCommentOfDiscussionTopicOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
      rb.path('commentId', params.commentId, {});
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
        return r as StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve discussion comment of a discussion topic of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionCommentOfDiscussionTopicOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionCommentOfDiscussionTopicOfAlgorithm(params: {
    algorithmId: string;
    topicId: string;
    commentId: string;

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

  }): Observable<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }> {

    return this.getDiscussionCommentOfDiscussionTopicOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation updateDiscussionCommentOfDiscussionTopicOfAlgorithm
   */
  static readonly UpdateDiscussionCommentOfDiscussionTopicOfAlgorithmPath = '/v1/algorithms/{algorithmId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

  /**
   * Update discussion comment of a discussion topic of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDiscussionCommentOfDiscussionTopicOfAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionCommentOfDiscussionTopicOfAlgorithm$Response(params: {
    algorithmId: string;
    topicId: string;
    commentId: string;

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
      body: DiscussionCommentDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateDiscussionCommentOfDiscussionTopicOfAlgorithmPath, 'put');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
      rb.path('commentId', params.commentId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Update discussion comment of a discussion topic of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateDiscussionCommentOfDiscussionTopicOfAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionCommentOfDiscussionTopicOfAlgorithm(params: {
    algorithmId: string;
    topicId: string;
    commentId: string;

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
      body: DiscussionCommentDto
  }): Observable<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }> {

    return this.updateDiscussionCommentOfDiscussionTopicOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteDiscussionCommentOfDiscussionTopicOfAlgorithm
   */
  static readonly DeleteDiscussionCommentOfDiscussionTopicOfAlgorithmPath = '/v1/algorithms/{algorithmId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

  /**
   * Delete discussion comment of a discussion topic of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDiscussionCommentOfDiscussionTopicOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionCommentOfDiscussionTopicOfAlgorithm$Response(params: {
    algorithmId: string;
    topicId: string;
    commentId: string;

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

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteDiscussionCommentOfDiscussionTopicOfAlgorithmPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
      rb.path('commentId', params.commentId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete discussion comment of a discussion topic of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDiscussionCommentOfDiscussionTopicOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionCommentOfDiscussionTopicOfAlgorithm(params: {
    algorithmId: string;
    topicId: string;
    commentId: string;

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

  }): Observable<void> {

    return this.deleteDiscussionCommentOfDiscussionTopicOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getImplementationsOfAlgorithm
   */
  static readonly GetImplementationsOfAlgorithmPath = '/v1/algorithms/{algorithmId}/implementations';

  /**
   * Retrieve implementations of an algorithm. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationsOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfAlgorithm$Response(params: {
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'implementations'?: Array<EntityModelImplementationDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetImplementationsOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'implementations'?: Array<EntityModelImplementationDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve implementations of an algorithm. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationsOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfAlgorithm(params: {
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

  }): Observable<{ '_embedded'?: { 'implementations'?: Array<EntityModelImplementationDto> }, 'page'?: PageMetadata }> {

    return this.getImplementationsOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'implementations'?: Array<EntityModelImplementationDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'implementations'?: Array<EntityModelImplementationDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation createImplementation
   */
  static readonly CreateImplementationPath = '/v1/algorithms/{algorithmId}/implementations';

  /**
   * Define the basic properties of an implementation for an algorithm. References to sub-objects (e.g. a software platform) can be added via sub-routes (e.g. POST on /software-platforms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImplementation$Response(params: {
    algorithmId: string;
      body: ImplementationDto
  }): Observable<StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateImplementationPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)>;
      })
    );
  }

  /**
   * Define the basic properties of an implementation for an algorithm. References to sub-objects (e.g. a software platform) can be added via sub-routes (e.g. POST on /software-platforms).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImplementation(params: {
    algorithmId: string;
      body: ImplementationDto
  }): Observable<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)> {

    return this.createImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)>) => r.body as { '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto))
    );
  }

  /**
   * Path part for operation getImplementation
   */
  static readonly GetImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}';

  /**
   * Retrieve a specific implementation and its basic properties of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;

  }): Observable<StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetImplementationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)>;
      })
    );
  }

  /**
   * Retrieve a specific implementation and its basic properties of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementation(params: {
    algorithmId: string;
    implementationId: string;

  }): Observable<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)> {

    return this.getImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)>) => r.body as { '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto))
    );
  }

  /**
   * Path part for operation updateImplementation
   */
  static readonly UpdateImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}';

  /**
   * Update the basic properties of an implementation (e.g. name). References to sub-objects (e.g. a software platform) are not updated via this operation - use the corresponding sub-route for updating them (e.g. PUT on /software-platforms/{softwarePlatformId}).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
      body: ImplementationDto
  }): Observable<StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateImplementationPath, 'put');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)>;
      })
    );
  }

  /**
   * Update the basic properties of an implementation (e.g. name). References to sub-objects (e.g. a software platform) are not updated via this operation - use the corresponding sub-route for updating them (e.g. PUT on /software-platforms/{softwarePlatformId}).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImplementation(params: {
    algorithmId: string;
    implementationId: string;
      body: ImplementationDto
  }): Observable<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)> {

    return this.updateImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)>) => r.body as { '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto))
    );
  }

  /**
   * Path part for operation deleteImplementation
   */
  static readonly DeleteImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}';

  /**
   * Delete an implementation. This also removes all references to other entities (e.g. software platforms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteImplementationPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete an implementation. This also removes all references to other entities (e.g. software platforms).
   *
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
  static readonly GetComputeResourcePropertiesOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties';

  /**
   * Retrieve referenced compute resource properties of an implementation. If none are found an empty list is returned.
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'computeResourceProperties'?: Array<EntityModelComputeResourcePropertyDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetComputeResourcePropertiesOfImplementationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'computeResourceProperties'?: Array<EntityModelComputeResourcePropertyDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve referenced compute resource properties of an implementation. If none are found an empty list is returned.
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

  }): Observable<{ '_embedded'?: { 'computeResourceProperties'?: Array<EntityModelComputeResourcePropertyDto> }, 'page'?: PageMetadata }> {

    return this.getComputeResourcePropertiesOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'computeResourceProperties'?: Array<EntityModelComputeResourcePropertyDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'computeResourceProperties'?: Array<EntityModelComputeResourcePropertyDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation createComputeResourcePropertyForImplementation
   */
  static readonly CreateComputeResourcePropertyForImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties';

  /**
   * Add a compute resource property (e.g. a certain number of qubits) that is required by an implementation. The compute resource property type has to be already created (e.g. via POST on /compute-resource-property-types). As a result only the ID is required for the compute resource property type, other attributes will be ignored not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createComputeResourcePropertyForImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputeResourcePropertyForImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
      body: ComputeResourcePropertyDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateComputeResourcePropertyForImplementationPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Add a compute resource property (e.g. a certain number of qubits) that is required by an implementation. The compute resource property type has to be already created (e.g. via POST on /compute-resource-property-types). As a result only the ID is required for the compute resource property type, other attributes will be ignored not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createComputeResourcePropertyForImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputeResourcePropertyForImplementation(params: {
    algorithmId: string;
    implementationId: string;
      body: ComputeResourcePropertyDto
  }): Observable<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }> {

    return this.createComputeResourcePropertyForImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getComputeResourcePropertyOfImplementation
   */
  static readonly GetComputeResourcePropertyOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Retrieve a specific compute resource property of an implementation.
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

  }): Observable<StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetComputeResourcePropertyOfImplementationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('computeResourcePropertyId', params.computeResourcePropertyId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve a specific compute resource property of an implementation.
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

  }): Observable<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }> {

    return this.getComputeResourcePropertyOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation updateComputeResourcePropertyOfImplementation
   */
  static readonly UpdateComputeResourcePropertyOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Update a Compute resource property of an implementation. For the compute resource property type only the ID is required, other compute resource property type attributes will be ignored and not changed.
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
      body: ComputeResourcePropertyDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateComputeResourcePropertyOfImplementationPath, 'put');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('computeResourcePropertyId', params.computeResourcePropertyId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Update a Compute resource property of an implementation. For the compute resource property type only the ID is required, other compute resource property type attributes will be ignored and not changed.
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
      body: ComputeResourcePropertyDto
  }): Observable<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }> {

    return this.updateComputeResourcePropertyOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'value'?: string, 'type': ComputeResourcePropertyTypeDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteComputeResourcePropertyOfImplementation
   */
  static readonly DeleteComputeResourcePropertyOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Delete a Compute resource property of an implementation. The compute resource property type is not affected by this.
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

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteComputeResourcePropertyOfImplementationPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('computeResourcePropertyId', params.computeResourcePropertyId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a Compute resource property of an implementation. The compute resource property type is not affected by this.
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

    return this.deleteComputeResourcePropertyOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getDiscussionTopicsOfImplementation
   */
  static readonly GetDiscussionTopicsOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics';

  /**
   * Retrieve discussion topics of an implementation of an algorithm. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionTopicsOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopicsOfImplementation$Response(params: {
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'discussionTopics'?: Array<EntityModelDiscussionTopicDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetDiscussionTopicsOfImplementationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'discussionTopics'?: Array<EntityModelDiscussionTopicDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve discussion topics of an implementation of an algorithm. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionTopicsOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopicsOfImplementation(params: {
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

  }): Observable<{ '_embedded'?: { 'discussionTopics'?: Array<EntityModelDiscussionTopicDto> }, 'page'?: PageMetadata }> {

    return this.getDiscussionTopicsOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'discussionTopics'?: Array<EntityModelDiscussionTopicDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'discussionTopics'?: Array<EntityModelDiscussionTopicDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation createDiscussionTopicOfImplementation
   */
  static readonly CreateDiscussionTopicOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics';

  /**
   * Create a discussion topic of an implementation of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDiscussionTopicOfImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionTopicOfImplementation$Response(params: {
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
      body: DiscussionTopicDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateDiscussionTopicOfImplementationPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Create a discussion topic of an implementation of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createDiscussionTopicOfImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionTopicOfImplementation(params: {
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
      body: DiscussionTopicDto
  }): Observable<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }> {

    return this.createDiscussionTopicOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getDiscussionTopicOfImplementation
   */
  static readonly GetDiscussionTopicOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}';

  /**
   * Retrieve discussion topic of an implementation of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionTopicOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopicOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;

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

  }): Observable<StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetDiscussionTopicOfImplementationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('topicId', params.topicId, {});
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
        return r as StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve discussion topic of an implementation of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionTopicOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopicOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;

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

  }): Observable<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }> {

    return this.getDiscussionTopicOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation updateDiscussionTopicOfImplementation
   */
  static readonly UpdateDiscussionTopicOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}';

  /**
   * Update discussion topic of an implementation of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDiscussionTopicOfImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionTopicOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;

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
      body: DiscussionTopicDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateDiscussionTopicOfImplementationPath, 'put');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Update discussion topic of an implementation of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateDiscussionTopicOfImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionTopicOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;

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
      body: DiscussionTopicDto
  }): Observable<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }> {

    return this.updateDiscussionTopicOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'title': string, 'description'?: string, 'status': 'OPEN' | 'CLOSED', 'date': string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteDiscussionTopicOfImplementation
   */
  static readonly DeleteDiscussionTopicOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}';

  /**
   * Delete discussion topic of an implementation of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDiscussionTopicOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionTopicOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;

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

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteDiscussionTopicOfImplementationPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete discussion topic of an implementation of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDiscussionTopicOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionTopicOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;

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

  }): Observable<void> {

    return this.deleteDiscussionTopicOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getDiscussionCommentsOfDiscussionTopicOfImplementation
   */
  static readonly GetDiscussionCommentsOfDiscussionTopicOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}/discussion-comments';

  /**
   * Retrieve discussion comments of a discussion topic of an implementation of an algorithm. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionCommentsOfDiscussionTopicOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionCommentsOfDiscussionTopicOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;

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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'discussionComments'?: Array<EntityModelDiscussionCommentDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetDiscussionCommentsOfDiscussionTopicOfImplementationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('topicId', params.topicId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'discussionComments'?: Array<EntityModelDiscussionCommentDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve discussion comments of a discussion topic of an implementation of an algorithm. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionCommentsOfDiscussionTopicOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionCommentsOfDiscussionTopicOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;

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

  }): Observable<{ '_embedded'?: { 'discussionComments'?: Array<EntityModelDiscussionCommentDto> }, 'page'?: PageMetadata }> {

    return this.getDiscussionCommentsOfDiscussionTopicOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'discussionComments'?: Array<EntityModelDiscussionCommentDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'discussionComments'?: Array<EntityModelDiscussionCommentDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation createDiscussionCommentOfDiscussionTopicOfImplementation
   */
  static readonly CreateDiscussionCommentOfDiscussionTopicOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}/discussion-comments';

  /**
   * Create discussion comment of a discussion topic of an implementation of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDiscussionCommentOfDiscussionTopicOfImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionCommentOfDiscussionTopicOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;

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
      body: DiscussionCommentDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateDiscussionCommentOfDiscussionTopicOfImplementationPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Create discussion comment of a discussion topic of an implementation of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createDiscussionCommentOfDiscussionTopicOfImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionCommentOfDiscussionTopicOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;

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
      body: DiscussionCommentDto
  }): Observable<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }> {

    return this.createDiscussionCommentOfDiscussionTopicOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getDiscussionCommentOfDiscussionTopicOfImplementation
   */
  static readonly GetDiscussionCommentOfDiscussionTopicOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

  /**
   * Retrieve discussion comment of a discussion topic of an implementation of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionCommentOfDiscussionTopicOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionCommentOfDiscussionTopicOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;
    commentId: string;

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

  }): Observable<StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetDiscussionCommentOfDiscussionTopicOfImplementationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('topicId', params.topicId, {});
      rb.path('commentId', params.commentId, {});
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
        return r as StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve discussion comment of a discussion topic of an implementation of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionCommentOfDiscussionTopicOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionCommentOfDiscussionTopicOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;
    commentId: string;

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

  }): Observable<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }> {

    return this.getDiscussionCommentOfDiscussionTopicOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation updateDiscussionCommentOfDiscussionTopicOfImplementation
   */
  static readonly UpdateDiscussionCommentOfDiscussionTopicOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

  /**
   * Update discussion comment of a discussion topic of an implementation of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDiscussionCommentOfDiscussionTopicOfImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionCommentOfDiscussionTopicOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;
    commentId: string;

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
      body: DiscussionCommentDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateDiscussionCommentOfDiscussionTopicOfImplementationPath, 'put');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('topicId', params.topicId, {});
      rb.path('commentId', params.commentId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Update discussion comment of a discussion topic of an implementation of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateDiscussionCommentOfDiscussionTopicOfImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionCommentOfDiscussionTopicOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;
    commentId: string;

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
      body: DiscussionCommentDto
  }): Observable<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }> {

    return this.updateDiscussionCommentOfDiscussionTopicOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'text': string, 'date': string, 'replyTo'?: DiscussionCommentDto, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteDiscussionCommentOfDiscussionTopicOfImplementation
   */
  static readonly DeleteDiscussionCommentOfDiscussionTopicOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

  /**
   * Delete discussion comment of a discussion topic of an implementation of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDiscussionCommentOfDiscussionTopicOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionCommentOfDiscussionTopicOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;
    commentId: string;

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

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteDiscussionCommentOfDiscussionTopicOfImplementationPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('topicId', params.topicId, {});
      rb.path('commentId', params.commentId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete discussion comment of a discussion topic of an implementation of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDiscussionCommentOfDiscussionTopicOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionCommentOfDiscussionTopicOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    topicId: string;
    commentId: string;

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

  }): Observable<void> {

    return this.deleteDiscussionCommentOfDiscussionTopicOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getImplementationPackagesOfImplementation
   */
  static readonly GetImplementationPackagesOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages';

  /**
   * Retrieve discussion topics of an implementation of an algorithm. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationPackagesOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationPackagesOfImplementation$Response(params: {
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'implementationPackages'?: Array<EntityModelImplementationPackageDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetImplementationPackagesOfImplementationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'implementationPackages'?: Array<EntityModelImplementationPackageDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve discussion topics of an implementation of an algorithm. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationPackagesOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationPackagesOfImplementation(params: {
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

  }): Observable<{ '_embedded'?: { 'implementationPackages'?: Array<EntityModelImplementationPackageDto> }, 'page'?: PageMetadata }> {

    return this.getImplementationPackagesOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'implementationPackages'?: Array<EntityModelImplementationPackageDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'implementationPackages'?: Array<EntityModelImplementationPackageDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation createImplementationPackageOfImplementation
   */
  static readonly CreateImplementationPackageOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages';

  /**
   * Create a implementation package of an implementation of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createImplementationPackageOfImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImplementationPackageOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
      body: ImplementationPackageDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateImplementationPackageOfImplementationPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Create a implementation package of an implementation of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createImplementationPackageOfImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImplementationPackageOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
      body: ImplementationPackageDto
  }): Observable<{ 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> }> {

    return this.createImplementationPackageOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> }>) => r.body as { 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getImplementationPackageOfImplementation
   */
  static readonly GetImplementationPackageOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages/{implementationPackageId}';

  /**
   * Retrieve implementation package of an implementation of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationPackageOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationPackageOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    implementationPackageId: string;

  }): Observable<StrictHttpResponse<{ 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetImplementationPackageOfImplementationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('implementationPackageId', params.implementationPackageId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve implementation package of an implementation of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationPackageOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationPackageOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    implementationPackageId: string;

  }): Observable<{ 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> }> {

    return this.getImplementationPackageOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> }>) => r.body as { 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation updateImplementationPackageOfImplementation
   */
  static readonly UpdateImplementationPackageOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages/{implementationPackageId}';

  /**
   * Update implementation package of an implementation of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateImplementationPackageOfImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImplementationPackageOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    implementationPackageId: string;
      body: ImplementationPackageDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateImplementationPackageOfImplementationPath, 'put');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('implementationPackageId', params.implementationPackageId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Update implementation package of an implementation of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateImplementationPackageOfImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImplementationPackageOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    implementationPackageId: string;
      body: ImplementationPackageDto
  }): Observable<{ 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> }> {

    return this.updateImplementationPackageOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> }>) => r.body as { 'id': string, 'name'?: string, 'description'?: string, 'packageType': 'FILE' | 'TOSCA' | 'FUNCTION', '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteImplementationPackageOfImplementation
   */
  static readonly DeleteImplementationPackageOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages/{implementationPackageId}';

  /**
   * Delete implementation package of an implementation of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteImplementationPackageOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImplementationPackageOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    implementationPackageId: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteImplementationPackageOfImplementationPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('implementationPackageId', params.implementationPackageId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete implementation package of an implementation of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteImplementationPackageOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImplementationPackageOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    implementationPackageId: string;

  }): Observable<void> {

    return this.deleteImplementationPackageOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getFileOfImplementationPackage
   */
  static readonly GetFileOfImplementationPackagePath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages/{implementationPackageId}/file';

  /**
   * Retrieve the file of an implementation package
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFileOfImplementationPackage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFileOfImplementationPackage$Response(params: {
    algorithmId: string;
    implementationId: string;
    implementationPackageId: string;

  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name'?: string, 'mimeType'?: string, 'fileURL'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetFileOfImplementationPackagePath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('implementationPackageId', params.implementationPackageId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name'?: string, 'mimeType'?: string, 'fileURL'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve the file of an implementation package
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFileOfImplementationPackage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFileOfImplementationPackage(params: {
    algorithmId: string;
    implementationId: string;
    implementationPackageId: string;

  }): Observable<{ 'id'?: string, 'name'?: string, 'mimeType'?: string, 'fileURL'?: string, '_links'?: Array<Link> }> {

    return this.getFileOfImplementationPackage$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name'?: string, 'mimeType'?: string, 'fileURL'?: string, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name'?: string, 'mimeType'?: string, 'fileURL'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation createFileForImplementationPackage
   */
  static readonly CreateFileForImplementationPackagePath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages/{implementationPackageId}/file';

  /**
   * Uploads and adds a file to a given implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createFileForImplementationPackage()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createFileForImplementationPackage$Response(params: {
    algorithmId: string;
    implementationId: string;
    implementationPackageId: string;
      body?: { 'file'?: Blob }
  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name'?: string, 'mimeType'?: string, 'fileURL'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateFileForImplementationPackagePath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('implementationPackageId', params.implementationPackageId, {});

      rb.body(params.body, 'multipart/form-data');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name'?: string, 'mimeType'?: string, 'fileURL'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Uploads and adds a file to a given implementation
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createFileForImplementationPackage$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createFileForImplementationPackage(params: {
    algorithmId: string;
    implementationId: string;
    implementationPackageId: string;
      body?: { 'file'?: Blob }
  }): Observable<{ 'id'?: string, 'name'?: string, 'mimeType'?: string, 'fileURL'?: string, '_links'?: Array<Link> }> {

    return this.createFileForImplementationPackage$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name'?: string, 'mimeType'?: string, 'fileURL'?: string, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name'?: string, 'mimeType'?: string, 'fileURL'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteFileOfImplementation
   */
  static readonly DeleteFileOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages/{implementationPackageId}/file';

  /**
   * Delete a file of an implementation.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFileOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFileOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
    implementationPackageId: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteFileOfImplementationPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('implementationPackageId', params.implementationPackageId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a file of an implementation.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteFileOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFileOfImplementation(params: {
    algorithmId: string;
    implementationId: string;
    implementationPackageId: string;

  }): Observable<void> {

    return this.deleteFileOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation downloadFileContent
   */
  static readonly DownloadFileContentPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages/{implementationPackageId}/file/content';

  /**
   * Downloads a specific file content of an Implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadFileContent()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadFileContent$Response(params: {
    algorithmId: string;
    implementationId: string;
    implementationPackageId: string;

  }): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DownloadFileContentPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('implementationPackageId', params.implementationPackageId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<string>>;
      })
    );
  }

  /**
   * Downloads a specific file content of an Implementation
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadFileContent$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadFileContent(params: {
    algorithmId: string;
    implementationId: string;
    implementationPackageId: string;

  }): Observable<Array<string>> {

    return this.downloadFileContent$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation getPublicationsOfImplementation
   */
  static readonly GetPublicationsOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/publications';

  /**
   * Retrieve referenced publications of an implementation. If none are found an empty list is returned.
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetPublicationsOfImplementationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve referenced publications of an implementation. If none are found an empty list is returned.
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

  }): Observable<{ '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata }> {

    return this.getPublicationsOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation linkImplementationAndPublication
   */
  static readonly LinkImplementationAndPublicationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/publications';

  /**
   * Add a reference to an existing publication (that was previously created via a POST on e.g. /publications). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkImplementationAndPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkImplementationAndPublication$Response(params: {
    algorithmId: string;
    implementationId: string;
      body: PublicationDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.LinkImplementationAndPublicationPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Add a reference to an existing publication (that was previously created via a POST on e.g. /publications). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkImplementationAndPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkImplementationAndPublication(params: {
    algorithmId: string;
    implementationId: string;
      body: PublicationDto
  }): Observable<void> {

    return this.linkImplementationAndPublication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPublicationOfImplementation
   */
  static readonly GetPublicationOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/publications/{publicationId}';

  /**
   * Retrieve a specific publication of an implementation
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

  }): Observable<StrictHttpResponse<{ 'id': string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetPublicationOfImplementationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('publicationId', params.publicationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve a specific publication of an implementation
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

  }): Observable<{ 'id': string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }> {

    return this.getPublicationOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation unlinkImplementationAndPublication
   */
  static readonly UnlinkImplementationAndPublicationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/publications/{publicationId}';

  /**
   * Delete a reference to a publication of an implementation. The reference has to be previously created via a POST on /algorithms/{algorithmId}/implementations/{implementationId}/publications).
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

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UnlinkImplementationAndPublicationPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('publicationId', params.publicationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a reference to a publication of an implementation. The reference has to be previously created via a POST on /algorithms/{algorithmId}/implementations/{implementationId}/publications).
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
  static readonly GetSoftwarePlatformsOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/software-platforms';

  /**
   * Retrieve referenced software platform for an implementation. If none are found an empty list is returned.
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'softwarePlatforms'?: Array<EntityModelSoftwarePlatformDto> } }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetSoftwarePlatformsOfImplementationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'softwarePlatforms'?: Array<EntityModelSoftwarePlatformDto> } }>;
      })
    );
  }

  /**
   * Retrieve referenced software platform for an implementation. If none are found an empty list is returned.
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

  }): Observable<{ '_embedded'?: { 'softwarePlatforms'?: Array<EntityModelSoftwarePlatformDto> } }> {

    return this.getSoftwarePlatformsOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'softwarePlatforms'?: Array<EntityModelSoftwarePlatformDto> } }>) => r.body as { '_embedded'?: { 'softwarePlatforms'?: Array<EntityModelSoftwarePlatformDto> } })
    );
  }

  /**
   * Path part for operation linkImplementationAndSoftwarePlatform
   */
  static readonly LinkImplementationAndSoftwarePlatformPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/software-platforms';

  /**
   * Add a reference to an existing software platform (that was previously created via a POST on e.g. /software-platforms). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkImplementationAndSoftwarePlatform()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkImplementationAndSoftwarePlatform$Response(params: {
    algorithmId: string;
    implementationId: string;
      body: SoftwarePlatformDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.LinkImplementationAndSoftwarePlatformPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Add a reference to an existing software platform (that was previously created via a POST on e.g. /software-platforms). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkImplementationAndSoftwarePlatform$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkImplementationAndSoftwarePlatform(params: {
    algorithmId: string;
    implementationId: string;
      body: SoftwarePlatformDto
  }): Observable<void> {

    return this.linkImplementationAndSoftwarePlatform$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getSoftwarePlatformOfImplementation
   */
  static readonly GetSoftwarePlatformOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/software-platforms/{softwarePlatformId}';

  /**
   * Retrieve a specific software platform and its basic properties of an implementation.
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

  }): Observable<StrictHttpResponse<{ 'id': string, 'name': string, 'link'?: string, 'licence'?: string, 'version'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetSoftwarePlatformOfImplementationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('softwarePlatformId', params.softwarePlatformId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'name': string, 'link'?: string, 'licence'?: string, 'version'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve a specific software platform and its basic properties of an implementation.
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

  }): Observable<{ 'id': string, 'name': string, 'link'?: string, 'licence'?: string, 'version'?: string, '_links'?: Array<Link> }> {

    return this.getSoftwarePlatformOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'name': string, 'link'?: string, 'licence'?: string, 'version'?: string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'name': string, 'link'?: string, 'licence'?: string, 'version'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation unlinkImplementationAndSoftwarePlatform
   */
  static readonly UnlinkImplementationAndSoftwarePlatformPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/software-platforms/{softwarePlatformId}';

  /**
   * Delete a reference to a software platform of an implementation. The reference has to be previously created via a POST on /algorithms/{algorithmId}/implementations/{implementationId}/software-platforms).
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

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UnlinkImplementationAndSoftwarePlatformPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('softwarePlatformId', params.softwarePlatformId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a reference to a software platform of an implementation. The reference has to be previously created via a POST on /algorithms/{algorithmId}/implementations/{implementationId}/software-platforms).
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
  static readonly GetTagsOfImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/tags';

  /**
   * Retrieve all tags associated with a specific implementation.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTagsOfImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTagsOfImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'tags'?: Array<EntityModelTagDto> } }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetTagsOfImplementationPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_embedded'?: { 'tags'?: Array<EntityModelTagDto> } }>;
      })
    );
  }

  /**
   * Retrieve all tags associated with a specific implementation.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTagsOfImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTagsOfImplementation(params: {
    algorithmId: string;
    implementationId: string;

  }): Observable<{ '_embedded'?: { 'tags'?: Array<EntityModelTagDto> } }> {

    return this.getTagsOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'tags'?: Array<EntityModelTagDto> } }>) => r.body as { '_embedded'?: { 'tags'?: Array<EntityModelTagDto> } })
    );
  }

  /**
   * Path part for operation addTagToImplementation
   */
  static readonly AddTagToImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/tags';

  /**
   * Add a tag to an implementation. The tag does not have to exist before adding it.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addTagToImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTagToImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
      body: TagDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.AddTagToImplementationPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Add a tag to an implementation. The tag does not have to exist before adding it.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addTagToImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTagToImplementation(params: {
    algorithmId: string;
    implementationId: string;
      body: TagDto
  }): Observable<void> {

    return this.addTagToImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeTagFromImplementation
   */
  static readonly RemoveTagFromImplementationPath = '/v1/algorithms/{algorithmId}/implementations/{implementationId}/tags';

  /**
   * Remove a tag from an implementation.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeTagFromImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  removeTagFromImplementation$Response(params: {
    algorithmId: string;
    implementationId: string;
      body: TagDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.RemoveTagFromImplementationPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Remove a tag from an implementation.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeTagFromImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  removeTagFromImplementation(params: {
    algorithmId: string;
    implementationId: string;
      body: TagDto
  }): Observable<void> {

    return this.removeTagFromImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPatternRelationsOfAlgorithm
   */
  static readonly GetPatternRelationsOfAlgorithmPath = '/v1/algorithms/{algorithmId}/pattern-relations';

  /**
   * Retrieve pattern relations of an algorithms. If none are found an empty list is returned.
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'patternRelations'?: Array<EntityModelPatternRelationDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetPatternRelationsOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'patternRelations'?: Array<EntityModelPatternRelationDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve pattern relations of an algorithms. If none are found an empty list is returned.
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

  }): Observable<{ '_embedded'?: { 'patternRelations'?: Array<EntityModelPatternRelationDto> }, 'page'?: PageMetadata }> {

    return this.getPatternRelationsOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'patternRelations'?: Array<EntityModelPatternRelationDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'patternRelations'?: Array<EntityModelPatternRelationDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation createPatternRelationForAlgorithm
   */
  static readonly CreatePatternRelationForAlgorithmPath = '/v1/algorithms/{algorithmId}/pattern-relations';

  /**
   * Create a relation between a pattern and an algorithm.The pattern relation type has to be already created (e.g. via POST on /pattern-relation-types). As a result only the ID is required for the pattern relation type, other attributes will be ignored not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPatternRelationForAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelationForAlgorithm$Response(params: {
    algorithmId: string;
      body: PatternRelationDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreatePatternRelationForAlgorithmPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Create a relation between a pattern and an algorithm.The pattern relation type has to be already created (e.g. via POST on /pattern-relation-types). As a result only the ID is required for the pattern relation type, other attributes will be ignored not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPatternRelationForAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelationForAlgorithm(params: {
    algorithmId: string;
      body: PatternRelationDto
  }): Observable<{ 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }> {

    return this.createPatternRelationForAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getPatternRelationOfAlgorithm
   */
  static readonly GetPatternRelationOfAlgorithmPath = '/v1/algorithms/{algorithmId}/pattern-relations/{patternRelationId}';

  /**
   * Retrieve a specific relation between a pattern and an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelationOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationOfAlgorithm$Response(params: {
    algorithmId: string;
    patternRelationId: string;

  }): Observable<StrictHttpResponse<{ 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetPatternRelationOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('patternRelationId', params.patternRelationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve a specific relation between a pattern and an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternRelationOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationOfAlgorithm(params: {
    algorithmId: string;
    patternRelationId: string;

  }): Observable<{ 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }> {

    return this.getPatternRelationOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation updatePatternRelationOfAlgorithm
   */
  static readonly UpdatePatternRelationOfAlgorithmPath = '/v1/algorithms/{algorithmId}/pattern-relations/{patternRelationId}';

  /**
   * Update a relation between a pattern and an algorithm. For the pattern relation type only the ID is required,other pattern relation type attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatternRelationOfAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelationOfAlgorithm$Response(params: {
    algorithmId: string;
    patternRelationId: string;
      body: PatternRelationDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdatePatternRelationOfAlgorithmPath, 'put');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('patternRelationId', params.patternRelationId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Update a relation between a pattern and an algorithm. For the pattern relation type only the ID is required,other pattern relation type attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePatternRelationOfAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelationOfAlgorithm(params: {
    algorithmId: string;
    patternRelationId: string;
      body: PatternRelationDto
  }): Observable<{ 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }> {

    return this.updatePatternRelationOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'algorithmId': string, 'pattern': string, 'patternRelationType': PatternRelationTypeDto, 'description'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deletePatternRelationOfAlgorithm
   */
  static readonly DeletePatternRelationOfAlgorithmPath = '/v1/algorithms/{algorithmId}/pattern-relations/{patternRelationId}';

  /**
   * Delete a specific relation between a pattern and an algorithm. The pattern relation type is not affected by this.
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

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeletePatternRelationOfAlgorithmPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('patternRelationId', params.patternRelationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a specific relation between a pattern and an algorithm. The pattern relation type is not affected by this.
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
  static readonly GetProblemTypesOfAlgorithmPath = '/v1/algorithms/{algorithmId}/problem-types';

  /**
   * Retrieve problem types of an algorithm. If none are found an empty list is returned.
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'problemTypes'?: Array<EntityModelProblemTypeDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetProblemTypesOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'problemTypes'?: Array<EntityModelProblemTypeDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve problem types of an algorithm. If none are found an empty list is returned.
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

  }): Observable<{ '_embedded'?: { 'problemTypes'?: Array<EntityModelProblemTypeDto> }, 'page'?: PageMetadata }> {

    return this.getProblemTypesOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'problemTypes'?: Array<EntityModelProblemTypeDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'problemTypes'?: Array<EntityModelProblemTypeDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation linkAlgorithmAndProblemType
   */
  static readonly LinkAlgorithmAndProblemTypePath = '/v1/algorithms/{algorithmId}/problem-types';

  /**
   * Add a reference to an existing ProblemType (that was previously created via a POST on /problem-types). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkAlgorithmAndProblemType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndProblemType$Response(params: {
    algorithmId: string;
      body: ProblemTypeDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.LinkAlgorithmAndProblemTypePath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Add a reference to an existing ProblemType (that was previously created via a POST on /problem-types). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkAlgorithmAndProblemType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndProblemType(params: {
    algorithmId: string;
      body: ProblemTypeDto
  }): Observable<void> {

    return this.linkAlgorithmAndProblemType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProblemTypeOfAlgorithm
   */
  static readonly GetProblemTypeOfAlgorithmPath = '/v1/algorithms/{algorithmId}/problem-types/{problemTypeId}';

  /**
   * Retrieve a specific problem type of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProblemTypeOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypeOfAlgorithm$Response(params: {
    algorithmId: string;
    problemTypeId: string;

  }): Observable<StrictHttpResponse<{ 'id': string, 'name': string, 'parentProblemType'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetProblemTypeOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('problemTypeId', params.problemTypeId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'name': string, 'parentProblemType'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve a specific problem type of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProblemTypeOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypeOfAlgorithm(params: {
    algorithmId: string;
    problemTypeId: string;

  }): Observable<{ 'id': string, 'name': string, 'parentProblemType'?: string, '_links'?: Array<Link> }> {

    return this.getProblemTypeOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'name': string, 'parentProblemType'?: string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'name': string, 'parentProblemType'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation unlinkAlgorithmAndProblemType
   */
  static readonly UnlinkAlgorithmAndProblemTypePath = '/v1/algorithms/{algorithmId}/problem-types/{problemTypeId}';

  /**
   * Delete a reference to a problem types of an algorithm. The reference has to be previously created via a POST on e.g. /algorithms/{algorithmId}/problem-types).
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

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UnlinkAlgorithmAndProblemTypePath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('problemTypeId', params.problemTypeId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a reference to a problem types of an algorithm. The reference has to be previously created via a POST on e.g. /algorithms/{algorithmId}/problem-types).
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
  static readonly GetPublicationsOfAlgorithmPath = '/v1/algorithms/{algorithmId}/publications';

  /**
   * Retrieve referenced publications of an algorithm. If none are found an empty list is returned.
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetPublicationsOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve referenced publications of an algorithm. If none are found an empty list is returned.
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

  }): Observable<{ '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata }> {

    return this.getPublicationsOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation linkAlgorithmAndPublication
   */
  static readonly LinkAlgorithmAndPublicationPath = '/v1/algorithms/{algorithmId}/publications';

  /**
   * Add a reference to an existing publication (that was previously created via a POST on e.g. /publications). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkAlgorithmAndPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndPublication$Response(params: {
    algorithmId: string;
      body: PublicationDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.LinkAlgorithmAndPublicationPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Add a reference to an existing publication (that was previously created via a POST on e.g. /publications). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkAlgorithmAndPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndPublication(params: {
    algorithmId: string;
      body: PublicationDto
  }): Observable<void> {

    return this.linkAlgorithmAndPublication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPublicationOfAlgorithm
   */
  static readonly GetPublicationOfAlgorithmPath = '/v1/algorithms/{algorithmId}/publications/{publicationId}';

  /**
   * Retrieve a specific publication and its basic properties of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublicationOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationOfAlgorithm$Response(params: {
    algorithmId: string;
    publicationId: string;

  }): Observable<StrictHttpResponse<{ 'id': string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetPublicationOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('publicationId', params.publicationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve a specific publication and its basic properties of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublicationOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationOfAlgorithm(params: {
    algorithmId: string;
    publicationId: string;

  }): Observable<{ 'id': string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }> {

    return this.getPublicationOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation unlinkAlgorithmAndPublication
   */
  static readonly UnlinkAlgorithmAndPublicationPath = '/v1/algorithms/{algorithmId}/publications/{publicationId}';

  /**
   * Delete a reference to a publication of an algorithm. The reference has to be previously created via a POST on /algorithms/{algorithmId}/publications).
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

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UnlinkAlgorithmAndPublicationPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('publicationId', params.publicationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a reference to a publication of an algorithm. The reference has to be previously created via a POST on /algorithms/{algorithmId}/publications).
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
   * Path part for operation getAlgorithmRevisions
   */
  static readonly GetAlgorithmRevisionsPath = '/v1/algorithms/{algorithmId}/revisions';

  /**
   * Retrieve all algorithm revisions
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmRevisions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRevisions$Response(params: {
    algorithmId: string;

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'revisions'?: Array<EntityModelRevisionDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetAlgorithmRevisionsPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_embedded'?: { 'revisions'?: Array<EntityModelRevisionDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve all algorithm revisions
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmRevisions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRevisions(params: {
    algorithmId: string;

  }): Observable<{ '_embedded'?: { 'revisions'?: Array<EntityModelRevisionDto> }, 'page'?: PageMetadata }> {

    return this.getAlgorithmRevisions$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'revisions'?: Array<EntityModelRevisionDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'revisions'?: Array<EntityModelRevisionDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation getAlgorithmRevision
   */
  static readonly GetAlgorithmRevisionPath = '/v1/algorithms/{algorithmId}/revisions/{revisionId}';

  /**
   * Retrieve a specific revision of an algorithm with its properties
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmRevision()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRevision$Response(params: {
    algorithmId: string;
    revisionId: number;

  }): Observable<StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetAlgorithmRevisionPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('revisionId', params.revisionId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)>;
      })
    );
  }

  /**
   * Retrieve a specific revision of an algorithm with its properties
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmRevision$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRevision(params: {
    algorithmId: string;
    revisionId: number;

  }): Observable<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)> {

    return this.getAlgorithmRevision$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)>) => r.body as { '_links'?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto))
    );
  }

  /**
   * Path part for operation getSketches
   */
  static readonly GetSketchesPath = '/v1/algorithms/{algorithmId}/sketches';

  /**
   * Retrieve all sketches for a specific algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSketches()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSketches$Response(params: {
    algorithmId: string;

  }): Observable<StrictHttpResponse<Array<EntityModelSketchDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetSketchesPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<EntityModelSketchDto>>;
      })
    );
  }

  /**
   * Retrieve all sketches for a specific algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSketches$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSketches(params: {
    algorithmId: string;

  }): Observable<Array<EntityModelSketchDto>> {

    return this.getSketches$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EntityModelSketchDto>>) => r.body as Array<EntityModelSketchDto>)
    );
  }

  /**
   * Path part for operation uploadSketch
   */
  static readonly UploadSketchPath = '/v1/algorithms/{algorithmId}/sketches';

  /**
   * Add a Sketch to the algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadSketch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadSketch$Response(params: {
    algorithmId: string;
    description: string;
    baseURL: string;
      body?: { 'file'?: Blob }
  }): Observable<StrictHttpResponse<{ 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UploadSketchPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.query('description', params.description, {});
      rb.query('baseURL', params.baseURL, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Add a Sketch to the algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadSketch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadSketch(params: {
    algorithmId: string;
    description: string;
    baseURL: string;
      body?: { 'file'?: Blob }
  }): Observable<{ 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> }> {

    return this.uploadSketch$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getSketch
   */
  static readonly GetSketchPath = '/v1/algorithms/{algorithmId}/sketches/{sketchId}';

  /**
   * Retrieve a specific Sketch and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSketch()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSketch$Response(params: {
    algorithmId: string;
    sketchId: string;

  }): Observable<StrictHttpResponse<{ 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetSketchPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('sketchId', params.sketchId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve a specific Sketch and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSketch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSketch(params: {
    algorithmId: string;
    sketchId: string;

  }): Observable<{ 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> }> {

    return this.getSketch$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation updateSketch
   */
  static readonly UpdateSketchPath = '/v1/algorithms/{algorithmId}/sketches/{sketchId}';

  /**
   * Update the properties of a sketch.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSketch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSketch$Response(params: {
    algorithmId: string;
    sketchId: string;
      body: SketchDto
  }): Observable<StrictHttpResponse<{ 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateSketchPath, 'put');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('sketchId', params.sketchId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Update the properties of a sketch.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSketch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSketch(params: {
    algorithmId: string;
    sketchId: string;
      body: SketchDto
  }): Observable<{ 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> }> {

    return this.updateSketch$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'imageURL'?: string, 'description'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteSketch
   */
  static readonly DeleteSketchPath = '/v1/algorithms/{algorithmId}/sketches/{sketchId}';

  /**
   * Delete a sketch of the algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSketch()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSketch$Response(params: {
    algorithmId: string;
    sketchId: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteSketchPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('sketchId', params.sketchId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a sketch of the algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSketch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSketch(params: {
    algorithmId: string;
    sketchId: string;

  }): Observable<void> {

    return this.deleteSketch$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getSketchImage
   */
  static readonly GetSketchImagePath = '/v1/algorithms/{algorithmId}/sketches/{sketchId}/image';

  /**
   * Retrieve the image of specific Sketch.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSketchImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSketchImage$Response(params: {
    algorithmId: string;
    sketchId: string;

  }): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetSketchImagePath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('sketchId', params.sketchId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<string>>;
      })
    );
  }

  /**
   * Retrieve the image of specific Sketch.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSketchImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSketchImage(params: {
    algorithmId: string;
    sketchId: string;

  }): Observable<Array<string>> {

    return this.getSketchImage$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'tags'?: Array<EntityModelTagDto> } }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetTagsOfAlgorithmPath, 'get');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_embedded'?: { 'tags'?: Array<EntityModelTagDto> } }>;
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

  }): Observable<{ '_embedded'?: { 'tags'?: Array<EntityModelTagDto> } }> {

    return this.getTagsOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'tags'?: Array<EntityModelTagDto> } }>) => r.body as { '_embedded'?: { 'tags'?: Array<EntityModelTagDto> } })
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
      body: TagDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.AddTagToAlgorithmPath, 'post');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
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
      body: TagDto
  }): Observable<void> {

    return this.addTagToAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeTagFromAlgorithm
   */
  static readonly RemoveTagFromAlgorithmPath = '/v1/algorithms/{algorithmId}/tags';

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
      body: TagDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.RemoveTagFromAlgorithmPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
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
      body: TagDto
  }): Observable<void> {

    return this.removeTagFromAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
