/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CollectionModelEntityModelConcreteSolution } from '../models/collection-model-entity-model-concrete-solution';
import { EntityModelConcreteSolution } from '../models/entity-model-concrete-solution';

@Injectable({
  providedIn: 'root',
})
export class ConcreteSolutionSearchControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation executeSearchConcretesolutionGet
   */
  static readonly ExecuteSearchConcretesolutionGetPath =
    '/concreteSolutions/search/existsByPatternUri';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `executeSearchConcretesolutionGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchConcretesolutionGet$Response(params?: {
    uri?: string;
  }): Observable<StrictHttpResponse<boolean>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionSearchControllerService.ExecuteSearchConcretesolutionGetPath,
      'get'
    );
    if (params) {
      rb.query('uri', params.uri, {});
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
          return (r as HttpResponse<any>).clone({
            body: String((r as HttpResponse<any>).body) === 'true',
          }) as StrictHttpResponse<boolean>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `executeSearchConcretesolutionGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchConcretesolutionGet(params?: {
    uri?: string;
  }): Observable<boolean> {
    return this.executeSearchConcretesolutionGet$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation executeSearchConcretesolutionGet1
   */
  static readonly ExecuteSearchConcretesolutionGet1Path =
    '/concreteSolutions/search/findAllByPatternUri';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `executeSearchConcretesolutionGet1()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchConcretesolutionGet1$Response(params?: {
    uri?: string;
  }): Observable<
    StrictHttpResponse<CollectionModelEntityModelConcreteSolution>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionSearchControllerService.ExecuteSearchConcretesolutionGet1Path,
      'get'
    );
    if (params) {
      rb.query('uri', params.uri, {});
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
            CollectionModelEntityModelConcreteSolution
          >;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `executeSearchConcretesolutionGet1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchConcretesolutionGet1(params?: {
    uri?: string;
  }): Observable<CollectionModelEntityModelConcreteSolution> {
    return this.executeSearchConcretesolutionGet1$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CollectionModelEntityModelConcreteSolution>) =>
          r.body as CollectionModelEntityModelConcreteSolution
      )
    );
  }

  /**
   * Path part for operation executeSearchConcretesolutionGet2
   */
  static readonly ExecuteSearchConcretesolutionGet2Path =
    '/concreteSolutions/search/findTopById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `executeSearchConcretesolutionGet2()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchConcretesolutionGet2$Response(params?: {
    uuid?: string;
  }): Observable<StrictHttpResponse<EntityModelConcreteSolution>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionSearchControllerService.ExecuteSearchConcretesolutionGet2Path,
      'get'
    );
    if (params) {
      rb.query('uuid', params.uuid, {});
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
          return r as StrictHttpResponse<EntityModelConcreteSolution>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `executeSearchConcretesolutionGet2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchConcretesolutionGet2(params?: {
    uuid?: string;
  }): Observable<EntityModelConcreteSolution> {
    return this.executeSearchConcretesolutionGet2$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelConcreteSolution>) =>
          r.body as EntityModelConcreteSolution
      )
    );
  }

  /**
   * Path part for operation executeSearchConcretesolutionGet3
   */
  static readonly ExecuteSearchConcretesolutionGet3Path =
    '/concreteSolutions/search/findTopByPatternUriAndAggregatorType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `executeSearchConcretesolutionGet3()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchConcretesolutionGet3$Response(params?: {
    uri?: string;
    technology?: string;
  }): Observable<StrictHttpResponse<EntityModelConcreteSolution>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionSearchControllerService.ExecuteSearchConcretesolutionGet3Path,
      'get'
    );
    if (params) {
      rb.query('uri', params.uri, {});
      rb.query('technology', params.technology, {});
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
          return r as StrictHttpResponse<EntityModelConcreteSolution>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `executeSearchConcretesolutionGet3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchConcretesolutionGet3(params?: {
    uri?: string;
    technology?: string;
  }): Observable<EntityModelConcreteSolution> {
    return this.executeSearchConcretesolutionGet3$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelConcreteSolution>) =>
          r.body as EntityModelConcreteSolution
      )
    );
  }
}
