/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AnalysisResultListDto } from '../models/analysis-result-list-dto';
import { CompilationJobDto } from '../models/compilation-job-dto';
import { CompilerSelectionDto } from '../models/compiler-selection-dto';
import { ParameterListDto } from '../models/parameter-list-dto';
import { RepresentationModel } from '../models/representation-model';
import { SelectionRequestDto } from '../models/selection-request-dto';

@Injectable({
  providedIn: 'root',
})
export class RootService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation root
   */
  static readonly RootPath = '/';

  /**
   * Root operation, returns further links
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `root()` instead.
   *
   * This method doesn't expect any request body.
   */
  root$Response(params?: {}): Observable<
    StrictHttpResponse<RepresentationModel>
  > {
    const rb = new RequestBuilder(this.rootUrl, RootService.RootPath, 'get');
    if (params) {
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
          return r as StrictHttpResponse<RepresentationModel>;
        })
      );
  }

  /**
   * Root operation, returns further links
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `root$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  root(params?: {}): Observable<RepresentationModel> {
    return this.root$Response(params).pipe(
      map(
        (r: StrictHttpResponse<RepresentationModel>) =>
          r.body as RepresentationModel
      )
    );
  }

  /**
   * Path part for operation selectCompilerForFile1
   */
  static readonly SelectCompilerForFile1Path = '/compiler-selection';

  /**
   * Select the most suitable compiler for an implementation loaded from the given URL
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `selectCompilerForFile1$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  selectCompilerForFile1$FormData$Response(params: {
    providerName: string;
    qpuName: string;
    circuitLanguage: string;
    circuitName: string;
    token: string;
    body: { circuit?: Blob };
  }): Observable<StrictHttpResponse<CompilationJobDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RootService.SelectCompilerForFile1Path,
      'post'
    );
    if (params) {
      rb.query('providerName', params.providerName, {});
      rb.query('qpuName', params.qpuName, {});
      rb.query('circuitLanguage', params.circuitLanguage, {});
      rb.query('circuitName', params.circuitName, {});
      rb.query('token', params.token, {});

      rb.body(params.body, 'multipart/form-data');
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
          return r as StrictHttpResponse<CompilationJobDto>;
        })
      );
  }

  /**
   * Select the most suitable compiler for an implementation loaded from the given URL
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `selectCompilerForFile1$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  selectCompilerForFile1$FormData(params: {
    providerName: string;
    qpuName: string;
    circuitLanguage: string;
    circuitName: string;
    token: string;
    body: { circuit?: Blob };
  }): Observable<CompilationJobDto> {
    return this.selectCompilerForFile1$FormData$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CompilationJobDto>) =>
          r.body as CompilationJobDto
      )
    );
  }

  /**
   * Select the most suitable compiler for an implementation loaded from the given URL
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `selectCompilerForFile1$Xml()` instead.
   *
   * This method sends `application/xml` and handles request body of type `application/xml`.
   */
  selectCompilerForFile1$Xml$Response(params: {
    providerName: string;
    qpuName: string;
    circuitLanguage: string;
    circuitName: string;
    token: string;
    body: CompilerSelectionDto;
  }): Observable<StrictHttpResponse<CompilationJobDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RootService.SelectCompilerForFile1Path,
      'post'
    );
    if (params) {
      rb.query('providerName', params.providerName, {});
      rb.query('qpuName', params.qpuName, {});
      rb.query('circuitLanguage', params.circuitLanguage, {});
      rb.query('circuitName', params.circuitName, {});
      rb.query('token', params.token, {});

      rb.body(params.body, 'application/xml');
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
          return r as StrictHttpResponse<CompilationJobDto>;
        })
      );
  }

  /**
   * Select the most suitable compiler for an implementation loaded from the given URL
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `selectCompilerForFile1$Xml$Response()` instead.
   *
   * This method sends `application/xml` and handles request body of type `application/xml`.
   */
  selectCompilerForFile1$Xml(params: {
    providerName: string;
    qpuName: string;
    circuitLanguage: string;
    circuitName: string;
    token: string;
    body: CompilerSelectionDto;
  }): Observable<CompilationJobDto> {
    return this.selectCompilerForFile1$Xml$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CompilationJobDto>) =>
          r.body as CompilationJobDto
      )
    );
  }

  /**
   * Select the most suitable compiler for an implementation loaded from the given URL
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `selectCompilerForFile1$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  selectCompilerForFile1$Json$Response(params: {
    providerName: string;
    qpuName: string;
    circuitLanguage: string;
    circuitName: string;
    token: string;
    body: CompilerSelectionDto;
  }): Observable<StrictHttpResponse<CompilationJobDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RootService.SelectCompilerForFile1Path,
      'post'
    );
    if (params) {
      rb.query('providerName', params.providerName, {});
      rb.query('qpuName', params.qpuName, {});
      rb.query('circuitLanguage', params.circuitLanguage, {});
      rb.query('circuitName', params.circuitName, {});
      rb.query('token', params.token, {});

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
          return r as StrictHttpResponse<CompilationJobDto>;
        })
      );
  }

  /**
   * Select the most suitable compiler for an implementation loaded from the given URL
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `selectCompilerForFile1$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  selectCompilerForFile1$Json(params: {
    providerName: string;
    qpuName: string;
    circuitLanguage: string;
    circuitName: string;
    token: string;
    body: CompilerSelectionDto;
  }): Observable<CompilationJobDto> {
    return this.selectCompilerForFile1$Json$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CompilationJobDto>) =>
          r.body as CompilationJobDto
      )
    );
  }

  /**
   * Path part for operation selectImplementations
   */
  static readonly SelectImplementationsPath = '/selection';

  /**
   * Select implementations for an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `selectImplementations()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  selectImplementations$Response(params: {
    body: SelectionRequestDto;
  }): Observable<StrictHttpResponse<AnalysisResultListDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RootService.SelectImplementationsPath,
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
          return r as StrictHttpResponse<AnalysisResultListDto>;
        })
      );
  }

  /**
   * Select implementations for an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `selectImplementations$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  selectImplementations(params: {
    body: SelectionRequestDto;
  }): Observable<AnalysisResultListDto> {
    return this.selectImplementations$Response(params).pipe(
      map(
        (r: StrictHttpResponse<AnalysisResultListDto>) =>
          r.body as AnalysisResultListDto
      )
    );
  }

  /**
   * Path part for operation getSelectionParams
   */
  static readonly GetSelectionParamsPath = '/selection-params';

  /**
   * Retrieve selection parameters
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSelectionParams()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSelectionParams$Response(params: {
    algoId: string;
  }): Observable<StrictHttpResponse<ParameterListDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      RootService.GetSelectionParamsPath,
      'get'
    );
    if (params) {
      rb.query('algoId', params.algoId, {});
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
          return r as StrictHttpResponse<ParameterListDto>;
        })
      );
  }

  /**
   * Retrieve selection parameters
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSelectionParams$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSelectionParams(params: { algoId: string }): Observable<ParameterListDto> {
    return this.getSelectionParams$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ParameterListDto>) => r.body as ParameterListDto
      )
    );
  }
}
