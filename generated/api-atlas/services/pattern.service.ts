/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { PagePatternDto } from '../models/page-pattern-dto';
import { PatternDto } from '../models/pattern-dto';

@Injectable({
  providedIn: 'root',
})
export class PatternService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
    this.rootUrl = 'http://localhost:1977/patternatlas';
  }

  
  /**
   * Path part for operation getPatterns
   */
  static readonly GetPatternsPath = '/patternLanguages/af7780d5-1f97-4536-8da7-4194b093ab1d/patterns';

  /**
   * Retrieve all patterns.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatterns()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatterns$Response(params?: {
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
  }): Observable<StrictHttpResponse<PagePatternDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternService.GetPatternsPath,
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
          return r as StrictHttpResponse<PagePatternDto>;
        })
      );
  }

  /**
   * Retrieve all patterns.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatterns$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatterns(params?: {
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
  }): Observable<PagePatternDto> {
    return this.getPatterns$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PagePatternDto>) =>
          r.body as PagePatternDto
      )
    );
  }


  /**
   * Path part for operation getPattern
   */
  static readonly GetPatternPath = '/patterns/{patternId}';

  /**
   * Retrieve a specific pattern and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPattern()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPattern$Response(params: {
    patternId: string;
  }): Observable<StrictHttpResponse<PatternDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      PatternService.GetPatternPath,
      'get'
    );
    if (params) {
      rb.path('patternId', params.patternId, {});
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
          return r as StrictHttpResponse<PatternDto>;
        })
      );
  }

  /**
   * Retrieve a specific pattern and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPattern$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPattern(params: {
    patternId: string;
  }): Observable<PatternDto> {
    return this.getPattern$Response(params).pipe(
      map((r: StrictHttpResponse<PatternDto>) => r.body as PatternDto)
    );
  }

}
