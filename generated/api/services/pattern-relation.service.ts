/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { EntityModelPatternRelationDto } from '../models/entity-model-pattern-relation-dto';
import { PagedModelEntityModelPatternRelationDto } from '../models/paged-model-entity-model-pattern-relation-dto';
import { PatternRelationDto } from '../models/pattern-relation-dto';

@Injectable({
  providedIn: 'root',
})
export class PatternRelationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPatternRelationTypes
   */
  static readonly GetPatternRelationTypesPath = '/pattern-relations/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelationTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationTypes$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<PagedModelEntityModelPatternRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationService.GetPatternRelationTypesPath, 'get');
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
        return r as StrictHttpResponse<PagedModelEntityModelPatternRelationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternRelationTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationTypes(params?: {
    page?: number;
    size?: number;

  }): Observable<PagedModelEntityModelPatternRelationDto> {

    return this.getPatternRelationTypes$Response(params).pipe(
      map((r: StrictHttpResponse<PagedModelEntityModelPatternRelationDto>) => r.body as PagedModelEntityModelPatternRelationDto)
    );
  }

  /**
   * Path part for operation createPatternRelation1
   */
  static readonly CreatePatternRelation1Path = '/pattern-relations/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPatternRelation1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelation1$Response(params: {
      body: PatternRelationDto
  }): Observable<StrictHttpResponse<EntityModelPatternRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationService.CreatePatternRelation1Path, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelPatternRelationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPatternRelation1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelation1(params: {
      body: PatternRelationDto
  }): Observable<EntityModelPatternRelationDto> {

    return this.createPatternRelation1$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPatternRelationDto>) => r.body as EntityModelPatternRelationDto)
    );
  }

  /**
   * Path part for operation getPatternRelation1
   */
  static readonly GetPatternRelation1Path = '/pattern-relations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelation1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelation1$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<EntityModelPatternRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationService.GetPatternRelation1Path, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelPatternRelationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternRelation1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelation1(params: {
    id: string;

  }): Observable<EntityModelPatternRelationDto> {

    return this.getPatternRelation1$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPatternRelationDto>) => r.body as EntityModelPatternRelationDto)
    );
  }

  /**
   * Path part for operation updatePatternRelationType
   */
  static readonly UpdatePatternRelationTypePath = '/pattern-relations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatternRelationType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelationType$Response(params: {
    id: string;
      body: PatternRelationDto
  }): Observable<StrictHttpResponse<EntityModelPatternRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationService.UpdatePatternRelationTypePath, 'put');
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
        return r as StrictHttpResponse<EntityModelPatternRelationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePatternRelationType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelationType(params: {
    id: string;
      body: PatternRelationDto
  }): Observable<EntityModelPatternRelationDto> {

    return this.updatePatternRelationType$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPatternRelationDto>) => r.body as EntityModelPatternRelationDto)
    );
  }

  /**
   * Path part for operation deletePatternRelation
   */
  static readonly DeletePatternRelationPath = '/pattern-relations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePatternRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelation$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationService.DeletePatternRelationPath, 'delete');
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
   * To access the full response (for headers, for example), `deletePatternRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelation(params: {
    id: string;

  }): Observable<{  }> {

    return this.deletePatternRelation$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

}
