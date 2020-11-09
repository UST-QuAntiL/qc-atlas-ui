/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Link } from '../models/link';


/**
 * Monitor and interact
 */
@Injectable({
  providedIn: 'root',
})
export class ActuatorService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation links0
   */
  static readonly Links0Path = '/actuator';

  /**
   * Actuator root web endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `links0()` instead.
   *
   * This method doesn't expect any request body.
   */
  links0$Response(params?: {

  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, ActuatorService.Links0Path, 'get');
    if (params) {


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
   * Actuator root web endpoint.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `links0$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  links0(params?: {

  }): Observable<{}> {

    return this.links0$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation handle3
   */
  static readonly Handle3Path = '/actuator/health';

  /**
   * Actuator web endpoint 'health'.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `handle3()` instead.
   *
   * This method doesn't expect any request body.
   */
  handle3$Response(params?: {

  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, ActuatorService.Handle3Path, 'get');
    if (params) {


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
   * Actuator web endpoint 'health'.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `handle3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  handle3(params?: {

  }): Observable<{}> {

    return this.handle3$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation handle2
   */
  static readonly Handle2Path = '/actuator/health/**';

  /**
   * Actuator web endpoint 'health-path'.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `handle2()` instead.
   *
   * This method doesn't expect any request body.
   */
  handle2$Response(params?: {

  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, ActuatorService.Handle2Path, 'get');
    if (params) {


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
   * Actuator web endpoint 'health-path'.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `handle2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  handle2(params?: {

  }): Observable<{}> {

    return this.handle2$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation handle1
   */
  static readonly Handle1Path = '/actuator/info';

  /**
   * Actuator web endpoint 'info'.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `handle1()` instead.
   *
   * This method doesn't expect any request body.
   */
  handle1$Response(params?: {

  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, ActuatorService.Handle1Path, 'get');
    if (params) {


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
   * Actuator web endpoint 'info'.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `handle1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  handle1(params?: {

  }): Observable<{}> {

    return this.handle1$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

}
