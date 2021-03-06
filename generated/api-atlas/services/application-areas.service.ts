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
import { PageApplicationAreaDto } from '../models/page-application-area-dto';

@Injectable({
  providedIn: 'root',
})
export class ApplicationAreasService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getApplicationAreas
   */
  static readonly GetApplicationAreasPath = '/application-areas';

  /**
   * Retrieve all application areas
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationAreas()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreas$Response(params?: {
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
      ApplicationAreasService.GetApplicationAreasPath,
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
          return r as StrictHttpResponse<PageApplicationAreaDto>;
        })
      );
  }

  /**
   * Retrieve all application areas
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplicationAreas$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreas(params?: {
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
    return this.getApplicationAreas$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageApplicationAreaDto>) =>
          r.body as PageApplicationAreaDto
      )
    );
  }

  /**
   * Path part for operation createApplicationArea
   */
  static readonly CreateApplicationAreaPath = '/application-areas';

  /**
   * Define the basic properties of an application area.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createApplicationArea()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createApplicationArea$Response(params: {
    body: ApplicationAreaDto;
  }): Observable<StrictHttpResponse<ApplicationAreaDto>> {
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
          return r as StrictHttpResponse<ApplicationAreaDto>;
        })
      );
  }

  /**
   * Define the basic properties of an application area.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createApplicationArea$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createApplicationArea(params: {
    body: ApplicationAreaDto;
  }): Observable<ApplicationAreaDto> {
    return this.createApplicationArea$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ApplicationAreaDto>) =>
          r.body as ApplicationAreaDto
      )
    );
  }

  /**
   * Path part for operation getApplicationArea
   */
  static readonly GetApplicationAreaPath =
    '/application-areas/{applicationAreaId}';

  /**
   * Retrieve a specific application area and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationArea()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationArea$Response(params: {
    applicationAreaId: string;
  }): Observable<StrictHttpResponse<ApplicationAreaDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApplicationAreasService.GetApplicationAreaPath,
      'get'
    );
    if (params) {
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
   * Retrieve a specific application area and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplicationArea$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationArea(params: {
    applicationAreaId: string;
  }): Observable<ApplicationAreaDto> {
    return this.getApplicationArea$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ApplicationAreaDto>) =>
          r.body as ApplicationAreaDto
      )
    );
  }

  /**
   * Path part for operation updateApplicationArea
   */
  static readonly UpdateApplicationAreaPath =
    '/application-areas/{applicationAreaId}';

  /**
   * Update the basic properties of an application area (e.g. name).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateApplicationArea()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateApplicationArea$Response(params: {
    applicationAreaId: string;
    body: ApplicationAreaDto;
  }): Observable<StrictHttpResponse<ApplicationAreaDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApplicationAreasService.UpdateApplicationAreaPath,
      'put'
    );
    if (params) {
      rb.path('applicationAreaId', params.applicationAreaId, {});

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
          return r as StrictHttpResponse<ApplicationAreaDto>;
        })
      );
  }

  /**
   * Update the basic properties of an application area (e.g. name).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateApplicationArea$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateApplicationArea(params: {
    applicationAreaId: string;
    body: ApplicationAreaDto;
  }): Observable<ApplicationAreaDto> {
    return this.updateApplicationArea$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ApplicationAreaDto>) =>
          r.body as ApplicationAreaDto
      )
    );
  }

  /**
   * Path part for operation deleteApplicationArea
   */
  static readonly DeleteApplicationAreaPath =
    '/application-areas/{applicationAreaId}';

  /**
   * Delete an application area. This removes the application area from all algorithms it is references in.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteApplicationArea()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplicationArea$Response(params: {
    applicationAreaId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApplicationAreasService.DeleteApplicationAreaPath,
      'delete'
    );
    if (params) {
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
   * Delete an application area. This removes the application area from all algorithms it is references in.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteApplicationArea$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplicationArea(params: {
    applicationAreaId: string;
  }): Observable<void> {
    return this.deleteApplicationArea$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
