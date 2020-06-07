/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BackendDto } from '../models/backend-dto';
import { CloudServiceDto } from '../models/cloud-service-dto';
import { Link } from '../models/link';
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
   * Path part for operation getSoftwarePlatform
   */
  static readonly GetSoftwarePlatformPath = '/software-platforms/v1/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatform$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<{ 'id': string, 'name': string, 'link'?: string, 'version'?: string, 'supportedBackends'?: Array<BackendDto>, 'supportedCloudServices'?: Array<CloudServiceDto>, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, SoftwarePlatformService.GetSoftwarePlatformPath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'name': string, 'link'?: string, 'version'?: string, 'supportedBackends'?: Array<BackendDto>, 'supportedCloudServices'?: Array<CloudServiceDto>, '_links'?: Array<Link> }>;
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

  }): Observable<{ 'id': string, 'name': string, 'link'?: string, 'version'?: string, 'supportedBackends'?: Array<BackendDto>, 'supportedCloudServices'?: Array<CloudServiceDto>, '_links'?: Array<Link> }> {

    return this.getSoftwarePlatform$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'name': string, 'link'?: string, 'version'?: string, 'supportedBackends'?: Array<BackendDto>, 'supportedCloudServices'?: Array<CloudServiceDto>, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'name': string, 'link'?: string, 'version'?: string, 'supportedBackends'?: Array<BackendDto>, 'supportedCloudServices'?: Array<CloudServiceDto>, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteSoftwarePlatform
   */
  static readonly DeleteSoftwarePlatformPath = '/software-platforms/v1/{id}';

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
      responseType: 'json',
      accept: 'application/hal+json'
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

  /**
   * Path part for operation getSoftwarePlatforms
   */
  static readonly GetSoftwarePlatformsPath = '/software-platforms/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatforms()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatforms$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, SoftwarePlatformService.GetSoftwarePlatformsPath, 'get');
    if (params) {

      rb.query('page', params.page, {});
      rb.query('size', params.size, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{  }>;
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

  }): Observable<{  }> {

    return this.getSoftwarePlatforms$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

  /**
   * Path part for operation addSoftwarePlatform
   */
  static readonly AddSoftwarePlatformPath = '/software-platforms/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSoftwarePlatform()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSoftwarePlatform$Response(params: {
      body: SoftwarePlatformDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'name': string, 'link'?: string, 'version'?: string, 'supportedBackends'?: Array<BackendDto>, 'supportedCloudServices'?: Array<CloudServiceDto>, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, SoftwarePlatformService.AddSoftwarePlatformPath, 'put');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'name': string, 'link'?: string, 'version'?: string, 'supportedBackends'?: Array<BackendDto>, 'supportedCloudServices'?: Array<CloudServiceDto>, '_links'?: Array<Link> }>;
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
  }): Observable<{ 'id': string, 'name': string, 'link'?: string, 'version'?: string, 'supportedBackends'?: Array<BackendDto>, 'supportedCloudServices'?: Array<CloudServiceDto>, '_links'?: Array<Link> }> {

    return this.addSoftwarePlatform$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'name': string, 'link'?: string, 'version'?: string, 'supportedBackends'?: Array<BackendDto>, 'supportedCloudServices'?: Array<CloudServiceDto>, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'name': string, 'link'?: string, 'version'?: string, 'supportedBackends'?: Array<BackendDto>, 'supportedCloudServices'?: Array<CloudServiceDto>, '_links'?: Array<Link> })
    );
  }

}
