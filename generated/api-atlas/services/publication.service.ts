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
import { ClassicAlgorithmDto } from '../models/classic-algorithm-dto';
import { ClassicImplementationDto } from '../models/classic-implementation-dto';
import { EntityModelAlgorithmDto } from '../models/entity-model-algorithm-dto';
import { EntityModelImplementationDto } from '../models/entity-model-implementation-dto';
import { EntityModelPublicationDto } from '../models/entity-model-publication-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';
import { PublicationDto } from '../models/publication-dto';
import { QuantumAlgorithmDto } from '../models/quantum-algorithm-dto';
import { QuantumImplementationDto } from '../models/quantum-implementation-dto';

@Injectable({
  providedIn: 'root',
})
export class PublicationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getPublications
   */
  static readonly GetPublicationsPath = '/v1/publications';

  /**
   * Retrieve all publications.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublications()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications$Response(params?: {
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
      PublicationService.GetPublicationsPath,
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
            _embedded?: { publications?: Array<EntityModelPublicationDto> };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Retrieve all publications.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublications$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications(params?: {
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
    return this.getPublications$Response(params).pipe(
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
   * Path part for operation createPublication
   */
  static readonly CreatePublicationPath = '/v1/publications';

  /**
   * Define the basic properties of an publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPublication$Response(params: {
    body: PublicationDto;
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
      PublicationService.CreatePublicationPath,
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
   * Define the basic properties of an publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPublication(params: {
    body: PublicationDto;
  }): Observable<{
    id: string;
    title: string;
    doi?: string;
    url?: string;
    authors: Array<string>;
    _links?: Array<Link>;
  }> {
    return this.createPublication$Response(params).pipe(
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
   * Path part for operation getPublication
   */
  static readonly GetPublicationPath = '/v1/publications/{publicationId}';

  /**
   * Retrieve a specific publication and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication$Response(params: {
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
      PublicationService.GetPublicationPath,
      'get'
    );
    if (params) {
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
   * Retrieve a specific publication and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication(params: {
    publicationId: string;
  }): Observable<{
    id: string;
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
   * Path part for operation updatePublication
   */
  static readonly UpdatePublicationPath = '/v1/publications/{publicationId}';

  /**
   * Update the basic properties of an publication (e.g. title).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePublication$Response(params: {
    publicationId: string;
    body: PublicationDto;
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
      PublicationService.UpdatePublicationPath,
      'put'
    );
    if (params) {
      rb.path('publicationId', params.publicationId, {});

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
   * Update the basic properties of an publication (e.g. title).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePublication(params: {
    publicationId: string;
    body: PublicationDto;
  }): Observable<{
    id: string;
    title: string;
    doi?: string;
    url?: string;
    authors: Array<string>;
    _links?: Array<Link>;
  }> {
    return this.updatePublication$Response(params).pipe(
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
   * Path part for operation deletePublication
   */
  static readonly DeletePublicationPath = '/v1/publications/{publicationId}';

  /**
   * Delete an publication. This also removes all references to other entities (e.g. algorithm).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePublication$Response(params: {
    publicationId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.DeletePublicationPath,
      'delete'
    );
    if (params) {
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
   * Delete an publication. This also removes all references to other entities (e.g. algorithm).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deletePublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePublication(params: { publicationId: string }): Observable<void> {
    return this.deletePublication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAlgorithmsOfPublication
   */
  static readonly GetAlgorithmsOfPublicationPath =
    '/v1/publications/{publicationId}/algorithms';

  /**
   * Retrieve referenced algorithms of an publication. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmsOfPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmsOfPublication$Response(params: {
    publicationId: string;

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
      PublicationService.GetAlgorithmsOfPublicationPath,
      'get'
    );
    if (params) {
      rb.path('publicationId', params.publicationId, {});
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
   * Retrieve referenced algorithms of an publication. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmsOfPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmsOfPublication(params: {
    publicationId: string;

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
    return this.getAlgorithmsOfPublication$Response(params).pipe(
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
   * Path part for operation linkPublicationAndAlgorithm
   */
  static readonly LinkPublicationAndAlgorithmPath =
    '/v1/publications/{publicationId}/algorithms';

  /**
   * Add a reference to an existing algorithm (that was previously created via a POST on e.g. /algorithms). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkPublicationAndAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkPublicationAndAlgorithm$Response(params: {
    publicationId: string;
    body: AlgorithmDto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.LinkPublicationAndAlgorithmPath,
      'post'
    );
    if (params) {
      rb.path('publicationId', params.publicationId, {});

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
   * Add a reference to an existing algorithm (that was previously created via a POST on e.g. /algorithms). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkPublicationAndAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkPublicationAndAlgorithm(params: {
    publicationId: string;
    body: AlgorithmDto;
  }): Observable<void> {
    return this.linkPublicationAndAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAlgorithmOfPublication
   */
  static readonly GetAlgorithmOfPublicationPath =
    '/v1/publications/{publicationId}/algorithms/{algorithmId}';

  /**
   * Retrieve a specific algorithm of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmOfPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmOfPublication$Response(params: {
    publicationId: string;
    algorithmId: string;
  }): Observable<
    StrictHttpResponse<
      { _links?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)
    >
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.GetAlgorithmOfPublicationPath,
      'get'
    );
    if (params) {
      rb.path('publicationId', params.publicationId, {});
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
   * Retrieve a specific algorithm of a publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmOfPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmOfPublication(params: {
    publicationId: string;
    algorithmId: string;
  }): Observable<
    { _links?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)
  > {
    return this.getAlgorithmOfPublication$Response(params).pipe(
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
   * Path part for operation unlinkPublicationAndAlgorithm
   */
  static readonly UnlinkPublicationAndAlgorithmPath =
    '/v1/publications/{publicationId}/algorithms/{algorithmId}';

  /**
   * Delete a reference to a publication of an algorithm. The reference has to be previously created via a POST on /algorithms/{algorithmId}/publications/{publicationId}).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlinkPublicationAndAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkPublicationAndAlgorithm$Response(params: {
    algorithmId: string;
    publicationId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.UnlinkPublicationAndAlgorithmPath,
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
   * To access the full response (for headers, for example), `unlinkPublicationAndAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkPublicationAndAlgorithm(params: {
    algorithmId: string;
    publicationId: string;
  }): Observable<void> {
    return this.unlinkPublicationAndAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getImplementationsOfPublication
   */
  static readonly GetImplementationsOfPublicationPath =
    '/v1/publications/{publicationId}/implementations';

  /**
   * Retrieve referenced implementations of an publication. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationsOfPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfPublication$Response(params: {
    publicationId: string;

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
      _embedded?: { implementations?: Array<EntityModelImplementationDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.GetImplementationsOfPublicationPath,
      'get'
    );
    if (params) {
      rb.path('publicationId', params.publicationId, {});
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
              implementations?: Array<EntityModelImplementationDto>;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Retrieve referenced implementations of an publication. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationsOfPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfPublication(params: {
    publicationId: string;

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
    _embedded?: { implementations?: Array<EntityModelImplementationDto> };
    page?: PageMetadata;
  }> {
    return this.getImplementationsOfPublication$Response(params).pipe(
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
   * Path part for operation getImplementationOfPublication
   */
  static readonly GetImplementationOfPublicationPath =
    '/v1/publications/{publicationId}/implementations/{implementationId}';

  /**
   * Retrieve a specific implementation of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationOfPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationOfPublication$Response(params: {
    publicationId: string;
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
      PublicationService.GetImplementationOfPublicationPath,
      'get'
    );
    if (params) {
      rb.path('publicationId', params.publicationId, {});
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
   * Retrieve a specific implementation of a publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationOfPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationOfPublication(params: {
    publicationId: string;
    implementationId: string;
  }): Observable<
    { _links?: Array<Link> } & (
      | ClassicImplementationDto
      | QuantumImplementationDto
    )
  > {
    return this.getImplementationOfPublication$Response(params).pipe(
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
}
