/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CollectionModelQubit } from '../models/collection-model-qubit';
import { EntityModelQubit } from '../models/entity-model-qubit';
import { Qubit } from '../models/qubit';
import { RepresentationModelQubit } from '../models/representation-model-qubit';

@Injectable({
  providedIn: 'root',
})
export class QubitEntityControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getCollectionResourceQubitGet1
   */
  static readonly GetCollectionResourceQubitGet1Path = '/qubits';

  /**
   * get-qubit
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCollectionResourceQubitGet1$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceQubitGet1$Json$Response(params?: {

  }): Observable<StrictHttpResponse<CollectionModelQubit>> {

    const rb = new RequestBuilder(this.rootUrl, QubitEntityControllerService.GetCollectionResourceQubitGet1Path, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/x-spring-data-compact+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelQubit>;
      })
    );
  }

  /**
   * get-qubit
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCollectionResourceQubitGet1$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceQubitGet1$Json(params?: {

  }): Observable<CollectionModelQubit> {

    return this.getCollectionResourceQubitGet1$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelQubit>) => r.body as CollectionModelQubit)
    );
  }

  /**
   * get-qubit
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCollectionResourceQubitGet1$UriList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceQubitGet1$UriList$Response(params?: {

  }): Observable<StrictHttpResponse<CollectionModelQubit>> {

    const rb = new RequestBuilder(this.rootUrl, QubitEntityControllerService.GetCollectionResourceQubitGet1Path, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/uri-list'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelQubit>;
      })
    );
  }

  /**
   * get-qubit
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCollectionResourceQubitGet1$UriList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCollectionResourceQubitGet1$UriList(params?: {

  }): Observable<CollectionModelQubit> {

    return this.getCollectionResourceQubitGet1$UriList$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelQubit>) => r.body as CollectionModelQubit)
    );
  }

  /**
   * Path part for operation postCollectionResourceQubitPost
   */
  static readonly PostCollectionResourceQubitPostPath = '/qubits';

  /**
   * create-qubit
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postCollectionResourceQubitPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postCollectionResourceQubitPost$Response(params?: {
      body?: Qubit
  }): Observable<StrictHttpResponse<RepresentationModelQubit>> {

    const rb = new RequestBuilder(this.rootUrl, QubitEntityControllerService.PostCollectionResourceQubitPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RepresentationModelQubit>;
      })
    );
  }

  /**
   * create-qubit
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postCollectionResourceQubitPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postCollectionResourceQubitPost(params?: {
      body?: Qubit
  }): Observable<RepresentationModelQubit> {

    return this.postCollectionResourceQubitPost$Response(params).pipe(
      map((r: StrictHttpResponse<RepresentationModelQubit>) => r.body as RepresentationModelQubit)
    );
  }

  /**
   * Path part for operation getItemResourceQubitGet
   */
  static readonly GetItemResourceQubitGetPath = '/qubits/{id}';

  /**
   * get-qubit
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemResourceQubitGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemResourceQubitGet$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<EntityModelQubit>> {

    const rb = new RequestBuilder(this.rootUrl, QubitEntityControllerService.GetItemResourceQubitGetPath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelQubit>;
      })
    );
  }

  /**
   * get-qubit
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getItemResourceQubitGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemResourceQubitGet(params: {
    id: string;

  }): Observable<EntityModelQubit> {

    return this.getItemResourceQubitGet$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelQubit>) => r.body as EntityModelQubit)
    );
  }

  /**
   * Path part for operation putItemResourceQubitPut
   */
  static readonly PutItemResourceQubitPutPath = '/qubits/{id}';

  /**
   * update-qubit
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putItemResourceQubitPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItemResourceQubitPut$Response(params: {
    id: string;
      body?: Qubit
  }): Observable<StrictHttpResponse<RepresentationModelQubit>> {

    const rb = new RequestBuilder(this.rootUrl, QubitEntityControllerService.PutItemResourceQubitPutPath, 'put');
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
        return r as StrictHttpResponse<RepresentationModelQubit>;
      })
    );
  }

  /**
   * update-qubit
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putItemResourceQubitPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItemResourceQubitPut(params: {
    id: string;
      body?: Qubit
  }): Observable<RepresentationModelQubit> {

    return this.putItemResourceQubitPut$Response(params).pipe(
      map((r: StrictHttpResponse<RepresentationModelQubit>) => r.body as RepresentationModelQubit)
    );
  }

  /**
   * Path part for operation deleteItemResourceQubitDelete
   */
  static readonly DeleteItemResourceQubitDeletePath = '/qubits/{id}';

  /**
   * delete-qubit
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteItemResourceQubitDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItemResourceQubitDelete$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, QubitEntityControllerService.DeleteItemResourceQubitDeletePath, 'delete');
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
   * delete-qubit
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteItemResourceQubitDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItemResourceQubitDelete(params: {
    id: string;

  }): Observable<void> {

    return this.deleteItemResourceQubitDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation patchItemResourceQubitPatch
   */
  static readonly PatchItemResourceQubitPatchPath = '/qubits/{id}';

  /**
   * patch-qubit
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `patchItemResourceQubitPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchItemResourceQubitPatch$Response(params: {
    id: string;
      body?: Qubit
  }): Observable<StrictHttpResponse<RepresentationModelQubit>> {

    const rb = new RequestBuilder(this.rootUrl, QubitEntityControllerService.PatchItemResourceQubitPatchPath, 'patch');
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
        return r as StrictHttpResponse<RepresentationModelQubit>;
      })
    );
  }

  /**
   * patch-qubit
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `patchItemResourceQubitPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchItemResourceQubitPatch(params: {
    id: string;
      body?: Qubit
  }): Observable<RepresentationModelQubit> {

    return this.patchItemResourceQubitPatch$Response(params).pipe(
      map((r: StrictHttpResponse<RepresentationModelQubit>) => r.body as RepresentationModelQubit)
    );
  }

}
