/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AlgorithmListDto } from '../models/algorithm-list-dto';
import { ImplementationListDto } from '../models/implementation-list-dto';
import { TagDto } from '../models/tag-dto';
import { TagListDto } from '../models/tag-list-dto';

@Injectable({
  providedIn: 'root',
})
export class TagService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTags2
   */
  static readonly GetTags2Path = '/tags/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTags2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags2$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<TagListDto>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.GetTags2Path, 'get');
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
        return r as StrictHttpResponse<TagListDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTags2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags2(params?: {
    page?: number;
    size?: number;

  }): Observable<TagListDto> {

    return this.getTags2$Response(params).pipe(
      map((r: StrictHttpResponse<TagListDto>) => r.body as TagListDto)
    );
  }

  /**
   * Path part for operation createTag
   */
  static readonly CreateTagPath = '/tags/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTag()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTag$Response(params: {
      body: TagDto
  }): Observable<StrictHttpResponse<TagDto>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.CreateTagPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TagDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createTag$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTag(params: {
      body: TagDto
  }): Observable<TagDto> {

    return this.createTag$Response(params).pipe(
      map((r: StrictHttpResponse<TagDto>) => r.body as TagDto)
    );
  }

  /**
   * Path part for operation getImplementationsOfTag
   */
  static readonly GetImplementationsOfTagPath = '/tags/{tagId}/implementations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationsOfTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfTag$Response(params: {
    tagId: string;

  }): Observable<StrictHttpResponse<ImplementationListDto>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.GetImplementationsOfTagPath, 'get');
    if (params) {

      rb.path('tagId', params.tagId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ImplementationListDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationsOfTag$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfTag(params: {
    tagId: string;

  }): Observable<ImplementationListDto> {

    return this.getImplementationsOfTag$Response(params).pipe(
      map((r: StrictHttpResponse<ImplementationListDto>) => r.body as ImplementationListDto)
    );
  }

  /**
   * Path part for operation getAlgorithmsOfTag
   */
  static readonly GetAlgorithmsOfTagPath = '/tags/{tagId}/algorithms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmsOfTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmsOfTag$Response(params: {
    tagId: string;

  }): Observable<StrictHttpResponse<AlgorithmListDto>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.GetAlgorithmsOfTagPath, 'get');
    if (params) {

      rb.path('tagId', params.tagId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AlgorithmListDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmsOfTag$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmsOfTag(params: {
    tagId: string;

  }): Observable<AlgorithmListDto> {

    return this.getAlgorithmsOfTag$Response(params).pipe(
      map((r: StrictHttpResponse<AlgorithmListDto>) => r.body as AlgorithmListDto)
    );
  }

  /**
   * Path part for operation getTagById
   */
  static readonly GetTagByIdPath = '/tags/{tagId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTagById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTagById$Response(params: {
    tagId: string;

  }): Observable<StrictHttpResponse<TagDto>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.GetTagByIdPath, 'get');
    if (params) {

      rb.path('tagId', params.tagId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TagDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTagById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTagById(params: {
    tagId: string;

  }): Observable<TagDto> {

    return this.getTagById$Response(params).pipe(
      map((r: StrictHttpResponse<TagDto>) => r.body as TagDto)
    );
  }

}
