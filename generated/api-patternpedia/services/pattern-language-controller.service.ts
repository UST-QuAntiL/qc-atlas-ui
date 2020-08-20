/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CollectionModelEntityModelPatternLanguageModel } from '../models/collection-model-entity-model-pattern-language-model';
import { EntityModelObject } from '../models/entity-model-object';
import { EntityModelPatternLanguage } from '../models/entity-model-pattern-language';
import { EntityModelPatternSchema } from '../models/entity-model-pattern-schema';
import { PatternLanguage } from '../models/pattern-language';
import { PatternSchema } from '../models/pattern-schema';

@Injectable({
  providedIn: 'root',
})
export class PatternLanguageControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getAllPatternLanguages
   */
  static readonly GetAllPatternLanguagesPath = '/patternLanguages';

  /**
   * Retrieve all pattern languages
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPatternLanguages()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPatternLanguages$Response(params?: {}): Observable<
    StrictHttpResponse<CollectionModelEntityModelPatternLanguageModel>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternLanguageControllerService.GetAllPatternLanguagesPath,
      'get'
    );
    if (params) {
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
            CollectionModelEntityModelPatternLanguageModel
          >;
        })
      );
  }

  /**
   * Retrieve all pattern languages
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllPatternLanguages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPatternLanguages(params?: {}): Observable<
    CollectionModelEntityModelPatternLanguageModel
  > {
    return this.getAllPatternLanguages$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<CollectionModelEntityModelPatternLanguageModel>
        ) => r.body as CollectionModelEntityModelPatternLanguageModel
      )
    );
  }

  /**
   * Path part for operation createPatternLanguage
   */
  static readonly CreatePatternLanguagePath = '/patternLanguages';

  /**
   * Create pattern language
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPatternLanguage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternLanguage$Response(params: {
    body: PatternLanguage;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternLanguageControllerService.CreatePatternLanguagePath,
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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * Create pattern language
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPatternLanguage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternLanguage(params: { body: PatternLanguage }): Observable<{}> {
    return this.createPatternLanguage$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getPatternLanguageByUri
   */
  static readonly GetPatternLanguageByUriPath = '/patternLanguages/findByUri';

  /**
   * Retrieve pattern language by URI
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternLanguageByUri()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternLanguageByUri$Response(params: {
    encodedUri: string;
  }): Observable<StrictHttpResponse<EntityModelPatternLanguage>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternLanguageControllerService.GetPatternLanguageByUriPath,
      'get'
    );
    if (params) {
      rb.query('encodedUri', params.encodedUri, {});
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
          return r as StrictHttpResponse<EntityModelPatternLanguage>;
        })
      );
  }

  /**
   * Retrieve pattern language by URI
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternLanguageByUri$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternLanguageByUri(params: {
    encodedUri: string;
  }): Observable<EntityModelPatternLanguage> {
    return this.getPatternLanguageByUri$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelPatternLanguage>) =>
          r.body as EntityModelPatternLanguage
      )
    );
  }

  /**
   * Path part for operation getPatternLanguageById
   */
  static readonly GetPatternLanguageByIdPath =
    '/patternLanguages/{patternLanguageId}';

  /**
   * Retrieve pattern language by ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternLanguageById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternLanguageById$Response(params: {
    patternLanguageId: string;
  }): Observable<StrictHttpResponse<EntityModelPatternLanguage>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternLanguageControllerService.GetPatternLanguageByIdPath,
      'get'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});
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
          return r as StrictHttpResponse<EntityModelPatternLanguage>;
        })
      );
  }

  /**
   * Retrieve pattern language by ID
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternLanguageById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternLanguageById(params: {
    patternLanguageId: string;
  }): Observable<EntityModelPatternLanguage> {
    return this.getPatternLanguageById$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelPatternLanguage>) =>
          r.body as EntityModelPatternLanguage
      )
    );
  }

  /**
   * Path part for operation updatePatternLanguage
   */
  static readonly UpdatePatternLanguagePath =
    '/patternLanguages/{patternLanguageId}';

  /**
   * Update pattern language
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatternLanguage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternLanguage$Response(params: {
    patternLanguageId: string;
    body: PatternLanguage;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternLanguageControllerService.UpdatePatternLanguagePath,
      'put'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});

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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * Update pattern language
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePatternLanguage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternLanguage(params: {
    patternLanguageId: string;
    body: PatternLanguage;
  }): Observable<{}> {
    return this.updatePatternLanguage$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation deletePatternLanguage
   */
  static readonly DeletePatternLanguagePath =
    '/patternLanguages/{patternLanguageId}';

  /**
   * Delete pattern language
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePatternLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternLanguage$Response(params: {
    patternLanguageId: string;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternLanguageControllerService.DeletePatternLanguagePath,
      'delete'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});
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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * Delete pattern language
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deletePatternLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternLanguage(params: { patternLanguageId: string }): Observable<{}> {
    return this.deletePatternLanguage$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getPatternLanguageGraph
   */
  static readonly GetPatternLanguageGraphPath =
    '/patternLanguages/{patternLanguageId}/graph';

  /**
   * Retrieve pattern language graph
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternLanguageGraph()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternLanguageGraph$Response(params: {
    patternLanguageId: string;
  }): Observable<StrictHttpResponse<EntityModelObject>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternLanguageControllerService.GetPatternLanguageGraphPath,
      'get'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});
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
          return r as StrictHttpResponse<EntityModelObject>;
        })
      );
  }

  /**
   * Retrieve pattern language graph
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternLanguageGraph$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternLanguageGraph(params: {
    patternLanguageId: string;
  }): Observable<EntityModelObject> {
    return this.getPatternLanguageGraph$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelObject>) =>
          r.body as EntityModelObject
      )
    );
  }

  /**
   * Path part for operation putPatternLanguageGraph
   */
  static readonly PutPatternLanguageGraphPath =
    '/patternLanguages/{patternLanguageId}/graph';

  /**
   * Update pattern language graph
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putPatternLanguageGraph()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putPatternLanguageGraph$Response(params: {
    patternLanguageId: string;
    body: {};
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternLanguageControllerService.PutPatternLanguageGraphPath,
      'put'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});

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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * Update pattern language graph
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putPatternLanguageGraph$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putPatternLanguageGraph(params: {
    patternLanguageId: string;
    body: {};
  }): Observable<{}> {
    return this.putPatternLanguageGraph$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation postPatternLanguageGraph
   */
  static readonly PostPatternLanguageGraphPath =
    '/patternLanguages/{patternLanguageId}/graph';

  /**
   * Update pattern language graph
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postPatternLanguageGraph()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postPatternLanguageGraph$Response(params: {
    patternLanguageId: string;
    body: {};
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternLanguageControllerService.PostPatternLanguageGraphPath,
      'post'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});

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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * Update pattern language graph
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postPatternLanguageGraph$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postPatternLanguageGraph(params: {
    patternLanguageId: string;
    body: {};
  }): Observable<{}> {
    return this.postPatternLanguageGraph$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation deletePatternLanguageGraph
   */
  static readonly DeletePatternLanguageGraphPath =
    '/patternLanguages/{patternLanguageId}/graph';

  /**
   * Delete pattern language graph
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePatternLanguageGraph()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternLanguageGraph$Response(params: {
    patternLanguageId: string;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternLanguageControllerService.DeletePatternLanguageGraphPath,
      'delete'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});
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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * Delete pattern language graph
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deletePatternLanguageGraph$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternLanguageGraph(params: {
    patternLanguageId: string;
  }): Observable<{}> {
    return this.deletePatternLanguageGraph$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getPatternSchema
   */
  static readonly GetPatternSchemaPath =
    '/patternLanguages/{patternLanguageId}/patternSchema';

  /**
   * Get pattern schema by pattern language id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternSchema()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternSchema$Response(params: {
    patternLanguageId: string;
  }): Observable<StrictHttpResponse<EntityModelPatternSchema>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternLanguageControllerService.GetPatternSchemaPath,
      'get'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});
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
          return r as StrictHttpResponse<EntityModelPatternSchema>;
        })
      );
  }

  /**
   * Get pattern schema by pattern language id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternSchema$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternSchema(params: {
    patternLanguageId: string;
  }): Observable<EntityModelPatternSchema> {
    return this.getPatternSchema$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelPatternSchema>) =>
          r.body as EntityModelPatternSchema
      )
    );
  }

  /**
   * Path part for operation updatePatternSchema
   */
  static readonly UpdatePatternSchemaPath =
    '/patternLanguages/{patternLanguageId}/patternSchema';

  /**
   * Update pattern schema by pattern language id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatternSchema()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternSchema$Response(params: {
    patternLanguageId: string;
    body: PatternSchema;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternLanguageControllerService.UpdatePatternSchemaPath,
      'put'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});

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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * Update pattern schema by pattern language id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePatternSchema$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternSchema(params: {
    patternLanguageId: string;
    body: PatternSchema;
  }): Observable<{}> {
    return this.updatePatternSchema$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }
}
