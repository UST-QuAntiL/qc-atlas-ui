/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ClassicAlgorithmDto } from '../models/classic-algorithm-dto';
import { EntityModelAlgorithmDto } from '../models/entity-model-algorithm-dto';
import { EntityModelImplementationDto } from '../models/entity-model-implementation-dto';
import { EntityModelPublicationDto } from '../models/entity-model-publication-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';
import { PublicationDto } from '../models/publication-dto';
import { QuantumAlgorithmDto } from '../models/quantum-algorithm-dto';

@Injectable({
  providedIn: 'root',
})
export class PublicationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getPublications2
   */
  static readonly GetPublications2Path = '/v1/publications';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublications2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications2$Response(params?: {
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
      PublicationService.GetPublications2Path,
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublications2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications2(params?: {
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
    return this.getPublications2$Response(params).pipe(
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
   * Custom ID will be ignored.
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
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPublication(params: {
    body: PublicationDto;
  }): Observable<{
    id?: string;
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
   * Path part for operation getPublication2
   */
  static readonly GetPublication2Path = '/v1/publications/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublication2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication2$Response(params: {
    id: string;
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
      PublicationService.GetPublication2Path,
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublication2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication2(params: {
    id: string;
  }): Observable<{
    id?: string;
    title: string;
    doi?: string;
    url?: string;
    authors: Array<string>;
    _links?: Array<Link>;
  }> {
    return this.getPublication2$Response(params).pipe(
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
   * Path part for operation updatePublication
   */
  static readonly UpdatePublicationPath = '/v1/publications/{id}';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePublication$Response(params: {
    id: string;
    body: PublicationDto;
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
      PublicationService.UpdatePublicationPath,
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
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePublication(params: {
    id: string;
    body: PublicationDto;
  }): Observable<{
    id?: string;
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
   * Path part for operation deletePublication
   */
  static readonly DeletePublicationPath = '/v1/publications/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePublication$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.DeletePublicationPath,
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
   * To access the full response (for headers, for example), `deletePublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePublication(params: { id: string }): Observable<void> {
    return this.deletePublication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAlgorithms1
   */
  static readonly GetAlgorithms1Path = '/v1/publications/{id}/algorithms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithms1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithms1$Response(params: {
    id: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.GetAlgorithms1Path,
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
            _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithms1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithms1(params: {
    id: string;
  }): Observable<{
    _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
  }> {
    return this.getAlgorithms1$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
          }>
        ) =>
          r.body as {
            _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
          }
      )
    );
  }

  /**
   * Path part for operation getAlgorithm1
   */
  static readonly GetAlgorithm1Path =
    '/v1/publications/{id}/algorithms/{algoId}';

  /**
   * Get a specific referenced algorithm of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithm1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithm1$Response(params: {
    id: string;
    algoId: string;
  }): Observable<
    StrictHttpResponse<
      { _links?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)
    >
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.GetAlgorithm1Path,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
   * Get a specific referenced algorithm of a publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithm1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithm1(params: {
    id: string;
    algoId: string;
  }): Observable<
    { _links?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)
  > {
    return this.getAlgorithm1$Response(params).pipe(
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
   * Path part for operation addAlgorithm
   */
  static readonly AddAlgorithmPath =
    '/v1/publications/{id}/algorithms/{algoId}';

  /**
   * Add a reference to an existing algorithm (that was previously created via a POST on /algorithms/). Custom ID will be ignored. For algorithm only ID is required, other algorithm attributes will not change. If the algorithm doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  addAlgorithm$Response(params: {
    id: string;
    algoId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.AddAlgorithmPath,
      'post'
    );
    if (params) {
      rb.path('id', params.id, {});
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
            _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
          }>;
        })
      );
  }

  /**
   * Add a reference to an existing algorithm (that was previously created via a POST on /algorithms/). Custom ID will be ignored. For algorithm only ID is required, other algorithm attributes will not change. If the algorithm doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addAlgorithm(params: {
    id: string;
    algoId: string;
  }): Observable<{
    _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
  }> {
    return this.addAlgorithm$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
          }>
        ) =>
          r.body as {
            _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
          }
      )
    );
  }

  /**
   * Path part for operation deleteReferenceToAlgorithm
   */
  static readonly DeleteReferenceToAlgorithmPath =
    '/v1/publications/{id}/algorithms/{algoId}';

  /**
   * Delete a reference to a algorithm of the publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteReferenceToAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToAlgorithm$Response(params: {
    id: string;
    algoId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.DeleteReferenceToAlgorithmPath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
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
   * Delete a reference to a algorithm of the publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteReferenceToAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToAlgorithm(params: {
    id: string;
    algoId: string;
  }): Observable<void> {
    return this.deleteReferenceToAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getImplementations1
   */
  static readonly GetImplementations1Path =
    '/v1/publications/{id}/implementations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementations1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementations1$Response(params: {
    id: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { implementations?: Array<EntityModelImplementationDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.GetImplementations1Path,
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
            _embedded?: {
              implementations?: Array<EntityModelImplementationDto>;
            };
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementations1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementations1(params: {
    id: string;
  }): Observable<{
    _embedded?: { implementations?: Array<EntityModelImplementationDto> };
  }> {
    return this.getImplementations1$Response(params).pipe(
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
}
