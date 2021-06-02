/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { LearningMethodDto } from '../models/learning-method-dto';
import { PageLearningMethodDto } from '../models/page-learning-method-dto';

@Injectable({
  providedIn: 'root',
})
export class LearningMethodsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getLearningMethods
   */
  static readonly GetLearningMethodsPath = '/learning-methods';

  /**
   * Retrieve all learning method
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLearningMethods()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLearningMethods$Response(params?: {
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
  }): Observable<StrictHttpResponse<PageLearningMethodDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      LearningMethodsService.GetLearningMethodsPath,
      'get'
    );
    if (params) {
      rb.query('search', params.search, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
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
          return r as StrictHttpResponse<PageLearningMethodDto>;
        })
      );
  }

  /**
   * Retrieve all learning method
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLearningMethods$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLearningMethods(params?: {
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
  }): Observable<PageLearningMethodDto> {
    return this.getLearningMethods$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageLearningMethodDto>) =>
          r.body as PageLearningMethodDto
      )
    );
  }

  /**
   * Path part for operation createLearningMethod
   */
  static readonly CreateLearningMethodPath = '/learning-methods';

  /**
   * Define the basic properties of a learning method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createLearningMethod()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createLearningMethod$Response(params: {
    body: LearningMethodDto;
  }): Observable<StrictHttpResponse<LearningMethodDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      LearningMethodsService.CreateLearningMethodPath,
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
          return r as StrictHttpResponse<LearningMethodDto>;
        })
      );
  }

  /**
   * Define the basic properties of a learning method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createLearningMethod$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createLearningMethod(params: {
    body: LearningMethodDto;
  }): Observable<LearningMethodDto> {
    return this.createLearningMethod$Response(params).pipe(
      map(
        (r: StrictHttpResponse<LearningMethodDto>) =>
          r.body as LearningMethodDto
      )
    );
  }

  /**
   * Path part for operation getLearningMethod
   */
  static readonly GetLearningMethodPath =
    '/learning-methods/{learningMethodId}';

  /**
   * Retrieve a specific learning method and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLearningMethod()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLearningMethod$Response(params: {
    learningMethodId: string;
  }): Observable<StrictHttpResponse<LearningMethodDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      LearningMethodsService.GetLearningMethodPath,
      'get'
    );
    if (params) {
      rb.path('learningMethodId', params.learningMethodId, {});
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
          return r as StrictHttpResponse<LearningMethodDto>;
        })
      );
  }

  /**
   * Retrieve a specific learning method and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLearningMethod$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLearningMethod(params: {
    learningMethodId: string;
  }): Observable<LearningMethodDto> {
    return this.getLearningMethod$Response(params).pipe(
      map(
        (r: StrictHttpResponse<LearningMethodDto>) =>
          r.body as LearningMethodDto
      )
    );
  }

  /**
   * Path part for operation updateLearningMethod
   */
  static readonly UpdateLearningMethodPath =
    '/learning-methods/{learningMethodId}';

  /**
   * Update the basic properties of an learning method (e.g. name).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateLearningMethod()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLearningMethod$Response(params: {
    learningMethodId: string;
    body: LearningMethodDto;
  }): Observable<StrictHttpResponse<LearningMethodDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      LearningMethodsService.UpdateLearningMethodPath,
      'put'
    );
    if (params) {
      rb.path('learningMethodId', params.learningMethodId, {});

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
          return r as StrictHttpResponse<LearningMethodDto>;
        })
      );
  }

  /**
   * Update the basic properties of an learning method (e.g. name).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateLearningMethod$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLearningMethod(params: {
    learningMethodId: string;
    body: LearningMethodDto;
  }): Observable<LearningMethodDto> {
    return this.updateLearningMethod$Response(params).pipe(
      map(
        (r: StrictHttpResponse<LearningMethodDto>) =>
          r.body as LearningMethodDto
      )
    );
  }

  /**
   * Path part for operation deleteLearningMethod
   */
  static readonly DeleteLearningMethodPath =
    '/learning-methods/{learningMethodId}';

  /**
   * Delete a learning method. This removes the learning method from all algorithms it is references in.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLearningMethod()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLearningMethod$Response(params: {
    learningMethodId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      LearningMethodsService.DeleteLearningMethodPath,
      'delete'
    );
    if (params) {
      rb.path('learningMethodId', params.learningMethodId, {});
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
   * Delete a learning method. This removes the learning method from all algorithms it is references in.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteLearningMethod$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLearningMethod(params: { learningMethodId: string }): Observable<void> {
    return this.deleteLearningMethod$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
