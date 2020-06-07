/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Link } from '../models/link';
import { PagedModelEntityModelQpuDto } from '../models/paged-model-entity-model-qpu-dto';
import { QpuDto } from '../models/qpu-dto';

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
  static readonly GetQpusPath = '/qpus/v1/';

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

  }): Observable<StrictHttpResponse<PagedModelEntityModelQpuDto>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.GetQpusPath, 'get');
    if (params) {

      rb.query('providerId', params.providerId, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PagedModelEntityModelQpuDto>;
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

  }): Observable<PagedModelEntityModelQpuDto> {

    return this.getQpus$Response(params).pipe(
      map((r: StrictHttpResponse<PagedModelEntityModelQpuDto>) => r.body as PagedModelEntityModelQpuDto)
    );
  }

  /**
   * Path part for operation createQpu
   */
  static readonly CreateQpuPath = '/qpus/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createQpu()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createQpu$Response(params: {
    providerId: string;
      body: QpuDto
  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name': string, 'numberOfQubits'?: number, 't1'?: number, 'maxGateTime'?: number, 'links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.CreateQpuPath, 'post');
    if (params) {

      rb.query('providerId', params.providerId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name': string, 'numberOfQubits'?: number, 't1'?: number, 'maxGateTime'?: number, 'links'?: Array<Link> }>;
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
  }): Observable<{ 'id'?: string, 'name': string, 'numberOfQubits'?: number, 't1'?: number, 'maxGateTime'?: number, 'links'?: Array<Link> }> {

    return this.createQpu$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name': string, 'numberOfQubits'?: number, 't1'?: number, 'maxGateTime'?: number, 'links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name': string, 'numberOfQubits'?: number, 't1'?: number, 'maxGateTime'?: number, 'links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getQpu
   */
  static readonly GetQpuPath = '/qpus/v1/{qpuId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQpu()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQpu$Response(params: {
    qpuId: string;
    providerId: string;

  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name': string, 'numberOfQubits'?: number, 't1'?: number, 'maxGateTime'?: number, 'links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, QpuService.GetQpuPath, 'get');
    if (params) {

      rb.path('qpuId', params.qpuId, {});
      rb.query('providerId', params.providerId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name': string, 'numberOfQubits'?: number, 't1'?: number, 'maxGateTime'?: number, 'links'?: Array<Link> }>;
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
    qpuId: string;
    providerId: string;

  }): Observable<{ 'id'?: string, 'name': string, 'numberOfQubits'?: number, 't1'?: number, 'maxGateTime'?: number, 'links'?: Array<Link> }> {

    return this.getQpu$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name': string, 'numberOfQubits'?: number, 't1'?: number, 'maxGateTime'?: number, 'links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name': string, 'numberOfQubits'?: number, 't1'?: number, 'maxGateTime'?: number, 'links'?: Array<Link> })
    );
  }

}
