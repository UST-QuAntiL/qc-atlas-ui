/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RootService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getText
   */
  static readonly GetTextPath = '/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getText()` instead.
   *
   * This method doesn't expect any request body.
   */
  getText$Response(params?: {}): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(this.rootUrl, RootService.GetTextPath, 'get');
    if (params) {
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: 'text/html',
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
   * To access the full response (for headers, for example), `getText$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getText(params?: {}): Observable<string> {
    return this.getText$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }
}
