/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AddDirectedEdgeToViewRequest } from '../models/add-directed-edge-to-view-request';
import { AddUndirectedEdgeToViewRequest } from '../models/add-undirected-edge-to-view-request';
import { CollectionModelEntityModelDirectedEdgeModel } from '../models/collection-model-entity-model-directed-edge-model';
import { CollectionModelEntityModelUndirectedEdgeModel } from '../models/collection-model-entity-model-undirected-edge-model';
import { CreateDirectedEdgeRequest } from '../models/create-directed-edge-request';
import { CreateUndirectedEdgeRequest } from '../models/create-undirected-edge-request';
import { DirectedEdge } from '../models/directed-edge';
import { EntityModelDirectedEdgeModel } from '../models/entity-model-directed-edge-model';
import { EntityModelUndirectedEdgeModel } from '../models/entity-model-undirected-edge-model';
import { UndirectedEdge } from '../models/undirected-edge';
import { UpdateDirectedEdgeRequest } from '../models/update-directed-edge-request';
import { UpdateUndirectedEdgeRequest } from '../models/update-undirected-edge-request';

@Injectable({
  providedIn: 'root',
})
export class PatternRelationDescriptorControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getDirectedEdgesOfPatternLanguage
   */
  static readonly GetDirectedEdgesOfPatternLanguagePath =
    '/patternLanguages/{patternLanguageId}/directedEdges';

  /**
   * Get directed edges of pattern language
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDirectedEdgesOfPatternLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDirectedEdgesOfPatternLanguage$Response(params: {
    patternLanguageId: string;
  }): Observable<
    StrictHttpResponse<CollectionModelEntityModelDirectedEdgeModel>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.GetDirectedEdgesOfPatternLanguagePath,
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
          return r as StrictHttpResponse<
            CollectionModelEntityModelDirectedEdgeModel
          >;
        })
      );
  }

  /**
   * Get directed edges of pattern language
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDirectedEdgesOfPatternLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDirectedEdgesOfPatternLanguage(params: {
    patternLanguageId: string;
  }): Observable<CollectionModelEntityModelDirectedEdgeModel> {
    return this.getDirectedEdgesOfPatternLanguage$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CollectionModelEntityModelDirectedEdgeModel>) =>
          r.body as CollectionModelEntityModelDirectedEdgeModel
      )
    );
  }

  /**
   * Path part for operation addDirectedEdgeToPatternLanguage
   */
  static readonly AddDirectedEdgeToPatternLanguagePath =
    '/patternLanguages/{patternLanguageId}/directedEdges';

  /**
   * Adds directed edge to pattern language
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDirectedEdgeToPatternLanguage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDirectedEdgeToPatternLanguage$Response(params: {
    patternLanguageId: string;
    body: CreateDirectedEdgeRequest;
  }): Observable<StrictHttpResponse<DirectedEdge>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.AddDirectedEdgeToPatternLanguagePath,
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
          return r as StrictHttpResponse<DirectedEdge>;
        })
      );
  }

  /**
   * Adds directed edge to pattern language
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addDirectedEdgeToPatternLanguage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDirectedEdgeToPatternLanguage(params: {
    patternLanguageId: string;
    body: CreateDirectedEdgeRequest;
  }): Observable<DirectedEdge> {
    return this.addDirectedEdgeToPatternLanguage$Response(params).pipe(
      map((r: StrictHttpResponse<DirectedEdge>) => r.body as DirectedEdge)
    );
  }

  /**
   * Path part for operation getDirectedEdgeOfPatternLanguageById
   */
  static readonly GetDirectedEdgeOfPatternLanguageByIdPath =
    '/patternLanguages/{patternLanguageId}/directedEdges/{directedEdgeId}';

  /**
   * Get directed edge of pattern language
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDirectedEdgeOfPatternLanguageById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDirectedEdgeOfPatternLanguageById$Response(params: {
    patternLanguageId: string;
    directedEdgeId: string;
  }): Observable<StrictHttpResponse<EntityModelDirectedEdgeModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.GetDirectedEdgeOfPatternLanguageByIdPath,
      'get'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});
      rb.path('directedEdgeId', params.directedEdgeId, {});
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
          return r as StrictHttpResponse<EntityModelDirectedEdgeModel>;
        })
      );
  }

  /**
   * Get directed edge of pattern language
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDirectedEdgeOfPatternLanguageById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDirectedEdgeOfPatternLanguageById(params: {
    patternLanguageId: string;
    directedEdgeId: string;
  }): Observable<EntityModelDirectedEdgeModel> {
    return this.getDirectedEdgeOfPatternLanguageById$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDirectedEdgeModel>) =>
          r.body as EntityModelDirectedEdgeModel
      )
    );
  }

  /**
   * Path part for operation updateDirectedEdgeOfPatternLanguage
   */
  static readonly UpdateDirectedEdgeOfPatternLanguagePath =
    '/patternLanguages/{patternLanguageId}/directedEdges/{directedEdgeId}';

  /**
   * Update directed edge of pattern language
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDirectedEdgeOfPatternLanguage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDirectedEdgeOfPatternLanguage$Response(params: {
    patternLanguageId: string;
    directedEdgeId: string;
    body: DirectedEdge;
  }): Observable<StrictHttpResponse<EntityModelDirectedEdgeModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.UpdateDirectedEdgeOfPatternLanguagePath,
      'put'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});
      rb.path('directedEdgeId', params.directedEdgeId, {});

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
          return r as StrictHttpResponse<EntityModelDirectedEdgeModel>;
        })
      );
  }

  /**
   * Update directed edge of pattern language
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateDirectedEdgeOfPatternLanguage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDirectedEdgeOfPatternLanguage(params: {
    patternLanguageId: string;
    directedEdgeId: string;
    body: DirectedEdge;
  }): Observable<EntityModelDirectedEdgeModel> {
    return this.updateDirectedEdgeOfPatternLanguage$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDirectedEdgeModel>) =>
          r.body as EntityModelDirectedEdgeModel
      )
    );
  }

  /**
   * Path part for operation removeDirectedEdgeFromPatternLanguage
   */
  static readonly RemoveDirectedEdgeFromPatternLanguagePath =
    '/patternLanguages/{patternLanguageId}/directedEdges/{directedEdgeId}';

  /**
   * Remove directed edge of pattern language
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeDirectedEdgeFromPatternLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeDirectedEdgeFromPatternLanguage$Response(params: {
    patternLanguageId: string;
    directedEdgeId: string;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.RemoveDirectedEdgeFromPatternLanguagePath,
      'delete'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});
      rb.path('directedEdgeId', params.directedEdgeId, {});
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
   * Remove directed edge of pattern language
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeDirectedEdgeFromPatternLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeDirectedEdgeFromPatternLanguage(params: {
    patternLanguageId: string;
    directedEdgeId: string;
  }): Observable<{}> {
    return this.removeDirectedEdgeFromPatternLanguage$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getUndirectedEdgesOfPatternLanguage
   */
  static readonly GetUndirectedEdgesOfPatternLanguagePath =
    '/patternLanguages/{patternLanguageId}/undirectedEdges';

  /**
   * Get undirected edge of pattern language
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUndirectedEdgesOfPatternLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUndirectedEdgesOfPatternLanguage$Response(params: {
    patternLanguageId: string;
  }): Observable<
    StrictHttpResponse<CollectionModelEntityModelUndirectedEdgeModel>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.GetUndirectedEdgesOfPatternLanguagePath,
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
          return r as StrictHttpResponse<
            CollectionModelEntityModelUndirectedEdgeModel
          >;
        })
      );
  }

  /**
   * Get undirected edge of pattern language
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUndirectedEdgesOfPatternLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUndirectedEdgesOfPatternLanguage(params: {
    patternLanguageId: string;
  }): Observable<CollectionModelEntityModelUndirectedEdgeModel> {
    return this.getUndirectedEdgesOfPatternLanguage$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<CollectionModelEntityModelUndirectedEdgeModel>
        ) => r.body as CollectionModelEntityModelUndirectedEdgeModel
      )
    );
  }

  /**
   * Path part for operation addUndirectedEdgeToPatternLanguage
   */
  static readonly AddUndirectedEdgeToPatternLanguagePath =
    '/patternLanguages/{patternLanguageId}/undirectedEdges';

  /**
   * Add undirected edge to pattern language
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addUndirectedEdgeToPatternLanguage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addUndirectedEdgeToPatternLanguage$Response(params: {
    patternLanguageId: string;
    body: CreateUndirectedEdgeRequest;
  }): Observable<StrictHttpResponse<UndirectedEdge>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.AddUndirectedEdgeToPatternLanguagePath,
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
          return r as StrictHttpResponse<UndirectedEdge>;
        })
      );
  }

  /**
   * Add undirected edge to pattern language
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addUndirectedEdgeToPatternLanguage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addUndirectedEdgeToPatternLanguage(params: {
    patternLanguageId: string;
    body: CreateUndirectedEdgeRequest;
  }): Observable<UndirectedEdge> {
    return this.addUndirectedEdgeToPatternLanguage$Response(params).pipe(
      map((r: StrictHttpResponse<UndirectedEdge>) => r.body as UndirectedEdge)
    );
  }

  /**
   * Path part for operation getUndirectedEdgeOfPatternLanguageById
   */
  static readonly GetUndirectedEdgeOfPatternLanguageByIdPath =
    '/patternLanguages/{patternLanguageId}/undirectedEdges/{undirectedEdgeId}';

  /**
   * Get undirected edge of pattern language by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUndirectedEdgeOfPatternLanguageById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUndirectedEdgeOfPatternLanguageById$Response(params: {
    patternLanguageId: string;
    undirectedEdgeId: string;
  }): Observable<StrictHttpResponse<EntityModelUndirectedEdgeModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.GetUndirectedEdgeOfPatternLanguageByIdPath,
      'get'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});
      rb.path('undirectedEdgeId', params.undirectedEdgeId, {});
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
          return r as StrictHttpResponse<EntityModelUndirectedEdgeModel>;
        })
      );
  }

  /**
   * Get undirected edge of pattern language by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUndirectedEdgeOfPatternLanguageById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUndirectedEdgeOfPatternLanguageById(params: {
    patternLanguageId: string;
    undirectedEdgeId: string;
  }): Observable<EntityModelUndirectedEdgeModel> {
    return this.getUndirectedEdgeOfPatternLanguageById$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelUndirectedEdgeModel>) =>
          r.body as EntityModelUndirectedEdgeModel
      )
    );
  }

  /**
   * Path part for operation updateUndirectedEdgeOfPatternLanguageById
   */
  static readonly UpdateUndirectedEdgeOfPatternLanguageByIdPath =
    '/patternLanguages/{patternLanguageId}/undirectedEdges/{undirectedEdgeId}';

  /**
   * Get undirected edge of pattern language by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUndirectedEdgeOfPatternLanguageById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUndirectedEdgeOfPatternLanguageById$Response(params: {
    patternLanguageId: string;
    undirectedEdgeId: string;
    body: UndirectedEdge;
  }): Observable<StrictHttpResponse<EntityModelUndirectedEdgeModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.UpdateUndirectedEdgeOfPatternLanguageByIdPath,
      'put'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});
      rb.path('undirectedEdgeId', params.undirectedEdgeId, {});

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
          return r as StrictHttpResponse<EntityModelUndirectedEdgeModel>;
        })
      );
  }

  /**
   * Get undirected edge of pattern language by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateUndirectedEdgeOfPatternLanguageById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUndirectedEdgeOfPatternLanguageById(params: {
    patternLanguageId: string;
    undirectedEdgeId: string;
    body: UndirectedEdge;
  }): Observable<EntityModelUndirectedEdgeModel> {
    return this.updateUndirectedEdgeOfPatternLanguageById$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelUndirectedEdgeModel>) =>
          r.body as EntityModelUndirectedEdgeModel
      )
    );
  }

  /**
   * Path part for operation removeUndirectedEdgeFromPatternLanguage
   */
  static readonly RemoveUndirectedEdgeFromPatternLanguagePath =
    '/patternLanguages/{patternLanguageId}/undirectedEdges/{undirectedEdgeId}';

  /**
   * Remove undirected edge of pattern language by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeUndirectedEdgeFromPatternLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUndirectedEdgeFromPatternLanguage$Response(params: {
    patternLanguageId: string;
    undirectedEdgeId: string;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.RemoveUndirectedEdgeFromPatternLanguagePath,
      'delete'
    );
    if (params) {
      rb.path('patternLanguageId', params.patternLanguageId, {});
      rb.path('undirectedEdgeId', params.undirectedEdgeId, {});
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
   * Remove undirected edge of pattern language by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeUndirectedEdgeFromPatternLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUndirectedEdgeFromPatternLanguage(params: {
    patternLanguageId: string;
    undirectedEdgeId: string;
  }): Observable<{}> {
    return this.removeUndirectedEdgeFromPatternLanguage$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getDirectedEdgesOfView
   */
  static readonly GetDirectedEdgesOfViewPath =
    '/patternViews/{patternViewId}/directedEdges';

  /**
   * Retrieve directed edges of view
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDirectedEdgesOfView()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDirectedEdgesOfView$Response(params: {
    patternViewId: string;
  }): Observable<
    StrictHttpResponse<CollectionModelEntityModelDirectedEdgeModel>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.GetDirectedEdgesOfViewPath,
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
          return r as StrictHttpResponse<
            CollectionModelEntityModelDirectedEdgeModel
          >;
        })
      );
  }

  /**
   * Retrieve directed edges of view
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDirectedEdgesOfView$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDirectedEdgesOfView(params: {
    patternViewId: string;
  }): Observable<CollectionModelEntityModelDirectedEdgeModel> {
    return this.getDirectedEdgesOfView$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CollectionModelEntityModelDirectedEdgeModel>) =>
          r.body as CollectionModelEntityModelDirectedEdgeModel
      )
    );
  }

  /**
   * Path part for operation addDirectedEdgeToView
   */
  static readonly AddDirectedEdgeToViewPath =
    '/patternViews/{patternViewId}/directedEdges';

  /**
   * Adds directed edge to view
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDirectedEdgeToView()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDirectedEdgeToView$Response(params: {
    patternViewId: string;
    body: AddDirectedEdgeToViewRequest;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.AddDirectedEdgeToViewPath,
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
   * Adds directed edge to view
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addDirectedEdgeToView$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDirectedEdgeToView(params: {
    patternViewId: string;
    body: AddDirectedEdgeToViewRequest;
  }): Observable<{}> {
    return this.addDirectedEdgeToView$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getDirectedEdgeOfPatternViewById
   */
  static readonly GetDirectedEdgeOfPatternViewByIdPath =
    '/patternViews/{patternViewId}/directedEdges/{directedEdgeId}';

  /**
   * Retrieve directed edge of pattern view by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDirectedEdgeOfPatternViewById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDirectedEdgeOfPatternViewById$Response(params: {
    patternViewId: string;
    directedEdgeId: string;
  }): Observable<StrictHttpResponse<EntityModelDirectedEdgeModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.GetDirectedEdgeOfPatternViewByIdPath,
      'get'
    );
    if (params) {
      rb.path('patternViewId', params.patternViewId, {});
      rb.path('directedEdgeId', params.directedEdgeId, {});
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
          return r as StrictHttpResponse<EntityModelDirectedEdgeModel>;
        })
      );
  }

  /**
   * Retrieve directed edge of pattern view by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDirectedEdgeOfPatternViewById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDirectedEdgeOfPatternViewById(params: {
    patternViewId: string;
    directedEdgeId: string;
  }): Observable<EntityModelDirectedEdgeModel> {
    return this.getDirectedEdgeOfPatternViewById$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDirectedEdgeModel>) =>
          r.body as EntityModelDirectedEdgeModel
      )
    );
  }

  /**
   * Path part for operation updateDirectedEdgeOfPatternViewById
   */
  static readonly UpdateDirectedEdgeOfPatternViewByIdPath =
    '/patternViews/{patternViewId}/directedEdges/{directedEdgeId}';

  /**
   * Update directed edge of pattern view by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDirectedEdgeOfPatternViewById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDirectedEdgeOfPatternViewById$Response(params: {
    patternViewId: string;
    directedEdgeId: string;
    body: UpdateDirectedEdgeRequest;
  }): Observable<StrictHttpResponse<EntityModelDirectedEdgeModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.UpdateDirectedEdgeOfPatternViewByIdPath,
      'put'
    );
    if (params) {
      rb.path('patternViewId', params.patternViewId, {});
      rb.path('directedEdgeId', params.directedEdgeId, {});

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
          return r as StrictHttpResponse<EntityModelDirectedEdgeModel>;
        })
      );
  }

  /**
   * Update directed edge of pattern view by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateDirectedEdgeOfPatternViewById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDirectedEdgeOfPatternViewById(params: {
    patternViewId: string;
    directedEdgeId: string;
    body: UpdateDirectedEdgeRequest;
  }): Observable<EntityModelDirectedEdgeModel> {
    return this.updateDirectedEdgeOfPatternViewById$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDirectedEdgeModel>) =>
          r.body as EntityModelDirectedEdgeModel
      )
    );
  }

  /**
   * Path part for operation removeDirectedEdgeFromPatternView
   */
  static readonly RemoveDirectedEdgeFromPatternViewPath =
    '/patternViews/{patternViewId}/directedEdges/{directedEdgeId}';

  /**
   * Remove directed edge of pattern view by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeDirectedEdgeFromPatternView()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeDirectedEdgeFromPatternView$Response(params: {
    patternViewId: string;
    directedEdgeId: string;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.RemoveDirectedEdgeFromPatternViewPath,
      'delete'
    );
    if (params) {
      rb.path('patternViewId', params.patternViewId, {});
      rb.path('directedEdgeId', params.directedEdgeId, {});
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
   * Remove directed edge of pattern view by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeDirectedEdgeFromPatternView$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeDirectedEdgeFromPatternView(params: {
    patternViewId: string;
    directedEdgeId: string;
  }): Observable<{}> {
    return this.removeDirectedEdgeFromPatternView$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getUndirectedEdgesOfView
   */
  static readonly GetUndirectedEdgesOfViewPath =
    '/patternViews/{patternViewId}/undirectedEdges';

  /**
   * Retrieve undirected edges of pattern view
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUndirectedEdgesOfView()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUndirectedEdgesOfView$Response(params: {
    patternViewId: string;
  }): Observable<
    StrictHttpResponse<CollectionModelEntityModelUndirectedEdgeModel>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.GetUndirectedEdgesOfViewPath,
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
          return r as StrictHttpResponse<
            CollectionModelEntityModelUndirectedEdgeModel
          >;
        })
      );
  }

  /**
   * Retrieve undirected edges of pattern view
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUndirectedEdgesOfView$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUndirectedEdgesOfView(params: {
    patternViewId: string;
  }): Observable<CollectionModelEntityModelUndirectedEdgeModel> {
    return this.getUndirectedEdgesOfView$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<CollectionModelEntityModelUndirectedEdgeModel>
        ) => r.body as CollectionModelEntityModelUndirectedEdgeModel
      )
    );
  }

  /**
   * Path part for operation addUndirectedEdgeToView
   */
  static readonly AddUndirectedEdgeToViewPath =
    '/patternViews/{patternViewId}/undirectedEdges';

  /**
   * Add undirected edge to pattern view
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addUndirectedEdgeToView()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addUndirectedEdgeToView$Response(params: {
    patternViewId: string;
    body: AddUndirectedEdgeToViewRequest;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.AddUndirectedEdgeToViewPath,
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
   * Add undirected edge to pattern view
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addUndirectedEdgeToView$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addUndirectedEdgeToView(params: {
    patternViewId: string;
    body: AddUndirectedEdgeToViewRequest;
  }): Observable<{}> {
    return this.addUndirectedEdgeToView$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getUndirectedEdgeOfPatternViewById
   */
  static readonly GetUndirectedEdgeOfPatternViewByIdPath =
    '/patternViews/{patternViewId}/undirectedEdges/{undirectedEdgeId}';

  /**
   * Retrieve undirected edge of pattern view by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUndirectedEdgeOfPatternViewById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUndirectedEdgeOfPatternViewById$Response(params: {
    patternViewId: string;
    undirectedEdgeId: string;
  }): Observable<StrictHttpResponse<EntityModelUndirectedEdgeModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.GetUndirectedEdgeOfPatternViewByIdPath,
      'get'
    );
    if (params) {
      rb.path('patternViewId', params.patternViewId, {});
      rb.path('undirectedEdgeId', params.undirectedEdgeId, {});
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
          return r as StrictHttpResponse<EntityModelUndirectedEdgeModel>;
        })
      );
  }

  /**
   * Retrieve undirected edge of pattern view by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUndirectedEdgeOfPatternViewById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUndirectedEdgeOfPatternViewById(params: {
    patternViewId: string;
    undirectedEdgeId: string;
  }): Observable<EntityModelUndirectedEdgeModel> {
    return this.getUndirectedEdgeOfPatternViewById$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelUndirectedEdgeModel>) =>
          r.body as EntityModelUndirectedEdgeModel
      )
    );
  }

  /**
   * Path part for operation updateUndirectedEdgeOfPatternView
   */
  static readonly UpdateUndirectedEdgeOfPatternViewPath =
    '/patternViews/{patternViewId}/undirectedEdges/{undirectedEdgeId}';

  /**
   * Update undirected edge of pattern view by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUndirectedEdgeOfPatternView()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUndirectedEdgeOfPatternView$Response(params: {
    patternViewId: string;
    undirectedEdgeId: string;
    body: UpdateUndirectedEdgeRequest;
  }): Observable<StrictHttpResponse<EntityModelUndirectedEdgeModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.UpdateUndirectedEdgeOfPatternViewPath,
      'put'
    );
    if (params) {
      rb.path('patternViewId', params.patternViewId, {});
      rb.path('undirectedEdgeId', params.undirectedEdgeId, {});

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
          return r as StrictHttpResponse<EntityModelUndirectedEdgeModel>;
        })
      );
  }

  /**
   * Update undirected edge of pattern view by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateUndirectedEdgeOfPatternView$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUndirectedEdgeOfPatternView(params: {
    patternViewId: string;
    undirectedEdgeId: string;
    body: UpdateUndirectedEdgeRequest;
  }): Observable<EntityModelUndirectedEdgeModel> {
    return this.updateUndirectedEdgeOfPatternView$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelUndirectedEdgeModel>) =>
          r.body as EntityModelUndirectedEdgeModel
      )
    );
  }

  /**
   * Path part for operation removeUndirectedEdgeFromPatternView
   */
  static readonly RemoveUndirectedEdgeFromPatternViewPath =
    '/patternViews/{patternViewId}/undirectedEdges/{undirectedEdgeId}';

  /**
   * Remove undirected edge of pattern view by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeUndirectedEdgeFromPatternView()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUndirectedEdgeFromPatternView$Response(params: {
    patternViewId: string;
    undirectedEdgeId: string;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternRelationDescriptorControllerService.RemoveUndirectedEdgeFromPatternViewPath,
      'delete'
    );
    if (params) {
      rb.path('patternViewId', params.patternViewId, {});
      rb.path('undirectedEdgeId', params.undirectedEdgeId, {});
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
   * Remove undirected edge of pattern view by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeUndirectedEdgeFromPatternView$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUndirectedEdgeFromPatternView(params: {
    patternViewId: string;
    undirectedEdgeId: string;
  }): Observable<{}> {
    return this.removeUndirectedEdgeFromPatternView$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }
}
