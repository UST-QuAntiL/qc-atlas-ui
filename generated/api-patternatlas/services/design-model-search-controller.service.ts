/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { EntityModelDesignModel } from '../models/entity-model-design-model';

@Injectable({
  providedIn: 'root',
})
export class DesignModelSearchControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation executeSearchDesignmodelGet
   */
  static readonly ExecuteSearchDesignmodelGetPath =
    '/designModels/search/existsByUri';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `executeSearchDesignmodelGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchDesignmodelGet$Response(params?: {
    uri?: string;
  }): Observable<StrictHttpResponse<boolean>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelSearchControllerService.ExecuteSearchDesignmodelGetPath,
      'get'
    );
    if (params) {
      rb.query('uri', params.uri, {});
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
          return (r as HttpResponse<any>).clone({
            body: String((r as HttpResponse<any>).body) === 'true',
          }) as StrictHttpResponse<boolean>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `executeSearchDesignmodelGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchDesignmodelGet(params?: { uri?: string }): Observable<boolean> {
    return this.executeSearchDesignmodelGet$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation executeSearchDesignmodelGet1
   */
  static readonly ExecuteSearchDesignmodelGet1Path =
    '/designModels/search/findByUri';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `executeSearchDesignmodelGet1()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchDesignmodelGet1$Response(params?: {
    uri?: string;
  }): Observable<StrictHttpResponse<EntityModelDesignModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelSearchControllerService.ExecuteSearchDesignmodelGet1Path,
      'get'
    );
    if (params) {
      rb.query('uri', params.uri, {});
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
          return r as StrictHttpResponse<EntityModelDesignModel>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `executeSearchDesignmodelGet1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSearchDesignmodelGet1(params?: {
    uri?: string;
  }): Observable<EntityModelDesignModel> {
    return this.executeSearchDesignmodelGet1$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDesignModel>) =>
          r.body as EntityModelDesignModel
      )
    );
  }
}
