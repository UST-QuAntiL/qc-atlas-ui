/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ApplicationAreaDto } from '../models/application-area-dto';
import { EntityModelApplicationAreaDto } from '../models/entity-model-application-area-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';

@Injectable({
  providedIn: 'root',
})
export class ApplicationAreasService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getApplicationAreas1
   */
  static readonly GetApplicationAreas1Path = '/v1/application-areas';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationAreas1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreas1$Response(params?: {
    page?: number;
    size?: number;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { applicationAreas?: Array<EntityModelApplicationAreaDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApplicationAreasService.GetApplicationAreas1Path,
      'get'
    );
    if (params) {
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
              applicationAreas?: Array<EntityModelApplicationAreaDto>;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplicationAreas1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreas1(params?: {
    page?: number;
    size?: number;
  }): Observable<{
    _embedded?: { applicationAreas?: Array<EntityModelApplicationAreaDto> };
    page?: PageMetadata;
  }> {
    return this.getApplicationAreas1$Response(params).pipe(
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
   * Path part for operation createApplicationArea
   */
  static readonly CreateApplicationAreaPath = '/v1/application-areas';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createApplicationArea()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createApplicationArea$Response(params: {
    body: ApplicationAreaDto;
  }): Observable<
    StrictHttpResponse<{ id?: string; name: string; _links?: Array<Link> }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApplicationAreasService.CreateApplicationAreaPath,
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
            name: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createApplicationArea$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createApplicationArea(params: {
    body: ApplicationAreaDto;
  }): Observable<{ id?: string; name: string; _links?: Array<Link> }> {
    return this.createApplicationArea$Response(params).pipe(
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
   * Path part for operation getApplicationAreaById
   */
  static readonly GetApplicationAreaByIdPath = '/v1/application-areas/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationAreaById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreaById$Response(params: {
    id: string;
  }): Observable<
    StrictHttpResponse<{ id?: string; name: string; _links?: Array<Link> }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApplicationAreasService.GetApplicationAreaByIdPath,
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
            name: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplicationAreaById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreaById(params: {
    id: string;
  }): Observable<{ id?: string; name: string; _links?: Array<Link> }> {
    return this.getApplicationAreaById$Response(params).pipe(
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
   * Path part for operation updateApplicationArea
   */
  static readonly UpdateApplicationAreaPath = '/v1/application-areas/{id}';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateApplicationArea()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateApplicationArea$Response(params: {
    id: string;
    body: ApplicationAreaDto;
  }): Observable<
    StrictHttpResponse<{ id?: string; name: string; _links?: Array<Link> }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApplicationAreasService.UpdateApplicationAreaPath,
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
            name: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateApplicationArea$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateApplicationArea(params: {
    id: string;
    body: ApplicationAreaDto;
  }): Observable<{ id?: string; name: string; _links?: Array<Link> }> {
    return this.updateApplicationArea$Response(params).pipe(
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
   * Path part for operation deleteApplicationArea
   */
  static readonly DeleteApplicationAreaPath = '/v1/application-areas/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteApplicationArea()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplicationArea$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApplicationAreasService.DeleteApplicationAreaPath,
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
   * To access the full response (for headers, for example), `deleteApplicationArea$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplicationArea(params: { id: string }): Observable<void> {
    return this.deleteApplicationArea$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
