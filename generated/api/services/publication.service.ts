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
import { CollectionModelEntityModelAlgorithmDto } from '../models/collection-model-entity-model-algorithm-dto';
import { EntityModelPublicationDto } from '../models/entity-model-publication-dto';
import { PagedModelEntityModelPublicationDto } from '../models/paged-model-entity-model-publication-dto';
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
   * Path part for operation getAlgorithms1
   */
  static readonly GetAlgorithms1Path = '/publications/{id}/algorithms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithms1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithms1$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelAlgorithmDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetAlgorithms1Path, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelAlgorithmDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithms1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithms1(params: {
    id: string;

  }): Observable<CollectionModelEntityModelAlgorithmDto> {

    return this.getAlgorithms1$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelAlgorithmDto>) => r.body as CollectionModelEntityModelAlgorithmDto)
    );
  }

  /**
   * Path part for operation getPublications1
   */
  static readonly GetPublications1Path = '/publications/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublications1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications1$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<PagedModelEntityModelPublicationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetPublications1Path, 'get');
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
        return r as StrictHttpResponse<PagedModelEntityModelPublicationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublications1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications1(params?: {
    page?: number;
    size?: number;

  }): Observable<PagedModelEntityModelPublicationDto> {

    return this.getPublications1$Response(params).pipe(
      map((r: StrictHttpResponse<PagedModelEntityModelPublicationDto>) => r.body as PagedModelEntityModelPublicationDto)
    );
  }

  /**
   * Path part for operation createPublication
   */
  static readonly CreatePublicationPath = '/publications/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPublication$Response(params: {
      body: PublicationDto
  }): Observable<StrictHttpResponse<EntityModelPublicationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.CreatePublicationPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelPublicationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPublication(params: {
      body: PublicationDto
  }): Observable<EntityModelPublicationDto> {

    return this.createPublication$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPublicationDto>) => r.body as EntityModelPublicationDto)
    );
  }

  /**
   * Path part for operation getPublication
   */
  static readonly GetPublicationPath = '/publications/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<EntityModelPublicationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetPublicationPath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelPublicationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication(params: {
    id: string;

  }): Observable<EntityModelPublicationDto> {

    return this.getPublication$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPublicationDto>) => r.body as EntityModelPublicationDto)
    );
  }

  /**
   * Path part for operation updatePublication
   */
  static readonly UpdatePublicationPath = '/publications/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePublication$Response(params: {
    id: string;
      body: PublicationDto
  }): Observable<StrictHttpResponse<EntityModelPublicationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.UpdatePublicationPath, 'put');
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
        return r as StrictHttpResponse<EntityModelPublicationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePublication(params: {
    id: string;
      body: PublicationDto
  }): Observable<EntityModelPublicationDto> {

    return this.updatePublication$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPublicationDto>) => r.body as EntityModelPublicationDto)
    );
  }

  /**
   * Path part for operation deletePublication
   */
  static readonly DeletePublicationPath = '/publications/{id}';

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
      responseType: 'blob',
      accept: '*/*'
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

}
