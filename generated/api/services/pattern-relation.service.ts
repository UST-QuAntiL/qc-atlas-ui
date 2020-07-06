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
   * Path part for operation getPatternRelationTypes
   */
  static readonly GetPatternRelationTypesPath = '/v1/pattern-relations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelationTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationTypes$Response(params?: {
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
      PatternRelationService.GetPatternRelationTypesPath,
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
   * To access the full response (for headers, for example), `getPatternRelationTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelationTypes(params?: {
    page?: number;
    size?: number;
  }): Observable<{
    _embedded?: { patternRelations?: Array<EntityModelPatternRelationDto> };
    page?: PageMetadata;
  }> {
    return this.getPatternRelationTypes$Response(params).pipe(
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
   * Path part for operation createPatternRelation1
   */
  static readonly CreatePatternRelation1Path = '/v1/pattern-relations';

  /**
   * Add a pattern relation from an algorithm to a given pattern. Custom ID will be ignored. For pattern relation type only ID is required, other pattern relation type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPatternRelation1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelation1$Response(params: {
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
      PatternRelationService.CreatePatternRelation1Path,
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
   * To access the full response (for headers, for example), `createPatternRelation1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelation1(params: {
    body: PatternRelationDto;
  }): Observable<{
    id?: string;
    algorithm: AlgorithmDto;
    pattern: string;
    patternRelationType: PatternRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.createPatternRelation1$Response(params).pipe(
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
   * Path part for operation getPatternRelation1
   */
  static readonly GetPatternRelation1Path = '/v1/pattern-relations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelation1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelation1$Response(params: {
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
      PatternRelationService.GetPatternRelation1Path,
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
   * To access the full response (for headers, for example), `getPatternRelation1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelation1(params: {
    id: string;
  }): Observable<{
    id?: string;
    algorithm: AlgorithmDto;
    pattern: string;
    patternRelationType: PatternRelationTypeDto;
    description?: string;
    _links?: Array<Link>;
  }> {
    return this.getPatternRelation1$Response(params).pipe(
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
   * Path part for operation updatePatternRelationType
   */
  static readonly UpdatePatternRelationTypePath = '/v1/pattern-relations/{id}';

  /**
   * Update a reference to a pattern. Custom ID will be ignored. For pattern relation type only ID is required, other pattern relation type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatternRelationType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelationType$Response(params: {
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
      PatternRelationService.UpdatePatternRelationTypePath,
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
   * To access the full response (for headers, for example), `updatePatternRelationType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelationType(params: {
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
    return this.updatePatternRelationType$Response(params).pipe(
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
   * Path part for operation deletePatternRelation1
   */
  static readonly DeletePatternRelation1Path = '/v1/pattern-relations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePatternRelation1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelation1$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationService.DeletePatternRelation1Path,
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
   * To access the full response (for headers, for example), `deletePatternRelation1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternRelation1(params: { id: string }): Observable<void> {
    return this.deletePatternRelation1$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
