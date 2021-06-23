/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CollectionModelEntityModelPatternView } from '../models/collection-model-entity-model-pattern-view';
import { EntityModelPatternView } from '../models/entity-model-pattern-view';
import { PatternView } from '../models/pattern-view';

@Injectable({
  providedIn: 'root',
})
export class PatternViewControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getAllPatternViews
   */
  static readonly GetAllPatternViewsPath = '/patternViews';

  /**
   * Retrieve all pattern views
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPatternViews()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPatternViews$Response(params?: {}): Observable<
    StrictHttpResponse<CollectionModelEntityModelPatternView>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternViewControllerService.GetAllPatternViewsPath,
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
          return r as StrictHttpResponse<CollectionModelEntityModelPatternView>;
        })
      );
  }

  /**
   * Retrieve all pattern views
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllPatternViews$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPatternViews(params?: {}): Observable<
    CollectionModelEntityModelPatternView
  > {
    return this.getAllPatternViews$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CollectionModelEntityModelPatternView>) =>
          r.body as CollectionModelEntityModelPatternView
      )
    );
  }

  /**
   * Path part for operation createPatternView
   */
  static readonly CreatePatternViewPath = '/patternViews';

  /**
   * Create a pattern view
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPatternView()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternView$Response(params: {
    body: PatternView;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternViewControllerService.CreatePatternViewPath,
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
   * Create a pattern view
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPatternView$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternView(params: { body: PatternView }): Observable<{}> {
    return this.createPatternView$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getPatternViewByUri
   */
  static readonly GetPatternViewByUriPath = '/patternViews/findByUri';

  /**
   * Retrieve pattern view by URI
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternViewByUri()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternViewByUri$Response(params: {
    encodedUri: string;
  }): Observable<StrictHttpResponse<EntityModelPatternView>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternViewControllerService.GetPatternViewByUriPath,
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
          return r as StrictHttpResponse<EntityModelPatternView>;
        })
      );
  }

  /**
   * Retrieve pattern view by URI
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternViewByUri$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternViewByUri(params: {
    encodedUri: string;
  }): Observable<EntityModelPatternView> {
    return this.getPatternViewByUri$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelPatternView>) =>
          r.body as EntityModelPatternView
      )
    );
  }

  /**
   * Path part for operation getPatternViewById
   */
  static readonly GetPatternViewByIdPath = '/patternViews/{patternViewId}';

  /**
   * Retrieve pattern view by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternViewById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternViewById$Response(params: {
    patternViewId: string;
  }): Observable<StrictHttpResponse<EntityModelPatternView>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternViewControllerService.GetPatternViewByIdPath,
      'get'
    );
    if (params) {
      rb.path('patternViewId', params.patternViewId, {});
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
          return r as StrictHttpResponse<EntityModelPatternView>;
        })
      );
  }

  /**
   * Retrieve pattern view by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternViewById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternViewById(params: {
    patternViewId: string;
  }): Observable<EntityModelPatternView> {
    return this.getPatternViewById$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelPatternView>) =>
          r.body as EntityModelPatternView
      )
    );
  }

  /**
   * Path part for operation updatePatternView
   */
  static readonly UpdatePatternViewPath = '/patternViews/{patternViewId}';

  /**
   * Update pattern view by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatternView()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternView$Response(params: {
    patternViewId: string;
    body: PatternView;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternViewControllerService.UpdatePatternViewPath,
      'put'
    );
    if (params) {
      rb.path('patternViewId', params.patternViewId, {});

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
   * Update pattern view by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePatternView$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternView(params: {
    patternViewId: string;
    body: PatternView;
  }): Observable<{}> {
    return this.updatePatternView$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation deletePatternViewById
   */
  static readonly DeletePatternViewByIdPath = '/patternViews/{patternViewId}';

  /**
   * Delete pattern view by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePatternViewById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternViewById$Response(params: {
    patternViewId: string;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternViewControllerService.DeletePatternViewByIdPath,
      'delete'
    );
    if (params) {
      rb.path('patternViewId', params.patternViewId, {});
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
   * Delete pattern view by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deletePatternViewById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternViewById(params: { patternViewId: string }): Observable<{}> {
    return this.deletePatternViewById$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getPatterViewGraph
   */
  static readonly GetPatterViewGraphPath =
    '/patternViews/{patternViewId}/graph';

  /**
   * Retrieve pattern view graph
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatterViewGraph()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatterViewGraph$Response(params: {
    patternViewId: string;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternViewControllerService.GetPatterViewGraphPath,
      'get'
    );
    if (params) {
      rb.path('patternViewId', params.patternViewId, {});
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
   * Retrieve pattern view graph
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatterViewGraph$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatterViewGraph(params: { patternViewId: string }): Observable<{}> {
    return this.getPatterViewGraph$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation updatePatternViewGraph
   */
  static readonly UpdatePatternViewGraphPath =
    '/patternViews/{patternViewId}/graph';

  /**
   * Update pattern view graph
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatternViewGraph()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternViewGraph$Response(params: {
    patternViewId: string;
    body: {};
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternViewControllerService.UpdatePatternViewGraphPath,
      'put'
    );
    if (params) {
      rb.path('patternViewId', params.patternViewId, {});

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
   * Update pattern view graph
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePatternViewGraph$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternViewGraph(params: {
    patternViewId: string;
    body: {};
  }): Observable<{}> {
    return this.updatePatternViewGraph$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation createPatternViewGraph
   */
  static readonly CreatePatternViewGraphPath =
    '/patternViews/{patternViewId}/graph';

  /**
   * Create pattern view graph
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPatternViewGraph()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternViewGraph$Response(params: {
    patternViewId: string;
    body: {};
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternViewControllerService.CreatePatternViewGraphPath,
      'post'
    );
    if (params) {
      rb.path('patternViewId', params.patternViewId, {});

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
   * Create pattern view graph
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPatternViewGraph$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternViewGraph(params: {
    patternViewId: string;
    body: {};
  }): Observable<{}> {
    return this.createPatternViewGraph$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation deletePatternViewGraph
   */
  static readonly DeletePatternViewGraphPath =
    '/patternViews/{patternViewId}/graph';

  /**
   * Delete pattern view graph
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePatternViewGraph()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternViewGraph$Response(params: {
    patternViewId: string;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternViewControllerService.DeletePatternViewGraphPath,
      'delete'
    );
    if (params) {
      rb.path('patternViewId', params.patternViewId, {});
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
   * Delete pattern view graph
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deletePatternViewGraph$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatternViewGraph(params: { patternViewId: string }): Observable<{}> {
    return this.deletePatternViewGraph$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }
}
