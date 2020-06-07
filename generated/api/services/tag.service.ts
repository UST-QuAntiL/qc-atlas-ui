/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CollectionModelEntityModelAlgorithmDto } from '../models/collection-model-entity-model-algorithm-dto';
import { CollectionModelEntityModelImplementationDto } from '../models/collection-model-entity-model-implementation-dto';
import { Link } from '../models/link';
import { PagedModelEntityModelTagDto } from '../models/paged-model-entity-model-tag-dto';
import { TagDto } from '../models/tag-dto';

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
  static readonly GetTags2Path = '/tags/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTags2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags2$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<PagedModelEntityModelTagDto>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.GetTags2Path, 'get');
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
        return r as StrictHttpResponse<PagedModelEntityModelTagDto>;
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

  }): Observable<PagedModelEntityModelTagDto> {

    return this.getTags2$Response(params).pipe(
      map((r: StrictHttpResponse<PagedModelEntityModelTagDto>) => r.body as PagedModelEntityModelTagDto)
    );
  }

  /**
   * Path part for operation createTag
   */
  static readonly CreateTagPath = '/tags/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTag()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTag$Response(params: {
      body: TagDto
  }): Observable<StrictHttpResponse<{ 'key'?: string, 'value'?: string, 'id'?: string, 'links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.CreateTagPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'key'?: string, 'value'?: string, 'id'?: string, 'links'?: Array<Link> }>;
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
  }): Observable<{ 'key'?: string, 'value'?: string, 'id'?: string, 'links'?: Array<Link> }> {

    return this.createTag$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'key'?: string, 'value'?: string, 'id'?: string, 'links'?: Array<Link> }>) => r.body as { 'key'?: string, 'value'?: string, 'id'?: string, 'links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getAlgorithmsOfTag
   */
  static readonly GetAlgorithmsOfTagPath = '/tags/v1/{tagId}/algorithms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmsOfTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmsOfTag$Response(params: {
    tagId: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelAlgorithmDto>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.GetAlgorithmsOfTagPath, 'get');
    if (params) {

      rb.path('tagId', params.tagId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelAlgorithmDto>;
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

  }): Observable<CollectionModelEntityModelAlgorithmDto> {

    return this.getAlgorithmsOfTag$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelAlgorithmDto>) => r.body as CollectionModelEntityModelAlgorithmDto)
    );
  }

  /**
   * Path part for operation getTagById
   */
  static readonly GetTagByIdPath = '/tags/v1/{tagId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTagById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTagById$Response(params: {
    tagId: string;

  }): Observable<StrictHttpResponse<{ 'key'?: string, 'value'?: string, 'id'?: string, 'links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.GetTagByIdPath, 'get');
    if (params) {

      rb.path('tagId', params.tagId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'key'?: string, 'value'?: string, 'id'?: string, 'links'?: Array<Link> }>;
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

  }): Observable<{ 'key'?: string, 'value'?: string, 'id'?: string, 'links'?: Array<Link> }> {

    return this.getTagById$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'key'?: string, 'value'?: string, 'id'?: string, 'links'?: Array<Link> }>) => r.body as { 'key'?: string, 'value'?: string, 'id'?: string, 'links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getImplementationsOfTag
   */
  static readonly GetImplementationsOfTagPath = '/tags/v1/{tagId}/implementations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationsOfTag()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfTag$Response(params: {
    tagId: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelImplementationDto>> {

    const rb = new RequestBuilder(this.rootUrl, TagService.GetImplementationsOfTagPath, 'get');
    if (params) {

      rb.path('tagId', params.tagId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelImplementationDto>;
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

  }): Observable<CollectionModelEntityModelImplementationDto> {

    return this.getImplementationsOfTag$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelImplementationDto>) => r.body as CollectionModelEntityModelImplementationDto)
    );
  }

}
