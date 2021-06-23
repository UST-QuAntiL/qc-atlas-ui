/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ConcreteSolutionRequestBody } from '../models/concrete-solution-request-body';
import { EntityModelConcreteSolution } from '../models/entity-model-concrete-solution';
import { PagedModelEntityModelConcreteSolution } from '../models/paged-model-entity-model-concrete-solution';

@Injectable({
  providedIn: 'root',
})
export class ConcreteSolutionEntityControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getCollectionResourceConcretesolutionGet1
   */
  static readonly GetCollectionResourceConcretesolutionGet1Path =
    '/concreteSolutions';

  /**
   * get-concretesolution
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCollectionResourceConcretesolutionGet1$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceConcretesolutionGet1$Json$Response(params?: {
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
  }): Observable<StrictHttpResponse<PagedModelEntityModelConcreteSolution>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionEntityControllerService.GetCollectionResourceConcretesolutionGet1Path,
      'get'
    );
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
    }
    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/x-spring-data-compact+json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<PagedModelEntityModelConcreteSolution>;
        })
      );
  }

  /**
   * get-concretesolution
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCollectionResourceConcretesolutionGet1$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceConcretesolutionGet1$Json(params?: {
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
  }): Observable<PagedModelEntityModelConcreteSolution> {
    return this.getCollectionResourceConcretesolutionGet1$Json$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<PagedModelEntityModelConcreteSolution>) =>
          r.body as PagedModelEntityModelConcreteSolution
      )
    );
  }

  /**
   * get-concretesolution
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCollectionResourceConcretesolutionGet1$UriList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceConcretesolutionGet1$UriList$Response(params?: {
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
  }): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionEntityControllerService.GetCollectionResourceConcretesolutionGet1Path,
      'get'
    );
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
    }
    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: 'text/uri-list',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<string>;
        })
      );
  }

  /**
   * get-concretesolution
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCollectionResourceConcretesolutionGet1$UriList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceConcretesolutionGet1$UriList(params?: {
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
  }): Observable<string> {
    return this.getCollectionResourceConcretesolutionGet1$UriList$Response(
      params
    ).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
  }

  /**
   * Path part for operation postCollectionResourceConcretesolutionPost
   */
  static readonly PostCollectionResourceConcretesolutionPostPath =
    '/concreteSolutions';

  /**
   * create-concretesolution
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postCollectionResourceConcretesolutionPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postCollectionResourceConcretesolutionPost$Response(params: {
    body: ConcreteSolutionRequestBody;
  }): Observable<StrictHttpResponse<EntityModelConcreteSolution>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionEntityControllerService.PostCollectionResourceConcretesolutionPostPath,
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
          return r as StrictHttpResponse<EntityModelConcreteSolution>;
        })
      );
  }

  /**
   * create-concretesolution
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postCollectionResourceConcretesolutionPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postCollectionResourceConcretesolutionPost(params: {
    body: ConcreteSolutionRequestBody;
  }): Observable<EntityModelConcreteSolution> {
    return this.postCollectionResourceConcretesolutionPost$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<EntityModelConcreteSolution>) =>
          r.body as EntityModelConcreteSolution
      )
    );
  }

  /**
   * Path part for operation getItemResourceConcretesolutionGet
   */
  static readonly GetItemResourceConcretesolutionGetPath =
    '/concreteSolutions/{id}';

  /**
   * get-concretesolution
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemResourceConcretesolutionGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemResourceConcretesolutionGet$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<EntityModelConcreteSolution>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionEntityControllerService.GetItemResourceConcretesolutionGetPath,
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
          return r as StrictHttpResponse<EntityModelConcreteSolution>;
        })
      );
  }

  /**
   * get-concretesolution
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getItemResourceConcretesolutionGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemResourceConcretesolutionGet(params: {
    id: string;
  }): Observable<EntityModelConcreteSolution> {
    return this.getItemResourceConcretesolutionGet$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelConcreteSolution>) =>
          r.body as EntityModelConcreteSolution
      )
    );
  }

  /**
   * Path part for operation putItemResourceConcretesolutionPut
   */
  static readonly PutItemResourceConcretesolutionPutPath =
    '/concreteSolutions/{id}';

  /**
   * update-concretesolution
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putItemResourceConcretesolutionPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItemResourceConcretesolutionPut$Response(params: {
    id: string;
    body: ConcreteSolutionRequestBody;
  }): Observable<StrictHttpResponse<EntityModelConcreteSolution>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionEntityControllerService.PutItemResourceConcretesolutionPutPath,
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
          return r as StrictHttpResponse<EntityModelConcreteSolution>;
        })
      );
  }

  /**
   * update-concretesolution
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putItemResourceConcretesolutionPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItemResourceConcretesolutionPut(params: {
    id: string;
    body: ConcreteSolutionRequestBody;
  }): Observable<EntityModelConcreteSolution> {
    return this.putItemResourceConcretesolutionPut$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelConcreteSolution>) =>
          r.body as EntityModelConcreteSolution
      )
    );
  }

  /**
   * Path part for operation deleteItemResourceConcretesolutionDelete
   */
  static readonly DeleteItemResourceConcretesolutionDeletePath =
    '/concreteSolutions/{id}';

  /**
   * delete-concretesolution
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteItemResourceConcretesolutionDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItemResourceConcretesolutionDelete$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionEntityControllerService.DeleteItemResourceConcretesolutionDeletePath,
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
   * delete-concretesolution
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteItemResourceConcretesolutionDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItemResourceConcretesolutionDelete(params: {
    id: string;
  }): Observable<void> {
    return this.deleteItemResourceConcretesolutionDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation patchItemResourceConcretesolutionPatch
   */
  static readonly PatchItemResourceConcretesolutionPatchPath =
    '/concreteSolutions/{id}';

  /**
   * patch-concretesolution
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `patchItemResourceConcretesolutionPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchItemResourceConcretesolutionPatch$Response(params: {
    id: string;
    body: ConcreteSolutionRequestBody;
  }): Observable<StrictHttpResponse<EntityModelConcreteSolution>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionEntityControllerService.PatchItemResourceConcretesolutionPatchPath,
      'patch'
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
          return r as StrictHttpResponse<EntityModelConcreteSolution>;
        })
      );
  }

  /**
   * patch-concretesolution
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `patchItemResourceConcretesolutionPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchItemResourceConcretesolutionPatch(params: {
    id: string;
    body: ConcreteSolutionRequestBody;
  }): Observable<EntityModelConcreteSolution> {
    return this.patchItemResourceConcretesolutionPatch$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelConcreteSolution>) =>
          r.body as EntityModelConcreteSolution
      )
    );
  }
}
