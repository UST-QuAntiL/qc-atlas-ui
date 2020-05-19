/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { QpuDto } from '../models/qpu-dto';
import { QpuListDto } from '../models/qpu-list-dto';

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
   * Path part for operation getQpus
   */
  static readonly GetQpusPath = '/providers/{providerId}/qpus/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQpus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQpus$Response(params: {
    providerId: string;
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<QpuListDto>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.GetQpusPath, 'get');
    if (params) {

      rb.path('providerId', params.providerId, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<QpuListDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQpus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQpus(params: {
    providerId: string;
    page?: number;
    size?: number;

  }): Observable<QpuListDto> {

    return this.getQpus$Response(params).pipe(
      map((r: StrictHttpResponse<QpuListDto>) => r.body as QpuListDto)
    );
  }

  /**
   * Path part for operation createQpu
   */
  static readonly CreateQpuPath = '/providers/{providerId}/qpus/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createQpu()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createQpu$Response(params: {
    providerId: string;
      body: QpuDto
  }): Observable<StrictHttpResponse<QpuDto>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.CreateQpuPath, 'post');
    if (params) {

      rb.path('providerId', params.providerId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<QpuDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createQpu$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createQpu(params: {
    providerId: string;
      body: QpuDto
  }): Observable<QpuDto> {

    return this.createQpu$Response(params).pipe(
      map((r: StrictHttpResponse<QpuDto>) => r.body as QpuDto)
    );
  }

  /**
   * Path part for operation getQpu
   */
  static readonly GetQpuPath = '/providers/{providerId}/qpus/{qpuId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQpu()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQpu$Response(params: {
    providerId: string;
    qpuId: string;

  }): Observable<StrictHttpResponse<QpuDto>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.GetQpuPath, 'get');
    if (params) {

      rb.path('providerId', params.providerId, {});
      rb.path('qpuId', params.qpuId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<QpuDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQpu$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQpu(params: {
    providerId: string;
    qpuId: string;

  }): Observable<QpuDto> {

    return this.getQpu$Response(params).pipe(
      map((r: StrictHttpResponse<QpuDto>) => r.body as QpuDto)
    );
  }

}
