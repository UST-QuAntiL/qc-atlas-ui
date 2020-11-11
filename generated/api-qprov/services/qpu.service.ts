/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Qpu } from '../models/qpu';

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
   * Path part for operation findByBackendName
   */
  static readonly FindByBackendNamePath = '/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByBackendName()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByBackendName$Response(params: {
    backendName: string;

  }): Observable<StrictHttpResponse<Qpu>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.FindByBackendNamePath, 'get');
    if (params) {

      rb.query('backendName', params.backendName, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Qpu>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findByBackendName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByBackendName(params: {
    backendName: string;

  }): Observable<Qpu> {

    return this.findByBackendName$Response(params).pipe(
      map((r: StrictHttpResponse<Qpu>) => r.body as Qpu)
    );
  }

}
