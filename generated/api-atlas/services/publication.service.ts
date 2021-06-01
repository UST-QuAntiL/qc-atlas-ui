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
import { DiscussionCommentDto } from '../models/discussion-comment-dto';
import { DiscussionTopicDto } from '../models/discussion-topic-dto';
import { ImplementationDto } from '../models/implementation-dto';
import { PageAlgorithmDto } from '../models/page-algorithm-dto';
import { PageDiscussionCommentDto } from '../models/page-discussion-comment-dto';
import { PageDiscussionTopicDto } from '../models/page-discussion-topic-dto';
import { PageImplementationDto } from '../models/page-implementation-dto';
import { PagePublicationDto } from '../models/page-publication-dto';
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
   * Path part for operation getPublications
   */
  static readonly GetPublicationsPath = '/publications';

  /**
   * Retrieve all publications.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublications()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications$Response(params?: {

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<StrictHttpResponse<PagePublicationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetPublicationsPath, 'get');
    if (params) {

      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PagePublicationDto>;
      })
    );
  }

  /**
   * Retrieve all publications.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublications$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications(params?: {

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<PagePublicationDto> {

    return this.getPublications$Response(params).pipe(
      map((r: StrictHttpResponse<PagePublicationDto>) => r.body as PagePublicationDto)
    );
  }

  /**
   * Path part for operation createPublication
   */
  static readonly CreatePublicationPath = '/publications';

  /**
   * Define the basic properties of an publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPublication$Response(params: {
      body: PublicationDto
  }): Observable<StrictHttpResponse<PublicationDto>> {

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
        return r as StrictHttpResponse<PublicationDto>;
      })
    );
  }

  /**
   * Define the basic properties of an publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPublication(params: {
      body: PublicationDto
  }): Observable<PublicationDto> {

    return this.createPublication$Response(params).pipe(
      map((r: StrictHttpResponse<PublicationDto>) => r.body as PublicationDto)
    );
  }

  /**
   * Path part for operation getPublication
   */
  static readonly GetPublicationPath = '/publications/{publicationId}';

  /**
   * Retrieve a specific publication and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication$Response(params: {
    publicationId: string;

  }): Observable<StrictHttpResponse<PublicationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetPublicationPath, 'get');
    if (params) {

      rb.path('publicationId', params.publicationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PublicationDto>;
      })
    );
  }

  /**
   * Retrieve a specific publication and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublication(params: {
    publicationId: string;

  }): Observable<PublicationDto> {

    return this.getPublication$Response(params).pipe(
      map((r: StrictHttpResponse<PublicationDto>) => r.body as PublicationDto)
    );
  }

  /**
   * Path part for operation updatePublication
   */
  static readonly UpdatePublicationPath = '/publications/{publicationId}';

  /**
   * Update the basic properties of an publication (e.g. title).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePublication$Response(params: {
    publicationId: string;
      body: PublicationDto
  }): Observable<StrictHttpResponse<PublicationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.UpdatePublicationPath, 'put');
    if (params) {

      rb.path('publicationId', params.publicationId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PublicationDto>;
      })
    );
  }

  /**
   * Update the basic properties of an publication (e.g. title).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePublication(params: {
    publicationId: string;
      body: PublicationDto
  }): Observable<PublicationDto> {

    return this.updatePublication$Response(params).pipe(
      map((r: StrictHttpResponse<PublicationDto>) => r.body as PublicationDto)
    );
  }

  /**
   * Path part for operation deletePublication
   */
  static readonly DeletePublicationPath = '/publications/{publicationId}';

  /**
   * Delete an publication. This also removes all references to other entities (e.g. algorithm).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePublication$Response(params: {
    publicationId: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.DeletePublicationPath, 'delete');
    if (params) {

      rb.path('publicationId', params.publicationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete an publication. This also removes all references to other entities (e.g. algorithm).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deletePublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePublication(params: {
    publicationId: string;

  }): Observable<void> {

    return this.deletePublication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAlgorithmsOfPublication
   */
  static readonly GetAlgorithmsOfPublicationPath = '/publications/{publicationId}/algorithms';

  /**
   * Retrieve referenced algorithms of an publication. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmsOfPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmsOfPublication$Response(params: {
    publicationId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<StrictHttpResponse<PageAlgorithmDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetAlgorithmsOfPublicationPath, 'get');
    if (params) {

      rb.path('publicationId', params.publicationId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageAlgorithmDto>;
      })
    );
  }

  /**
   * Retrieve referenced algorithms of an publication. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmsOfPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmsOfPublication(params: {
    publicationId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<PageAlgorithmDto> {

    return this.getAlgorithmsOfPublication$Response(params).pipe(
      map((r: StrictHttpResponse<PageAlgorithmDto>) => r.body as PageAlgorithmDto)
    );
  }

  /**
   * Path part for operation linkPublicationAndAlgorithm
   */
  static readonly LinkPublicationAndAlgorithmPath = '/publications/{publicationId}/algorithms';

  /**
   * Add a reference to an existing algorithm (that was previously created via a POST on e.g. /algorithms). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkPublicationAndAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkPublicationAndAlgorithm$Response(params: {
    publicationId: string;
      body: AlgorithmDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.LinkPublicationAndAlgorithmPath, 'post');
    if (params) {

      rb.path('publicationId', params.publicationId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Add a reference to an existing algorithm (that was previously created via a POST on e.g. /algorithms). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkPublicationAndAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkPublicationAndAlgorithm(params: {
    publicationId: string;
      body: AlgorithmDto
  }): Observable<void> {

    return this.linkPublicationAndAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAlgorithmOfPublication
   */
  static readonly GetAlgorithmOfPublicationPath = '/publications/{publicationId}/algorithms/{algorithmId}';

  /**
   * Retrieve a specific algorithm of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmOfPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmOfPublication$Response(params: {
    publicationId: string;
    algorithmId: string;

  }): Observable<StrictHttpResponse<AlgorithmDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetAlgorithmOfPublicationPath, 'get');
    if (params) {

      rb.path('publicationId', params.publicationId, {});
      rb.path('algorithmId', params.algorithmId, {});

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
   * Retrieve a specific algorithm of a publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmOfPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmOfPublication(params: {
    publicationId: string;
    algorithmId: string;

  }): Observable<AlgorithmDto> {

    return this.getAlgorithmOfPublication$Response(params).pipe(
      map((r: StrictHttpResponse<AlgorithmDto>) => r.body as AlgorithmDto)
    );
  }

  /**
   * Path part for operation unlinkPublicationAndAlgorithm
   */
  static readonly UnlinkPublicationAndAlgorithmPath = '/publications/{publicationId}/algorithms/{algorithmId}';

  /**
   * Delete a reference to a publication of an algorithm. The reference has to be previously created via a POST on /algorithms/{algorithmId}/publications/{publicationId}).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlinkPublicationAndAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkPublicationAndAlgorithm$Response(params: {
    algorithmId: string;
    publicationId: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.UnlinkPublicationAndAlgorithmPath, 'delete');
    if (params) {

      rb.path('algorithmId', params.algorithmId, {});
      rb.path('publicationId', params.publicationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a reference to a publication of an algorithm. The reference has to be previously created via a POST on /algorithms/{algorithmId}/publications/{publicationId}).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unlinkPublicationAndAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkPublicationAndAlgorithm(params: {
    algorithmId: string;
    publicationId: string;

  }): Observable<void> {

    return this.unlinkPublicationAndAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getDiscussionTopicsOfPublication
   */
  static readonly GetDiscussionTopicsOfPublicationPath = '/publications/{publicationId}/discussion-topics';

  /**
   * Retrieve discussion topics of a publication. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionTopicsOfPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopicsOfPublication$Response(params: {
    publicationId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<StrictHttpResponse<PageDiscussionTopicDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetDiscussionTopicsOfPublicationPath, 'get');
    if (params) {

      rb.path('publicationId', params.publicationId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageDiscussionTopicDto>;
      })
    );
  }

  /**
   * Retrieve discussion topics of a publication. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionTopicsOfPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopicsOfPublication(params: {
    publicationId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<PageDiscussionTopicDto> {

    return this.getDiscussionTopicsOfPublication$Response(params).pipe(
      map((r: StrictHttpResponse<PageDiscussionTopicDto>) => r.body as PageDiscussionTopicDto)
    );
  }

  /**
   * Path part for operation createDiscussionTopicOfPublication
   */
  static readonly CreateDiscussionTopicOfPublicationPath = '/publications/{publicationId}/discussion-topics';

  /**
   * Create a discussion topic of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDiscussionTopicOfPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionTopicOfPublication$Response(params: {
    publicationId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
      body: DiscussionTopicDto
  }): Observable<StrictHttpResponse<DiscussionTopicDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.CreateDiscussionTopicOfPublicationPath, 'post');
    if (params) {

      rb.path('publicationId', params.publicationId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DiscussionTopicDto>;
      })
    );
  }

  /**
   * Create a discussion topic of a publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createDiscussionTopicOfPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionTopicOfPublication(params: {
    publicationId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
      body: DiscussionTopicDto
  }): Observable<DiscussionTopicDto> {

    return this.createDiscussionTopicOfPublication$Response(params).pipe(
      map((r: StrictHttpResponse<DiscussionTopicDto>) => r.body as DiscussionTopicDto)
    );
  }

  /**
   * Path part for operation getDiscussionTopicOfPublication
   */
  static readonly GetDiscussionTopicOfPublicationPath = '/publications/{publicationId}/discussion-topics/{topicId}';

  /**
   * Retrieve discussion topic of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionTopicOfPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopicOfPublication$Response(params: {
    publicationId: string;
    topicId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<StrictHttpResponse<DiscussionTopicDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetDiscussionTopicOfPublicationPath, 'get');
    if (params) {

      rb.path('publicationId', params.publicationId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DiscussionTopicDto>;
      })
    );
  }

  /**
   * Retrieve discussion topic of a publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionTopicOfPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopicOfPublication(params: {
    publicationId: string;
    topicId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<DiscussionTopicDto> {

    return this.getDiscussionTopicOfPublication$Response(params).pipe(
      map((r: StrictHttpResponse<DiscussionTopicDto>) => r.body as DiscussionTopicDto)
    );
  }

  /**
   * Path part for operation updateDiscussionTopicOfPublication
   */
  static readonly UpdateDiscussionTopicOfPublicationPath = '/publications/{publicationId}/discussion-topics/{topicId}';

  /**
   * Update discussion topic of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDiscussionTopicOfPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionTopicOfPublication$Response(params: {
    publicationId: string;
    topicId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
      body: DiscussionTopicDto
  }): Observable<StrictHttpResponse<DiscussionTopicDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.UpdateDiscussionTopicOfPublicationPath, 'put');
    if (params) {

      rb.path('publicationId', params.publicationId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DiscussionTopicDto>;
      })
    );
  }

  /**
   * Update discussion topic of a publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateDiscussionTopicOfPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionTopicOfPublication(params: {
    publicationId: string;
    topicId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
      body: DiscussionTopicDto
  }): Observable<DiscussionTopicDto> {

    return this.updateDiscussionTopicOfPublication$Response(params).pipe(
      map((r: StrictHttpResponse<DiscussionTopicDto>) => r.body as DiscussionTopicDto)
    );
  }

  /**
   * Path part for operation deleteDiscussionTopicOfPublication
   */
  static readonly DeleteDiscussionTopicOfPublicationPath = '/publications/{publicationId}/discussion-topics/{topicId}';

  /**
   * Delete discussion topic of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDiscussionTopicOfPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionTopicOfPublication$Response(params: {
    publicationId: string;
    topicId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.DeleteDiscussionTopicOfPublicationPath, 'delete');
    if (params) {

      rb.path('publicationId', params.publicationId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete discussion topic of a publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDiscussionTopicOfPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionTopicOfPublication(params: {
    publicationId: string;
    topicId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<void> {

    return this.deleteDiscussionTopicOfPublication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getDiscussionCommentsOfDiscussionTopicOfPublication
   */
  static readonly GetDiscussionCommentsOfDiscussionTopicOfPublicationPath = '/publications/{publicationId}/discussion-topics/{topicId}/discussion-comments';

  /**
   * Retrieve discussion comments of a discussion topic of a publication. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionCommentsOfDiscussionTopicOfPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionCommentsOfDiscussionTopicOfPublication$Response(params: {
    publicationId: string;
    topicId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<StrictHttpResponse<PageDiscussionCommentDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetDiscussionCommentsOfDiscussionTopicOfPublicationPath, 'get');
    if (params) {

      rb.path('publicationId', params.publicationId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageDiscussionCommentDto>;
      })
    );
  }

  /**
   * Retrieve discussion comments of a discussion topic of a publication. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionCommentsOfDiscussionTopicOfPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionCommentsOfDiscussionTopicOfPublication(params: {
    publicationId: string;
    topicId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<PageDiscussionCommentDto> {

    return this.getDiscussionCommentsOfDiscussionTopicOfPublication$Response(params).pipe(
      map((r: StrictHttpResponse<PageDiscussionCommentDto>) => r.body as PageDiscussionCommentDto)
    );
  }

  /**
   * Path part for operation createDiscussionCommentOfDiscussionTopicOfPublication
   */
  static readonly CreateDiscussionCommentOfDiscussionTopicOfPublicationPath = '/publications/{publicationId}/discussion-topics/{topicId}/discussion-comments';

  /**
   * Create discussion comment of a discussion topic of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDiscussionCommentOfDiscussionTopicOfPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionCommentOfDiscussionTopicOfPublication$Response(params: {
    publicationId: string;
    topicId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
      body: DiscussionCommentDto
  }): Observable<StrictHttpResponse<DiscussionCommentDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.CreateDiscussionCommentOfDiscussionTopicOfPublicationPath, 'post');
    if (params) {

      rb.path('publicationId', params.publicationId, {});
      rb.path('topicId', params.topicId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DiscussionCommentDto>;
      })
    );
  }

  /**
   * Create discussion comment of a discussion topic of a publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createDiscussionCommentOfDiscussionTopicOfPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionCommentOfDiscussionTopicOfPublication(params: {
    publicationId: string;
    topicId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
      body: DiscussionCommentDto
  }): Observable<DiscussionCommentDto> {

    return this.createDiscussionCommentOfDiscussionTopicOfPublication$Response(params).pipe(
      map((r: StrictHttpResponse<DiscussionCommentDto>) => r.body as DiscussionCommentDto)
    );
  }

  /**
   * Path part for operation getDiscussionCommentOfDiscussionTopicOfPublication
   */
  static readonly GetDiscussionCommentOfDiscussionTopicOfPublicationPath = '/publications/{publicationId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

  /**
   * Retrieve discussion comment of a discussion topic of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionCommentOfDiscussionTopicOfPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionCommentOfDiscussionTopicOfPublication$Response(params: {
    publicationId: string;
    topicId: string;
    commentId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<StrictHttpResponse<DiscussionCommentDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetDiscussionCommentOfDiscussionTopicOfPublicationPath, 'get');
    if (params) {

      rb.path('publicationId', params.publicationId, {});
      rb.path('topicId', params.topicId, {});
      rb.path('commentId', params.commentId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DiscussionCommentDto>;
      })
    );
  }

  /**
   * Retrieve discussion comment of a discussion topic of a publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionCommentOfDiscussionTopicOfPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionCommentOfDiscussionTopicOfPublication(params: {
    publicationId: string;
    topicId: string;
    commentId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<DiscussionCommentDto> {

    return this.getDiscussionCommentOfDiscussionTopicOfPublication$Response(params).pipe(
      map((r: StrictHttpResponse<DiscussionCommentDto>) => r.body as DiscussionCommentDto)
    );
  }

  /**
   * Path part for operation updateDiscussionCommentOfDiscussionTopicOfPublication
   */
  static readonly UpdateDiscussionCommentOfDiscussionTopicOfPublicationPath = '/publications/{publicationId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

  /**
   * Update discussion comment of a discussion topic of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDiscussionCommentOfDiscussionTopicOfPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionCommentOfDiscussionTopicOfPublication$Response(params: {
    publicationId: string;
    topicId: string;
    commentId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
      body: DiscussionCommentDto
  }): Observable<StrictHttpResponse<DiscussionCommentDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.UpdateDiscussionCommentOfDiscussionTopicOfPublicationPath, 'put');
    if (params) {

      rb.path('publicationId', params.publicationId, {});
      rb.path('topicId', params.topicId, {});
      rb.path('commentId', params.commentId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DiscussionCommentDto>;
      })
    );
  }

  /**
   * Update discussion comment of a discussion topic of a publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateDiscussionCommentOfDiscussionTopicOfPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionCommentOfDiscussionTopicOfPublication(params: {
    publicationId: string;
    topicId: string;
    commentId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
      body: DiscussionCommentDto
  }): Observable<DiscussionCommentDto> {

    return this.updateDiscussionCommentOfDiscussionTopicOfPublication$Response(params).pipe(
      map((r: StrictHttpResponse<DiscussionCommentDto>) => r.body as DiscussionCommentDto)
    );
  }

  /**
   * Path part for operation deleteDiscussionCommentOfDiscussionTopicOfPublication
   */
  static readonly DeleteDiscussionCommentOfDiscussionTopicOfPublicationPath = '/publications/{publicationId}/discussion-topics/{topicId}/discussion-comments/{commentId}';

  /**
   * Delete discussion comment of a discussion topic of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDiscussionCommentOfDiscussionTopicOfPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionCommentOfDiscussionTopicOfPublication$Response(params: {
    publicationId: string;
    topicId: string;
    commentId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.DeleteDiscussionCommentOfDiscussionTopicOfPublicationPath, 'delete');
    if (params) {

      rb.path('publicationId', params.publicationId, {});
      rb.path('topicId', params.topicId, {});
      rb.path('commentId', params.commentId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete discussion comment of a discussion topic of a publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDiscussionCommentOfDiscussionTopicOfPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionCommentOfDiscussionTopicOfPublication(params: {
    publicationId: string;
    topicId: string;
    commentId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<void> {

    return this.deleteDiscussionCommentOfDiscussionTopicOfPublication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getImplementationsOfPublication
   */
  static readonly GetImplementationsOfPublicationPath = '/publications/{publicationId}/implementations';

  /**
   * Retrieve referenced implementations of an publication. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationsOfPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfPublication$Response(params: {
    publicationId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<StrictHttpResponse<PageImplementationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetImplementationsOfPublicationPath, 'get');
    if (params) {

      rb.path('publicationId', params.publicationId, {});
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageImplementationDto>;
      })
    );
  }

  /**
   * Retrieve referenced implementations of an publication. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationsOfPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfPublication(params: {
    publicationId: string;

    /**
     * Filter criteria for this query
     */
    search?: string;

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

  }): Observable<PageImplementationDto> {

    return this.getImplementationsOfPublication$Response(params).pipe(
      map((r: StrictHttpResponse<PageImplementationDto>) => r.body as PageImplementationDto)
    );
  }

  /**
   * Path part for operation getImplementationOfPublication
   */
  static readonly GetImplementationOfPublicationPath = '/publications/{publicationId}/implementations/{implementationId}';

  /**
   * Retrieve a specific implementation of a publication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationOfPublication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationOfPublication$Response(params: {
    publicationId: string;
    implementationId: string;

  }): Observable<StrictHttpResponse<ImplementationDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicationService.GetImplementationOfPublicationPath, 'get');
    if (params) {

      rb.path('publicationId', params.publicationId, {});
      rb.path('implementationId', params.implementationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ImplementationDto>;
      })
    );
  }

  /**
   * Retrieve a specific implementation of a publication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationOfPublication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationOfPublication(params: {
    publicationId: string;
    implementationId: string;

  }): Observable<ImplementationDto> {

    return this.getImplementationOfPublication$Response(params).pipe(
      map((r: StrictHttpResponse<ImplementationDto>) => r.body as ImplementationDto)
    );
  }

}
