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
import { FileDto } from '../models';

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
  static readonly GetConcreteSolutionPath = '/patterns/{patternId}/concrete-solutions/{concreteSolutionId}';
  static readonly DeleteConcreteSolutionPath = '/patterns/{patternId}/concrete-solutions/{concreteSolutionId}';
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  extractPatternId(url: string): string | null {
    const patternMatch = url.match(/\/patterns\/([^\/]+)/);
    return patternMatch ? patternMatch[1] : null;
  }

  extractConcreteSolutionId(url: string): string | null {
    const solutionMatch = url.match(/\/concrete-solutions\/([^\/]+)/);
    return solutionMatch ? solutionMatch[1] : null;
  }

  getAttachedFile$Response(): Observable<StrictHttpResponse<FileDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionService.GetFileOfConcreteSolutionPath.replace('{patternId}', this.extractPatternId(window.location.href)).replace('{concreteSolutionId}', this.extractConcreteSolutionId(window.location.href)),
      'get'
    );
    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => r as StrictHttpResponse<FileDto>)
      );
  }

  getAttachedFile(): Observable<FileDto> {
    return this.getAttachedFile$Response().pipe(
      map((r: StrictHttpResponse<FileDto>) => r.body)
    );
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
    patternId: string;
    body: ConcreteSolutionDto;
  }): Observable<StrictHttpResponse<ConcreteSolutionDto>> {
    // Get the current URL
    const currentUrl = window.location.href;

    // Split the URL to extract the ID
    // The URL format is assumed to be something like "http://localhost:4210/#/patterns/2229a430-fe92-4411-9d72-d10dd1d8da14"
    const parts = currentUrl.split('/'); 
    const patternId = parts[parts.length - 1]; // This gets the last part of the URL, which is the ID

    // Now you can use `patternId` in your request
    const rb = new RequestBuilder(
      this.rootUrl,
      ConcreteSolutionService.PostConcreteSolutionPath.replace('{patternId}', patternId), // Replace placeholder with actual patternId
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
    patternId: string;
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

    /**
   * Delete an concrete solution. This also removes all references to other entities (e.g. file).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteConcreteSolution()` instead.
   *
   * This method doesn't expect any request body.
   */
    deleteConcreteSolution$Response(params: {
      concreteSolutionId: string;
    }): Observable<StrictHttpResponse<void>> {
      // Get the current URL
      const currentUrl = window.location.href;

      // Split the URL to extract the ID
      // The URL format is assumed to be something like "http://localhost:4210/#/patterns/2229a430-fe92-4411-9d72-d10dd1d8da14"
      const parts = currentUrl.split('/'); 
      const patternId = parts[parts.length - 1]; // This gets the last part of the URL, which is the ID
      const rb = new RequestBuilder(
        this.rootUrl,
        ConcreteSolutionService.DeleteConcreteSolutionPath.replace('{patternId}', patternId), // Replace placeholder with actual patternId
        'delete'
      );
      if (params) {
        rb.path('concreteSolutionId', params.concreteSolutionId, {});
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
     * Delete an concrete solution. This also removes all references to other entities (e.g. file).
     *
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `deleteConcreteSolution$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    deleteConcreteSolution(params: { concreteSolutionId: string }): Observable<void> {
      return this.deleteConcreteSolution$Response(params).pipe(
        map((r: StrictHttpResponse<void>) => r.body as void)
      );
    }

    attacheFile(file: File): Observable<HttpEvent<object>> {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('payload', JSON.stringify({ name }));
  
      const upload = this.http.post(
        this.rootUrl + ConcreteSolutionService.PostFileOfConcreteSolutionPath.replace('{concreteSolutionId}', this.extractConcreteSolutionId(window.location.href)),
        formData,
        {
          reportProgress: true,
          observe: 'events',
        }
      );
  
      return upload as Observable<HttpEvent<object>>;
    }

    deleteAttachedFile$Response(params: { concreteSolutionId: string }): Observable<StrictHttpResponse<void>> {
      const rb = new RequestBuilder(
        this.rootUrl,
        ConcreteSolutionService.DeleteFileOfConcreteSolutionPath.replace('{patternId}', this.extractPatternId(window.location.href)).replace('{concreteSolutionId}', this.extractConcreteSolutionId(window.location.href)),
        'delete'
      );
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

    deleteAttachedFile(params: { concreteSolutionId: string }): Observable<void> {
      return this.deleteAttachedFile$Response(params).pipe(
        map((r: StrictHttpResponse<void>) => r.body as void)
      );
    }
  }
