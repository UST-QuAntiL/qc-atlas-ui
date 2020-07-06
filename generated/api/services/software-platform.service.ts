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
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';
import { SoftwarePlatformDto } from '../models/software-platform-dto';

@Injectable({
  providedIn: 'root',
})
export class SoftwarePlatformService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getSoftwarePlatforms1
   */
  static readonly GetSoftwarePlatforms1Path = '/v1/software-platforms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatforms1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatforms1$Response(params?: {
    page?: number;
    size?: number;
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      SoftwarePlatformService.GetSoftwarePlatforms1Path,
      'get'
    );
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
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
          return r as StrictHttpResponse<{
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoftwarePlatforms1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatforms1(params?: {
    page?: number;
    size?: number;
  }): Observable<{
    _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
    page?: PageMetadata;
  }> {
    return this.getSoftwarePlatforms1$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation addSoftwarePlatform1
   */
  static readonly AddSoftwarePlatform1Path = '/v1/software-platforms';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSoftwarePlatform1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSoftwarePlatform1$Response(params: {
    body: SoftwarePlatformDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      link?: string;
      version?: string;
      licence?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      SoftwarePlatformService.AddSoftwarePlatform1Path,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
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
          return r as StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            version?: string;
            licence?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addSoftwarePlatform1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSoftwarePlatform1(params: {
    body: SoftwarePlatformDto;
  }): Observable<{
    id?: string;
    name: string;
    link?: string;
    version?: string;
    licence?: string;
    _links?: Array<Link>;
  }> {
    return this.addSoftwarePlatform1$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            version?: string;
            licence?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            link?: string;
            version?: string;
            licence?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation getSoftwarePlatform1
   */
  static readonly GetSoftwarePlatform1Path = '/v1/software-platforms/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatform1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatform1$Response(params: {
    id: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      link?: string;
      version?: string;
      licence?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      SoftwarePlatformService.GetSoftwarePlatform1Path,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            version?: string;
            licence?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoftwarePlatform1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatform1(params: {
    id: string;
  }): Observable<{
    id?: string;
    name: string;
    link?: string;
    version?: string;
    licence?: string;
    _links?: Array<Link>;
  }> {
    return this.getSoftwarePlatform1$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            version?: string;
            licence?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            link?: string;
            version?: string;
            licence?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updateSoftwarePlatform
   */
  static readonly UpdateSoftwarePlatformPath = '/v1/software-platforms/{id}';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSoftwarePlatform()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSoftwarePlatform$Response(params: {
    id: string;
    body: SoftwarePlatformDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      link?: string;
      version?: string;
      licence?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      SoftwarePlatformService.UpdateSoftwarePlatformPath,
      'put'
    );
    if (params) {
      rb.path('id', params.id, {});

      rb.body(params.body, 'application/json');
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
          return r as StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            version?: string;
            licence?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSoftwarePlatform$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSoftwarePlatform(params: {
    id: string;
    body: SoftwarePlatformDto;
  }): Observable<{
    id?: string;
    name: string;
    link?: string;
    version?: string;
    licence?: string;
    _links?: Array<Link>;
  }> {
    return this.updateSoftwarePlatform$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            version?: string;
            licence?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            link?: string;
            version?: string;
            licence?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deleteSoftwarePlatform
   */
  static readonly DeleteSoftwarePlatformPath = '/v1/software-platforms/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSoftwarePlatform$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      SoftwarePlatformService.DeleteSoftwarePlatformPath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
    }
    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSoftwarePlatform(params: { id: string }): Observable<void> {
    return this.deleteSoftwarePlatform$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
