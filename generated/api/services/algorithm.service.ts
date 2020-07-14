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
    page?: number;
    size?: number;
    sort?: string;
    sortBy?: string;
    search?: string;
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
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
      rb.query('sortBy', params.sortBy, {});
      rb.query('search', params.search, {});
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
    page?: number;
    size?: number;
    sort?: string;
    sortBy?: string;
    search?: string;
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
   * Path part for operation getPublications
   */
  static readonly GetPublicationsPath = '/v1/algorithms/{algoId}/publications';

  /**
   * Get referenced publications for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublications()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications$Response(params: {
    algoId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { publications?: Array<EntityModelPublicationDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetPublicationsPath,
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
   * To access the full response (for headers, for example), `getPublications$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications(params: {
    algoId: string;
  }): Observable<{
    _embedded?: { publications?: Array<EntityModelPublicationDto> };
  }> {
    return this.getPublications$Response(params).pipe(
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
   * Path part for operation getPublication
   */
  static readonly GetPublicationPath =
    '/v1/algorithms/{algoId}/publications/{publicationId}';

  /**
   * Get a specific referenced publication of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication$Response(params: {
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
      AlgorithmService.GetPublicationPath,
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
   * To access the full response (for headers, for example), `getPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication(params: {
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
    return this.getPublication$Response(params).pipe(
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

  /**
   * Path part for operation getProblemTypes
   */
  static readonly GetProblemTypesPath = '/v1/algorithms/{algoId}/problem-types';

  /**
   * Get the problem types for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProblemTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypes$Response(params: {
    algoId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetProblemTypesPath,
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
   * To access the full response (for headers, for example), `getProblemTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypes(params: {
    algoId: string;
  }): Observable<{
    _embedded?: { problemTypes?: Array<EntityModelProblemTypeDto> };
  }> {
    return this.getProblemTypes$Response(params).pipe(
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
   * Path part for operation getApplicationAreas
   */
  static readonly GetApplicationAreasPath =
    '/v1/algorithms/{algoId}/application-areas';

  /**
   * Get the problem types for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationAreas()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreas$Response(params: {
    algoId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { applicationAreas?: Array<EntityModelApplicationAreaDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetApplicationAreasPath,
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
   * To access the full response (for headers, for example), `getApplicationAreas$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreas(params: {
    algoId: string;
  }): Observable<{
    _embedded?: { applicationAreas?: Array<EntityModelApplicationAreaDto> };
  }> {
    return this.getApplicationAreas$Response(params).pipe(
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
   * Path part for operation createPatternRelation
   */
  static readonly CreatePatternRelationPath =
    '/v1/algorithms/{algoId}/pattern-relations';

  /**
   * Add a Pattern Relation from this Algorithm to a given Pattern. Custom ID will be ignored. For pattern relation type only ID is required, other pattern relation type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPatternRelation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelation$Response(params: {
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
      AlgorithmService.CreatePatternRelationPath,
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
   * To access the full response (for headers, for example), `createPatternRelation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelation(params: {
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
    return this.createPatternRelation$Response(params).pipe(
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
   * Path part for operation getPatternRelation
   */
  static readonly GetPatternRelationPath =
    '/v1/algorithms/{algoId}/pattern-relations/{relationId}';

  /**
   * Get a certain pattern relation for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelation$Response(params: {
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
      AlgorithmService.GetPatternRelationPath,
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
   * To access the full response (for headers, for example), `getPatternRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelation(params: {
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
    return this.getPatternRelation$Response(params).pipe(
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
   * Path part for operation deletePatternRelation
   */
  static readonly DeletePatternRelationPath =
    '/v1/algorithms/{algoId}/pattern-relations/{relationId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePatternRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelation$Response(params: {
    algoId: string;
    relationId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeletePatternRelationPath,
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
   * To access the full response (for headers, for example), `deletePatternRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelation(params: {
    algoId: string;
    relationId: string;
  }): Observable<void> {
    return this.deletePatternRelation$Response(params).pipe(
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
   * Path part for operation getComputingResources
   */
  static readonly GetComputingResourcesPath =
    '/v1/algorithms/{algoId}/computing-resource-properties';

  /**
   * Retrieve the required computing resources of an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputingResources()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResources$Response(params: {
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
      AlgorithmService.GetComputingResourcesPath,
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
   * To access the full response (for headers, for example), `getComputingResources$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResources(params: {
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
   * Path part for operation getPublications1
   */
  static readonly GetPublications1Path =
    '/v1/algorithms/{algoId}/implementations/{implId}/publications';

  /**
   * Get referenced publications for an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublications1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications1$Response(params: {
    algoId: string;
    implId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { publications?: Array<EntityModelPublicationDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetPublications1Path,
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
   * To access the full response (for headers, for example), `getPublications1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications1(params: {
    algoId: string;
    implId: string;
  }): Observable<{
    _embedded?: { publications?: Array<EntityModelPublicationDto> };
  }> {
    return this.getPublications1$Response(params).pipe(
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
   * Path part for operation addPublication1
   */
  static readonly AddPublication1Path =
    '/v1/algorithms/{algoId}/implementations/{implId}/publications';

  /**
   * Add a reference to an existing publication (that was previously created via a POST on /publications/). Custom ID will be ignored. For publication only ID is required, other publication attributes will not change. If the publication doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPublication1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPublication1$Response(params: {
    algoId: string;
    implId: string;
    body: PublicationDto;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { publications?: Array<EntityModelPublicationDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.AddPublication1Path,
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
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
          }>;
        })
      );
  }

  /**
   * Add a reference to an existing publication (that was previously created via a POST on /publications/). Custom ID will be ignored. For publication only ID is required, other publication attributes will not change. If the publication doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addPublication1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPublication1(params: {
    algoId: string;
    implId: string;
    body: PublicationDto;
  }): Observable<{
    _embedded?: { publications?: Array<EntityModelPublicationDto> };
  }> {
    return this.addPublication1$Response(params).pipe(
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
   * Path part for operation getPublication1
   */
  static readonly GetPublication1Path =
    '/v1/algorithms/{algoId}/implementations/{implId}/publications/{publicationId}';

  /**
   * Get a specific referenced publication of an implementation.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublication1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication1$Response(params: {
    algoId: string;
    implId: string;
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
      AlgorithmService.GetPublication1Path,
      'get'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
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
   * Get a specific referenced publication of an implementation.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublication1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication1(params: {
    algoId: string;
    implId: string;
    publicationId: string;
  }): Observable<{
    id?: string;
    title: string;
    doi?: string;
    url?: string;
    authors: Array<string>;
    _links?: Array<Link>;
  }> {
    return this.getPublication1$Response(params).pipe(
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
   * Path part for operation deleteReferenceToPublication1
   */
  static readonly DeleteReferenceToPublication1Path =
    '/v1/algorithms/{algoId}/implementations/{implId}/publications/{publicationId}';

  /**
   * Delete a reference to a publication of the implementation.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteReferenceToPublication1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToPublication1$Response(params: {
    algoId: string;
    implId: string;
    publicationId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteReferenceToPublication1Path,
      'delete'
    );
    if (params) {
      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
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
   * To access the full response (for headers, for example), `deleteReferenceToPublication1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToPublication1(params: {
    algoId: string;
    implId: string;
    publicationId: string;
  }): Observable<void> {
    return this.deleteReferenceToPublication1$Response(params).pipe(
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
   * Path part for operation getSoftwarePlatforms
   */
  static readonly GetSoftwarePlatformsPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/software-platforms';

  /**
   * Get referenced software platform for an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatforms()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatforms$Response(params: {
    algoId: string;
    implId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.GetSoftwarePlatformsPath,
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
   * To access the full response (for headers, for example), `getSoftwarePlatforms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatforms(params: {
    algoId: string;
    implId: string;
  }): Observable<{
    _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
  }> {
    return this.getSoftwarePlatforms$Response(params).pipe(
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
   * Path part for operation addSoftwarePlatform
   */
  static readonly AddSoftwarePlatformPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/software-platforms';

  /**
   * Add a reference to an existing software platform (that was previously created via a POST on /software-platforms/). Custom ID will be ignored. For software platform only ID is required, other software platform attributes will not change. If the software platform doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSoftwarePlatform()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSoftwarePlatform$Response(params: {
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
      AlgorithmService.AddSoftwarePlatformPath,
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
   * To access the full response (for headers, for example), `addSoftwarePlatform$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSoftwarePlatform(params: {
    algoId: string;
    implId: string;
    body: SoftwarePlatformDto;
  }): Observable<{
    _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
  }> {
    return this.addSoftwarePlatform$Response(params).pipe(
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
   * Path part for operation getSoftwarePlatform
   */
  static readonly GetSoftwarePlatformPath =
    '/v1/algorithms/{algoId}/implementations/{implId}/software-platforms/{platformId}';

  /**
   * Get a specific referenced software platform of an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatform$Response(params: {
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
      AlgorithmService.GetSoftwarePlatformPath,
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
   * To access the full response (for headers, for example), `getSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatform(params: {
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
    return this.getSoftwarePlatform$Response(params).pipe(
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
   * Path part for operation getComputingResources1
   */
  static readonly GetComputingResources1Path =
    '/v1/algorithms/{algoId}/implementations/{implId}/computing-resource-properties';

  /**
   * Retrieve the required computing resources of an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputingResources1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResources1$Response(params: {
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
      AlgorithmService.GetComputingResources1Path,
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
   * To access the full response (for headers, for example), `getComputingResources1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResources1(params: {
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
    return this.getComputingResources1$Response(params).pipe(
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
   * Path part for operation addComputingResource1
   */
  static readonly AddComputingResource1Path =
    '/v1/algorithms/{algoId}/implementations/{implId}/computing-resource-properties';

  /**
   * Add a computing resource (e.g. a certain number of qubits) that is requiered by an implementation. Custom ID will be ignored. For computing resource type only ID is required, other computing resource type attributes will not change
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addComputingResource1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addComputingResource1$Response(params: {
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
      AlgorithmService.AddComputingResource1Path,
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
   * To access the full response (for headers, for example), `addComputingResource1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addComputingResource1(params: {
    algoId: string;
    implId: string;
    body: ComputingResourcePropertyDto;
  }): Observable<{
    id?: string;
    value?: string;
    type: ComputingResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.addComputingResource1$Response(params).pipe(
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
   * Path part for operation getComputingResource1
   */
  static readonly GetComputingResource1Path =
    '/v1/algorithms/{algoId}/implementations/{implId}/computing-resource-properties/{resourceId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputingResource1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResource1$Response(params: {
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
      AlgorithmService.GetComputingResource1Path,
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
   * To access the full response (for headers, for example), `getComputingResource1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResource1(params: {
    algoId: string;
    implId: string;
    resourceId: string;
  }): Observable<{
    id?: string;
    value?: string;
    type: ComputingResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.getComputingResource1$Response(params).pipe(
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
   * Path part for operation updateComputingResource1
   */
  static readonly UpdateComputingResource1Path =
    '/v1/algorithms/{algoId}/implementations/{implId}/computing-resource-properties/{resourceId}';

  /**
   * Update a computing resource of the implementation. Custom ID will be ignored. For computing resource type only ID is required, other computing resource type attributes will not change
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComputingResource1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputingResource1$Response(params: {
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
      AlgorithmService.UpdateComputingResource1Path,
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
   * To access the full response (for headers, for example), `updateComputingResource1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputingResource1(params: {
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
    return this.updateComputingResource1$Response(params).pipe(
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
   * Path part for operation deleteComputingResource1
   */
  static readonly DeleteComputingResource1Path =
    '/v1/algorithms/{algoId}/implementations/{implId}/computing-resource-properties/{resourceId}';

  /**
   * Delete a computing resource of the implementation.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComputingResource1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputingResource1$Response(params: {
    algoId: string;
    implId: string;
    resourceId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AlgorithmService.DeleteComputingResource1Path,
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
   * To access the full response (for headers, for example), `deleteComputingResource1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputingResource1(params: {
    algoId: string;
    implId: string;
    resourceId: string;
  }): Observable<void> {
    return this.deleteComputingResource1$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
