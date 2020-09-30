/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CollectionModelEntityModelPatternModel } from '../models/collection-model-entity-model-pattern-model';
import { EntityModelObject } from '../models/entity-model-object';
import { EntityModelPattern } from '../models/entity-model-pattern';
import { Pattern } from '../models/pattern';

@Injectable({
  providedIn: 'root',
})
export class PatternControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPatternsOfPatternLanguage
   */
  static readonly GetPatternsOfPatternLanguagePath = '/patternLanguages/{patternLanguageId}/patterns';

  /**
   * Retrieve patterns by pattern language id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternsOfPatternLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternsOfPatternLanguage$Response(params: {
    patternLanguageId: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelPatternModel>> {

    const rb = new RequestBuilder(this.rootUrl, PatternControllerService.GetPatternsOfPatternLanguagePath, 'get');
    if (params) {

      rb.path('patternLanguageId', params.patternLanguageId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelPatternModel>;
      })
    );
  }

  /**
   * Retrieve patterns by pattern language id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternsOfPatternLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternsOfPatternLanguage(params: {
    patternLanguageId: string;

  }): Observable<CollectionModelEntityModelPatternModel> {

    return this.getPatternsOfPatternLanguage$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelPatternModel>) => r.body as CollectionModelEntityModelPatternModel)
    );
  }

  /**
   * Path part for operation addPatternToPatternLanguage
   */
  static readonly AddPatternToPatternLanguagePath = '/patternLanguages/{patternLanguageId}/patterns';

  /**
   * Delete pattern from pattern view
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPatternToPatternLanguage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPatternToPatternLanguage$Response(params: {
    patternLanguageId: string;
      body: Pattern
  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, PatternControllerService.AddPatternToPatternLanguagePath, 'post');
    if (params) {

      rb.path('patternLanguageId', params.patternLanguageId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{}>;
      })
    );
  }

  /**
   * Delete pattern from pattern view
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addPatternToPatternLanguage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPatternToPatternLanguage(params: {
    patternLanguageId: string;
      body: Pattern
  }): Observable<{}> {

    return this.addPatternToPatternLanguage$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getPatternOfPatternLanguageById
   */
  static readonly GetPatternOfPatternLanguageByIdPath = '/patternLanguages/{patternLanguageId}/patterns/{patternId}';

  /**
   * Retrieve single pattern by pattern language id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternOfPatternLanguageById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternOfPatternLanguageById$Response(params: {
    patternLanguageId: string;
    patternId: string;

  }): Observable<StrictHttpResponse<EntityModelPattern>> {

    const rb = new RequestBuilder(this.rootUrl, PatternControllerService.GetPatternOfPatternLanguageByIdPath, 'get');
    if (params) {

      rb.path('patternLanguageId', params.patternLanguageId, {});
      rb.path('patternId', params.patternId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelPattern>;
      })
    );
  }

  /**
   * Retrieve single pattern by pattern language id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternOfPatternLanguageById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternOfPatternLanguageById(params: {
    patternLanguageId: string;
    patternId: string;

  }): Observable<EntityModelPattern> {

    return this.getPatternOfPatternLanguageById$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPattern>) => r.body as EntityModelPattern)
    );
  }

  /**
   * Path part for operation updatePatternByPatternLanguageId
   */
  static readonly UpdatePatternByPatternLanguageIdPath = '/patternLanguages/{patternLanguageId}/patterns/{patternId}';

  /**
   * Update pattern by pattern language id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatternByPatternLanguageId()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternByPatternLanguageId$Response(params: {
    patternLanguageId: string;
    patternId: string;
      body: Pattern
  }): Observable<StrictHttpResponse<EntityModelPattern>> {

    const rb = new RequestBuilder(this.rootUrl, PatternControllerService.UpdatePatternByPatternLanguageIdPath, 'put');
    if (params) {

      rb.path('patternLanguageId', params.patternLanguageId, {});
      rb.path('patternId', params.patternId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelPattern>;
      })
    );
  }

  /**
   * Update pattern by pattern language id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePatternByPatternLanguageId$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternByPatternLanguageId(params: {
    patternLanguageId: string;
    patternId: string;
      body: Pattern
  }): Observable<EntityModelPattern> {

    return this.updatePatternByPatternLanguageId$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPattern>) => r.body as EntityModelPattern)
    );
  }

  /**
   * Path part for operation deletePatternOfPatternLanguage
   */
  static readonly DeletePatternOfPatternLanguagePath = '/patternLanguages/{patternLanguageId}/patterns/{patternId}';

  /**
   * Delete pattern of pattern language
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePatternOfPatternLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternOfPatternLanguage$Response(params: {
    patternLanguageId: string;
    patternId: string;

  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, PatternControllerService.DeletePatternOfPatternLanguagePath, 'delete');
    if (params) {

      rb.path('patternLanguageId', params.patternLanguageId, {});
      rb.path('patternId', params.patternId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{}>;
      })
    );
  }

  /**
   * Delete pattern of pattern language
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deletePatternOfPatternLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternOfPatternLanguage(params: {
    patternLanguageId: string;
    patternId: string;

  }): Observable<{}> {

    return this.deletePatternOfPatternLanguage$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getPatternContent
   */
  static readonly GetPatternContentPath = '/patternLanguages/{patternLanguageId}/patterns/{patternId}/content';

  /**
   * Get content of pattern
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternContent()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternContent$Response(params: {
    patternLanguageId: string;
    patternId: string;

  }): Observable<StrictHttpResponse<EntityModelObject>> {

    const rb = new RequestBuilder(this.rootUrl, PatternControllerService.GetPatternContentPath, 'get');
    if (params) {

      rb.path('patternLanguageId', params.patternLanguageId, {});
      rb.path('patternId', params.patternId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelObject>;
      })
    );
  }

  /**
   * Get content of pattern
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternContent$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternContent(params: {
    patternLanguageId: string;
    patternId: string;

  }): Observable<EntityModelObject> {

    return this.getPatternContent$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelObject>) => r.body as EntityModelObject)
    );
  }

  /**
   * Path part for operation getPatternsOfPatternView
   */
  static readonly GetPatternsOfPatternViewPath = '/patternViews/{patternViewId}/patterns';

  /**
   * Retrieve patterns by pattern view id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternsOfPatternView()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternsOfPatternView$Response(params: {
    patternViewId: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelPatternModel>> {

    const rb = new RequestBuilder(this.rootUrl, PatternControllerService.GetPatternsOfPatternViewPath, 'get');
    if (params) {

      rb.path('patternViewId', params.patternViewId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelPatternModel>;
      })
    );
  }

  /**
   * Retrieve patterns by pattern view id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternsOfPatternView$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternsOfPatternView(params: {
    patternViewId: string;

  }): Observable<CollectionModelEntityModelPatternModel> {

    return this.getPatternsOfPatternView$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelPatternModel>) => r.body as CollectionModelEntityModelPatternModel)
    );
  }

  /**
   * Path part for operation addPatternToPatternView
   */
  static readonly AddPatternToPatternViewPath = '/patternViews/{patternViewId}/patterns';

  /**
   * add pattern to pattern view
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPatternToPatternView()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPatternToPatternView$Response(params: {
    patternViewId: string;
      body: Pattern
  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, PatternControllerService.AddPatternToPatternViewPath, 'post');
    if (params) {

      rb.path('patternViewId', params.patternViewId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{}>;
      })
    );
  }

  /**
   * add pattern to pattern view
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addPatternToPatternView$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPatternToPatternView(params: {
    patternViewId: string;
      body: Pattern
  }): Observable<{}> {

    return this.addPatternToPatternView$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getPatternOfPatternViewById
   */
  static readonly GetPatternOfPatternViewByIdPath = '/patternViews/{patternViewId}/patterns/{patternId}';

  /**
   * Retrieve single pattern by pattern view id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternOfPatternViewById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternOfPatternViewById$Response(params: {
    patternViewId: string;
    patternId: string;

  }): Observable<StrictHttpResponse<EntityModelPattern>> {

    const rb = new RequestBuilder(this.rootUrl, PatternControllerService.GetPatternOfPatternViewByIdPath, 'get');
    if (params) {

      rb.path('patternViewId', params.patternViewId, {});
      rb.path('patternId', params.patternId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelPattern>;
      })
    );
  }

  /**
   * Retrieve single pattern by pattern view id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternOfPatternViewById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternOfPatternViewById(params: {
    patternViewId: string;
    patternId: string;

  }): Observable<EntityModelPattern> {

    return this.getPatternOfPatternViewById$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPattern>) => r.body as EntityModelPattern)
    );
  }

  /**
   * Path part for operation removePatternFromView
   */
  static readonly RemovePatternFromViewPath = '/patternViews/{patternViewId}/patterns/{patternId}';

  /**
   * Delete pattern from pattern view
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removePatternFromView()` instead.
   *
   * This method doesn't expect any request body.
   */
  removePatternFromView$Response(params: {
    patternViewId: string;
    patternId: string;

  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, PatternControllerService.RemovePatternFromViewPath, 'delete');
    if (params) {

      rb.path('patternViewId', params.patternViewId, {});
      rb.path('patternId', params.patternId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{}>;
      })
    );
  }

  /**
   * Delete pattern from pattern view
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removePatternFromView$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removePatternFromView(params: {
    patternViewId: string;
    patternId: string;

  }): Observable<{}> {

    return this.removePatternFromView$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getPatternByUri
   */
  static readonly GetPatternByUriPath = '/patterns/search/findByUri';

  /**
   * Retrieve patterns by pattern uri
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternByUri()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternByUri$Response(params: {
    encodedUri: string;

  }): Observable<StrictHttpResponse<EntityModelPattern>> {

    const rb = new RequestBuilder(this.rootUrl, PatternControllerService.GetPatternByUriPath, 'get');
    if (params) {

      rb.query('encodedUri', params.encodedUri, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelPattern>;
      })
    );
  }

  /**
   * Retrieve patterns by pattern uri
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternByUri$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternByUri(params: {
    encodedUri: string;

  }): Observable<EntityModelPattern> {

    return this.getPatternByUri$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPattern>) => r.body as EntityModelPattern)
    );
  }

}
