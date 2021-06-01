/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PagePatternRelationDto } from '../models/page-pattern-relation-dto';
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
   * Path part for operation getPatternRelations
   */
  static readonly GetPatternRelationsPath = '/pattern-relations';

  /**
   * Retrieve all relations between pattern and algorithms.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelations$Response(params?: {

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

  }): Observable<StrictHttpResponse<PagePatternRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationService.GetPatternRelationsPath, 'get');
    if (params) {

      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PagePatternRelationDto>;
      })
    );
  }

  /**
   * Retrieve all relations between pattern and algorithms.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternRelations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelations(params?: {

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

  }): Observable<PagePatternRelationDto> {

    return this.getPatternRelations$Response(params).pipe(
      map((r: StrictHttpResponse<PagePatternRelationDto>) => r.body as PagePatternRelationDto)
    );
  }

  /**
   * Path part for operation createPatternRelation
   */
  static readonly CreatePatternRelationPath = '/pattern-relations';

  /**
   * Create a relation between a pattern and an algorithm.The pattern relation type has to be already created (e.g. via POST on /pattern-relation-types). As a result only the ID is required for the pattern relation type, other attributes will be ignored not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPatternRelation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelation$Response(params: {
      body: PatternRelationDto
  }): Observable<StrictHttpResponse<PatternRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationService.CreatePatternRelationPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PatternRelationDto>;
      })
    );
  }

  /**
   * Create a relation between a pattern and an algorithm.The pattern relation type has to be already created (e.g. via POST on /pattern-relation-types). As a result only the ID is required for the pattern relation type, other attributes will be ignored not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPatternRelation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelation(params: {
      body: PatternRelationDto
  }): Observable<PatternRelationDto> {

    return this.createPatternRelation$Response(params).pipe(
      map((r: StrictHttpResponse<PatternRelationDto>) => r.body as PatternRelationDto)
    );
  }

  /**
   * Path part for operation getPatternRelation
   */
  static readonly GetPatternRelationPath = '/pattern-relations/{patternRelationId}';

  /**
   * Retrieve a specific relation between a pattern and an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelation$Response(params: {
    patternRelationId: string;

  }): Observable<StrictHttpResponse<PatternRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationService.GetPatternRelationPath, 'get');
    if (params) {

      rb.path('patternRelationId', params.patternRelationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PatternRelationDto>;
      })
    );
  }

  /**
   * Retrieve a specific relation between a pattern and an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelation(params: {
    patternRelationId: string;

  }): Observable<PatternRelationDto> {

    return this.getPatternRelation$Response(params).pipe(
      map((r: StrictHttpResponse<PatternRelationDto>) => r.body as PatternRelationDto)
    );
  }

  /**
   * Path part for operation updatePatternRelation
   */
  static readonly UpdatePatternRelationPath = '/pattern-relations/{patternRelationId}';

  /**
   * Update a relation between a pattern and an algorithm. For the pattern relation type only the ID is required,other pattern relation type attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatternRelation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelation$Response(params: {
    patternRelationId: string;
      body: PatternRelationDto
  }): Observable<StrictHttpResponse<PatternRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationService.UpdatePatternRelationPath, 'put');
    if (params) {

      rb.path('patternRelationId', params.patternRelationId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PatternRelationDto>;
      })
    );
  }

  /**
   * Update a relation between a pattern and an algorithm. For the pattern relation type only the ID is required,other pattern relation type attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePatternRelation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelation(params: {
    patternRelationId: string;
      body: PatternRelationDto
  }): Observable<PatternRelationDto> {

    return this.updatePatternRelation$Response(params).pipe(
      map((r: StrictHttpResponse<PatternRelationDto>) => r.body as PatternRelationDto)
    );
  }

  /**
   * Path part for operation deletePatternRelation
   */
  static readonly DeletePatternRelationPath = '/pattern-relations/{patternRelationId}';

  /**
   * Delete a specific relation between a pattern and an algorithm. The pattern relation type is not affected by this.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePatternRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelation$Response(params: {
    patternRelationId: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PatternRelationService.DeletePatternRelationPath, 'delete');
    if (params) {

      rb.path('patternRelationId', params.patternRelationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a specific relation between a pattern and an algorithm. The pattern relation type is not affected by this.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deletePatternRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelation(params: {
    patternRelationId: string;

  }): Observable<void> {

    return this.deletePatternRelation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
