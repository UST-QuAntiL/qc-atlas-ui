/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ConcreteSolutionDto } from '../models/concrete-solution-dto';
import { PageConcreteSolutionDto } from '../models/page-concrete-solutions-dto';

@Injectable({
  providedIn: 'root',
})
export class ConcreteSolutionService extends BaseService {
  static readonly GetConcreteSolutionsPath = '/concrete-solutions';
  static readonly GetConcreteSolutionsOfPatternPath = '/patterns/{patternId}/concrete-solutions';
  static readonly GetFileOfConcreteSolutionPath = '/patterns/{patternId}/concrete-solutions/{concreteSolutionId}/file';
  static readonly GetFileContentOfConcreteSolutionPath = '/patterns/{patternId}/concrete-solutions/{concreteSolutionId}/file/content';
  static readonly PostConcreteSolutionPath = '/patterns/{patternId}/concrete-solutions';
  static readonly PostFileOfConcreteSolutionPath = '/patterns/{patternId}/concrete-solutions/{concreteSolutionId}/file';
  static readonly DeleteFileOfConcreteSolutionPath = '/patterns/{patternId}/concrete-solutions/{concreteSolutionId}/file';

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Define the basic properties of an concrete solution.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createConcreteSolution$Response(params: {
    body: ConcreteSolutionDto;
  }): Observable<StrictHttpResponse<ConcreteSolutionDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionService.PostConcreteSolutionPath,
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
          return r as StrictHttpResponse<ConcreteSolutionDto>;
        })
      );
  }

  /**
   * Define the basic properties of an concrete solution.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createConcreteSOlution$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createConcreteSolution(params: {
    body: ConcreteSolutionDto;
  }): Observable<ConcreteSolutionDto> {
    return this.createConcreteSolution$Response(params).pipe(
      map((r: StrictHttpResponse<ConcreteSolutionDto>) => r.body as ConcreteSolutionDto)
    );
  }

  /**
   * Retrieve Concrete Solutions of Pattern.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternConcreteSolutions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternConcreteSolutions$Response(params?: {
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
  }): Observable<StrictHttpResponse<PageConcreteSolutionDto>> {
    // Get the current URL
    const currentUrl = window.location.href;

    // Split the URL to extract the ID
    // The URL format is assumed to be something like "http://localhost:4210/#/patterns/2229a430-fe92-4411-9d72-d10dd1d8da14"
    const parts = currentUrl.split('/'); 
    const patternId = parts[parts.length - 1]; // This gets the last part of the URL, which is the ID

    // Now you can use `patternId` in your request

    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionService.GetConcreteSolutionsOfPatternPath.replace('{patternId}', patternId), // Replace placeholder with actual patternId
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
          return r as StrictHttpResponse<PageConcreteSolutionDto>;
        })
      );
  }

  /**
   * Retrieve Concrete Solutions of a Pattern.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternConcreteSolutions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternConcreteSolutions(params?: {
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
  }): Observable<PageConcreteSolutionDto> {
    return this.getPatternConcreteSolutions$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageConcreteSolutionDto>) =>
          r.body as PageConcreteSolutionDto
      )
    );
  }

}
