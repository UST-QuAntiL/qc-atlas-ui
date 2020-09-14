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
import { EntityModelPatternRelationDto } from '../models/entity-model-pattern-relation-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';
import { PatternRelationDto } from '../models/pattern-relation-dto';
import { PatternRelationTypeDto } from '../models/pattern-relation-type-dto';

@Injectable({
  providedIn: 'root',
})
export class PatternRelationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getAllPatternRelationTypes
   */
  static readonly GetAllPatternRelationTypesPath = '/v1/pattern-relations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPatternRelationTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPatternRelationTypes$Response(params?: {
    page?: number;
    size?: number;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { patternRelations?: Array<EntityModelPatternRelationDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationService.GetAllPatternRelationTypesPath,
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
              patternRelations?: Array<EntityModelPatternRelationDto>;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllPatternRelationTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPatternRelationTypes(params?: {
    page?: number;
    size?: number;
  }): Observable<{
    _embedded?: { patternRelations?: Array<EntityModelPatternRelationDto> };
    page?: PageMetadata;
  }> {
    return this.getAllPatternRelationTypes$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              patternRelations?: Array<EntityModelPatternRelationDto>;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              patternRelations?: Array<EntityModelPatternRelationDto>;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation createPatternRelation
   */
  static readonly CreatePatternRelationPath = '/v1/pattern-relations';

  /**
   * Add a pattern relation from an algorithm to a given pattern. Custom ID will be ignored. For pattern relation type only ID is required, other pattern relation type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPatternRelation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelation$Response(params: {
    body: PatternRelationDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      algorithm: AlgorithmDto;
      pattern: string;
      patternRelationType: PatternRelationTypeDto;
      description?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationService.CreatePatternRelationPath,
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
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Add a pattern relation from an algorithm to a given pattern. Custom ID will be ignored. For pattern relation type only ID is required, other pattern relation type attributes will not change.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPatternRelation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelation(params: {
    body: PatternRelationDto;
  }): Observable<{
    id?: string;
    algorithm: AlgorithmDto;
    pattern: string;
    patternRelationType: PatternRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.createPatternRelation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation getPatternRelation
   */
  static readonly GetPatternRelationPath = '/v1/pattern-relations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelation$Response(params: {
    id: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      algorithm: AlgorithmDto;
      pattern: string;
      patternRelationType: PatternRelationTypeDto;
      description?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationService.GetPatternRelationPath,
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
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelation(params: {
    id: string;
  }): Observable<{
    id?: string;
    algorithm: AlgorithmDto;
    pattern: string;
    patternRelationType: PatternRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.getPatternRelation$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updatePatternRelationTypeByPattern
   */
  static readonly UpdatePatternRelationTypeByPatternPath =
    '/v1/pattern-relations/{id}';

  /**
   * Update a reference to a pattern. Custom ID will be ignored. For pattern relation type only ID is required, other pattern relation type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatternRelationTypeByPattern()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelationTypeByPattern$Response(params: {
    id: string;
    body: PatternRelationDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      algorithm: AlgorithmDto;
      pattern: string;
      patternRelationType: PatternRelationTypeDto;
      description?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationService.UpdatePatternRelationTypeByPatternPath,
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
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Update a reference to a pattern. Custom ID will be ignored. For pattern relation type only ID is required, other pattern relation type attributes will not change.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePatternRelationTypeByPattern$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelationTypeByPattern(params: {
    id: string;
    body: PatternRelationDto;
  }): Observable<{
    id?: string;
    algorithm: AlgorithmDto;
    pattern: string;
    patternRelationType: PatternRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.updatePatternRelationTypeByPattern$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            algorithm: AlgorithmDto;
            pattern: string;
            patternRelationType: PatternRelationTypeDto;
            description?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deletePatternRelation
   */
  static readonly DeletePatternRelationPath = '/v1/pattern-relations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePatternRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelation$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationService.DeletePatternRelationPath,
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
   * To access the full response (for headers, for example), `deletePatternRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelation(params: { id: string }): Observable<void> {
    return this.deletePatternRelation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
