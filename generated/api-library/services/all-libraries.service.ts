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

import { Library } from '../models/library';

@Injectable({
  providedIn: 'root',
})
export class AllLibrariesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllEntries
   */
  static readonly GetAllEntriesPath = '/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllEntries()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEntries$Response(params?: {
  }): Observable<StrictHttpResponse<Library>> {

    const rb = new RequestBuilder(this.rootUrl, AllLibrariesService.GetAllEntriesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Library>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllEntries$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEntries(params?: {
  }): Observable<Library> {

    return this.getAllEntries$Response(params).pipe(
      map((r: StrictHttpResponse<Library>) => r.body as Library)
    );
  }

}
