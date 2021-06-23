/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { DesignModelEdgeTypeRequestBody } from '../models/design-model-edge-type-request-body';
import { EntityModelDesignModelEdgeType } from '../models/entity-model-design-model-edge-type';
import { PagedModelEntityModelDesignModelEdgeType } from '../models/paged-model-entity-model-design-model-edge-type';

@Injectable({
  providedIn: 'root',
})
export class DesignModelEdgeTypeEntityControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getCollectionResourceDesignmodeledgetypeGet1
   */
  static readonly GetCollectionResourceDesignmodeledgetypeGet1Path =
    '/designModelEdgeTypes';

  /**
   * get-designmodeledgetype
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCollectionResourceDesignmodeledgetypeGet1$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceDesignmodeledgetypeGet1$Json$Response(params?: {
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
  }): Observable<StrictHttpResponse<PagedModelEntityModelDesignModelEdgeType>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelEdgeTypeEntityControllerService.GetCollectionResourceDesignmodeledgetypeGet1Path,
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
          return r as StrictHttpResponse<
            PagedModelEntityModelDesignModelEdgeType
          >;
        })
      );
  }

  /**
   * get-designmodeledgetype
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCollectionResourceDesignmodeledgetypeGet1$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceDesignmodeledgetypeGet1$Json(params?: {
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
  }): Observable<PagedModelEntityModelDesignModelEdgeType> {
    return this.getCollectionResourceDesignmodeledgetypeGet1$Json$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<PagedModelEntityModelDesignModelEdgeType>) =>
          r.body as PagedModelEntityModelDesignModelEdgeType
      )
    );
  }

  /**
   * get-designmodeledgetype
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCollectionResourceDesignmodeledgetypeGet1$UriList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceDesignmodeledgetypeGet1$UriList$Response(params?: {
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
      DesignModelEdgeTypeEntityControllerService.GetCollectionResourceDesignmodeledgetypeGet1Path,
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
   * get-designmodeledgetype
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCollectionResourceDesignmodeledgetypeGet1$UriList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceDesignmodeledgetypeGet1$UriList(params?: {
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
    return this.getCollectionResourceDesignmodeledgetypeGet1$UriList$Response(
      params
    ).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
  }

  /**
   * Path part for operation postCollectionResourceDesignmodeledgetypePost
   */
  static readonly PostCollectionResourceDesignmodeledgetypePostPath =
    '/designModelEdgeTypes';

  /**
   * create-designmodeledgetype
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postCollectionResourceDesignmodeledgetypePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postCollectionResourceDesignmodeledgetypePost$Response(params: {
    body: DesignModelEdgeTypeRequestBody;
  }): Observable<StrictHttpResponse<EntityModelDesignModelEdgeType>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelEdgeTypeEntityControllerService.PostCollectionResourceDesignmodeledgetypePostPath,
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
          return r as StrictHttpResponse<EntityModelDesignModelEdgeType>;
        })
      );
  }

  /**
   * create-designmodeledgetype
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postCollectionResourceDesignmodeledgetypePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postCollectionResourceDesignmodeledgetypePost(params: {
    body: DesignModelEdgeTypeRequestBody;
  }): Observable<EntityModelDesignModelEdgeType> {
    return this.postCollectionResourceDesignmodeledgetypePost$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDesignModelEdgeType>) =>
          r.body as EntityModelDesignModelEdgeType
      )
    );
  }

  /**
   * Path part for operation getItemResourceDesignmodeledgetypeGet
   */
  static readonly GetItemResourceDesignmodeledgetypeGetPath =
    '/designModelEdgeTypes/{id}';

  /**
   * get-designmodeledgetype
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemResourceDesignmodeledgetypeGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemResourceDesignmodeledgetypeGet$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<EntityModelDesignModelEdgeType>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelEdgeTypeEntityControllerService.GetItemResourceDesignmodeledgetypeGetPath,
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
          return r as StrictHttpResponse<EntityModelDesignModelEdgeType>;
        })
      );
  }

  /**
   * get-designmodeledgetype
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getItemResourceDesignmodeledgetypeGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemResourceDesignmodeledgetypeGet(params: {
    id: string;
  }): Observable<EntityModelDesignModelEdgeType> {
    return this.getItemResourceDesignmodeledgetypeGet$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDesignModelEdgeType>) =>
          r.body as EntityModelDesignModelEdgeType
      )
    );
  }

  /**
   * Path part for operation putItemResourceDesignmodeledgetypePut
   */
  static readonly PutItemResourceDesignmodeledgetypePutPath =
    '/designModelEdgeTypes/{id}';

  /**
   * update-designmodeledgetype
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putItemResourceDesignmodeledgetypePut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItemResourceDesignmodeledgetypePut$Response(params: {
    id: string;
    body: DesignModelEdgeTypeRequestBody;
  }): Observable<StrictHttpResponse<EntityModelDesignModelEdgeType>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelEdgeTypeEntityControllerService.PutItemResourceDesignmodeledgetypePutPath,
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
          return r as StrictHttpResponse<EntityModelDesignModelEdgeType>;
        })
      );
  }

  /**
   * update-designmodeledgetype
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putItemResourceDesignmodeledgetypePut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItemResourceDesignmodeledgetypePut(params: {
    id: string;
    body: DesignModelEdgeTypeRequestBody;
  }): Observable<EntityModelDesignModelEdgeType> {
    return this.putItemResourceDesignmodeledgetypePut$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDesignModelEdgeType>) =>
          r.body as EntityModelDesignModelEdgeType
      )
    );
  }

  /**
   * Path part for operation deleteItemResourceDesignmodeledgetypeDelete
   */
  static readonly DeleteItemResourceDesignmodeledgetypeDeletePath =
    '/designModelEdgeTypes/{id}';

  /**
   * delete-designmodeledgetype
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteItemResourceDesignmodeledgetypeDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItemResourceDesignmodeledgetypeDelete$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelEdgeTypeEntityControllerService.DeleteItemResourceDesignmodeledgetypeDeletePath,
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
   * delete-designmodeledgetype
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteItemResourceDesignmodeledgetypeDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItemResourceDesignmodeledgetypeDelete(params: {
    id: string;
  }): Observable<void> {
    return this.deleteItemResourceDesignmodeledgetypeDelete$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation patchItemResourceDesignmodeledgetypePatch
   */
  static readonly PatchItemResourceDesignmodeledgetypePatchPath =
    '/designModelEdgeTypes/{id}';

  /**
   * patch-designmodeledgetype
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `patchItemResourceDesignmodeledgetypePatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchItemResourceDesignmodeledgetypePatch$Response(params: {
    id: string;
    body: DesignModelEdgeTypeRequestBody;
  }): Observable<StrictHttpResponse<EntityModelDesignModelEdgeType>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelEdgeTypeEntityControllerService.PatchItemResourceDesignmodeledgetypePatchPath,
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
          return r as StrictHttpResponse<EntityModelDesignModelEdgeType>;
        })
      );
  }

  /**
   * patch-designmodeledgetype
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `patchItemResourceDesignmodeledgetypePatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchItemResourceDesignmodeledgetypePatch(params: {
    id: string;
    body: DesignModelEdgeTypeRequestBody;
  }): Observable<EntityModelDesignModelEdgeType> {
    return this.patchItemResourceDesignmodeledgetypePatch$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDesignModelEdgeType>) =>
          r.body as EntityModelDesignModelEdgeType
      )
    );
  }
}
