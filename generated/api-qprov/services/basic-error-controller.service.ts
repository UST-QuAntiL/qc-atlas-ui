/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ModelAndView } from '../models/model-and-view';

@Injectable({
  providedIn: 'root',
})
export class BasicErrorControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation error51
   */
  static readonly Error51Path = '/error';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `error51$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  error51$Json$Response(params?: {

  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, BasicErrorControllerService.Error51Path, 'get');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `error51$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  error51$Json(params?: {

  }): Observable<{}> {

    return this.error51$Json$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `error51$Html()` instead.
   *
   * This method doesn't expect any request body.
   */
  error51$Html$Response(params?: {

  }): Observable<StrictHttpResponse<ModelAndView>> {

    const rb = new RequestBuilder(this.rootUrl, BasicErrorControllerService.Error51Path, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/html'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ModelAndView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `error51$Html$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  error51$Html(params?: {

  }): Observable<ModelAndView> {

    return this.error51$Html$Response(params).pipe(
      map((r: StrictHttpResponse<ModelAndView>) => r.body as ModelAndView)
    );
  }

  /**
   * Path part for operation error61
   */
  static readonly Error61Path = '/error';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `error61$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  error61$Json$Response(params?: {

  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, BasicErrorControllerService.Error61Path, 'put');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `error61$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  error61$Json(params?: {

  }): Observable<{}> {

    return this.error61$Json$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `error61$Html()` instead.
   *
   * This method doesn't expect any request body.
   */
  error61$Html$Response(params?: {

  }): Observable<StrictHttpResponse<ModelAndView>> {

    const rb = new RequestBuilder(this.rootUrl, BasicErrorControllerService.Error61Path, 'put');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/html'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ModelAndView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `error61$Html$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  error61$Html(params?: {

  }): Observable<ModelAndView> {

    return this.error61$Html$Response(params).pipe(
      map((r: StrictHttpResponse<ModelAndView>) => r.body as ModelAndView)
    );
  }

  /**
   * Path part for operation error7
   */
  static readonly Error7Path = '/error';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `error7$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  error7$Json$Response(params?: {

  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, BasicErrorControllerService.Error7Path, 'post');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `error7$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  error7$Json(params?: {

  }): Observable<{}> {

    return this.error7$Json$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `error7$Html()` instead.
   *
   * This method doesn't expect any request body.
   */
  error7$Html$Response(params?: {

  }): Observable<StrictHttpResponse<ModelAndView>> {

    const rb = new RequestBuilder(this.rootUrl, BasicErrorControllerService.Error7Path, 'post');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/html'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ModelAndView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `error7$Html$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  error7$Html(params?: {

  }): Observable<ModelAndView> {

    return this.error7$Html$Response(params).pipe(
      map((r: StrictHttpResponse<ModelAndView>) => r.body as ModelAndView)
    );
  }

  /**
   * Path part for operation error11
   */
  static readonly Error11Path = '/error';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `error11$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  error11$Json$Response(params?: {

  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, BasicErrorControllerService.Error11Path, 'delete');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `error11$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  error11$Json(params?: {

  }): Observable<{}> {

    return this.error11$Json$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `error11$Html()` instead.
   *
   * This method doesn't expect any request body.
   */
  error11$Html$Response(params?: {

  }): Observable<StrictHttpResponse<ModelAndView>> {

    const rb = new RequestBuilder(this.rootUrl, BasicErrorControllerService.Error11Path, 'delete');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/html'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ModelAndView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `error11$Html$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  error11$Html(params?: {

  }): Observable<ModelAndView> {

    return this.error11$Html$Response(params).pipe(
      map((r: StrictHttpResponse<ModelAndView>) => r.body as ModelAndView)
    );
  }

  /**
   * Path part for operation error41
   */
  static readonly Error41Path = '/error';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `error41$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  error41$Json$Response(params?: {

  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, BasicErrorControllerService.Error41Path, 'options');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `error41$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  error41$Json(params?: {

  }): Observable<{}> {

    return this.error41$Json$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `error41$Html()` instead.
   *
   * This method doesn't expect any request body.
   */
  error41$Html$Response(params?: {

  }): Observable<StrictHttpResponse<ModelAndView>> {

    const rb = new RequestBuilder(this.rootUrl, BasicErrorControllerService.Error41Path, 'options');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/html'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ModelAndView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `error41$Html$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  error41$Html(params?: {

  }): Observable<ModelAndView> {

    return this.error41$Html$Response(params).pipe(
      map((r: StrictHttpResponse<ModelAndView>) => r.body as ModelAndView)
    );
  }

  /**
   * Path part for operation error21
   */
  static readonly Error21Path = '/error';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `error21$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  error21$Json$Response(params?: {

  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, BasicErrorControllerService.Error21Path, 'head');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `error21$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  error21$Json(params?: {

  }): Observable<{}> {

    return this.error21$Json$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `error21$Html()` instead.
   *
   * This method doesn't expect any request body.
   */
  error21$Html$Response(params?: {

  }): Observable<StrictHttpResponse<ModelAndView>> {

    const rb = new RequestBuilder(this.rootUrl, BasicErrorControllerService.Error21Path, 'head');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/html'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ModelAndView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `error21$Html$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  error21$Html(params?: {

  }): Observable<ModelAndView> {

    return this.error21$Html$Response(params).pipe(
      map((r: StrictHttpResponse<ModelAndView>) => r.body as ModelAndView)
    );
  }

  /**
   * Path part for operation error31
   */
  static readonly Error31Path = '/error';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `error31$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  error31$Json$Response(params?: {

  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, BasicErrorControllerService.Error31Path, 'patch');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `error31$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  error31$Json(params?: {

  }): Observable<{}> {

    return this.error31$Json$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `error31$Html()` instead.
   *
   * This method doesn't expect any request body.
   */
  error31$Html$Response(params?: {

  }): Observable<StrictHttpResponse<ModelAndView>> {

    const rb = new RequestBuilder(this.rootUrl, BasicErrorControllerService.Error31Path, 'patch');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/html'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ModelAndView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `error31$Html$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  error31$Html(params?: {

  }): Observable<ModelAndView> {

    return this.error31$Html$Response(params).pipe(
      map((r: StrictHttpResponse<ModelAndView>) => r.body as ModelAndView)
    );
  }

}
