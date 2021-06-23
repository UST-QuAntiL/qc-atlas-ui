/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { DesignModelRequestBody } from '../models/design-model-request-body';
import { EntityModelDesignModel } from '../models/entity-model-design-model';
import { PagedModelEntityModelDesignModel } from '../models/paged-model-entity-model-design-model';

@Injectable({
  providedIn: 'root',
})
export class DesignModelEntityControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getCollectionResourceDesignmodelGet1
   */
  static readonly GetCollectionResourceDesignmodelGet1Path = '/designModels';

  /**
   * get-designmodel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCollectionResourceDesignmodelGet1$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceDesignmodelGet1$Json$Response(params?: {
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
  }): Observable<StrictHttpResponse<PagedModelEntityModelDesignModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelEntityControllerService.GetCollectionResourceDesignmodelGet1Path,
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
          return r as StrictHttpResponse<PagedModelEntityModelDesignModel>;
        })
      );
  }

  /**
   * get-designmodel
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCollectionResourceDesignmodelGet1$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceDesignmodelGet1$Json(params?: {
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
  }): Observable<PagedModelEntityModelDesignModel> {
    return this.getCollectionResourceDesignmodelGet1$Json$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PagedModelEntityModelDesignModel>) =>
          r.body as PagedModelEntityModelDesignModel
      )
    );
  }

  /**
   * get-designmodel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCollectionResourceDesignmodelGet1$UriList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceDesignmodelGet1$UriList$Response(params?: {
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
      DesignModelEntityControllerService.GetCollectionResourceDesignmodelGet1Path,
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
   * get-designmodel
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCollectionResourceDesignmodelGet1$UriList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceDesignmodelGet1$UriList(params?: {
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
    return this.getCollectionResourceDesignmodelGet1$UriList$Response(
      params
    ).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
  }

  /**
   * Path part for operation postCollectionResourceDesignmodelPost
   */
  static readonly PostCollectionResourceDesignmodelPostPath = '/designModels';

  /**
   * create-designmodel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postCollectionResourceDesignmodelPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postCollectionResourceDesignmodelPost$Response(params: {
    body: DesignModelRequestBody;
  }): Observable<StrictHttpResponse<EntityModelDesignModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelEntityControllerService.PostCollectionResourceDesignmodelPostPath,
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
          return r as StrictHttpResponse<EntityModelDesignModel>;
        })
      );
  }

  /**
   * create-designmodel
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postCollectionResourceDesignmodelPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postCollectionResourceDesignmodelPost(params: {
    body: DesignModelRequestBody;
  }): Observable<EntityModelDesignModel> {
    return this.postCollectionResourceDesignmodelPost$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDesignModel>) =>
          r.body as EntityModelDesignModel
      )
    );
  }

  /**
   * Path part for operation getItemResourceDesignmodelGet
   */
  static readonly GetItemResourceDesignmodelGetPath = '/designModels/{id}';

  /**
   * get-designmodel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemResourceDesignmodelGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemResourceDesignmodelGet$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<EntityModelDesignModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelEntityControllerService.GetItemResourceDesignmodelGetPath,
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
          return r as StrictHttpResponse<EntityModelDesignModel>;
        })
      );
  }

  /**
   * get-designmodel
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getItemResourceDesignmodelGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemResourceDesignmodelGet(params: {
    id: string;
  }): Observable<EntityModelDesignModel> {
    return this.getItemResourceDesignmodelGet$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDesignModel>) =>
          r.body as EntityModelDesignModel
      )
    );
  }

  /**
   * Path part for operation putItemResourceDesignmodelPut
   */
  static readonly PutItemResourceDesignmodelPutPath = '/designModels/{id}';

  /**
   * update-designmodel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putItemResourceDesignmodelPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItemResourceDesignmodelPut$Response(params: {
    id: string;
    body: DesignModelRequestBody;
  }): Observable<StrictHttpResponse<EntityModelDesignModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelEntityControllerService.PutItemResourceDesignmodelPutPath,
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
          return r as StrictHttpResponse<EntityModelDesignModel>;
        })
      );
  }

  /**
   * update-designmodel
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putItemResourceDesignmodelPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItemResourceDesignmodelPut(params: {
    id: string;
    body: DesignModelRequestBody;
  }): Observable<EntityModelDesignModel> {
    return this.putItemResourceDesignmodelPut$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDesignModel>) =>
          r.body as EntityModelDesignModel
      )
    );
  }

  /**
   * Path part for operation deleteItemResourceDesignmodelDelete
   */
  static readonly DeleteItemResourceDesignmodelDeletePath =
    '/designModels/{id}';

  /**
   * delete-designmodel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteItemResourceDesignmodelDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItemResourceDesignmodelDelete$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelEntityControllerService.DeleteItemResourceDesignmodelDeletePath,
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
   * delete-designmodel
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteItemResourceDesignmodelDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItemResourceDesignmodelDelete(params: {
    id: string;
  }): Observable<void> {
    return this.deleteItemResourceDesignmodelDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation patchItemResourceDesignmodelPatch
   */
  static readonly PatchItemResourceDesignmodelPatchPath = '/designModels/{id}';

  /**
   * patch-designmodel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `patchItemResourceDesignmodelPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchItemResourceDesignmodelPatch$Response(params: {
    id: string;
    body: DesignModelRequestBody;
  }): Observable<StrictHttpResponse<EntityModelDesignModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelEntityControllerService.PatchItemResourceDesignmodelPatchPath,
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
          return r as StrictHttpResponse<EntityModelDesignModel>;
        })
      );
  }

  /**
   * patch-designmodel
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `patchItemResourceDesignmodelPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchItemResourceDesignmodelPatch(params: {
    id: string;
    body: DesignModelRequestBody;
  }): Observable<EntityModelDesignModel> {
    return this.patchItemResourceDesignmodelPatch$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDesignModel>) =>
          r.body as EntityModelDesignModel
      )
    );
  }
}
