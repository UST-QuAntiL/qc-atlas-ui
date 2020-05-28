/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AlgorithmDto } from '../models/algorithm-dto';
import { AlgorithmListDto } from '../models/algorithm-list-dto';
import { TagListDto } from '../models/tag-list-dto';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAlgorithm
   */
  static readonly GetAlgorithmPath = '/algorithms/v1/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithm$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<AlgorithmDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetAlgorithmPath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AlgorithmDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithm(params: {
    id: string;

  }): Observable<AlgorithmDto> {

    return this.getAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<AlgorithmDto>) => r.body as AlgorithmDto)
    );
  }

  /**
   * Path part for operation getAlgorithms
   */
  static readonly GetAlgorithmsPath = '/algorithms/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithms()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithms$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<AlgorithmListDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetAlgorithmsPath, 'get');
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
        return r as StrictHttpResponse<AlgorithmListDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithms(params?: {
    page?: number;
    size?: number;

  }): Observable<AlgorithmListDto> {

    return this.getAlgorithms$Response(params).pipe(
      map((r: StrictHttpResponse<AlgorithmListDto>) => r.body as AlgorithmListDto)
    );
  }

  /**
   * Path part for operation createAlgorithm
   */
  static readonly CreateAlgorithmPath = '/algorithms/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgorithm$Response(params: {
      body: AlgorithmDto
  }): Observable<StrictHttpResponse<AlgorithmDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateAlgorithmPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AlgorithmDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgorithm(params: {
      body: AlgorithmDto
  }): Observable<AlgorithmDto> {

    return this.createAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<AlgorithmDto>) => r.body as AlgorithmDto)
    );
  }

  /**
   * Path part for operation getTags
   */
  static readonly GetTagsPath = '/algorithms/v1/{id}/tags';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTags()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<TagListDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetTagsPath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TagListDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTags$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags(params: {
    id: string;

  }): Observable<TagListDto> {

    return this.getTags$Response(params).pipe(
      map((r: StrictHttpResponse<TagListDto>) => r.body as TagListDto)
    );
  }

}
