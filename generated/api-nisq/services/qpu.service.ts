/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CreateQpuRequestDto } from '../models/create-qpu-request-dto';
import { QpuDto } from '../models/qpu-dto';
import { QpuListDto } from '../models/qpu-list-dto';

@Injectable({
  providedIn: 'root',
})
export class QpuService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getQpus
   */
  static readonly GetQpusPath = '/qpus/';

  /**
   * Retrieve all QPUs
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQpus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQpus$Response(params?: {}): Observable<StrictHttpResponse<QpuListDto>> {
    const rb = new RequestBuilder(this.rootUrl, QpuService.GetQpusPath, 'get');
    if (params) {
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
          return r as StrictHttpResponse<QpuListDto>;
        })
      );
  }

  /**
   * Retrieve all QPUs
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQpus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQpus(params?: {}): Observable<QpuListDto> {
    return this.getQpus$Response(params).pipe(
      map((r: StrictHttpResponse<QpuListDto>) => r.body as QpuListDto)
    );
  }

  /**
   * Path part for operation createQpu
   */
  static readonly CreateQpuPath = '/qpus/';

  /**
   * Create a QPU
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createQpu()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createQpu$Response(params: {
    body: CreateQpuRequestDto;
  }): Observable<StrictHttpResponse<QpuDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      QpuService.CreateQpuPath,
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
          return r as StrictHttpResponse<QpuDto>;
        })
      );
  }

  /**
   * Create a QPU
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createQpu$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createQpu(params: { body: CreateQpuRequestDto }): Observable<QpuDto> {
    return this.createQpu$Response(params).pipe(
      map((r: StrictHttpResponse<QpuDto>) => r.body as QpuDto)
    );
  }

  /**
   * Path part for operation getQpu
   */
  static readonly GetQpuPath = '/qpus/{qpuId}';

  /**
   * Retrieve a single QPU
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQpu()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQpu$Response(params: {
    qpuId: string;
  }): Observable<StrictHttpResponse<QpuDto>> {
    const rb = new RequestBuilder(this.rootUrl, QpuService.GetQpuPath, 'get');
    if (params) {
      rb.path('qpuId', params.qpuId, {});
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
          return r as StrictHttpResponse<QpuDto>;
        })
      );
  }

  /**
   * Retrieve a single QPU
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQpu$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQpu(params: { qpuId: string }): Observable<QpuDto> {
    return this.getQpu$Response(params).pipe(
      map((r: StrictHttpResponse<QpuDto>) => r.body as QpuDto)
    );
  }
}
