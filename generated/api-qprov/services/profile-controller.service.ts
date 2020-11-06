/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { JsonSchema } from '../models/json-schema';
import { RepresentationModelObject } from '../models/representation-model-object';

@Injectable({
  providedIn: 'root',
})
export class ProfileControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listAllFormsOfMetadata1
   */
  static readonly ListAllFormsOfMetadata1Path = '/profile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAllFormsOfMetadata1()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAllFormsOfMetadata1$Response(params?: {

  }): Observable<StrictHttpResponse<RepresentationModelObject>> {

    const rb = new RequestBuilder(this.rootUrl, ProfileControllerService.ListAllFormsOfMetadata1Path, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RepresentationModelObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listAllFormsOfMetadata1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAllFormsOfMetadata1(params?: {

  }): Observable<RepresentationModelObject> {

    return this.listAllFormsOfMetadata1$Response(params).pipe(
      map((r: StrictHttpResponse<RepresentationModelObject>) => r.body as RepresentationModelObject)
    );
  }

  /**
   * Path part for operation descriptor1
   */
  static readonly Descriptor1Path = '/profile/qpus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `descriptor1$Any()` instead.
   *
   * This method doesn't expect any request body.
   */
  descriptor1$Any$Response(params?: {

  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ProfileControllerService.Descriptor1Path, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `descriptor1$Any$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  descriptor1$Any(params?: {

  }): Observable<string> {

    return this.descriptor1$Any$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `descriptor1$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  descriptor1$Json$Response(params?: {

  }): Observable<StrictHttpResponse<JsonSchema>> {

    const rb = new RequestBuilder(this.rootUrl, ProfileControllerService.Descriptor1Path, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/schema+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<JsonSchema>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `descriptor1$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  descriptor1$Json(params?: {

  }): Observable<JsonSchema> {

    return this.descriptor1$Json$Response(params).pipe(
      map((r: StrictHttpResponse<JsonSchema>) => r.body as JsonSchema)
    );
  }

  /**
   * Path part for operation descriptor2
   */
  static readonly Descriptor2Path = '/profile/qubits';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `descriptor2$Any()` instead.
   *
   * This method doesn't expect any request body.
   */
  descriptor2$Any$Response(params?: {

  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ProfileControllerService.Descriptor2Path, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `descriptor2$Any$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  descriptor2$Any(params?: {

  }): Observable<string> {

    return this.descriptor2$Any$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `descriptor2$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  descriptor2$Json$Response(params?: {

  }): Observable<StrictHttpResponse<JsonSchema>> {

    const rb = new RequestBuilder(this.rootUrl, ProfileControllerService.Descriptor2Path, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/schema+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<JsonSchema>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `descriptor2$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  descriptor2$Json(params?: {

  }): Observable<JsonSchema> {

    return this.descriptor2$Json$Response(params).pipe(
      map((r: StrictHttpResponse<JsonSchema>) => r.body as JsonSchema)
    );
  }

}
