/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CloudServiceDto } from '../models/cloud-service-dto';
import { ComputeResourceDto } from '../models/compute-resource-dto';
import { ComputeResourcePropertyDto } from '../models/compute-resource-property-dto';
import { ImplementationDto } from '../models/implementation-dto';
import { PageCloudServiceDto } from '../models/page-cloud-service-dto';
import { PageComputeResourceDto } from '../models/page-compute-resource-dto';
import { PageComputeResourcePropertyDto } from '../models/page-compute-resource-property-dto';
import { PageImplementationDto } from '../models/page-implementation-dto';
import { PageSoftwarePlatformDto } from '../models/page-software-platform-dto';
import { SoftwarePlatformDto } from '../models/software-platform-dto';

@Injectable({
  providedIn: 'root',
})
export class ExecutionEnvironmentsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getCloudServices
   */
  static readonly GetCloudServicesPath = '/cloud-services';

  /**
   * Retrieve all cloud services.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCloudServices()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudServices$Response(params?: {
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
  }): Observable<StrictHttpResponse<PageCloudServiceDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetCloudServicesPath,
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
          return r as StrictHttpResponse<PageCloudServiceDto>;
        })
      );
  }

  /**
   * Retrieve all cloud services.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCloudServices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudServices(params?: {
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
  }): Observable<PageCloudServiceDto> {
    return this.getCloudServices$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageCloudServiceDto>) =>
          r.body as PageCloudServiceDto
      )
    );
  }

  /**
   * Path part for operation createCloudService
   */
  static readonly CreateCloudServicePath = '/cloud-services';

  /**
   * Define the basic properties of a cloud service. References to sub-objects (e.g. a compute resource) can be added via sub-routes (e.g. POST on /cloud-services/{cloudServiceId}/compute-resources).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCloudService()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCloudService$Response(params: {
    body: CloudServiceDto;
  }): Observable<StrictHttpResponse<CloudServiceDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.CreateCloudServicePath,
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
          return r as StrictHttpResponse<CloudServiceDto>;
        })
      );
  }

  /**
   * Define the basic properties of a cloud service. References to sub-objects (e.g. a compute resource) can be added via sub-routes (e.g. POST on /cloud-services/{cloudServiceId}/compute-resources).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createCloudService$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCloudService(params: {
    body: CloudServiceDto;
  }): Observable<CloudServiceDto> {
    return this.createCloudService$Response(params).pipe(
      map((r: StrictHttpResponse<CloudServiceDto>) => r.body as CloudServiceDto)
    );
  }

  /**
   * Path part for operation getCloudService
   */
  static readonly GetCloudServicePath = '/cloud-services/{cloudServiceId}';

  /**
   * Retrieve a specific cloud service and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCloudService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudService$Response(params: {
    cloudServiceId: string;
  }): Observable<StrictHttpResponse<CloudServiceDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetCloudServicePath,
      'get'
    );
    if (params) {
      rb.path('cloudServiceId', params.cloudServiceId, {});
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
          return r as StrictHttpResponse<CloudServiceDto>;
        })
      );
  }

  /**
   * Retrieve a specific cloud service and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCloudService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudService(params: {
    cloudServiceId: string;
  }): Observable<CloudServiceDto> {
    return this.getCloudService$Response(params).pipe(
      map((r: StrictHttpResponse<CloudServiceDto>) => r.body as CloudServiceDto)
    );
  }

  /**
   * Path part for operation updateCloudService
   */
  static readonly UpdateCloudServicePath = '/cloud-services/{cloudServiceId}';

  /**
   * Update the basic properties of a cloud service (e.g. name). References to sub-objects (e.g. a compute resource) are not updated via this operation - use the corresponding sub-route for updating them (e.g. PUT on /compute-resources/{computeResourceId}).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCloudService()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCloudService$Response(params: {
    cloudServiceId: string;
    body: CloudServiceDto;
  }): Observable<StrictHttpResponse<CloudServiceDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.UpdateCloudServicePath,
      'put'
    );
    if (params) {
      rb.path('cloudServiceId', params.cloudServiceId, {});

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
          return r as StrictHttpResponse<CloudServiceDto>;
        })
      );
  }

  /**
   * Update the basic properties of a cloud service (e.g. name). References to sub-objects (e.g. a compute resource) are not updated via this operation - use the corresponding sub-route for updating them (e.g. PUT on /compute-resources/{computeResourceId}).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCloudService$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCloudService(params: {
    cloudServiceId: string;
    body: CloudServiceDto;
  }): Observable<CloudServiceDto> {
    return this.updateCloudService$Response(params).pipe(
      map((r: StrictHttpResponse<CloudServiceDto>) => r.body as CloudServiceDto)
    );
  }

  /**
   * Path part for operation deleteCloudService
   */
  static readonly DeleteCloudServicePath = '/cloud-services/{cloudServiceId}';

  /**
   * Delete a cloud service. This also removes all references to other entities (e.g. compute resource).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCloudService()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCloudService$Response(params: {
    cloudServiceId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.DeleteCloudServicePath,
      'delete'
    );
    if (params) {
      rb.path('cloudServiceId', params.cloudServiceId, {});
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
   * Delete a cloud service. This also removes all references to other entities (e.g. compute resource).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteCloudService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCloudService(params: { cloudServiceId: string }): Observable<void> {
    return this.deleteCloudService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getComputeResourcesOfCloudService
   */
  static readonly GetComputeResourcesOfCloudServicePath =
    '/cloud-services/{cloudServiceId}/compute-resources';

  /**
   * Retrieve referenced compute resources of an cloud service. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputeResourcesOfCloudService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcesOfCloudService$Response(params: {
    cloudServiceId: string;

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
  }): Observable<StrictHttpResponse<PageComputeResourceDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetComputeResourcesOfCloudServicePath,
      'get'
    );
    if (params) {
      rb.path('cloudServiceId', params.cloudServiceId, {});
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
          return r as StrictHttpResponse<PageComputeResourceDto>;
        })
      );
  }

  /**
   * Retrieve referenced compute resources of an cloud service. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputeResourcesOfCloudService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcesOfCloudService(params: {
    cloudServiceId: string;

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
  }): Observable<PageComputeResourceDto> {
    return this.getComputeResourcesOfCloudService$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageComputeResourceDto>) =>
          r.body as PageComputeResourceDto
      )
    );
  }

  /**
   * Path part for operation linkCloudServiceAndComputeResource
   */
  static readonly LinkCloudServiceAndComputeResourcePath =
    '/cloud-services/{cloudServiceId}/compute-resources';

  /**
   * Add a reference to an existing compute resource (that was previously created via a POST on e.g. /compute-resources). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkCloudServiceAndComputeResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkCloudServiceAndComputeResource$Response(params: {
    cloudServiceId: string;
    body: ComputeResourceDto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.LinkCloudServiceAndComputeResourcePath,
      'post'
    );
    if (params) {
      rb.path('cloudServiceId', params.cloudServiceId, {});

      rb.body(params.body, 'application/json');
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
   * Add a reference to an existing compute resource (that was previously created via a POST on e.g. /compute-resources). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkCloudServiceAndComputeResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkCloudServiceAndComputeResource(params: {
    cloudServiceId: string;
    body: ComputeResourceDto;
  }): Observable<void> {
    return this.linkCloudServiceAndComputeResource$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation unlinkCloudServiceAndComputeResource
   */
  static readonly UnlinkCloudServiceAndComputeResourcePath =
    '/cloud-services/{cloudServiceId}/compute-resources/{computeResourceId}';

  /**
   * Delete a reference to a compute resource of a cloud service. The reference has to be previously created via a POST on /cloud-services/{cloudServiceId}/compute-resources).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlinkCloudServiceAndComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkCloudServiceAndComputeResource$Response(params: {
    cloudServiceId: string;
    computeResourceId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.UnlinkCloudServiceAndComputeResourcePath,
      'delete'
    );
    if (params) {
      rb.path('cloudServiceId', params.cloudServiceId, {});
      rb.path('computeResourceId', params.computeResourceId, {});
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
   * Delete a reference to a compute resource of a cloud service. The reference has to be previously created via a POST on /cloud-services/{cloudServiceId}/compute-resources).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unlinkCloudServiceAndComputeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkCloudServiceAndComputeResource(params: {
    cloudServiceId: string;
    computeResourceId: string;
  }): Observable<void> {
    return this.unlinkCloudServiceAndComputeResource$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getSoftwarePlatformsOfCloudService
   */
  static readonly GetSoftwarePlatformsOfCloudServicePath =
    '/cloud-services/{cloudServiceId}/software-platforms';

  /**
   * Retrieve referenced software platforms of an cloud service. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatformsOfCloudService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformsOfCloudService$Response(params: {
    cloudServiceId: string;

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
  }): Observable<StrictHttpResponse<PageSoftwarePlatformDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetSoftwarePlatformsOfCloudServicePath,
      'get'
    );
    if (params) {
      rb.path('cloudServiceId', params.cloudServiceId, {});
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
          return r as StrictHttpResponse<PageSoftwarePlatformDto>;
        })
      );
  }

  /**
   * Retrieve referenced software platforms of an cloud service. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoftwarePlatformsOfCloudService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformsOfCloudService(params: {
    cloudServiceId: string;

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
  }): Observable<PageSoftwarePlatformDto> {
    return this.getSoftwarePlatformsOfCloudService$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageSoftwarePlatformDto>) =>
          r.body as PageSoftwarePlatformDto
      )
    );
  }

  /**
   * Path part for operation getComputeResources
   */
  static readonly GetComputeResourcesPath = '/compute-resources';

  /**
   * Retrieve all compute resources.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputeResources()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResources$Response(params?: {
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
  }): Observable<StrictHttpResponse<PageComputeResourceDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetComputeResourcesPath,
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
          return r as StrictHttpResponse<PageComputeResourceDto>;
        })
      );
  }

  /**
   * Retrieve all compute resources.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputeResources$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResources(params?: {
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
  }): Observable<PageComputeResourceDto> {
    return this.getComputeResources$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageComputeResourceDto>) =>
          r.body as PageComputeResourceDto
      )
    );
  }

  /**
   * Path part for operation createComputeResource
   */
  static readonly CreateComputeResourcePath = '/compute-resources';

  /**
   * Define the basic properties of a compute resource. References to sub-objects (e.g. a compute resource property) can be added via sub-routes (e.g. POST on /compute-resources/{computeResourceId}/compute-resource-properties).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createComputeResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputeResource$Response(params: {
    body: ComputeResourceDto;
  }): Observable<StrictHttpResponse<ComputeResourceDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.CreateComputeResourcePath,
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
          return r as StrictHttpResponse<ComputeResourceDto>;
        })
      );
  }

  /**
   * Define the basic properties of a compute resource. References to sub-objects (e.g. a compute resource property) can be added via sub-routes (e.g. POST on /compute-resources/{computeResourceId}/compute-resource-properties).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createComputeResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputeResource(params: {
    body: ComputeResourceDto;
  }): Observable<ComputeResourceDto> {
    return this.createComputeResource$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ComputeResourceDto>) =>
          r.body as ComputeResourceDto
      )
    );
  }

  /**
   * Path part for operation getComputeResource
   */
  static readonly GetComputeResourcePath =
    '/compute-resources/{computeResourceId}';

  /**
   * Retrieve a specific compute resource and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResource$Response(params: {
    computeResourceId: string;
  }): Observable<StrictHttpResponse<ComputeResourceDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetComputeResourcePath,
      'get'
    );
    if (params) {
      rb.path('computeResourceId', params.computeResourceId, {});
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
          return r as StrictHttpResponse<ComputeResourceDto>;
        })
      );
  }

  /**
   * Retrieve a specific compute resource and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResource(params: {
    computeResourceId: string;
  }): Observable<ComputeResourceDto> {
    return this.getComputeResource$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ComputeResourceDto>) =>
          r.body as ComputeResourceDto
      )
    );
  }

  /**
   * Path part for operation updateComputeResource
   */
  static readonly UpdateComputeResourcePath =
    '/compute-resources/{computeResourceId}';

  /**
   * Update the basic properties of a compute resource (e.g. name). References to sub-objects (e.g. a compute resource property) are not updated via this operation - use the corresponding sub-route for updating them (e.g. PUT on /compute-resources/{computeResourceId}/compute-resource-properties/{computeResourcePropertyId}).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComputeResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputeResource$Response(params: {
    computeResourceId: string;
    body: ComputeResourceDto;
  }): Observable<StrictHttpResponse<ComputeResourceDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.UpdateComputeResourcePath,
      'put'
    );
    if (params) {
      rb.path('computeResourceId', params.computeResourceId, {});

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
          return r as StrictHttpResponse<ComputeResourceDto>;
        })
      );
  }

  /**
   * Update the basic properties of a compute resource (e.g. name). References to sub-objects (e.g. a compute resource property) are not updated via this operation - use the corresponding sub-route for updating them (e.g. PUT on /compute-resources/{computeResourceId}/compute-resource-properties/{computeResourcePropertyId}).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateComputeResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputeResource(params: {
    computeResourceId: string;
    body: ComputeResourceDto;
  }): Observable<ComputeResourceDto> {
    return this.updateComputeResource$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ComputeResourceDto>) =>
          r.body as ComputeResourceDto
      )
    );
  }

  /**
   * Path part for operation deleteComputeResource
   */
  static readonly DeleteComputeResourcePath =
    '/compute-resources/{computeResourceId}';

  /**
   * Delete a compute resource. This also removes all references to other entities (e.g. software platform).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputeResource$Response(params: {
    computeResourceId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.DeleteComputeResourcePath,
      'delete'
    );
    if (params) {
      rb.path('computeResourceId', params.computeResourceId, {});
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
   * Delete a compute resource. This also removes all references to other entities (e.g. software platform).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteComputeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputeResource(params: {
    computeResourceId: string;
  }): Observable<void> {
    return this.deleteComputeResource$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getCloudServicesOfComputeResource
   */
  static readonly GetCloudServicesOfComputeResourcePath =
    '/compute-resources/{computeResourceId}/cloud-services';

  /**
   * Retrieve referenced cloud services of a compute resource. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCloudServicesOfComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudServicesOfComputeResource$Response(params: {
    computeResourceId: string;

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
  }): Observable<StrictHttpResponse<PageCloudServiceDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetCloudServicesOfComputeResourcePath,
      'get'
    );
    if (params) {
      rb.path('computeResourceId', params.computeResourceId, {});
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
          return r as StrictHttpResponse<PageCloudServiceDto>;
        })
      );
  }

  /**
   * Retrieve referenced cloud services of a compute resource. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCloudServicesOfComputeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudServicesOfComputeResource(params: {
    computeResourceId: string;

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
  }): Observable<PageCloudServiceDto> {
    return this.getCloudServicesOfComputeResource$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageCloudServiceDto>) =>
          r.body as PageCloudServiceDto
      )
    );
  }

  /**
   * Path part for operation getComputeResourcePropertiesOfComputeResource
   */
  static readonly GetComputeResourcePropertiesOfComputeResourcePath =
    '/compute-resources/{computeResourceId}/compute-resource-properties';

  /**
   * Retrieve referenced compute resource properties of a compute resource. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputeResourcePropertiesOfComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcePropertiesOfComputeResource$Response(params: {
    computeResourceId: string;

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
  }): Observable<StrictHttpResponse<PageComputeResourcePropertyDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetComputeResourcePropertiesOfComputeResourcePath,
      'get'
    );
    if (params) {
      rb.path('computeResourceId', params.computeResourceId, {});
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
          return r as StrictHttpResponse<PageComputeResourcePropertyDto>;
        })
      );
  }

  /**
   * Retrieve referenced compute resource properties of a compute resource. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputeResourcePropertiesOfComputeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcePropertiesOfComputeResource(params: {
    computeResourceId: string;

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
  }): Observable<PageComputeResourcePropertyDto> {
    return this.getComputeResourcePropertiesOfComputeResource$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<PageComputeResourcePropertyDto>) =>
          r.body as PageComputeResourcePropertyDto
      )
    );
  }

  /**
   * Path part for operation createComputeResourcePropertyForComputeResource
   */
  static readonly CreateComputeResourcePropertyForComputeResourcePath =
    '/compute-resources/{computeResourceId}/compute-resource-properties';

  /**
   * Add a compute resource property (e.g. a certain number of qubits) that is provided by an compute resource. The compute resource property type has to be already created (e.g. via POST on /compute-resource-property-types). As a result only the ID is required for the compute resource property type, other attributes will be ignored not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createComputeResourcePropertyForComputeResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputeResourcePropertyForComputeResource$Response(params: {
    computeResourceId: string;
    body: ComputeResourcePropertyDto;
  }): Observable<StrictHttpResponse<ComputeResourcePropertyDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.CreateComputeResourcePropertyForComputeResourcePath,
      'post'
    );
    if (params) {
      rb.path('computeResourceId', params.computeResourceId, {});

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
          return r as StrictHttpResponse<ComputeResourcePropertyDto>;
        })
      );
  }

  /**
   * Add a compute resource property (e.g. a certain number of qubits) that is provided by an compute resource. The compute resource property type has to be already created (e.g. via POST on /compute-resource-property-types). As a result only the ID is required for the compute resource property type, other attributes will be ignored not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createComputeResourcePropertyForComputeResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputeResourcePropertyForComputeResource(params: {
    computeResourceId: string;
    body: ComputeResourcePropertyDto;
  }): Observable<ComputeResourcePropertyDto> {
    return this.createComputeResourcePropertyForComputeResource$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<ComputeResourcePropertyDto>) =>
          r.body as ComputeResourcePropertyDto
      )
    );
  }

  /**
   * Path part for operation getComputeResourcePropertyOfComputeResource
   */
  static readonly GetComputeResourcePropertyOfComputeResourcePath =
    '/compute-resources/{computeResourceId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Retrieve a specific compute resource property of an compute resource.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputeResourcePropertyOfComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcePropertyOfComputeResource$Response(params: {
    computeResourceId: string;
    computeResourcePropertyId: string;
  }): Observable<StrictHttpResponse<ComputeResourcePropertyDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetComputeResourcePropertyOfComputeResourcePath,
      'get'
    );
    if (params) {
      rb.path('computeResourceId', params.computeResourceId, {});
      rb.path(
        'computeResourcePropertyId',
        params.computeResourcePropertyId,
        {}
      );
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
          return r as StrictHttpResponse<ComputeResourcePropertyDto>;
        })
      );
  }

  /**
   * Retrieve a specific compute resource property of an compute resource.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputeResourcePropertyOfComputeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcePropertyOfComputeResource(params: {
    computeResourceId: string;
    computeResourcePropertyId: string;
  }): Observable<ComputeResourcePropertyDto> {
    return this.getComputeResourcePropertyOfComputeResource$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<ComputeResourcePropertyDto>) =>
          r.body as ComputeResourcePropertyDto
      )
    );
  }

  /**
   * Path part for operation updateComputeResourcePropertyOfComputeResource
   */
  static readonly UpdateComputeResourcePropertyOfComputeResourcePath =
    '/compute-resources/{computeResourceId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Update a Compute resource property of an compute resource. For the compute resource property type only the ID is required, other compute resource property type attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComputeResourcePropertyOfComputeResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputeResourcePropertyOfComputeResource$Response(params: {
    computeResourceId: string;
    computeResourcePropertyId: string;
    body: ComputeResourcePropertyDto;
  }): Observable<StrictHttpResponse<ComputeResourcePropertyDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.UpdateComputeResourcePropertyOfComputeResourcePath,
      'put'
    );
    if (params) {
      rb.path('computeResourceId', params.computeResourceId, {});
      rb.path(
        'computeResourcePropertyId',
        params.computeResourcePropertyId,
        {}
      );

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
          return r as StrictHttpResponse<ComputeResourcePropertyDto>;
        })
      );
  }

  /**
   * Update a Compute resource property of an compute resource. For the compute resource property type only the ID is required, other compute resource property type attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateComputeResourcePropertyOfComputeResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputeResourcePropertyOfComputeResource(params: {
    computeResourceId: string;
    computeResourcePropertyId: string;
    body: ComputeResourcePropertyDto;
  }): Observable<ComputeResourcePropertyDto> {
    return this.updateComputeResourcePropertyOfComputeResource$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<ComputeResourcePropertyDto>) =>
          r.body as ComputeResourcePropertyDto
      )
    );
  }

  /**
   * Path part for operation deleteComputeResourcePropertyOfComputeResource
   */
  static readonly DeleteComputeResourcePropertyOfComputeResourcePath =
    '/compute-resources/{computeResourceId}/compute-resource-properties/{computeResourcePropertyId}';

  /**
   * Delete a Compute resource property of an compute resource. The compute resource property type is not affected by this.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComputeResourcePropertyOfComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputeResourcePropertyOfComputeResource$Response(params: {
    computeResourceId: string;
    computeResourcePropertyId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.DeleteComputeResourcePropertyOfComputeResourcePath,
      'delete'
    );
    if (params) {
      rb.path('computeResourceId', params.computeResourceId, {});
      rb.path(
        'computeResourcePropertyId',
        params.computeResourcePropertyId,
        {}
      );
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
   * Delete a Compute resource property of an compute resource. The compute resource property type is not affected by this.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteComputeResourcePropertyOfComputeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputeResourcePropertyOfComputeResource(params: {
    computeResourceId: string;
    computeResourcePropertyId: string;
  }): Observable<void> {
    return this.deleteComputeResourcePropertyOfComputeResource$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation getSoftwarePlatformsOfComputeResource
   */
  static readonly GetSoftwarePlatformsOfComputeResourcePath =
    '/compute-resources/{computeResourceId}/software-platforms';

  /**
   * Retrieve referenced software platform of a compute resource. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatformsOfComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformsOfComputeResource$Response(params: {
    computeResourceId: string;

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
  }): Observable<StrictHttpResponse<PageSoftwarePlatformDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetSoftwarePlatformsOfComputeResourcePath,
      'get'
    );
    if (params) {
      rb.path('computeResourceId', params.computeResourceId, {});
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
          return r as StrictHttpResponse<PageSoftwarePlatformDto>;
        })
      );
  }

  /**
   * Retrieve referenced software platform of a compute resource. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoftwarePlatformsOfComputeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformsOfComputeResource(params: {
    computeResourceId: string;

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
  }): Observable<PageSoftwarePlatformDto> {
    return this.getSoftwarePlatformsOfComputeResource$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageSoftwarePlatformDto>) =>
          r.body as PageSoftwarePlatformDto
      )
    );
  }

  /**
   * Path part for operation getSoftwarePlatforms
   */
  static readonly GetSoftwarePlatformsPath = '/software-platforms';

  /**
   * Retrieve all software platforms.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatforms()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatforms$Response(params?: {
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
  }): Observable<StrictHttpResponse<PageSoftwarePlatformDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetSoftwarePlatformsPath,
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
          return r as StrictHttpResponse<PageSoftwarePlatformDto>;
        })
      );
  }

  /**
   * Retrieve all software platforms.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoftwarePlatforms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatforms(params?: {
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
  }): Observable<PageSoftwarePlatformDto> {
    return this.getSoftwarePlatforms$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageSoftwarePlatformDto>) =>
          r.body as PageSoftwarePlatformDto
      )
    );
  }

  /**
   * Path part for operation createSoftwarePlatform
   */
  static readonly CreateSoftwarePlatformPath = '/software-platforms';

  /**
   * Define the basic properties of a software platform. References to sub-objects (e.g. a compute resource) can be added via sub-routes (e.g. via POST on /compute-resources).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createSoftwarePlatform()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSoftwarePlatform$Response(params: {
    body: SoftwarePlatformDto;
  }): Observable<StrictHttpResponse<SoftwarePlatformDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.CreateSoftwarePlatformPath,
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
          return r as StrictHttpResponse<SoftwarePlatformDto>;
        })
      );
  }

  /**
   * Define the basic properties of a software platform. References to sub-objects (e.g. a compute resource) can be added via sub-routes (e.g. via POST on /compute-resources).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createSoftwarePlatform$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSoftwarePlatform(params: {
    body: SoftwarePlatformDto;
  }): Observable<SoftwarePlatformDto> {
    return this.createSoftwarePlatform$Response(params).pipe(
      map(
        (r: StrictHttpResponse<SoftwarePlatformDto>) =>
          r.body as SoftwarePlatformDto
      )
    );
  }

  /**
   * Path part for operation getSoftwarePlatform
   */
  static readonly GetSoftwarePlatformPath =
    '/software-platforms/{softwarePlatformId}';

  /**
   * Retrieve a specific software platform and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatform$Response(params: {
    softwarePlatformId: string;
  }): Observable<StrictHttpResponse<SoftwarePlatformDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetSoftwarePlatformPath,
      'get'
    );
    if (params) {
      rb.path('softwarePlatformId', params.softwarePlatformId, {});
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
          return r as StrictHttpResponse<SoftwarePlatformDto>;
        })
      );
  }

  /**
   * Retrieve a specific software platform and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatform(params: {
    softwarePlatformId: string;
  }): Observable<SoftwarePlatformDto> {
    return this.getSoftwarePlatform$Response(params).pipe(
      map(
        (r: StrictHttpResponse<SoftwarePlatformDto>) =>
          r.body as SoftwarePlatformDto
      )
    );
  }

  /**
   * Path part for operation updateSoftwarePlatform
   */
  static readonly UpdateSoftwarePlatformPath =
    '/software-platforms/{softwarePlatformId}';

  /**
   * Update the basic properties of a software platform (e.g. name). References to sub-objects (e.g. a compute resource) are not updated via this operation - use the corresponding sub-route for updating them (e.g. via PUT on /compute-resources/{computeResourceId}).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSoftwarePlatform()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSoftwarePlatform$Response(params: {
    softwarePlatformId: string;
    body: SoftwarePlatformDto;
  }): Observable<StrictHttpResponse<SoftwarePlatformDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.UpdateSoftwarePlatformPath,
      'put'
    );
    if (params) {
      rb.path('softwarePlatformId', params.softwarePlatformId, {});

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
          return r as StrictHttpResponse<SoftwarePlatformDto>;
        })
      );
  }

  /**
   * Update the basic properties of a software platform (e.g. name). References to sub-objects (e.g. a compute resource) are not updated via this operation - use the corresponding sub-route for updating them (e.g. via PUT on /compute-resources/{computeResourceId}).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSoftwarePlatform$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSoftwarePlatform(params: {
    softwarePlatformId: string;
    body: SoftwarePlatformDto;
  }): Observable<SoftwarePlatformDto> {
    return this.updateSoftwarePlatform$Response(params).pipe(
      map(
        (r: StrictHttpResponse<SoftwarePlatformDto>) =>
          r.body as SoftwarePlatformDto
      )
    );
  }

  /**
   * Path part for operation deleteSoftwarePlatform
   */
  static readonly DeleteSoftwarePlatformPath =
    '/software-platforms/{softwarePlatformId}';

  /**
   * Delete a software platform. This also removes all references to other entities (e.g. compute resource)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSoftwarePlatform$Response(params: {
    softwarePlatformId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.DeleteSoftwarePlatformPath,
      'delete'
    );
    if (params) {
      rb.path('softwarePlatformId', params.softwarePlatformId, {});
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
   * Delete a software platform. This also removes all references to other entities (e.g. compute resource)
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSoftwarePlatform(params: {
    softwarePlatformId: string;
  }): Observable<void> {
    return this.deleteSoftwarePlatform$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getCloudServicesOfSoftwarePlatform
   */
  static readonly GetCloudServicesOfSoftwarePlatformPath =
    '/software-platforms/{softwarePlatformId}/cloud-services';

  /**
   * Retrieve referenced cloud services of a software platform. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCloudServicesOfSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudServicesOfSoftwarePlatform$Response(params: {
    softwarePlatformId: string;

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
  }): Observable<StrictHttpResponse<PageCloudServiceDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetCloudServicesOfSoftwarePlatformPath,
      'get'
    );
    if (params) {
      rb.path('softwarePlatformId', params.softwarePlatformId, {});
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
          return r as StrictHttpResponse<PageCloudServiceDto>;
        })
      );
  }

  /**
   * Retrieve referenced cloud services of a software platform. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCloudServicesOfSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudServicesOfSoftwarePlatform(params: {
    softwarePlatformId: string;

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
  }): Observable<PageCloudServiceDto> {
    return this.getCloudServicesOfSoftwarePlatform$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageCloudServiceDto>) =>
          r.body as PageCloudServiceDto
      )
    );
  }

  /**
   * Path part for operation linkSoftwarePlatformAndCloudService
   */
  static readonly LinkSoftwarePlatformAndCloudServicePath =
    '/software-platforms/{softwarePlatformId}/cloud-services';

  /**
   * Add a reference to an existing cloud service (that was previously created via a POST on e.g. /cloud-services). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkSoftwarePlatformAndCloudService()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkSoftwarePlatformAndCloudService$Response(params: {
    softwarePlatformId: string;
    body: CloudServiceDto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.LinkSoftwarePlatformAndCloudServicePath,
      'post'
    );
    if (params) {
      rb.path('softwarePlatformId', params.softwarePlatformId, {});

      rb.body(params.body, 'application/json');
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
   * Add a reference to an existing cloud service (that was previously created via a POST on e.g. /cloud-services). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkSoftwarePlatformAndCloudService$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkSoftwarePlatformAndCloudService(params: {
    softwarePlatformId: string;
    body: CloudServiceDto;
  }): Observable<void> {
    return this.linkSoftwarePlatformAndCloudService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation unlinkSoftwarePlatformAndCloudService
   */
  static readonly UnlinkSoftwarePlatformAndCloudServicePath =
    '/software-platforms/{softwarePlatformId}/cloud-services/{cloudServiceId}';

  /**
   * Delete a reference to a {object} of an {object}. The reference has to be previously created via a POST on /software-platforms/{softwarePlatformId}/cloud-services).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlinkSoftwarePlatformAndCloudService()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkSoftwarePlatformAndCloudService$Response(params: {
    softwarePlatformId: string;
    cloudServiceId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.UnlinkSoftwarePlatformAndCloudServicePath,
      'delete'
    );
    if (params) {
      rb.path('softwarePlatformId', params.softwarePlatformId, {});
      rb.path('cloudServiceId', params.cloudServiceId, {});
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
   * Delete a reference to a {object} of an {object}. The reference has to be previously created via a POST on /software-platforms/{softwarePlatformId}/cloud-services).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unlinkSoftwarePlatformAndCloudService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkSoftwarePlatformAndCloudService(params: {
    softwarePlatformId: string;
    cloudServiceId: string;
  }): Observable<void> {
    return this.unlinkSoftwarePlatformAndCloudService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getComputeResourcesOfSoftwarePlatform
   */
  static readonly GetComputeResourcesOfSoftwarePlatformPath =
    '/software-platforms/{softwarePlatformId}/compute-resources';

  /**
   * Retrieve referenced compute resources for a software platform. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputeResourcesOfSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcesOfSoftwarePlatform$Response(params: {
    softwarePlatformId: string;

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
  }): Observable<StrictHttpResponse<PageComputeResourceDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetComputeResourcesOfSoftwarePlatformPath,
      'get'
    );
    if (params) {
      rb.path('softwarePlatformId', params.softwarePlatformId, {});
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
          return r as StrictHttpResponse<PageComputeResourceDto>;
        })
      );
  }

  /**
   * Retrieve referenced compute resources for a software platform. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputeResourcesOfSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcesOfSoftwarePlatform(params: {
    softwarePlatformId: string;

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
  }): Observable<PageComputeResourceDto> {
    return this.getComputeResourcesOfSoftwarePlatform$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageComputeResourceDto>) =>
          r.body as PageComputeResourceDto
      )
    );
  }

  /**
   * Path part for operation linkSoftwarePlatformAndComputeResource
   */
  static readonly LinkSoftwarePlatformAndComputeResourcePath =
    '/software-platforms/{softwarePlatformId}/compute-resources';

  /**
   * Add a reference to an existing compute resource (that was previously created via a POST on e.g. /compute-resources). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkSoftwarePlatformAndComputeResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkSoftwarePlatformAndComputeResource$Response(params: {
    softwarePlatformId: string;
    body: ComputeResourceDto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.LinkSoftwarePlatformAndComputeResourcePath,
      'post'
    );
    if (params) {
      rb.path('softwarePlatformId', params.softwarePlatformId, {});

      rb.body(params.body, 'application/json');
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
   * Add a reference to an existing compute resource (that was previously created via a POST on e.g. /compute-resources). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkSoftwarePlatformAndComputeResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkSoftwarePlatformAndComputeResource(params: {
    softwarePlatformId: string;
    body: ComputeResourceDto;
  }): Observable<void> {
    return this.linkSoftwarePlatformAndComputeResource$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation unlinkSoftwarePlatformAndComputeResource
   */
  static readonly UnlinkSoftwarePlatformAndComputeResourcePath =
    '/software-platforms/{softwarePlatformId}/compute-resources/{computeResourceId}';

  /**
   * Delete a reference to a {object} of an {object}. The reference has to be previously created via a POST on /software-platforms/{softwarePlatformId}/compute-resources).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlinkSoftwarePlatformAndComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkSoftwarePlatformAndComputeResource$Response(params: {
    softwarePlatformId: string;
    computeResourceId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.UnlinkSoftwarePlatformAndComputeResourcePath,
      'delete'
    );
    if (params) {
      rb.path('softwarePlatformId', params.softwarePlatformId, {});
      rb.path('computeResourceId', params.computeResourceId, {});
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
   * Delete a reference to a {object} of an {object}. The reference has to be previously created via a POST on /software-platforms/{softwarePlatformId}/compute-resources).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unlinkSoftwarePlatformAndComputeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkSoftwarePlatformAndComputeResource(params: {
    softwarePlatformId: string;
    computeResourceId: string;
  }): Observable<void> {
    return this.unlinkSoftwarePlatformAndComputeResource$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getImplementationsOfSoftwarePlatform
   */
  static readonly GetImplementationsOfSoftwarePlatformPath =
    '/software-platforms/{softwarePlatformId}/implementations';

  /**
   * Get a specific implementations of a software platform. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationsOfSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfSoftwarePlatform$Response(params: {
    softwarePlatformId: string;

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
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetImplementationsOfSoftwarePlatformPath,
      'get'
    );
    if (params) {
      rb.path('softwarePlatformId', params.softwarePlatformId, {});
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
          return r as StrictHttpResponse<PageImplementationDto>;
        })
      );
  }

  /**
   * Get a specific implementations of a software platform. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationsOfSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsOfSoftwarePlatform(params: {
    softwarePlatformId: string;

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
    return this.getImplementationsOfSoftwarePlatform$Response(params).pipe(
      map(
        (r: StrictHttpResponse<PageImplementationDto>) =>
          r.body as PageImplementationDto
      )
    );
  }

  /**
   * Path part for operation linkSoftwarePlatformAndImplementation
   */
  static readonly LinkSoftwarePlatformAndImplementationPath =
    '/software-platforms/{softwarePlatformId}/implementations';

  /**
   * Add a reference to an existing implementation (that was previously created via a POST on e.g. /algorithms/{algorithmId}/ implementations). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkSoftwarePlatformAndImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkSoftwarePlatformAndImplementation$Response(params: {
    softwarePlatformId: string;
    body: ImplementationDto;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.LinkSoftwarePlatformAndImplementationPath,
      'post'
    );
    if (params) {
      rb.path('softwarePlatformId', params.softwarePlatformId, {});

      rb.body(params.body, 'application/json');
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
   * Add a reference to an existing implementation (that was previously created via a POST on e.g. /algorithms/{algorithmId}/ implementations). Only the ID is required in the request body, other attributes will be ignored and not changed.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkSoftwarePlatformAndImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  linkSoftwarePlatformAndImplementation(params: {
    softwarePlatformId: string;
    body: ImplementationDto;
  }): Observable<void> {
    return this.linkSoftwarePlatformAndImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getImplementationOfSoftwarePlatform
   */
  static readonly GetImplementationOfSoftwarePlatformPath =
    '/software-platforms/{softwarePlatformId}/implementations/{implementationId}';

  /**
   * Retrieve a specific implementation of a software platform. If none are found an empty list is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationOfSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationOfSoftwarePlatform$Response(params: {
    softwarePlatformId: string;
    implementationId: string;
  }): Observable<StrictHttpResponse<ImplementationDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetImplementationOfSoftwarePlatformPath,
      'get'
    );
    if (params) {
      rb.path('softwarePlatformId', params.softwarePlatformId, {});
      rb.path('implementationId', params.implementationId, {});
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
          return r as StrictHttpResponse<ImplementationDto>;
        })
      );
  }

  /**
   * Retrieve a specific implementation of a software platform. If none are found an empty list is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationOfSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationOfSoftwarePlatform(params: {
    softwarePlatformId: string;
    implementationId: string;
  }): Observable<ImplementationDto> {
    return this.getImplementationOfSoftwarePlatform$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ImplementationDto>) =>
          r.body as ImplementationDto
      )
    );
  }

  /**
   * Path part for operation unlinkSoftwarePlatformAndImplementation
   */
  static readonly UnlinkSoftwarePlatformAndImplementationPath =
    '/software-platforms/{softwarePlatformId}/implementations/{implementationId}';

  /**
   * Delete a reference to a implementation of an software platform. The reference has to be previously created via a POST on /software-platforms/{softwarePlatformId}/implementations).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlinkSoftwarePlatformAndImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkSoftwarePlatformAndImplementation$Response(params: {
    implementationId: string;
    softwarePlatformId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.UnlinkSoftwarePlatformAndImplementationPath,
      'delete'
    );
    if (params) {
      rb.path('implementationId', params.implementationId, {});
      rb.path('softwarePlatformId', params.softwarePlatformId, {});
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
   * Delete a reference to a implementation of an software platform. The reference has to be previously created via a POST on /software-platforms/{softwarePlatformId}/implementations).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unlinkSoftwarePlatformAndImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlinkSoftwarePlatformAndImplementation(params: {
    implementationId: string;
    softwarePlatformId: string;
  }): Observable<void> {
    return this.unlinkSoftwarePlatformAndImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
