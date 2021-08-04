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
import { ApplicationAreaDto } from '../models/application-area-dto';
import { ComputeResourcePropertyDto } from '../models/compute-resource-property-dto';
import { DiscussionCommentDto } from '../models/discussion-comment-dto';
import { DiscussionTopicDto } from '../models/discussion-topic-dto';
import { FileDto } from '../models/file-dto';
import { ImplementationDto } from '../models/implementation-dto';
import { ImplementationPackageDto } from '../models/implementation-package-dto';
import { LearningMethodDto } from '../models/learning-method-dto';
import { PageAlgorithmDto } from '../models/page-algorithm-dto';
import { PageAlgorithmRelationDto } from '../models/page-algorithm-relation-dto';
import { PageApplicationAreaDto } from '../models/page-application-area-dto';
import { PageComputeResourcePropertyDto } from '../models/page-compute-resource-property-dto';
import { PageDiscussionCommentDto } from '../models/page-discussion-comment-dto';
import { PageDiscussionTopicDto } from '../models/page-discussion-topic-dto';
import { PageImplementationDto } from '../models/page-implementation-dto';
import { PageImplementationPackageDto } from '../models/page-implementation-package-dto';
import { PageLearningMethodDto } from '../models/page-learning-method-dto';
import { PagePatternRelationDto } from '../models/page-pattern-relation-dto';
import { PageProblemTypeDto } from '../models/page-problem-type-dto';
import { PagePublicationDto } from '../models/page-publication-dto';
import { PageRevisionDto } from '../models/page-revision-dto';
import { PageSoftwarePlatformDto } from '../models/page-software-platform-dto';
import { PatternRelationDto } from '../models/pattern-relation-dto';
import { ProblemTypeDto } from '../models/problem-type-dto';
import { PublicationDto } from '../models/publication-dto';
import { SketchDto } from '../models/sketch-dto';
import { SoftwarePlatformDto } from '../models/software-platform-dto';
import { TagDto } from '../models/tag-dto';
import { Sort } from '../models/sort';

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
  static readonly GetAlgorithmsPath = '/algorithms';

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
  }): Observable<StrictHttpResponse<PageAlgorithmDto>> {
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
          return r as StrictHttpResponse<PageAlgorithmDto>;
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
  }): Observable<PageAlgorithmDto> {
    return this.getAlgorithms$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageAlgorithmDto>) => r.body as PageAlgorithmDto
      )
    );
  }

  /**
   * Path part for operation createAlgorithm
   */
  static readonly CreateAlgorithmPath = '/algorithms';

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
  }): Observable<StrictHttpResponse<AlgorithmDto>> {
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
          return r as StrictHttpResponse<AlgorithmDto>;
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
  createAlgorithm(params: { body: AlgorithmDto }): Observable<AlgorithmDto> {
    return this.createAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<AlgorithmDto>) => r.body as AlgorithmDto)
    );
  }

  /**
   * Path part for operation getAlgorithm
   */
  static readonly GetAlgorithmPath = '/algorithms/{algorithmId}';

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
  }): Observable<StrictHttpResponse<AlgorithmDto>> {
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
          return r as StrictHttpResponse<AlgorithmDto>;
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
  getAlgorithm(params: { algorithmId: string }): Observable<AlgorithmDto> {
    return this.getAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<AlgorithmDto>) => r.body as AlgorithmDto)
    );
  }

  /**
   * Path part for operation updateAlgorithm
   */
  static readonly UpdateAlgorithmPath = '/algorithms/{algorithmId}';

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
    body: AlgorithmDto;
  }): Observable<StrictHttpResponse<AlgorithmDto>> {
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
          return r as StrictHttpResponse<AlgorithmDto>;
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
    body: AlgorithmDto;
  }): Observable<AlgorithmDto> {
    return this.updateAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<AlgorithmDto>) => r.body as AlgorithmDto)
    );
  }

  /**
   * Path part for operation deleteAlgorithm
   */
  static readonly DeleteAlgorithmPath = '/algorithms/{algorithmId}';

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
   * Delete an algorithm. This also deletes all entities that depend on it (e.g. the algorithm's relations to other algorithms).
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
    '/algorithms/{algorithmId}/algorithm-relations';

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
    sort?: Sort;
  }): Observable<StrictHttpResponse<PageAlgorithmRelationDto>> {
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
          return r as StrictHttpResponse<PageAlgorithmRelationDto>;
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
    sort?: Sort;
  }): Observable<PageAlgorithmRelationDto> {
    return this.getAlgorithmRelationsOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageAlgorithmRelationDto>) =>
          r.body as PageAlgorithmRelationDto
      )
    );
  }

  /**
   * Path part for operation createAlgorithmRelation
   */
  static readonly CreateAlgorithmRelationPath =
    '/algorithms/{algorithmId}/algorithm-relations';

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
    body: AlgorithmRelationDto;
  }): Observable<StrictHttpResponse<AlgorithmRelationDto>> {
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
          return r as StrictHttpResponse<AlgorithmRelationDto>;
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
    body: AlgorithmRelationDto;
  }): Observable<AlgorithmRelationDto> {
    return this.createAlgorithmRelation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<AlgorithmRelationDto>) =>
          r.body as AlgorithmRelationDto
      )
    );
  }

  /**
   * Path part for operation getAlgorithmRelation
   */
  static readonly GetAlgorithmRelationPath =
    '/algorithms/{algorithmId}/algorithm-relations/{algorithmRelationId}';

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
  }): Observable<StrictHttpResponse<AlgorithmRelationDto>> {
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
          return r as StrictHttpResponse<AlgorithmRelationDto>;
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
  }): Observable<AlgorithmRelationDto> {
    return this.getAlgorithmRelation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<AlgorithmRelationDto>) =>
          r.body as AlgorithmRelationDto
      )
    );
  }

  /**
   * Path part for operation updateAlgorithmRelation
   */
  static readonly UpdateAlgorithmRelationPath =
    '/algorithms/{algorithmId}/algorithm-relations/{algorithmRelationId}';

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
    body: AlgorithmRelationDto;
  }): Observable<StrictHttpResponse<AlgorithmRelationDto>> {
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
          return r as StrictHttpResponse<AlgorithmRelationDto>;
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
    body: AlgorithmRelationDto;
  }): Observable<AlgorithmRelationDto> {
    return this.updateAlgorithmRelation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<AlgorithmRelationDto>) =>
          r.body as AlgorithmRelationDto
      )
    );
  }

  /**
   * Path part for operation deleteAlgorithmRelation
   */
  static readonly DeleteAlgorithmRelationPath =
    '/algorithms/{algorithmId}/algorithm-relations/{algorithmRelationId}';

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
  static readonly GetApplicationAreasOfAlgorithmPath =
    '/algorithms/{algorithmId}/application-areas';

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
  }): Observable<StrictHttpResponse<PageApplicationAreaDto>> {
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
          return r as StrictHttpResponse<PageApplicationAreaDto>;
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
  }): Observable<PageApplicationAreaDto> {
    return this.getApplicationAreasOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageApplicationAreaDto>) =>
          r.body as PageApplicationAreaDto
      )
    );
  }

  /**
   * Path part for operation linkAlgorithmAndApplicationArea
   */
  static readonly LinkAlgorithmAndApplicationAreaPath =
    '/algorithms/{algorithmId}/application-areas';

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
    body: ApplicationAreaDto;
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
   * Add a reference to an existing application area (that was previously created via a POST on e.g. /application-areas). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkAlgorithmAndApplicationArea$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndApplicationArea(params: {
    algorithmId: string;
    body: ApplicationAreaDto;
  }): Observable<void> {
    return this.linkAlgorithmAndApplicationArea$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getApplicationAreaOfAlgorithm
   */
  static readonly GetApplicationAreaOfAlgorithmPath =
    '/algorithms/{algorithmId}/application-areas/{applicationAreaId}';

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
  }): Observable<StrictHttpResponse<ApplicationAreaDto>> {
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
          return r as StrictHttpResponse<ApplicationAreaDto>;
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
  }): Observable<ApplicationAreaDto> {
    return this.getApplicationAreaOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ApplicationAreaDto>) =>
          r.body as ApplicationAreaDto
      )
    );
  }

  /**
   * Path part for operation unlinkAlgorithmAndApplicationArea
   */
  static readonly UnlinkAlgorithmAndApplicationAreaPath =
    '/algorithms/{algorithmId}/application-areas/{applicationAreaId}';

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
  static readonly GetComputeResourcePropertiesOfAlgorithmPath =
    '/algorithms/{algorithmId}/compute-resource-properties';

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
  }): Observable<StrictHttpResponse<PageComputeResourcePropertyDto>> {
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
          return r as StrictHttpResponse<PageComputeResourcePropertyDto>;
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
  }): Observable<PageComputeResourcePropertyDto> {
    return this.getComputeResourcePropertiesOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageComputeResourcePropertyDto>) =>
          r.body as PageComputeResourcePropertyDto
      )
    );
  }

  /**
   * Path part for operation createComputeResourcePropertyForAlgorithm
   */
  static readonly CreateComputeResourcePropertyForAlgorithmPath =
    '/algorithms/{algorithmId}/compute-resource-properties';

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
    body: ComputeResourcePropertyDto;
  }): Observable<StrictHttpResponse<ComputeResourcePropertyDto>> {
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
          return r as StrictHttpResponse<ComputeResourcePropertyDto>;
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
    body: ComputeResourcePropertyDto;
  }): Observable<ComputeResourcePropertyDto> {
    return this.createComputeResourcePropertyForAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ComputeResourcePropertyDto>) =>
          r.body as ComputeResourcePropertyDto
      )
    );
  }

  /**
   * Path part for operation getComputeResourcePropertyOfAlgorithm
   */
  static readonly GetComputeResourcePropertyOfAlgorithmPath =
    '/algorithms/{algorithmId}/compute-resource-properties/{computeResourcePropertyId}';

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
  }): Observable<StrictHttpResponse<ComputeResourcePropertyDto>> {
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
          return r as StrictHttpResponse<ComputeResourcePropertyDto>;
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
  }): Observable<ComputeResourcePropertyDto> {
    return this.getComputeResourcePropertyOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ComputeResourcePropertyDto>) =>
          r.body as ComputeResourcePropertyDto
      )
    );
  }

  /**
   * Path part for operation updateComputeResourcePropertyOfAlgorithm
   */
  static readonly UpdateComputeResourcePropertyOfAlgorithmPath =
    '/algorithms/{algorithmId}/compute-resource-properties/{computeResourcePropertyId}';

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
    body: ComputeResourcePropertyDto;
  }): Observable<StrictHttpResponse<ComputeResourcePropertyDto>> {
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
          return r as StrictHttpResponse<ComputeResourcePropertyDto>;
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
    body: ComputeResourcePropertyDto;
  }): Observable<ComputeResourcePropertyDto> {
    return this.updateComputeResourcePropertyOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ComputeResourcePropertyDto>) =>
          r.body as ComputeResourcePropertyDto
      )
    );
  }

  /**
   * Path part for operation deleteComputeResourcePropertyOfAlgorithm
   */
  static readonly DeleteComputeResourcePropertyOfAlgorithmPath =
    '/algorithms/{algorithmId}/compute-resource-properties/{computeResourcePropertyId}';

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
  static readonly GetDiscussionTopicsOfAlgorithmPath =
    '/algorithms/{algorithmId}/discussion-topics';

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
  }): Observable<StrictHttpResponse<PageDiscussionTopicDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetDiscussionTopicsOfAlgorithmPath,
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
          return r as StrictHttpResponse<PageDiscussionTopicDto>;
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
  }): Observable<PageDiscussionTopicDto> {
    return this.getDiscussionTopicsOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageDiscussionTopicDto>) =>
          r.body as PageDiscussionTopicDto
      )
    );
  }

  /**
   * Path part for operation createDiscussionTopicOfAlgorithm
   */
  static readonly CreateDiscussionTopicOfAlgorithmPath =
    '/algorithms/{algorithmId}/discussion-topics';

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
    body: DiscussionTopicDto;
  }): Observable<StrictHttpResponse<DiscussionTopicDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.CreateDiscussionTopicOfAlgorithmPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

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
          return r as StrictHttpResponse<DiscussionTopicDto>;
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
    body: DiscussionTopicDto;
  }): Observable<DiscussionTopicDto> {
    return this.createDiscussionTopicOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<DiscussionTopicDto>) =>
          r.body as DiscussionTopicDto
      )
    );
  }

  /**
   * Path part for operation getDiscussionTopicOfAlgorithm
   */
  static readonly GetDiscussionTopicOfAlgorithmPath =
    '/algorithms/{algorithmId}/discussion-topics/{topicId}';

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
  }): Observable<StrictHttpResponse<DiscussionTopicDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetDiscussionTopicOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
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
          return r as StrictHttpResponse<DiscussionTopicDto>;
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
  }): Observable<DiscussionTopicDto> {
    return this.getDiscussionTopicOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<DiscussionTopicDto>) =>
          r.body as DiscussionTopicDto
      )
    );
  }

  /**
   * Path part for operation updateDiscussionTopicOfAlgorithm
   */
  static readonly UpdateDiscussionTopicOfAlgorithmPath =
    '/algorithms/{algorithmId}/discussion-topics/{topicId}';

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
    body: DiscussionTopicDto;
  }): Observable<StrictHttpResponse<DiscussionTopicDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdateDiscussionTopicOfAlgorithmPath,
      'put'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

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
          return r as StrictHttpResponse<DiscussionTopicDto>;
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
    body: DiscussionTopicDto;
  }): Observable<DiscussionTopicDto> {
    return this.updateDiscussionTopicOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<DiscussionTopicDto>) =>
          r.body as DiscussionTopicDto
      )
    );
  }

  /**
   * Path part for operation deleteDiscussionTopicOfAlgorithm
   */
  static readonly DeleteDiscussionTopicOfAlgorithmPath =
    '/algorithms/{algorithmId}/discussion-topics/{topicId}';

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
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteDiscussionTopicOfAlgorithmPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
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
  static readonly GetDiscussionCommentsOfDiscussionTopicOfAlgorithmPath =
    '/algorithms/{algorithmId}/discussion-topics/{topicId}/discussion-comments';

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
  }): Observable<StrictHttpResponse<PageDiscussionCommentDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetDiscussionCommentsOfDiscussionTopicOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
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
          return r as StrictHttpResponse<PageDiscussionCommentDto>;
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
  }): Observable<PageDiscussionCommentDto> {
    return this.getDiscussionCommentsOfDiscussionTopicOfAlgorithm$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<PageDiscussionCommentDto>) =>
          r.body as PageDiscussionCommentDto
      )
    );
  }

  /**
   * Path part for operation createDiscussionCommentOfDiscussionTopicOfAlgorithm
   */
  static readonly CreateDiscussionCommentOfDiscussionTopicOfAlgorithmPath =
    '/algorithms/{algorithmId}/discussion-topics/{topicId}/discussion-comments';

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
    body: DiscussionCommentDto;
  }): Observable<StrictHttpResponse<DiscussionCommentDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.CreateDiscussionCommentOfDiscussionTopicOfAlgorithmPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

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
          return r as StrictHttpResponse<DiscussionCommentDto>;
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
    body: DiscussionCommentDto;
  }): Observable<DiscussionCommentDto> {
    return this.createDiscussionCommentOfDiscussionTopicOfAlgorithm$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<DiscussionCommentDto>) =>
          r.body as DiscussionCommentDto
      )
    );
  }

  /**
   * Path part for operation getDiscussionCommentOfDiscussionTopicOfAlgorithm
   */
  static readonly GetDiscussionCommentOfDiscussionTopicOfAlgorithmPath =
    '/algorithms/{algorithmId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

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
  }): Observable<StrictHttpResponse<DiscussionCommentDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetDiscussionCommentOfDiscussionTopicOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
      rb.path('commentId', params.commentId, {});
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
          return r as StrictHttpResponse<DiscussionCommentDto>;
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
  }): Observable<DiscussionCommentDto> {
    return this.getDiscussionCommentOfDiscussionTopicOfAlgorithm$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<DiscussionCommentDto>) =>
          r.body as DiscussionCommentDto
      )
    );
  }

  /**
   * Path part for operation updateDiscussionCommentOfDiscussionTopicOfAlgorithm
   */
  static readonly UpdateDiscussionCommentOfDiscussionTopicOfAlgorithmPath =
    '/algorithms/{algorithmId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

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
    body: DiscussionCommentDto;
  }): Observable<StrictHttpResponse<DiscussionCommentDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdateDiscussionCommentOfDiscussionTopicOfAlgorithmPath,
      'put'
    );
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
          return r as StrictHttpResponse<DiscussionCommentDto>;
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
    body: DiscussionCommentDto;
  }): Observable<DiscussionCommentDto> {
    return this.updateDiscussionCommentOfDiscussionTopicOfAlgorithm$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<DiscussionCommentDto>) =>
          r.body as DiscussionCommentDto
      )
    );
  }

  /**
   * Path part for operation deleteDiscussionCommentOfDiscussionTopicOfAlgorithm
   */
  static readonly DeleteDiscussionCommentOfDiscussionTopicOfAlgorithmPath =
    '/algorithms/{algorithmId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

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
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteDiscussionCommentOfDiscussionTopicOfAlgorithmPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('topicId', params.topicId, {});
      rb.path('commentId', params.commentId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
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
    return this.deleteDiscussionCommentOfDiscussionTopicOfAlgorithm$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation getImplementationsOfAlgorithm
   */
  static readonly GetImplementationsOfAlgorithmPath =
    '/algorithms/{algorithmId}/implementations';

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
  }): Observable<StrictHttpResponse<PageImplementationDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetImplementationsOfAlgorithmPath,
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
          return r as StrictHttpResponse<PageImplementationDto>;
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
  }): Observable<PageImplementationDto> {
    return this.getImplementationsOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageImplementationDto>) =>
          r.body as PageImplementationDto
      )
    );
  }

  /**
   * Path part for operation createImplementation
   */
  static readonly CreateImplementationPath =
    '/algorithms/{algorithmId}/implementations';

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
    body: ImplementationDto;
  }): Observable<StrictHttpResponse<ImplementationDto>> {
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
          return r as StrictHttpResponse<ImplementationDto>;
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
    body: ImplementationDto;
  }): Observable<ImplementationDto> {
    return this.createImplementation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ImplementationDto>) =>
          r.body as ImplementationDto
      )
    );
  }

  /**
   * Path part for operation getImplementation
   */
  static readonly GetImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}';

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
  }): Observable<StrictHttpResponse<ImplementationDto>> {
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
          return r as StrictHttpResponse<ImplementationDto>;
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
  }): Observable<ImplementationDto> {
    return this.getImplementation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ImplementationDto>) =>
          r.body as ImplementationDto
      )
    );
  }

  /**
   * Path part for operation updateImplementation
   */
  static readonly UpdateImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}';

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
    body: ImplementationDto;
  }): Observable<StrictHttpResponse<ImplementationDto>> {
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
          return r as StrictHttpResponse<ImplementationDto>;
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
    body: ImplementationDto;
  }): Observable<ImplementationDto> {
    return this.updateImplementation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ImplementationDto>) =>
          r.body as ImplementationDto
      )
    );
  }

  /**
   * Path part for operation deleteImplementation
   */
  static readonly DeleteImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}';

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
  static readonly GetComputeResourcePropertiesOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties';

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
  }): Observable<StrictHttpResponse<PageComputeResourcePropertyDto>> {
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
          return r as StrictHttpResponse<PageComputeResourcePropertyDto>;
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
  }): Observable<PageComputeResourcePropertyDto> {
    return this.getComputeResourcePropertiesOfImplementation$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<PageComputeResourcePropertyDto>) =>
          r.body as PageComputeResourcePropertyDto
      )
    );
  }

  /**
   * Path part for operation createComputeResourcePropertyForImplementation
   */
  static readonly CreateComputeResourcePropertyForImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties';

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
    body: ComputeResourcePropertyDto;
  }): Observable<StrictHttpResponse<ComputeResourcePropertyDto>> {
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
          return r as StrictHttpResponse<ComputeResourcePropertyDto>;
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
    body: ComputeResourcePropertyDto;
  }): Observable<ComputeResourcePropertyDto> {
    return this.createComputeResourcePropertyForImplementation$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<ComputeResourcePropertyDto>) =>
          r.body as ComputeResourcePropertyDto
      )
    );
  }

  /**
   * Path part for operation getComputeResourcePropertyOfImplementation
   */
  static readonly GetComputeResourcePropertyOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties/{computeResourcePropertyId}';

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
  }): Observable<StrictHttpResponse<ComputeResourcePropertyDto>> {
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
          return r as StrictHttpResponse<ComputeResourcePropertyDto>;
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
  }): Observable<ComputeResourcePropertyDto> {
    return this.getComputeResourcePropertyOfImplementation$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<ComputeResourcePropertyDto>) =>
          r.body as ComputeResourcePropertyDto
      )
    );
  }

  /**
   * Path part for operation updateComputeResourcePropertyOfImplementation
   */
  static readonly UpdateComputeResourcePropertyOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties/{computeResourcePropertyId}';

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
    body: ComputeResourcePropertyDto;
  }): Observable<StrictHttpResponse<ComputeResourcePropertyDto>> {
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
          return r as StrictHttpResponse<ComputeResourcePropertyDto>;
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
    body: ComputeResourcePropertyDto;
  }): Observable<ComputeResourcePropertyDto> {
    return this.updateComputeResourcePropertyOfImplementation$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<ComputeResourcePropertyDto>) =>
          r.body as ComputeResourcePropertyDto
      )
    );
  }

  /**
   * Path part for operation deleteComputeResourcePropertyOfImplementation
   */
  static readonly DeleteComputeResourcePropertyOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/compute-resource-properties/{computeResourcePropertyId}';

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
    return this.deleteComputeResourcePropertyOfImplementation$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation getDiscussionTopicsOfImplementation
   */
  static readonly GetDiscussionTopicsOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics';

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
  }): Observable<StrictHttpResponse<PageDiscussionTopicDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetDiscussionTopicsOfImplementationPath,
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
          return r as StrictHttpResponse<PageDiscussionTopicDto>;
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
  }): Observable<PageDiscussionTopicDto> {
    return this.getDiscussionTopicsOfImplementation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageDiscussionTopicDto>) =>
          r.body as PageDiscussionTopicDto
      )
    );
  }

  /**
   * Path part for operation createDiscussionTopicOfImplementation
   */
  static readonly CreateDiscussionTopicOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics';

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
    body: DiscussionTopicDto;
  }): Observable<StrictHttpResponse<DiscussionTopicDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.CreateDiscussionTopicOfImplementationPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

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
          return r as StrictHttpResponse<DiscussionTopicDto>;
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
    body: DiscussionTopicDto;
  }): Observable<DiscussionTopicDto> {
    return this.createDiscussionTopicOfImplementation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<DiscussionTopicDto>) =>
          r.body as DiscussionTopicDto
      )
    );
  }

  /**
   * Path part for operation getDiscussionTopicOfImplementation
   */
  static readonly GetDiscussionTopicOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}';

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
  }): Observable<StrictHttpResponse<DiscussionTopicDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetDiscussionTopicOfImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('topicId', params.topicId, {});
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
          return r as StrictHttpResponse<DiscussionTopicDto>;
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
  }): Observable<DiscussionTopicDto> {
    return this.getDiscussionTopicOfImplementation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<DiscussionTopicDto>) =>
          r.body as DiscussionTopicDto
      )
    );
  }

  /**
   * Path part for operation updateDiscussionTopicOfImplementation
   */
  static readonly UpdateDiscussionTopicOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}';

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
    body: DiscussionTopicDto;
  }): Observable<StrictHttpResponse<DiscussionTopicDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdateDiscussionTopicOfImplementationPath,
      'put'
    );
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
          return r as StrictHttpResponse<DiscussionTopicDto>;
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
    body: DiscussionTopicDto;
  }): Observable<DiscussionTopicDto> {
    return this.updateDiscussionTopicOfImplementation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<DiscussionTopicDto>) =>
          r.body as DiscussionTopicDto
      )
    );
  }

  /**
   * Path part for operation deleteDiscussionTopicOfImplementation
   */
  static readonly DeleteDiscussionTopicOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}';

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
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteDiscussionTopicOfImplementationPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
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
  static readonly GetDiscussionCommentsOfDiscussionTopicOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}/discussion-comments';

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
  }): Observable<StrictHttpResponse<PageDiscussionCommentDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetDiscussionCommentsOfDiscussionTopicOfImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('topicId', params.topicId, {});
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
          return r as StrictHttpResponse<PageDiscussionCommentDto>;
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
  }): Observable<PageDiscussionCommentDto> {
    return this.getDiscussionCommentsOfDiscussionTopicOfImplementation$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<PageDiscussionCommentDto>) =>
          r.body as PageDiscussionCommentDto
      )
    );
  }

  /**
   * Path part for operation createDiscussionCommentOfDiscussionTopicOfImplementation
   */
  static readonly CreateDiscussionCommentOfDiscussionTopicOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}/discussion-comments';

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
    body: DiscussionCommentDto;
  }): Observable<StrictHttpResponse<DiscussionCommentDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.CreateDiscussionCommentOfDiscussionTopicOfImplementationPath,
      'post'
    );
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
          return r as StrictHttpResponse<DiscussionCommentDto>;
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
    body: DiscussionCommentDto;
  }): Observable<DiscussionCommentDto> {
    return this.createDiscussionCommentOfDiscussionTopicOfImplementation$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<DiscussionCommentDto>) =>
          r.body as DiscussionCommentDto
      )
    );
  }

  /**
   * Path part for operation getDiscussionCommentOfDiscussionTopicOfImplementation
   */
  static readonly GetDiscussionCommentOfDiscussionTopicOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

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
  }): Observable<StrictHttpResponse<DiscussionCommentDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetDiscussionCommentOfDiscussionTopicOfImplementationPath,
      'get'
    );
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
          return r as StrictHttpResponse<DiscussionCommentDto>;
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
  }): Observable<DiscussionCommentDto> {
    return this.getDiscussionCommentOfDiscussionTopicOfImplementation$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<DiscussionCommentDto>) =>
          r.body as DiscussionCommentDto
      )
    );
  }

  /**
   * Path part for operation updateDiscussionCommentOfDiscussionTopicOfImplementation
   */
  static readonly UpdateDiscussionCommentOfDiscussionTopicOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

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
    body: DiscussionCommentDto;
  }): Observable<StrictHttpResponse<DiscussionCommentDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdateDiscussionCommentOfDiscussionTopicOfImplementationPath,
      'put'
    );
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
          return r as StrictHttpResponse<DiscussionCommentDto>;
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
    body: DiscussionCommentDto;
  }): Observable<DiscussionCommentDto> {
    return this.updateDiscussionCommentOfDiscussionTopicOfImplementation$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<DiscussionCommentDto>) =>
          r.body as DiscussionCommentDto
      )
    );
  }

  /**
   * Path part for operation deleteDiscussionCommentOfDiscussionTopicOfImplementation
   */
  static readonly DeleteDiscussionCommentOfDiscussionTopicOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

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
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteDiscussionCommentOfDiscussionTopicOfImplementationPath,
      'delete'
    );
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
    return this.deleteDiscussionCommentOfDiscussionTopicOfImplementation$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation getImplementationPackagesOfImplementation
   */
  static readonly GetImplementationPackagesOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages';

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
  }): Observable<StrictHttpResponse<PageImplementationPackageDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetImplementationPackagesOfImplementationPath,
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
          return r as StrictHttpResponse<PageImplementationPackageDto>;
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
  }): Observable<PageImplementationPackageDto> {
    return this.getImplementationPackagesOfImplementation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageImplementationPackageDto>) =>
          r.body as PageImplementationPackageDto
      )
    );
  }

  /**
   * Path part for operation createImplementationPackageOfImplementation
   */
  static readonly CreateImplementationPackageOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages';

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
    body: ImplementationPackageDto;
  }): Observable<StrictHttpResponse<ImplementationPackageDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.CreateImplementationPackageOfImplementationPath,
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
          return r as StrictHttpResponse<ImplementationPackageDto>;
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
    body: ImplementationPackageDto;
  }): Observable<ImplementationPackageDto> {
    return this.createImplementationPackageOfImplementation$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<ImplementationPackageDto>) =>
          r.body as ImplementationPackageDto
      )
    );
  }

  /**
   * Path part for operation getImplementationPackageOfImplementation
   */
  static readonly GetImplementationPackageOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages/{implementationPackageId}';

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
  }): Observable<StrictHttpResponse<ImplementationPackageDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetImplementationPackageOfImplementationPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('implementationPackageId', params.implementationPackageId, {});
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
          return r as StrictHttpResponse<ImplementationPackageDto>;
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
  }): Observable<ImplementationPackageDto> {
    return this.getImplementationPackageOfImplementation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ImplementationPackageDto>) =>
          r.body as ImplementationPackageDto
      )
    );
  }

  /**
   * Path part for operation updateImplementationPackageOfImplementation
   */
  static readonly UpdateImplementationPackageOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages/{implementationPackageId}';

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
    body: ImplementationPackageDto;
  }): Observable<StrictHttpResponse<ImplementationPackageDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdateImplementationPackageOfImplementationPath,
      'put'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('implementationPackageId', params.implementationPackageId, {});

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
          return r as StrictHttpResponse<ImplementationPackageDto>;
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
    body: ImplementationPackageDto;
  }): Observable<ImplementationPackageDto> {
    return this.updateImplementationPackageOfImplementation$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<ImplementationPackageDto>) =>
          r.body as ImplementationPackageDto
      )
    );
  }

  /**
   * Path part for operation deleteImplementationPackageOfImplementation
   */
  static readonly DeleteImplementationPackageOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages/{implementationPackageId}';

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
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteImplementationPackageOfImplementationPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('implementationPackageId', params.implementationPackageId, {});
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
    return this.deleteImplementationPackageOfImplementation$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation getFileOfImplementationPackage
   */
  static readonly GetFileOfImplementationPackagePath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages/{implementationPackageId}/file';

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
  }): Observable<StrictHttpResponse<FileDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetFileOfImplementationPackagePath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('implementationPackageId', params.implementationPackageId, {});
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
          return r as StrictHttpResponse<FileDto>;
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
  }): Observable<FileDto> {
    return this.getFileOfImplementationPackage$Response(params).pipe(
      map((r: StrictHttpResponse<FileDto>) => r.body as FileDto)
    );
  }

  /**
   * Path part for operation createFileForImplementationPackage
   */
  static readonly CreateFileForImplementationPackagePath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages/{implementationPackageId}/file';

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
    body?: { file?: Blob };
  }): Observable<StrictHttpResponse<FileDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.CreateFileForImplementationPackagePath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('implementationPackageId', params.implementationPackageId, {});

      rb.body(params.body, 'multipart/form-data');
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
          return r as StrictHttpResponse<FileDto>;
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
    body?: { file?: Blob };
  }): Observable<FileDto> {
    return this.createFileForImplementationPackage$Response(params).pipe(
      map((r: StrictHttpResponse<FileDto>) => r.body as FileDto)
    );
  }

  /**
   * Path part for operation deleteFileOfImplementation
   */
  static readonly DeleteFileOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages/{implementationPackageId}/file';

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
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteFileOfImplementationPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('implementationPackageId', params.implementationPackageId, {});
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
  static readonly DownloadFileContentPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/implementation-packages/{implementationPackageId}/file/content';

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
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DownloadFileContentPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('implementationId', params.implementationId, {});
      rb.path('implementationPackageId', params.implementationPackageId, {});
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
  static readonly GetPublicationsOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/publications';

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
  }): Observable<StrictHttpResponse<PagePublicationDto>> {
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
          return r as StrictHttpResponse<PagePublicationDto>;
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
  }): Observable<PagePublicationDto> {
    return this.getPublicationsOfImplementation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PagePublicationDto>) =>
          r.body as PagePublicationDto
      )
    );
  }

  /**
   * Path part for operation linkImplementationAndPublication
   */
  static readonly LinkImplementationAndPublicationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/publications';

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
    '/algorithms/{algorithmId}/implementations/{implementationId}/publications/{publicationId}';

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
  }): Observable<StrictHttpResponse<PublicationDto>> {
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
          return r as StrictHttpResponse<PublicationDto>;
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
  }): Observable<PublicationDto> {
    return this.getPublicationOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<PublicationDto>) => r.body as PublicationDto)
    );
  }

  /**
   * Path part for operation unlinkImplementationAndPublication
   */
  static readonly UnlinkImplementationAndPublicationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/publications/{publicationId}';

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
  static readonly GetSoftwarePlatformsOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/software-platforms';

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
  }): Observable<StrictHttpResponse<PageSoftwarePlatformDto>> {
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
          return r as StrictHttpResponse<PageSoftwarePlatformDto>;
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
  }): Observable<PageSoftwarePlatformDto> {
    return this.getSoftwarePlatformsOfImplementation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageSoftwarePlatformDto>) =>
          r.body as PageSoftwarePlatformDto
      )
    );
  }

  /**
   * Path part for operation linkImplementationAndSoftwarePlatform
   */
  static readonly LinkImplementationAndSoftwarePlatformPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/software-platforms';

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
    body: SoftwarePlatformDto;
  }): Observable<StrictHttpResponse<void>> {
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
    body: SoftwarePlatformDto;
  }): Observable<void> {
    return this.linkImplementationAndSoftwarePlatform$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getSoftwarePlatformOfImplementation
   */
  static readonly GetSoftwarePlatformOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/software-platforms/{softwarePlatformId}';

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
  }): Observable<StrictHttpResponse<SoftwarePlatformDto>> {
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
          return r as StrictHttpResponse<SoftwarePlatformDto>;
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
  }): Observable<SoftwarePlatformDto> {
    return this.getSoftwarePlatformOfImplementation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<SoftwarePlatformDto>) =>
          r.body as SoftwarePlatformDto
      )
    );
  }

  /**
   * Path part for operation unlinkImplementationAndSoftwarePlatform
   */
  static readonly UnlinkImplementationAndSoftwarePlatformPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/software-platforms/{softwarePlatformId}';

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
  static readonly GetTagsOfImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/tags';

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
  }): Observable<StrictHttpResponse<Array<TagDto>>> {
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
          return r as StrictHttpResponse<Array<TagDto>>;
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
  }): Observable<Array<TagDto>> {
    return this.getTagsOfImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TagDto>>) => r.body as Array<TagDto>)
    );
  }

  /**
   * Path part for operation addTagToImplementation
   */
  static readonly AddTagToImplementationPath =
    '/algorithms/{algorithmId}/implementations/{implementationId}/tags';

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
    '/algorithms/{algorithmId}/implementations/{implementationId}/tags';

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
    body: TagDto;
  }): Observable<void> {
    return this.removeTagFromImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getLearningMethodsOfAlgorithm
   */
  static readonly GetLearningMethodsOfAlgorithmPath =
    '/algorithms/{algorithmId}/learning-methods';

  /**
   * Retrieve learning method of an algorithm. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLearningMethodsOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLearningMethodsOfAlgorithm$Response(params: {
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
  }): Observable<StrictHttpResponse<PageLearningMethodDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetLearningMethodsOfAlgorithmPath,
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
          return r as StrictHttpResponse<PageLearningMethodDto>;
        })
      );
  }

  /**
   * Retrieve learning method of an algorithm. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLearningMethodsOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLearningMethodsOfAlgorithm(params: {
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
  }): Observable<PageLearningMethodDto> {
    return this.getLearningMethodsOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageLearningMethodDto>) =>
          r.body as PageLearningMethodDto
      )
    );
  }

  /**
   * Path part for operation linkAlgorithmAndLearningMethod
   */
  static readonly LinkAlgorithmAndLearningMethodPath =
    '/algorithms/{algorithmId}/learning-methods';

  /**
   * Add a reference to an existing learning method (that was previously created via a POST on e.g. /learning-methods). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkAlgorithmAndLearningMethod()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndLearningMethod$Response(params: {
    algorithmId: string;
    body: LearningMethodDto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.LinkAlgorithmAndLearningMethodPath,
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
   * Add a reference to an existing learning method (that was previously created via a POST on e.g. /learning-methods). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkAlgorithmAndLearningMethod$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndLearningMethod(params: {
    algorithmId: string;
    body: LearningMethodDto;
  }): Observable<void> {
    return this.linkAlgorithmAndLearningMethod$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getLearningMethodOfAlgorithm
   */
  static readonly GetLearningMethodOfAlgorithmPath =
    '/algorithms/{algorithmId}/learning-methods/{learningMethodId}';

  /**
   * Retrieve a specific learning method of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLearningMethodOfAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLearningMethodOfAlgorithm$Response(params: {
    algorithmId: string;
    learningMethodId: string;
  }): Observable<StrictHttpResponse<LearningMethodDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetLearningMethodOfAlgorithmPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('learningMethodId', params.learningMethodId, {});
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
          return r as StrictHttpResponse<LearningMethodDto>;
        })
      );
  }

  /**
   * Retrieve a specific learning method of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLearningMethodOfAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLearningMethodOfAlgorithm(params: {
    algorithmId: string;
    learningMethodId: string;
  }): Observable<LearningMethodDto> {
    return this.getLearningMethodOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<LearningMethodDto>) =>
          r.body as LearningMethodDto
      )
    );
  }

  /**
   * Path part for operation unlinkAlgorithmAndLearningMethod
   */
  static readonly UnlinkAlgorithmAndLearningMethodPath =
    '/algorithms/{algorithmId}/learning-methods/{learningMethodId}';

  /**
   * Delete a reference to a learning method of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlinkAlgorithmAndLearningMethod()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkAlgorithmAndLearningMethod$Response(params: {
    algorithmId: string;
    learningMethodId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UnlinkAlgorithmAndLearningMethodPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('learningMethodId', params.learningMethodId, {});
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
   * Delete a reference to a learning method of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unlinkAlgorithmAndLearningMethod$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkAlgorithmAndLearningMethod(params: {
    algorithmId: string;
    learningMethodId: string;
  }): Observable<void> {
    return this.unlinkAlgorithmAndLearningMethod$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPatternRelationsOfAlgorithm
   */
  static readonly GetPatternRelationsOfAlgorithmPath =
    '/algorithms/{algorithmId}/pattern-relations';

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
  }): Observable<StrictHttpResponse<PagePatternRelationDto>> {
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
          return r as StrictHttpResponse<PagePatternRelationDto>;
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
  }): Observable<PagePatternRelationDto> {
    return this.getPatternRelationsOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PagePatternRelationDto>) =>
          r.body as PagePatternRelationDto
      )
    );
  }

  /**
   * Path part for operation createPatternRelationForAlgorithm
   */
  static readonly CreatePatternRelationForAlgorithmPath =
    '/algorithms/{algorithmId}/pattern-relations';

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
    body: PatternRelationDto;
  }): Observable<StrictHttpResponse<PatternRelationDto>> {
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
          return r as StrictHttpResponse<PatternRelationDto>;
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
    body: PatternRelationDto;
  }): Observable<PatternRelationDto> {
    return this.createPatternRelationForAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PatternRelationDto>) =>
          r.body as PatternRelationDto
      )
    );
  }

  /**
   * Path part for operation getPatternRelationOfAlgorithm
   */
  static readonly GetPatternRelationOfAlgorithmPath =
    '/algorithms/{algorithmId}/pattern-relations/{patternRelationId}';

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
  }): Observable<StrictHttpResponse<PatternRelationDto>> {
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
          return r as StrictHttpResponse<PatternRelationDto>;
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
  }): Observable<PatternRelationDto> {
    return this.getPatternRelationOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PatternRelationDto>) =>
          r.body as PatternRelationDto
      )
    );
  }

  /**
   * Path part for operation updatePatternRelationOfAlgorithm
   */
  static readonly UpdatePatternRelationOfAlgorithmPath =
    '/algorithms/{algorithmId}/pattern-relations/{patternRelationId}';

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
    body: PatternRelationDto;
  }): Observable<StrictHttpResponse<PatternRelationDto>> {
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
          return r as StrictHttpResponse<PatternRelationDto>;
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
    body: PatternRelationDto;
  }): Observable<PatternRelationDto> {
    return this.updatePatternRelationOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PatternRelationDto>) =>
          r.body as PatternRelationDto
      )
    );
  }

  /**
   * Path part for operation deletePatternRelationOfAlgorithm
   */
  static readonly DeletePatternRelationOfAlgorithmPath =
    '/algorithms/{algorithmId}/pattern-relations/{patternRelationId}';

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
  static readonly GetProblemTypesOfAlgorithmPath =
    '/algorithms/{algorithmId}/problem-types';

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
  }): Observable<StrictHttpResponse<PageProblemTypeDto>> {
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
          return r as StrictHttpResponse<PageProblemTypeDto>;
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
  }): Observable<PageProblemTypeDto> {
    return this.getProblemTypesOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageProblemTypeDto>) =>
          r.body as PageProblemTypeDto
      )
    );
  }

  /**
   * Path part for operation linkAlgorithmAndProblemType
   */
  static readonly LinkAlgorithmAndProblemTypePath =
    '/algorithms/{algorithmId}/problem-types';

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
   * Add a reference to an existing ProblemType (that was previously created via a POST on /problem-types). Only the ID is required in the request body, other attributes will be ignored and not changed.
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
   * Path part for operation getProblemTypeOfAlgorithm
   */
  static readonly GetProblemTypeOfAlgorithmPath =
    '/algorithms/{algorithmId}/problem-types/{problemTypeId}';

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
  }): Observable<StrictHttpResponse<ProblemTypeDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetProblemTypeOfAlgorithmPath,
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
          return r as StrictHttpResponse<ProblemTypeDto>;
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
  }): Observable<ProblemTypeDto> {
    return this.getProblemTypeOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<ProblemTypeDto>) => r.body as ProblemTypeDto)
    );
  }

  /**
   * Path part for operation unlinkAlgorithmAndProblemType
   */
  static readonly UnlinkAlgorithmAndProblemTypePath =
    '/algorithms/{algorithmId}/problem-types/{problemTypeId}';

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
  static readonly GetPublicationsOfAlgorithmPath =
    '/algorithms/{algorithmId}/publications';

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
  }): Observable<StrictHttpResponse<PagePublicationDto>> {
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
          return r as StrictHttpResponse<PagePublicationDto>;
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
  }): Observable<PagePublicationDto> {
    return this.getPublicationsOfAlgorithm$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PagePublicationDto>) =>
          r.body as PagePublicationDto
      )
    );
  }

  /**
   * Path part for operation linkAlgorithmAndPublication
   */
  static readonly LinkAlgorithmAndPublicationPath =
    '/algorithms/{algorithmId}/publications';

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
   * Add a reference to an existing publication (that was previously created via a POST on e.g. /publications). Only the ID is required in the request body, other attributes will be ignored and not changed.
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
    '/algorithms/{algorithmId}/publications/{publicationId}';

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
  }): Observable<StrictHttpResponse<PublicationDto>> {
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
          return r as StrictHttpResponse<PublicationDto>;
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
  }): Observable<PublicationDto> {
    return this.getPublicationOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<PublicationDto>) => r.body as PublicationDto)
    );
  }

  /**
   * Path part for operation unlinkAlgorithmAndPublication
   */
  static readonly UnlinkAlgorithmAndPublicationPath =
    '/algorithms/{algorithmId}/publications/{publicationId}';

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
  static readonly GetAlgorithmRevisionsPath =
    '/algorithms/{algorithmId}/revisions';

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
  }): Observable<StrictHttpResponse<PageRevisionDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetAlgorithmRevisionsPath,
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
          return r as StrictHttpResponse<PageRevisionDto>;
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
  }): Observable<PageRevisionDto> {
    return this.getAlgorithmRevisions$Response(params).pipe(
      map((r: StrictHttpResponse<PageRevisionDto>) => r.body as PageRevisionDto)
    );
  }

  /**
   * Path part for operation getAlgorithmRevision
   */
  static readonly GetAlgorithmRevisionPath =
    '/algorithms/{algorithmId}/revisions/{revisionId}';

  /**
   * Retrieve a specific revision of an algorithm with its basic properties
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmRevision()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRevision$Response(params: {
    algorithmId: string;
    revisionId: number;
  }): Observable<StrictHttpResponse<AlgorithmDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetAlgorithmRevisionPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('revisionId', params.revisionId, {});
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
          return r as StrictHttpResponse<AlgorithmDto>;
        })
      );
  }

  /**
   * Retrieve a specific revision of an algorithm with its basic properties
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmRevision$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRevision(params: {
    algorithmId: string;
    revisionId: number;
  }): Observable<AlgorithmDto> {
    return this.getAlgorithmRevision$Response(params).pipe(
      map((r: StrictHttpResponse<AlgorithmDto>) => r.body as AlgorithmDto)
    );
  }

  /**
   * Path part for operation getSketches
   */
  static readonly GetSketchesPath = '/algorithms/{algorithmId}/sketches';

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
  }): Observable<StrictHttpResponse<Array<SketchDto>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetSketchesPath,
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
          return r as StrictHttpResponse<Array<SketchDto>>;
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
  getSketches(params: { algorithmId: string }): Observable<Array<SketchDto>> {
    return this.getSketches$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<SketchDto>>) => r.body as Array<SketchDto>
      )
    );
  }

  /**
   * Path part for operation uploadSketch
   */
  static readonly UploadSketchPath = '/algorithms/{algorithmId}/sketches';

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
    body?: { file?: Blob };
  }): Observable<StrictHttpResponse<SketchDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UploadSketchPath,
      'post'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.query('description', params.description, {});
      rb.query('baseURL', params.baseURL, {});

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
          return r as StrictHttpResponse<SketchDto>;
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
    body?: { file?: Blob };
  }): Observable<SketchDto> {
    return this.uploadSketch$Response(params).pipe(
      map((r: StrictHttpResponse<SketchDto>) => r.body as SketchDto)
    );
  }

  /**
   * Path part for operation getSketch
   */
  static readonly GetSketchPath =
    '/algorithms/{algorithmId}/sketches/{sketchId}';

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
  }): Observable<StrictHttpResponse<SketchDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetSketchPath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('sketchId', params.sketchId, {});
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
          return r as StrictHttpResponse<SketchDto>;
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
  }): Observable<SketchDto> {
    return this.getSketch$Response(params).pipe(
      map((r: StrictHttpResponse<SketchDto>) => r.body as SketchDto)
    );
  }

  /**
   * Path part for operation updateSketch
   */
  static readonly UpdateSketchPath =
    '/algorithms/{algorithmId}/sketches/{sketchId}';

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
    body: SketchDto;
  }): Observable<StrictHttpResponse<SketchDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.UpdateSketchPath,
      'put'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('sketchId', params.sketchId, {});

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
          return r as StrictHttpResponse<SketchDto>;
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
    body: SketchDto;
  }): Observable<SketchDto> {
    return this.updateSketch$Response(params).pipe(
      map((r: StrictHttpResponse<SketchDto>) => r.body as SketchDto)
    );
  }

  /**
   * Path part for operation deleteSketch
   */
  static readonly DeleteSketchPath =
    '/algorithms/{algorithmId}/sketches/{sketchId}';

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
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteSketchPath,
      'delete'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('sketchId', params.sketchId, {});
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
  static readonly GetSketchImagePath =
    '/algorithms/{algorithmId}/sketches/{sketchId}/image';

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
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetSketchImagePath,
      'get'
    );
    if (params) {
      rb.path('algorithmId', params.algorithmId, {});
      rb.path('sketchId', params.sketchId, {});
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
  static readonly GetTagsOfAlgorithmPath = '/algorithms/{algorithmId}/tags';

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
  }): Observable<StrictHttpResponse<Array<TagDto>>> {
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
          return r as StrictHttpResponse<Array<TagDto>>;
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
  }): Observable<Array<TagDto>> {
    return this.getTagsOfAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TagDto>>) => r.body as Array<TagDto>)
    );
  }

  /**
   * Path part for operation addTagToAlgorithm
   */
  static readonly AddTagToAlgorithmPath = '/algorithms/{algorithmId}/tags';

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
  static readonly RemoveTagFromAlgorithmPath = '/algorithms/{algorithmId}/tags';

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
