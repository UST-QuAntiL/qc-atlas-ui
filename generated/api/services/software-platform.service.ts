/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { EntityModelSoftwarePlatformDto } from '../models/entity-model-software-platform-dto';
import { PagedModelEntityModelSoftwarePlatformDto } from '../models/paged-model-entity-model-software-platform-dto';
import { SoftwarePlatformDto } from '../models/software-platform-dto';

@Injectable({
  providedIn: 'root',
})
export class SoftwarePlatformService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSoftwarePlatforms
   */
  static readonly GetSoftwarePlatformsPath = '/software-platforms/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatforms()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatforms$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<PagedModelEntityModelSoftwarePlatformDto>> {

    const rb = new RequestBuilder(this.rootUrl, SoftwarePlatformService.GetSoftwarePlatformsPath, 'get');
    if (params) {

      rb.query('page', params.page, {});
      rb.query('size', params.size, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PagedModelEntityModelSoftwarePlatformDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoftwarePlatforms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatforms(params?: {
    page?: number;
    size?: number;

  }): Observable<PagedModelEntityModelSoftwarePlatformDto> {

    return this.getSoftwarePlatforms$Response(params).pipe(
      map((r: StrictHttpResponse<PagedModelEntityModelSoftwarePlatformDto>) => r.body as PagedModelEntityModelSoftwarePlatformDto)
    );
  }

  /**
   * Path part for operation addSoftwarePlatform
   */
  static readonly AddSoftwarePlatformPath = '/software-platforms/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSoftwarePlatform()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSoftwarePlatform$Response(params: {
      body: SoftwarePlatformDto
  }): Observable<StrictHttpResponse<EntityModelSoftwarePlatformDto>> {

    const rb = new RequestBuilder(this.rootUrl, SoftwarePlatformService.AddSoftwarePlatformPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelSoftwarePlatformDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addSoftwarePlatform$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSoftwarePlatform(params: {
      body: SoftwarePlatformDto
  }): Observable<EntityModelSoftwarePlatformDto> {

    return this.addSoftwarePlatform$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelSoftwarePlatformDto>) => r.body as EntityModelSoftwarePlatformDto)
    );
  }

  /**
   * Path part for operation getSoftwarePlatform
   */
  static readonly GetSoftwarePlatformPath = '/software-platforms/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatform$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<EntityModelSoftwarePlatformDto>> {

    const rb = new RequestBuilder(this.rootUrl, SoftwarePlatformService.GetSoftwarePlatformPath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelSoftwarePlatformDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatform(params: {
    id: string;

  }): Observable<EntityModelSoftwarePlatformDto> {

    return this.getSoftwarePlatform$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelSoftwarePlatformDto>) => r.body as EntityModelSoftwarePlatformDto)
    );
  }

  /**
   * Path part for operation updateSoftwarePlatform
   */
  static readonly UpdateSoftwarePlatformPath = '/software-platforms/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSoftwarePlatform()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSoftwarePlatform$Response(params: {
    id: string;
      body: SoftwarePlatformDto
  }): Observable<StrictHttpResponse<EntityModelSoftwarePlatformDto>> {

    const rb = new RequestBuilder(this.rootUrl, SoftwarePlatformService.UpdateSoftwarePlatformPath, 'put');
    if (params) {

      rb.path('id', params.id, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelSoftwarePlatformDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSoftwarePlatform$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSoftwarePlatform(params: {
    id: string;
      body: SoftwarePlatformDto
  }): Observable<EntityModelSoftwarePlatformDto> {

    return this.updateSoftwarePlatform$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelSoftwarePlatformDto>) => r.body as EntityModelSoftwarePlatformDto)
    );
  }

  /**
   * Path part for operation deleteSoftwarePlatform
   */
  static readonly DeleteSoftwarePlatformPath = '/software-platforms/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSoftwarePlatform$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<SoftwarePlatformDto>> {

    const rb = new RequestBuilder(this.rootUrl, SoftwarePlatformService.DeleteSoftwarePlatformPath, 'delete');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SoftwarePlatformDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSoftwarePlatform(params: {
    id: string;

  }): Observable<SoftwarePlatformDto> {

    return this.deleteSoftwarePlatform$Response(params).pipe(
      map((r: StrictHttpResponse<SoftwarePlatformDto>) => r.body as SoftwarePlatformDto)
    );
  }

}
