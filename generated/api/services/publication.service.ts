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
import { EntityModelPublicationDto } from '../models/entity-model-publication-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';
import { PublicationDto } from '../models/publication-dto';

@Injectable({
  providedIn: 'root',
})
export class PublicationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPublication2
   */
  static readonly GetPublication2Path = '/v1/publications/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublication2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication2$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<{ 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetPublication2Path, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublication2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication2(params: {
    id: string;

  }): Observable<{ 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }> {

    return this.getPublication2$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation updatePublication
   */
  static readonly UpdatePublicationPath = '/v1/publications/{id}';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePublication$Response(params: {
    id: string;
      body: PublicationDto
  }): Observable<StrictHttpResponse<{ 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.UpdatePublicationPath, 'put');
    if (params) {

      rb.path('id', params.id, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePublication(params: {
    id: string;
      body: PublicationDto
  }): Observable<{ 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }> {

    return this.updatePublication$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deletePublication
   */
  static readonly DeletePublicationPath = '/v1/publications/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePublication$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<AlgorithmDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.DeletePublicationPath, 'delete');
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
   * To access the full response (for headers, for example), `deletePublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePublication(params: {
    id: string;

  }): Observable<AlgorithmDto> {

    return this.deletePublication$Response(params).pipe(
      map((r: StrictHttpResponse<AlgorithmDto>) => r.body as AlgorithmDto)
    );
  }

  /**
   * Path part for operation getPublications2
   */
  static readonly GetPublications2Path = '/v1/publications';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublications2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications2$Response(params?: {
    page?: number;
    size?: number;
    sort?: string;
    sortBy?: string;
    search?: string;

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetPublications2Path, 'get');
    if (params) {

      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
      rb.query('sortBy', params.sortBy, {});
      rb.query('search', params.search, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublications2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications2(params?: {
    page?: number;
    size?: number;
    sort?: string;
    sortBy?: string;
    search?: string;

  }): Observable<{ '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata }> {

    return this.getPublications2$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'publications'?: Array<EntityModelPublicationDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation createPublication
   */
  static readonly CreatePublicationPath = '/v1/publications';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPublication$Response(params: {
      body: PublicationDto
  }): Observable<StrictHttpResponse<{ 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.CreatePublicationPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPublication(params: {
      body: PublicationDto
  }): Observable<{ 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }> {

    return this.createPublication$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'title': string, 'doi'?: string, 'url'?: string, 'authors': Array<string>, '_links'?: Array<Link> })
    );
  }

}
