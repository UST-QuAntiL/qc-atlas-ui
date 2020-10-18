/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { LatexContent } from '../models/latex-content';

@Injectable({
  providedIn: 'root',
})
export class RenderLatexControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation home2
   */
  static readonly Home2Path = '/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `home2()` instead.
   *
   * This method doesn't expect any request body.
   */
  home2$Response(params?: {}): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.Home2Path,
      'get'
    );
    if (params) {
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: '*/*',
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `home2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  home2(params?: {}): Observable<string> {
    return this.home2$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation home4
   */
  static readonly Home4Path = '/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `home4()` instead.
   *
   * This method doesn't expect any request body.
   */
  home4$Response(params?: {}): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.Home4Path,
      'put'
    );
    if (params) {
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: '*/*',
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `home4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  home4(params?: {}): Observable<string> {
    return this.home4$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation home3
   */
  static readonly Home3Path = '/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `home3()` instead.
   *
   * This method doesn't expect any request body.
   */
  home3$Response(params?: {}): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.Home3Path,
      'post'
    );
    if (params) {
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: '*/*',
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `home3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  home3(params?: {}): Observable<string> {
    return this.home3$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation home6
   */
  static readonly Home6Path = '/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `home6()` instead.
   *
   * This method doesn't expect any request body.
   */
  home6$Response(params?: {}): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.Home6Path,
      'delete'
    );
    if (params) {
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: '*/*',
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `home6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  home6(params?: {}): Observable<string> {
    return this.home6$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation home
   */
  static readonly HomePath = '/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `home()` instead.
   *
   * This method doesn't expect any request body.
   */
  home$Response(params?: {}): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.HomePath,
      'options'
    );
    if (params) {
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: '*/*',
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `home$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  home(params?: {}): Observable<string> {
    return this.home$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation home1
   */
  static readonly Home1Path = '/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `home1()` instead.
   *
   * This method doesn't expect any request body.
   */
  home1$Response(params?: {}): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.Home1Path,
      'head'
    );
    if (params) {
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: '*/*',
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `home1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  home1(params?: {}): Observable<string> {
    return this.home1$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation home5
   */
  static readonly Home5Path = '/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `home5()` instead.
   *
   * This method doesn't expect any request body.
   */
  home5$Response(params?: {}): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.Home5Path,
      'patch'
    );
    if (params) {
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: '*/*',
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `home5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  home5(params?: {}): Observable<string> {
    return this.home5$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation renderLatex
   */
  static readonly RenderLatexPath = '/renderLatex';

  /**
   * Render latex source code as format given in the request body
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `renderLatex()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderLatex$Response(params: {
    body: LatexContent;
  }): Observable<StrictHttpResponse<Array<string>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.RenderLatexPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<string>>;
        })
      );
  }

  /**
   * Render latex source code as format given in the request body
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `renderLatex$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderLatex(params: { body: LatexContent }): Observable<Array<string>> {
    return this.renderLatex$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation renderLatexAsFullPdf
   */
  static readonly RenderLatexAsFullPdfPath = '/renderLatexAsFullPdf';

  /**
   * Render latex source code as full pdf
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `renderLatexAsFullPdf()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderLatexAsFullPdf$Response(params: {
    body: LatexContent;
  }): Observable<StrictHttpResponse<Array<string>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.RenderLatexAsFullPdfPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: 'application/pdf',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<string>>;
        })
      );
  }

  /**
   * Render latex source code as full pdf
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `renderLatexAsFullPdf$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderLatexAsFullPdf(params: {
    body: LatexContent;
  }): Observable<Array<string>> {
    return this.renderLatexAsFullPdf$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation renderLatexAsPdf
   */
  static readonly RenderLatexAsPdfPath = '/renderLatexAsPdf';

  /**
   * Render latex source code as pdf
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `renderLatexAsPdf()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderLatexAsPdf$Response(params: {
    body: LatexContent;
  }): Observable<StrictHttpResponse<Array<string>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.RenderLatexAsPdfPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: 'application/pdf',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<string>>;
        })
      );
  }

  /**
   * Render latex source code as pdf
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `renderLatexAsPdf$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderLatexAsPdf(params: { body: LatexContent }): Observable<Array<string>> {
    return this.renderLatexAsPdf$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation renderLatexAsPng
   */
  static readonly RenderLatexAsPngPath = '/renderLatexAsPng';

  /**
   * Render latex source code as png
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `renderLatexAsPng()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderLatexAsPng$Response(params: {
    body: LatexContent;
  }): Observable<StrictHttpResponse<Array<string>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.RenderLatexAsPngPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: 'image/png',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<string>>;
        })
      );
  }

  /**
   * Render latex source code as png
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `renderLatexAsPng$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderLatexAsPng(params: { body: LatexContent }): Observable<Array<string>> {
    return this.renderLatexAsPng$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation renderLatexAsSvg
   */
  static readonly RenderLatexAsSvgPath = '/renderLatexAsSvg';

  /**
   * Render latex source code as svg
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `renderLatexAsSvg()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderLatexAsSvg$Response(params: {
    body: LatexContent;
  }): Observable<StrictHttpResponse<Array<string>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.RenderLatexAsSvgPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: 'image/svg+xml',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<string>>;
        })
      );
  }

  /**
   * Render latex source code as svg
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `renderLatexAsSvg$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderLatexAsSvg(params: { body: LatexContent }): Observable<Array<string>> {
    return this.renderLatexAsSvg$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation renderLatexAsSvgz
   */
  static readonly RenderLatexAsSvgzPath = '/renderLatexAsSvgz';

  /**
   * Render latex source code as zipped svg
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `renderLatexAsSvgz()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderLatexAsSvgz$Response(params: {
    body: LatexContent;
  }): Observable<StrictHttpResponse<Array<string>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.RenderLatexAsSvgzPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: 'image/svg+xml',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<string>>;
        })
      );
  }

  /**
   * Render latex source code as zipped svg
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `renderLatexAsSvgz$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderLatexAsSvgz(params: { body: LatexContent }): Observable<Array<string>> {
    return this.renderLatexAsSvgz$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation renderQasmAsPdf
   */
  static readonly RenderQasmAsPdfPath = '/renderQasmAsPdf';

  /**
   * Render qasm source code as pdf
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `renderQasmAsPdf()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderQasmAsPdf$Response(params: {
    body: string;
  }): Observable<StrictHttpResponse<Array<string>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.RenderQasmAsPdfPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: 'application/pdf',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<string>>;
        })
      );
  }

  /**
   * Render qasm source code as pdf
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `renderQasmAsPdf$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderQasmAsPdf(params: { body: string }): Observable<Array<string>> {
    return this.renderQasmAsPdf$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation renderQasmAsSvg
   */
  static readonly RenderQasmAsSvgPath = '/renderQasmAsSvg';

  /**
   * Render qasm source code as svg
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `renderQasmAsSvg()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderQasmAsSvg$Response(params: {
    body: string;
  }): Observable<StrictHttpResponse<Array<string>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RenderLatexControllerService.RenderQasmAsSvgPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: 'image/svg+xml',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<string>>;
        })
      );
  }

  /**
   * Render qasm source code as svg
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `renderQasmAsSvg$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  renderQasmAsSvg(params: { body: string }): Observable<Array<string>> {
    return this.renderQasmAsSvg$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }
}
