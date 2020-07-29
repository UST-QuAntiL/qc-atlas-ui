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
   * Path part for operation getPublications
   */
  static readonly GetPublicationsPath = '/v1/publications';

  /**
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
   * Path part for operation getPublication
   */
  static readonly GetPublicationPath = '/v1/publications/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication$Response(params: {
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
      PublicationService.GetPublicationPath,
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
   * To access the full response (for headers, for example), `getPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication(params: {
    id: string;
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
   * Path part for operation getPublicationAlgorithms
   */
  static readonly GetPublicationAlgorithmsPath =
    '/v1/publications/{id}/algorithms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublicationAlgorithms()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationAlgorithms$Response(params: {
    id: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.GetPublicationAlgorithmsPath,
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
   * To access the full response (for headers, for example), `getPublicationAlgorithms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationAlgorithms(params: {
    id: string;
  }): Observable<{
    _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
  }> {
    return this.getPublicationAlgorithms$Response(params).pipe(
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
   * Path part for operation getPublicationAlgorithm
   */
  static readonly GetPublicationAlgorithmPath =
    '/v1/publications/{id}/algorithms/{algoId}';

  /**
   * Get a specific referenced algorithm of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublicationAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationAlgorithm$Response(params: {
    id: string;
    algoId: string;
  }): Observable<
    StrictHttpResponse<
      { _links?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)
    >
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.GetPublicationAlgorithmPath,
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
   * To access the full response (for headers, for example), `getPublicationAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationAlgorithm(params: {
    id: string;
    algoId: string;
  }): Observable<
    { _links?: Array<Link> } & (ClassicAlgorithmDto | QuantumAlgorithmDto)
  > {
    return this.getPublicationAlgorithm$Response(params).pipe(
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
   * Path part for operation linkAlgorithmWithPublication
   */
  static readonly LinkAlgorithmWithPublicationPath =
    '/v1/publications/{id}/algorithms/{algoId}';

  /**
   * Add a reference to an existing algorithm (that was previously created via a POST on /algorithms/). Custom ID will be ignored. For algorithm only ID is required, other algorithm attributes will not change. If the algorithm doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkAlgorithmWithPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  linkAlgorithmWithPublication$Response(params: {
    id: string;
    algoId: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.LinkAlgorithmWithPublicationPath,
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
   * To access the full response (for headers, for example), `linkAlgorithmWithPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  linkAlgorithmWithPublication(params: {
    id: string;
    algoId: string;
  }): Observable<{
    _embedded?: { algorithms?: Array<EntityModelAlgorithmDto> };
  }> {
    return this.linkAlgorithmWithPublication$Response(params).pipe(
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
   * Path part for operation unlinkAlgorithmFromPublication
   */
  static readonly UnlinkAlgorithmFromPublicationPath =
    '/v1/publications/{id}/algorithms/{algoId}';

  /**
   * Delete a reference to a algorithm of the publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlinkAlgorithmFromPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkAlgorithmFromPublication$Response(params: {
    id: string;
    algoId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.UnlinkAlgorithmFromPublicationPath,
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
   * To access the full response (for headers, for example), `unlinkAlgorithmFromPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkAlgorithmFromPublication(params: {
    id: string;
    algoId: string;
  }): Observable<void> {
    return this.unlinkAlgorithmFromPublication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPublicationImplementations
   */
  static readonly GetPublicationImplementationsPath =
    '/v1/publications/{id}/implementations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublicationImplementations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationImplementations$Response(params: {
    id: string;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { implementations?: Array<EntityModelImplementationDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PublicationService.GetPublicationImplementationsPath,
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
   * To access the full response (for headers, for example), `getPublicationImplementations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationImplementations(params: {
    id: string;
  }): Observable<{
    _embedded?: { implementations?: Array<EntityModelImplementationDto> };
  }> {
    return this.getPublicationImplementations$Response(params).pipe(
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
   * Path part for operation getPublicationImplementation
   */
  static readonly GetPublicationImplementationPath =
    '/v1/publications/{id}/implementations/{implId}';

  /**
   * Get a specific referenced implementation of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublicationImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationImplementation$Response(params: {
    id: string;
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
      PublicationService.GetPublicationImplementationPath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
   * Get a specific referenced implementation of a publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublicationImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicationImplementation(params: {
    id: string;
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
    return this.getPublicationImplementation$Response(params).pipe(
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
}
