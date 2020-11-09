/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CollectionModelQpu } from '../models/collection-model-qpu';
import { EntityModelQpu } from '../models/entity-model-qpu';
import { Qpu } from '../models/qpu';
import { RepresentationModelQpu } from '../models/representation-model-qpu';

@Injectable({
  providedIn: 'root',
})
export class QpuService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getCollectionResourceQpuGet1
   */
  static readonly GetCollectionResourceQpuGet1Path = '/qpus';

  /**
   * get-qpu
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCollectionResourceQpuGet1$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceQpuGet1$Json$Response(params?: {

  }): Observable<StrictHttpResponse<CollectionModelQpu>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.GetCollectionResourceQpuGet1Path, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/x-spring-data-compact+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelQpu>;
      })
    );
  }

  /**
   * get-qpu
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCollectionResourceQpuGet1$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceQpuGet1$Json(params?: {

  }): Observable<CollectionModelQpu> {

    return this.getCollectionResourceQpuGet1$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelQpu>) => r.body as CollectionModelQpu)
    );
  }

  /**
   * get-qpu
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCollectionResourceQpuGet1$UriList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceQpuGet1$UriList$Response(params?: {

  }): Observable<StrictHttpResponse<CollectionModelQpu>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.GetCollectionResourceQpuGet1Path, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/uri-list'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelQpu>;
      })
    );
  }

  /**
   * get-qpu
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCollectionResourceQpuGet1$UriList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceQpuGet1$UriList(params?: {

  }): Observable<CollectionModelQpu> {

    return this.getCollectionResourceQpuGet1$UriList$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelQpu>) => r.body as CollectionModelQpu)
    );
  }

  /**
   * Path part for operation postCollectionResourceQpuPost
   */
  static readonly PostCollectionResourceQpuPostPath = '/qpus';

  /**
   * create-qpu
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postCollectionResourceQpuPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postCollectionResourceQpuPost$Response(params?: {
      body?: Qpu
  }): Observable<StrictHttpResponse<RepresentationModelQpu>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.PostCollectionResourceQpuPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RepresentationModelQpu>;
      })
    );
  }

  /**
   * create-qpu
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postCollectionResourceQpuPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postCollectionResourceQpuPost(params?: {
      body?: Qpu
  }): Observable<RepresentationModelQpu> {

    return this.postCollectionResourceQpuPost$Response(params).pipe(
      map((r: StrictHttpResponse<RepresentationModelQpu>) => r.body as RepresentationModelQpu)
    );
  }

  /**
   * Path part for operation executeSearchQpuGet
   */
  static readonly ExecuteSearchQpuGetPath = '/qpus/search/findByBackendName';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `executeSearchQpuGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchQpuGet$Response(params?: {
    backendName?: string;

  }): Observable<StrictHttpResponse<EntityModelQpu>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.ExecuteSearchQpuGetPath, 'get');
    if (params) {

      rb.query('backendName', params.backendName, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelQpu>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `executeSearchQpuGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchQpuGet(params?: {
    backendName?: string;

  }): Observable<EntityModelQpu> {

    return this.executeSearchQpuGet$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelQpu>) => r.body as EntityModelQpu)
    );
  }

  /**
   * Path part for operation getItemResourceQpuGet
   */
  static readonly GetItemResourceQpuGetPath = '/qpus/{id}';

  /**
   * get-qpu
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemResourceQpuGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemResourceQpuGet$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<EntityModelQpu>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.GetItemResourceQpuGetPath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelQpu>;
      })
    );
  }

  /**
   * get-qpu
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getItemResourceQpuGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemResourceQpuGet(params: {
    id: string;

  }): Observable<EntityModelQpu> {

    return this.getItemResourceQpuGet$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelQpu>) => r.body as EntityModelQpu)
    );
  }

  /**
   * Path part for operation putItemResourceQpuPut
   */
  static readonly PutItemResourceQpuPutPath = '/qpus/{id}';

  /**
   * update-qpu
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putItemResourceQpuPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItemResourceQpuPut$Response(params: {
    id: string;
      body?: Qpu
  }): Observable<StrictHttpResponse<RepresentationModelQpu>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.PutItemResourceQpuPutPath, 'put');
    if (params) {

      rb.path('id', params.id, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RepresentationModelQpu>;
      })
    );
  }

  /**
   * update-qpu
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putItemResourceQpuPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItemResourceQpuPut(params: {
    id: string;
      body?: Qpu
  }): Observable<RepresentationModelQpu> {

    return this.putItemResourceQpuPut$Response(params).pipe(
      map((r: StrictHttpResponse<RepresentationModelQpu>) => r.body as RepresentationModelQpu)
    );
  }

  /**
   * Path part for operation deleteItemResourceQpuDelete
   */
  static readonly DeleteItemResourceQpuDeletePath = '/qpus/{id}';

  /**
   * delete-qpu
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteItemResourceQpuDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItemResourceQpuDelete$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.DeleteItemResourceQpuDeletePath, 'delete');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * delete-qpu
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteItemResourceQpuDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItemResourceQpuDelete(params: {
    id: string;

  }): Observable<void> {

    return this.deleteItemResourceQpuDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation patchItemResourceQpuPatch
   */
  static readonly PatchItemResourceQpuPatchPath = '/qpus/{id}';

  /**
   * patch-qpu
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `patchItemResourceQpuPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchItemResourceQpuPatch$Response(params: {
    id: string;
      body?: Qpu
  }): Observable<StrictHttpResponse<RepresentationModelQpu>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.PatchItemResourceQpuPatchPath, 'patch');
    if (params) {

      rb.path('id', params.id, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RepresentationModelQpu>;
      })
    );
  }

  /**
   * patch-qpu
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `patchItemResourceQpuPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchItemResourceQpuPatch(params: {
    id: string;
      body?: Qpu
  }): Observable<RepresentationModelQpu> {

    return this.patchItemResourceQpuPatch$Response(params).pipe(
      map((r: StrictHttpResponse<RepresentationModelQpu>) => r.body as RepresentationModelQpu)
    );
  }

}
