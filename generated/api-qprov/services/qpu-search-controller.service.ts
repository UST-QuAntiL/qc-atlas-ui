/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { EntityModelQpu } from '../models/entity-model-qpu';

@Injectable({
  providedIn: 'root',
})
export class QpuSearchControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation executeSearchQpuGet
   */
  static readonly ExecuteSearchQpuGetPath = '/qpus/search/findByBackendName';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `executeSearchQpuGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchQpuGet$Response(params?: {
    backendName?: string;

  }): Observable<StrictHttpResponse<EntityModelQpu>> {

    const rb = new RequestBuilder(this.rootUrl, QpuSearchControllerService.ExecuteSearchQpuGetPath, 'get');
    if (params) {

      rb.query('backendName', params.backendName, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelQpu>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `executeSearchQpuGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchQpuGet(params?: {
    backendName?: string;

  }): Observable<EntityModelQpu> {

    return this.executeSearchQpuGet$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelQpu>) => r.body as EntityModelQpu)
    );
  }

}
