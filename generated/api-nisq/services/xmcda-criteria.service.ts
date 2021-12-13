/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CollectionModelEntityModelMcdaJob } from '../models/collection-model-entity-model-mcda-job';
import { CriterionValue } from '../models/criterion-value';
import { EntityModelCriterionValue } from '../models/entity-model-criterion-value';
import { EntityModelMcdaJob } from '../models/entity-model-mcda-job';
import { McdaCriterionDto } from '../models/mcda-criterion-dto';
import { McdaCriterionListDto } from '../models/mcda-criterion-list-dto';
import { McdaMethodDto } from '../models/mcda-method-dto';
import { McdaMethodListDto } from '../models/mcda-method-list-dto';

@Injectable({
  providedIn: 'root',
})
export class XmcdaCriteriaService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getSupportedPrioritizationMethods
   */
  static readonly GetSupportedPrioritizationMethodsPath = '/mcda-methods/';

  /**
   * Get all supported prioritization methods
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSupportedPrioritizationMethods()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSupportedPrioritizationMethods$Response(params?: {}): Observable<
    StrictHttpResponse<McdaMethodListDto>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      XmcdaCriteriaService.GetSupportedPrioritizationMethodsPath,
      'get'
    );
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
          return r as StrictHttpResponse<McdaMethodListDto>;
        })
      );
  }

  /**
   * Get all supported prioritization methods
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSupportedPrioritizationMethods$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSupportedPrioritizationMethods(params?: {}): Observable<
    McdaMethodListDto
  > {
    return this.getSupportedPrioritizationMethods$Response(params).pipe(
      map(
        (r: StrictHttpResponse<McdaMethodListDto>) =>
          r.body as McdaMethodListDto
      )
    );
  }

  /**
   * Path part for operation getPrioritizationMethod
   */
  static readonly GetPrioritizationMethodPath = '/mcda-methods/{methodName}';

  /**
   * Retrieve a single prioritization method
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPrioritizationMethod()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPrioritizationMethod$Response(params: {
    methodName: string;
  }): Observable<StrictHttpResponse<McdaMethodDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      XmcdaCriteriaService.GetPrioritizationMethodPath,
      'get'
    );
    if (params) {
      rb.path('methodName', params.methodName, {});
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
          return r as StrictHttpResponse<McdaMethodDto>;
        })
      );
  }

  /**
   * Retrieve a single prioritization method
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPrioritizationMethod$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPrioritizationMethod(params: {
    methodName: string;
  }): Observable<McdaMethodDto> {
    return this.getPrioritizationMethod$Response(params).pipe(
      map((r: StrictHttpResponse<McdaMethodDto>) => r.body as McdaMethodDto)
    );
  }

  /**
   * Path part for operation getCriterionForMethod
   */
  static readonly GetCriterionForMethodPath =
    '/mcda-methods/{methodName}/criteria';

  /**
   * Retrieve a single prioritization method
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCriterionForMethod()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCriterionForMethod$Response(params: {
    methodName: string;
  }): Observable<StrictHttpResponse<McdaCriterionListDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      XmcdaCriteriaService.GetCriterionForMethodPath,
      'get'
    );
    if (params) {
      rb.path('methodName', params.methodName, {});
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
          return r as StrictHttpResponse<McdaCriterionListDto>;
        })
      );
  }

  /**
   * Retrieve a single prioritization method
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCriterionForMethod$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCriterionForMethod(params: {
    methodName: string;
  }): Observable<McdaCriterionListDto> {
    return this.getCriterionForMethod$Response(params).pipe(
      map(
        (r: StrictHttpResponse<McdaCriterionListDto>) =>
          r.body as McdaCriterionListDto
      )
    );
  }

  /**
   * Path part for operation getCriterion
   */
  static readonly GetCriterionPath =
    '/mcda-methods/{methodName}/criteria/{criterionId}';

  /**
   * Retrieve a single criterion for a MCDA method
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCriterion()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCriterion$Response(params: {
    methodName: string;
    criterionId: string;
  }): Observable<StrictHttpResponse<McdaCriterionDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      XmcdaCriteriaService.GetCriterionPath,
      'get'
    );
    if (params) {
      rb.path('methodName', params.methodName, {});
      rb.path('criterionId', params.criterionId, {});
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
          return r as StrictHttpResponse<McdaCriterionDto>;
        })
      );
  }

  /**
   * Retrieve a single criterion for a MCDA method
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCriterion$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCriterion(params: {
    methodName: string;
    criterionId: string;
  }): Observable<McdaCriterionDto> {
    return this.getCriterion$Response(params).pipe(
      map(
        (r: StrictHttpResponse<McdaCriterionDto>) => r.body as McdaCriterionDto
      )
    );
  }

  /**
   * Path part for operation getCriterionValue
   */
  static readonly GetCriterionValuePath =
    '/mcda-methods/{methodName}/criteria/{criterionId}/value';

  /**
   * Retrieve the criterion value for a MCDA method
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCriterionValue()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCriterionValue$Response(params: {
    methodName: string;
    criterionId: string;
  }): Observable<StrictHttpResponse<EntityModelCriterionValue>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      XmcdaCriteriaService.GetCriterionValuePath,
      'get'
    );
    if (params) {
      rb.path('methodName', params.methodName, {});
      rb.path('criterionId', params.criterionId, {});
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
          return r as StrictHttpResponse<EntityModelCriterionValue>;
        })
      );
  }

  /**
   * Retrieve the criterion value for a MCDA method
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCriterionValue$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCriterionValue(params: {
    methodName: string;
    criterionId: string;
  }): Observable<EntityModelCriterionValue> {
    return this.getCriterionValue$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelCriterionValue>) =>
          r.body as EntityModelCriterionValue
      )
    );
  }

  /**
   * Path part for operation updateCriterionValue
   */
  static readonly UpdateCriterionValuePath =
    '/mcda-methods/{methodName}/criteria/{criterionId}/value';

  /**
   * Retrieve the criterion value for a MCDA method
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCriterionValue()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCriterionValue$Response(params: {
    methodName: string;
    criterionId: string;
    body: CriterionValue;
  }): Observable<StrictHttpResponse<EntityModelCriterionValue>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      XmcdaCriteriaService.UpdateCriterionValuePath,
      'put'
    );
    if (params) {
      rb.path('methodName', params.methodName, {});
      rb.path('criterionId', params.criterionId, {});

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
          return r as StrictHttpResponse<EntityModelCriterionValue>;
        })
      );
  }

  /**
   * Retrieve the criterion value for a MCDA method
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCriterionValue$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCriterionValue(params: {
    methodName: string;
    criterionId: string;
    body: CriterionValue;
  }): Observable<EntityModelCriterionValue> {
    return this.updateCriterionValue$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelCriterionValue>) =>
          r.body as EntityModelCriterionValue
      )
    );
  }

  /**
   * Path part for operation getPrioritizationJobs
   */
  static readonly GetPrioritizationJobsPath = '/mcda-methods/{methodName}/jobs';

  /**
   * Retrieve all MCDA jobs for the given method
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPrioritizationJobs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPrioritizationJobs$Response(params: {
    methodName: string;
  }): Observable<StrictHttpResponse<CollectionModelEntityModelMcdaJob>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      XmcdaCriteriaService.GetPrioritizationJobsPath,
      'get'
    );
    if (params) {
      rb.path('methodName', params.methodName, {});
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
          return r as StrictHttpResponse<CollectionModelEntityModelMcdaJob>;
        })
      );
  }

  /**
   * Retrieve all MCDA jobs for the given method
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPrioritizationJobs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPrioritizationJobs(params: {
    methodName: string;
  }): Observable<CollectionModelEntityModelMcdaJob> {
    return this.getPrioritizationJobs$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CollectionModelEntityModelMcdaJob>) =>
          r.body as CollectionModelEntityModelMcdaJob
      )
    );
  }

  /**
   * Path part for operation getPrioritizationJob
   */
  static readonly GetPrioritizationJobPath =
    '/mcda-methods/{methodName}/jobs/{jobId}';

  /**
   * Retrieve all MCDA jobs for the given method
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPrioritizationJob()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPrioritizationJob$Response(params: {
    methodName: string;
    jobId: string;
  }): Observable<StrictHttpResponse<EntityModelMcdaJob>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      XmcdaCriteriaService.GetPrioritizationJobPath,
      'get'
    );
    if (params) {
      rb.path('methodName', params.methodName, {});
      rb.path('jobId', params.jobId, {});
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
          return r as StrictHttpResponse<EntityModelMcdaJob>;
        })
      );
  }

  /**
   * Retrieve all MCDA jobs for the given method
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPrioritizationJob$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPrioritizationJob(params: {
    methodName: string;
    jobId: string;
  }): Observable<EntityModelMcdaJob> {
    return this.getPrioritizationJob$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelMcdaJob>) =>
          r.body as EntityModelMcdaJob
      )
    );
  }

  /**
   * Path part for operation prioritizeCompiledCircuitsOfJob
   */
  static readonly PrioritizeCompiledCircuitsOfJobPath =
    '/mcda-methods/{methodName}/prioritize';

  /**
   * Run the MCDA method on the NISQ Analyzer job passed as parameter
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `prioritizeCompiledCircuitsOfJob()` instead.
   *
   * This method doesn't expect any request body.
   */
  prioritizeCompiledCircuitsOfJob$Response(params: {
    methodName: string;
    jobId: string;
  }): Observable<StrictHttpResponse<EntityModelMcdaJob>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      XmcdaCriteriaService.PrioritizeCompiledCircuitsOfJobPath,
      'post'
    );
    if (params) {
      rb.path('methodName', params.methodName, {});
      rb.query('jobId', params.jobId, {});
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
          return r as StrictHttpResponse<EntityModelMcdaJob>;
        })
      );
  }

  /**
   * Run the MCDA method on the NISQ Analyzer job passed as parameter
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `prioritizeCompiledCircuitsOfJob$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  prioritizeCompiledCircuitsOfJob(params: {
    methodName: string;
    jobId: string;
  }): Observable<EntityModelMcdaJob> {
    return this.prioritizeCompiledCircuitsOfJob$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelMcdaJob>) =>
          r.body as EntityModelMcdaJob
      )
    );
  }
}
