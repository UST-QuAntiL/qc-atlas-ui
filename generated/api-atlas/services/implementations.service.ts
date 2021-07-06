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
import { PageImplementationDto } from '../models/page-implementation-dto';
import { PageRevisionDto } from '../models/page-revision-dto';

@Injectable({
  providedIn: 'root',
})
export class ImplementationsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getImplementations
   */
  static readonly GetImplementationsPath = '/implementations';

  /**
   * Retrieve all implementations unaffected by its implemented algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementations$Response(params?: {
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
      ImplementationsService.GetImplementationsPath,
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
          return r as StrictHttpResponse<PageImplementationDto>;
        })
      );
  }

  /**
   * Retrieve all implementations unaffected by its implemented algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementations(params?: {
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
    return this.getImplementations$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageImplementationDto>) =>
          r.body as PageImplementationDto
      )
    );
  }

  /**
   * Path part for operation getImplementation1
   */
  static readonly GetImplementation1Path =
    '/implementations/{implementationId}';

  /**
   * Retrieve a specific implementation and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementation1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementation1$Response(params: {
    implementationId: string;
  }): Observable<StrictHttpResponse<ImplementationDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ImplementationsService.GetImplementation1Path,
      'get'
    );
    if (params) {
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
   * Retrieve a specific implementation and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementation1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementation1(params: {
    implementationId: string;
  }): Observable<ImplementationDto> {
    return this.getImplementation1$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ImplementationDto>) =>
          r.body as ImplementationDto
      )
    );
  }

  /**
   * Path part for operation linkAlgorithmAndImplementation
   */
  static readonly LinkAlgorithmAndImplementationPath =
    '/implementations/{implementationId}/algorithms';

  /**
   * Add a reference to an existing implementation (that was previously created via a POST on e.g. /implementations). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkAlgorithmAndImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndImplementation$Response(params: {
    implementationId: string;
    body: AlgorithmDto;
  }): Observable<StrictHttpResponse<ImplementationDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ImplementationsService.LinkAlgorithmAndImplementationPath,
      'post'
    );
    if (params) {
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
   * Add a reference to an existing implementation (that was previously created via a POST on e.g. /implementations). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkAlgorithmAndImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkAlgorithmAndImplementation(params: {
    implementationId: string;
    body: AlgorithmDto;
  }): Observable<ImplementationDto> {
    return this.linkAlgorithmAndImplementation$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ImplementationDto>) =>
          r.body as ImplementationDto
      )
    );
  }

  /**
   * Path part for operation unlinkImplementationAndAlgorithm
   */
  static readonly UnlinkImplementationAndAlgorithmPath =
    '/implementations/{implementationId}/algorithms/{algorithmId}';

  /**
   * Delete a reference to a implementation of an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlinkImplementationAndAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkImplementationAndAlgorithm$Response(params: {
    implementationId: string;
    algorithmId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ImplementationsService.UnlinkImplementationAndAlgorithmPath,
      'delete'
    );
    if (params) {
      rb.path('implementationId', params.implementationId, {});
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
   * Delete a reference to a implementation of an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unlinkImplementationAndAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkImplementationAndAlgorithm(params: {
    implementationId: string;
    algorithmId: string;
  }): Observable<void> {
    return this.unlinkImplementationAndAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getImplementationRevisions
   */
  static readonly GetImplementationRevisionsPath =
    '/implementations/{implementationId}/revisions';

  /**
   * Retrieve all revisions of an implementation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationRevisions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationRevisions$Response(params: {
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
  }): Observable<StrictHttpResponse<PageRevisionDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ImplementationsService.GetImplementationRevisionsPath,
      'get'
    );
    if (params) {
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
          return r as StrictHttpResponse<PageRevisionDto>;
        })
      );
  }

  /**
   * Retrieve all revisions of an implementation
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationRevisions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationRevisions(params: {
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
  }): Observable<PageRevisionDto> {
    return this.getImplementationRevisions$Response(params).pipe(
      map((r: StrictHttpResponse<PageRevisionDto>) => r.body as PageRevisionDto)
    );
  }

  /**
   * Path part for operation getImplementationRevision
   */
  static readonly GetImplementationRevisionPath =
    '/implementations/{implementationId}/revisions/{revisionId}';

  /**
   * Retrieve a specific revision of an implementation and its basic properties
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationRevision()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationRevision$Response(params: {
    implementationId: string;
    revisionId: number;
  }): Observable<StrictHttpResponse<ImplementationDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ImplementationsService.GetImplementationRevisionPath,
      'get'
    );
    if (params) {
      rb.path('implementationId', params.implementationId, {});
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
          return r as StrictHttpResponse<ImplementationDto>;
        })
      );
  }

  /**
   * Retrieve a specific revision of an implementation and its basic properties
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationRevision$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationRevision(params: {
    implementationId: string;
    revisionId: number;
  }): Observable<ImplementationDto> {
    return this.getImplementationRevision$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ImplementationDto>) =>
          r.body as ImplementationDto
      )
    );
  }
}
