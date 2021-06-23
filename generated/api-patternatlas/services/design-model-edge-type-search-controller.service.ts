/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { EntityModelDesignModelEdgeType } from '../models/entity-model-design-model-edge-type';

@Injectable({
  providedIn: 'root',
})
export class DesignModelEdgeTypeSearchControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation executeSearchDesignmodeledgetypeGet
   */
  static readonly ExecuteSearchDesignmodeledgetypeGetPath =
    '/designModelEdgeTypes/search/findTopByName';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `executeSearchDesignmodeledgetypeGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchDesignmodeledgetypeGet$Response(params?: {
    name?: string;
  }): Observable<StrictHttpResponse<EntityModelDesignModelEdgeType>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelEdgeTypeSearchControllerService.ExecuteSearchDesignmodeledgetypeGetPath,
      'get'
    );
    if (params) {
      rb.query('name', params.name, {});
    }
    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/hal+json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<EntityModelDesignModelEdgeType>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `executeSearchDesignmodeledgetypeGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchDesignmodeledgetypeGet(params?: {
    name?: string;
  }): Observable<EntityModelDesignModelEdgeType> {
    return this.executeSearchDesignmodeledgetypeGet$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDesignModelEdgeType>) =>
          r.body as EntityModelDesignModelEdgeType
      )
    );
  }
}
