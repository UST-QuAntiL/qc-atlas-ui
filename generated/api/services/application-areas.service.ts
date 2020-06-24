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
import { PagedModelEntityModelApplicationAreaDto } from '../models/paged-model-entity-model-application-area-dto';

@Injectable({
  providedIn: 'root',
})
export class ApplicationAreasService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getApplicationAreas1
   */
  static readonly GetApplicationAreas1Path = '/application-areas/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationAreas1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreas1$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<PagedModelEntityModelApplicationAreaDto>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationAreasService.GetApplicationAreas1Path, 'get');
    if (params) {

      rb.query('page', params.page, {});
      rb.query('size', params.size, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PagedModelEntityModelApplicationAreaDto>;
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

  }): Observable<PagedModelEntityModelApplicationAreaDto> {

    return this.getApplicationAreas1$Response(params).pipe(
      map((r: StrictHttpResponse<PagedModelEntityModelApplicationAreaDto>) => r.body as PagedModelEntityModelApplicationAreaDto)
    );
  }

  /**
   * Path part for operation createApplicationArea
   */
  static readonly CreateApplicationAreaPath = '/application-areas/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createApplicationArea()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createApplicationArea$Response(params: {
      body: ApplicationAreaDto
  }): Observable<StrictHttpResponse<EntityModelApplicationAreaDto>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationAreasService.CreateApplicationAreaPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelApplicationAreaDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createApplicationArea$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createApplicationArea(params: {
      body: ApplicationAreaDto
  }): Observable<EntityModelApplicationAreaDto> {

    return this.createApplicationArea$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelApplicationAreaDto>) => r.body as EntityModelApplicationAreaDto)
    );
  }

  /**
   * Path part for operation getApplicationAreaById
   */
  static readonly GetApplicationAreaByIdPath = '/application-areas/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationAreaById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreaById$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<EntityModelApplicationAreaDto>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationAreasService.GetApplicationAreaByIdPath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelApplicationAreaDto>;
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

  }): Observable<EntityModelApplicationAreaDto> {

    return this.getApplicationAreaById$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelApplicationAreaDto>) => r.body as EntityModelApplicationAreaDto)
    );
  }

  /**
   * Path part for operation updateApplicationArea
   */
  static readonly UpdateApplicationAreaPath = '/application-areas/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateApplicationArea()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateApplicationArea$Response(params: {
    id: string;
      body: ApplicationAreaDto
  }): Observable<StrictHttpResponse<EntityModelApplicationAreaDto>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationAreasService.UpdateApplicationAreaPath, 'put');
    if (params) {

      rb.path('id', params.id, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelApplicationAreaDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateApplicationArea$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateApplicationArea(params: {
    id: string;
      body: ApplicationAreaDto
  }): Observable<EntityModelApplicationAreaDto> {

    return this.updateApplicationArea$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelApplicationAreaDto>) => r.body as EntityModelApplicationAreaDto)
    );
  }

  /**
   * Path part for operation deleteApplicationArea
   */
  static readonly DeleteApplicationAreaPath = '/application-areas/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteApplicationArea()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplicationArea$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<ApplicationAreaDto>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationAreasService.DeleteApplicationAreaPath, 'delete');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApplicationAreaDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteApplicationArea$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplicationArea(params: {
    id: string;

  }): Observable<ApplicationAreaDto> {

    return this.deleteApplicationArea$Response(params).pipe(
      map((r: StrictHttpResponse<ApplicationAreaDto>) => r.body as ApplicationAreaDto)
    );
  }

}
