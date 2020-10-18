/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ClassicImplementationDto } from '../models/classic-implementation-dto';
import { EntityModelImplementationDto } from '../models/entity-model-implementation-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';
import { QuantumImplementationDto } from '../models/quantum-implementation-dto';

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
  static readonly GetImplementationsPath = '/v1/implementations';

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
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { implementations?: Array<EntityModelImplementationDto> };
      page?: PageMetadata;
    }>
  > {
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
  }): Observable<{
    _embedded?: { implementations?: Array<EntityModelImplementationDto> };
    page?: PageMetadata;
  }> {
    return this.getImplementations$Response(params).pipe(
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
   * Path part for operation getImplementation1
   */
  static readonly GetImplementation1Path =
    '/v1/implementations/{implementationId}';

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
   * Path part for operation getImplementation1
   */
  static readonly GetImplementation1Path = '/v1/implementations/{implementationId}';

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

  }): Observable<StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)>> {

    const rb = new RequestBuilder(this.rootUrl, ImplementationsService.GetImplementation1Path, 'get');
    if (params) {

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
   * Retrieve a specific implementation and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementation1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementation1(params: {
    implementationId: string;

  }): Observable<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)> {

    return this.getImplementation1$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto)>) => r.body as { '_links'?: Array<Link> } & (ClassicImplementationDto | QuantumImplementationDto))
    );
  }

}
