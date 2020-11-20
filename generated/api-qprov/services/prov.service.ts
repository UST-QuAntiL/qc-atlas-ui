/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Document } from '../models/document';

@Injectable({
  providedIn: 'root',
})
export class ProvService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation buildDocument
   */
  static readonly BuildDocumentPath = '/prov/qpus/{backendName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `buildDocument()` instead.
   *
   * This method doesn't expect any request body.
   */
  buildDocument$Response(params: {
    backendName: string;

  }): Observable<StrictHttpResponse<Document>> {

    const rb = new RequestBuilder(this.rootUrl, ProvService.BuildDocumentPath, 'get');
    if (params) {

      rb.path('backendName', params.backendName, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Document>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `buildDocument$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  buildDocument(params: {
    backendName: string;

  }): Observable<Document> {

    return this.buildDocument$Response(params).pipe(
      map((r: StrictHttpResponse<Document>) => r.body as Document)
    );
  }

  /**
   * Path part for operation getProvProvN
   */
  static readonly GetProvProvNPath = '/prov/qpus/{backendName}/prov-provn';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvProvN()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvProvN$Response(params: {
    backendName: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProvService.GetProvProvNPath, 'get');
    if (params) {

      rb.path('backendName', params.backendName, {});

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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvProvN$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvProvN(params: {
    backendName: string;

  }): Observable<void> {

    return this.getProvProvN$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProvXml
   */
  static readonly GetProvXmlPath = '/prov/qpus/{backendName}/prov-xml';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvXml()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvXml$Response(params: {
    backendName: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProvService.GetProvXmlPath, 'get');
    if (params) {

      rb.path('backendName', params.backendName, {});

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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvXml$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvXml(params: {
    backendName: string;

  }): Observable<void> {

    return this.getProvXml$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
