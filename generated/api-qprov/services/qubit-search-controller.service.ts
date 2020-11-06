/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { EntityModelQubit } from '../models/entity-model-qubit';

@Injectable({
  providedIn: 'root',
})
export class QubitSearchControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation executeSearchQubitGet
   */
  static readonly ExecuteSearchQubitGetPath = '/qubits/search/findById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `executeSearchQubitGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchQubitGet$Response(params?: {
    id?: number;

  }): Observable<StrictHttpResponse<EntityModelQubit>> {

    const rb = new RequestBuilder(this.rootUrl, QubitSearchControllerService.ExecuteSearchQubitGetPath, 'get');
    if (params) {

      rb.query('id', params.id, {});

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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `executeSearchQubitGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchQubitGet(params?: {
    id?: number;

  }): Observable<EntityModelQubit> {

    return this.executeSearchQubitGet$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelQubit>) => r.body as EntityModelQubit)
    );
  }

}
