/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { EntityModelPatternRelationTypeDto } from '../models/entity-model-pattern-relation-type-dto';
import { PagedModelEntityModelPatternRelationTypeDto } from '../models/paged-model-entity-model-pattern-relation-type-dto';
import { PatternRelationTypeDto } from '../models/pattern-relation-type-dto';

@Injectable({
  providedIn: 'root',
})
export class PatternRelationTypeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPatternRelationType
   */
  static readonly GetPatternRelationTypePath = '/pattern-relation-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelationType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationType$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<EntityModelPatternRelationTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationTypeService.GetPatternRelationTypePath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelPatternRelationTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternRelationType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationType(params: {
    id: string;

  }): Observable<EntityModelPatternRelationTypeDto> {

    return this.getPatternRelationType$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPatternRelationTypeDto>) => r.body as EntityModelPatternRelationTypeDto)
    );
  }

  /**
   * Path part for operation updatePatternRelationType1
   */
  static readonly UpdatePatternRelationType1Path = '/pattern-relation-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatternRelationType1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelationType1$Response(params: {
    id: string;
      body: PatternRelationTypeDto
  }): Observable<StrictHttpResponse<EntityModelPatternRelationTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationTypeService.UpdatePatternRelationType1Path, 'put');
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
        return r as StrictHttpResponse<EntityModelPatternRelationTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePatternRelationType1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelationType1(params: {
    id: string;
      body: PatternRelationTypeDto
  }): Observable<EntityModelPatternRelationTypeDto> {

    return this.updatePatternRelationType1$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPatternRelationTypeDto>) => r.body as EntityModelPatternRelationTypeDto)
    );
  }

  /**
   * Path part for operation deletePatternRelationType
   */
  static readonly DeletePatternRelationTypePath = '/pattern-relation-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePatternRelationType()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelationType$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationTypeService.DeletePatternRelationTypePath, 'delete');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{  }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deletePatternRelationType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelationType(params: {
    id: string;

  }): Observable<{  }> {

    return this.deletePatternRelationType$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

  /**
   * Path part for operation getPatternRelationTypes1
   */
  static readonly GetPatternRelationTypes1Path = '/pattern-relation-types/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelationTypes1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationTypes1$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<PagedModelEntityModelPatternRelationTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationTypeService.GetPatternRelationTypes1Path, 'get');
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
        return r as StrictHttpResponse<PagedModelEntityModelPatternRelationTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternRelationTypes1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationTypes1(params?: {
    page?: number;
    size?: number;

  }): Observable<PagedModelEntityModelPatternRelationTypeDto> {

    return this.getPatternRelationTypes1$Response(params).pipe(
      map((r: StrictHttpResponse<PagedModelEntityModelPatternRelationTypeDto>) => r.body as PagedModelEntityModelPatternRelationTypeDto)
    );
  }

  /**
   * Path part for operation createPatternRelationType
   */
  static readonly CreatePatternRelationTypePath = '/pattern-relation-types/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPatternRelationType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelationType$Response(params: {
      body: PatternRelationTypeDto
  }): Observable<StrictHttpResponse<EntityModelPatternRelationTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationTypeService.CreatePatternRelationTypePath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelPatternRelationTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPatternRelationType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelationType(params: {
      body: PatternRelationTypeDto
  }): Observable<EntityModelPatternRelationTypeDto> {

    return this.createPatternRelationType$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPatternRelationTypeDto>) => r.body as EntityModelPatternRelationTypeDto)
    );
  }

}
