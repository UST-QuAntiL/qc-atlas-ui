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
import { ComputeResourcePropertyTypeDto } from '../models/compute-resource-property-type-dto';
import { EntityModelCloudServiceDto } from '../models/entity-model-cloud-service-dto';
import { EntityModelComputeResourceDto } from '../models/entity-model-compute-resource-dto';
import { EntityModelComputeResourcePropertyDto } from '../models/entity-model-compute-resource-property-dto';
import { EntityModelImplementationDto } from '../models/entity-model-implementation-dto';
import { EntityModelSoftwarePlatformDto } from '../models/entity-model-software-platform-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';
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
  static readonly GetCloudServicesPath = '/v1/cloud-services';

  /**
   * Retrieve all cloud services
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
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
      page?: PageMetadata;
    }>
  > {
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
          return r as StrictHttpResponse<{
            _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Retrieve all cloud services
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
  }): Observable<{
    _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
    page?: PageMetadata;
  }> {
    return this.getCloudServices$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation createCloudService
   */
  static readonly CreateCloudServicePath = '/v1/cloud-services';

  /**
   * Define the basic properties of a cloud service. References to sub-objects (e.g. a compute resource) can be added via sub-routes (e.g. /cloud-services/{id}/compute-resources). Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCloudService()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCloudService$Response(params: {
    body: CloudServiceDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      provider?: string;
      url?: string;
      description?: string;
      costModel?: string;
      _links?: Array<Link>;
    }>
  > {
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
          return r as StrictHttpResponse<{
            id?: string;
            name: string;
            provider?: string;
            url?: string;
            description?: string;
            costModel?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Define the basic properties of a cloud service. References to sub-objects (e.g. a compute resource) can be added via sub-routes (e.g. /cloud-services/{id}/compute-resources). Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createCloudService$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCloudService(params: {
    body: CloudServiceDto;
  }): Observable<{
    id?: string;
    name: string;
    provider?: string;
    url?: string;
    description?: string;
    costModel?: string;
    _links?: Array<Link>;
  }> {
    return this.createCloudService$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            provider?: string;
            url?: string;
            description?: string;
            costModel?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            provider?: string;
            url?: string;
            description?: string;
            costModel?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation getCloudService
   */
  static readonly GetCloudServicePath = '/v1/cloud-services/{id}';

  /**
   * Retrieve a specific cloud service and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCloudService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudService$Response(params: {
    id: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      provider?: string;
      url?: string;
      description?: string;
      costModel?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetCloudServicePath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<{
            id?: string;
            name: string;
            provider?: string;
            url?: string;
            description?: string;
            costModel?: string;
            _links?: Array<Link>;
          }>;
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
    id: string;
  }): Observable<{
    id?: string;
    name: string;
    provider?: string;
    url?: string;
    description?: string;
    costModel?: string;
    _links?: Array<Link>;
  }> {
    return this.getCloudService$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            provider?: string;
            url?: string;
            description?: string;
            costModel?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            provider?: string;
            url?: string;
            description?: string;
            costModel?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updateCloudService
   */
  static readonly UpdateCloudServicePath = '/v1/cloud-services/{id}';

  /**
   * Update the basic properties of a cloud service (e.g. name). References to sub-objects (e.g. a compute resource) are not updated via this operation - use the corresponding sub-route for updating them (e.g. /cloud-services/{id}/compute-resources). Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCloudService()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCloudService$Response(params: {
    id: string;
    body: CloudServiceDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      provider?: string;
      url?: string;
      description?: string;
      costModel?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.UpdateCloudServicePath,
      'put'
    );
    if (params) {
      rb.path('id', params.id, {});

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
          return r as StrictHttpResponse<{
            id?: string;
            name: string;
            provider?: string;
            url?: string;
            description?: string;
            costModel?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Update the basic properties of a cloud service (e.g. name). References to sub-objects (e.g. a compute resource) are not updated via this operation - use the corresponding sub-route for updating them (e.g. /cloud-services/{id}/compute-resources). Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCloudService$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCloudService(params: {
    id: string;
    body: CloudServiceDto;
  }): Observable<{
    id?: string;
    name: string;
    provider?: string;
    url?: string;
    description?: string;
    costModel?: string;
    _links?: Array<Link>;
  }> {
    return this.updateCloudService$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            provider?: string;
            url?: string;
            description?: string;
            costModel?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            provider?: string;
            url?: string;
            description?: string;
            costModel?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deleteCloudService
   */
  static readonly DeleteCloudServicePath = '/v1/cloud-services/{id}';

  /**
   * Delete a cloud service. This also removes all references to other entities (e.g. compute resource)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCloudService()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCloudService$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.DeleteCloudServicePath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
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
   * Delete a cloud service. This also removes all references to other entities (e.g. compute resource)
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteCloudService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCloudService(params: { id: string }): Observable<void> {
    return this.deleteCloudService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getComputeResourcesForCloudService
   */
  static readonly GetComputeResourcesForCloudServicePath =
    '/v1/cloud-services/{id}/compute-resources';

  /**
   * Get referenced compute resources for a software platform.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputeResourcesForCloudService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcesForCloudService$Response(params: {
    id: string;

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
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { computeResources?: Array<EntityModelComputeResourceDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetComputeResourcesForCloudServicePath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<{
            _embedded?: {
              computeResources?: Array<EntityModelComputeResourceDto>;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Get referenced compute resources for a software platform.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputeResourcesForCloudService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcesForCloudService(params: {
    id: string;

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
  }): Observable<{
    _embedded?: { computeResources?: Array<EntityModelComputeResourceDto> };
    page?: PageMetadata;
  }> {
    return this.getComputeResourcesForCloudService$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              computeResources?: Array<EntityModelComputeResourceDto>;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              computeResources?: Array<EntityModelComputeResourceDto>;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation addComputeResourceReferenceToCloudService
   */
  static readonly AddComputeResourceReferenceToCloudServicePath =
    '/v1/cloud-services/{id}/compute-resources/{crId}';

  /**
   * Add a reference to an existing compute resource (that was previously created via a POST on /compute-resources/). Custom ID will be ignored. For the compute resource only the ID is required, other compute resource attributes will not change. If the compute resource doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addComputeResourceReferenceToCloudService()` instead.
   *
   * This method doesn't expect any request body.
   */
  addComputeResourceReferenceToCloudService$Response(params: {
    id: string;
    crId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.AddComputeResourceReferenceToCloudServicePath,
      'post'
    );
    if (params) {
      rb.path('id', params.id, {});
      rb.path('crId', params.crId, {});
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
   * Add a reference to an existing compute resource (that was previously created via a POST on /compute-resources/). Custom ID will be ignored. For the compute resource only the ID is required, other compute resource attributes will not change. If the compute resource doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addComputeResourceReferenceToCloudService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addComputeResourceReferenceToCloudService(params: {
    id: string;
    crId: string;
  }): Observable<void> {
    return this.addComputeResourceReferenceToCloudService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteComputeResourceReferenceFromCloudService
   */
  static readonly DeleteComputeResourceReferenceFromCloudServicePath =
    '/v1/cloud-services/{id}/compute-resources/{crId}';

  /**
   * Get a specific referenced compute resource of a cloud service.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComputeResourceReferenceFromCloudService()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputeResourceReferenceFromCloudService$Response(params: {
    id: string;
    crId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.DeleteComputeResourceReferenceFromCloudServicePath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
      rb.path('crId', params.crId, {});
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
   * Get a specific referenced compute resource of a cloud service.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteComputeResourceReferenceFromCloudService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputeResourceReferenceFromCloudService(params: {
    id: string;
    crId: string;
  }): Observable<void> {
    return this.deleteComputeResourceReferenceFromCloudService$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation getSoftwarePlatformsForCloudService
   */
  static readonly GetSoftwarePlatformsForCloudServicePath =
    '/v1/cloud-services/{id}/software-platforms';

  /**
   * Get referenced software platform for a  cloud service
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatformsForCloudService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformsForCloudService$Response(params: {
    id: string;

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
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetSoftwarePlatformsForCloudServicePath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<{
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
          }>;
        })
      );
  }

  /**
   * Get referenced software platform for a  cloud service
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoftwarePlatformsForCloudService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformsForCloudService(params: {
    id: string;

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
  }): Observable<{
    _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
  }> {
    return this.getSoftwarePlatformsForCloudService$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
          }>
        ) =>
          r.body as {
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
          }
      )
    );
  }

  /**
   * Path part for operation getComputeResources
   */
  static readonly GetComputeResourcesPath = '/v1/compute-resources';

  /**
   * Retrieve all compute resources
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
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { computeResources?: Array<EntityModelComputeResourceDto> };
      page?: PageMetadata;
    }>
  > {
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
          return r as StrictHttpResponse<{
            _embedded?: {
              computeResources?: Array<EntityModelComputeResourceDto>;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Retrieve all compute resources
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
  }): Observable<{
    _embedded?: { computeResources?: Array<EntityModelComputeResourceDto> };
    page?: PageMetadata;
  }> {
    return this.getComputeResources$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              computeResources?: Array<EntityModelComputeResourceDto>;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              computeResources?: Array<EntityModelComputeResourceDto>;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation createComputeResource
   */
  static readonly CreateComputeResourcePath = '/v1/compute-resources';

  /**
   * Define the basic properties of a compute resource. References to sub-objects (e.g. a compute resource property) can be added via sub-routes (e.g. /compute-resources/{id}/compute-resource-properties). Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createComputeResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputeResource$Response(params: {
    body: ComputeResourceDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      vendor?: string;
      technology?: string;
      quantumComputationModel?:
        | 'GATE_BASED'
        | 'MEASUREMENT_BASED'
        | 'QUANTUM_ANNEALING';
      _links?: Array<Link>;
    }>
  > {
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
          return r as StrictHttpResponse<{
            id?: string;
            name: string;
            vendor?: string;
            technology?: string;
            quantumComputationModel?:
              | 'GATE_BASED'
              | 'MEASUREMENT_BASED'
              | 'QUANTUM_ANNEALING';
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Define the basic properties of a compute resource. References to sub-objects (e.g. a compute resource property) can be added via sub-routes (e.g. /compute-resources/{id}/compute-resource-properties). Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createComputeResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputeResource(params: {
    body: ComputeResourceDto;
  }): Observable<{
    id?: string;
    name: string;
    vendor?: string;
    technology?: string;
    quantumComputationModel?:
      | 'GATE_BASED'
      | 'MEASUREMENT_BASED'
      | 'QUANTUM_ANNEALING';
    _links?: Array<Link>;
  }> {
    return this.createComputeResource$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            vendor?: string;
            technology?: string;
            quantumComputationModel?:
              | 'GATE_BASED'
              | 'MEASUREMENT_BASED'
              | 'QUANTUM_ANNEALING';
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            vendor?: string;
            technology?: string;
            quantumComputationModel?:
              | 'GATE_BASED'
              | 'MEASUREMENT_BASED'
              | 'QUANTUM_ANNEALING';
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updateComputingResourceResourcePropertyOfComputeResource
   */
  static readonly UpdateComputingResourceResourcePropertyOfComputeResourcePath =
    '/v1/compute-resources/{crid}/compute-resource-properties/{resourceId}';

  /**
   * Update a computing resource of the algorithm. Custom ID will be ignored.For computing resource type only ID is required, other computing resource type attributes will not change.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComputingResourceResourcePropertyOfComputeResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputingResourceResourcePropertyOfComputeResource$Response(params: {
    crid: string;
    resourceId: string;
    body: ComputeResourcePropertyDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      value?: string;
      type: ComputeResourcePropertyTypeDto;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.UpdateComputingResourceResourcePropertyOfComputeResourcePath,
      'put'
    );
    if (params) {
      rb.path('crid', params.crid, {});
      rb.path('resourceId', params.resourceId, {});

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
          return r as StrictHttpResponse<{
            id?: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Update a computing resource of the algorithm. Custom ID will be ignored.For computing resource type only ID is required, other computing resource type attributes will not change.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateComputingResourceResourcePropertyOfComputeResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputingResourceResourcePropertyOfComputeResource(params: {
    crid: string;
    resourceId: string;
    body: ComputeResourcePropertyDto;
  }): Observable<{
    id?: string;
    value?: string;
    type: ComputeResourcePropertyTypeDto;
    _links?: Array<Link>;
  }> {
    return this.updateComputingResourceResourcePropertyOfComputeResource$Response(
      params
    ).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            value?: string;
            type: ComputeResourcePropertyTypeDto;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deleteComputingResourcePropertyFromComputeResource
   */
  static readonly DeleteComputingResourcePropertyFromComputeResourcePath =
    '/v1/compute-resources/{crid}/compute-resource-properties/{resourceId}';

  /**
   * Delete a computing resource of the algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComputingResourcePropertyFromComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputingResourcePropertyFromComputeResource$Response(params: {
    crid: string;
    resourceId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.DeleteComputingResourcePropertyFromComputeResourcePath,
      'delete'
    );
    if (params) {
      rb.path('crid', params.crid, {});
      rb.path('resourceId', params.resourceId, {});
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
   * Delete a computing resource of the algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteComputingResourcePropertyFromComputeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputingResourcePropertyFromComputeResource(params: {
    crid: string;
    resourceId: string;
  }): Observable<void> {
    return this.deleteComputingResourcePropertyFromComputeResource$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation getComputeResource
   */
  static readonly GetComputeResourcePath = '/v1/compute-resources/{id}';

  /**
   * Retrieve a specific compute resource and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResource$Response(params: {
    id: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      vendor?: string;
      technology?: string;
      quantumComputationModel?:
        | 'GATE_BASED'
        | 'MEASUREMENT_BASED'
        | 'QUANTUM_ANNEALING';
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetComputeResourcePath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<{
            id?: string;
            name: string;
            vendor?: string;
            technology?: string;
            quantumComputationModel?:
              | 'GATE_BASED'
              | 'MEASUREMENT_BASED'
              | 'QUANTUM_ANNEALING';
            _links?: Array<Link>;
          }>;
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
    id: string;
  }): Observable<{
    id?: string;
    name: string;
    vendor?: string;
    technology?: string;
    quantumComputationModel?:
      | 'GATE_BASED'
      | 'MEASUREMENT_BASED'
      | 'QUANTUM_ANNEALING';
    _links?: Array<Link>;
  }> {
    return this.getComputeResource$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            vendor?: string;
            technology?: string;
            quantumComputationModel?:
              | 'GATE_BASED'
              | 'MEASUREMENT_BASED'
              | 'QUANTUM_ANNEALING';
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            vendor?: string;
            technology?: string;
            quantumComputationModel?:
              | 'GATE_BASED'
              | 'MEASUREMENT_BASED'
              | 'QUANTUM_ANNEALING';
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updateComputeResource
   */
  static readonly UpdateComputeResourcePath = '/v1/compute-resources/{id}';

  /**
   * Update the basic properties of a compute resource (e.g. name). References to sub-objects (e.g. a compute resource property) are not updated via this operation - use the corresponding sub-route for updating them (e.g. /compute-resources/{id}/compute-resource-properties). Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComputeResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputeResource$Response(params: {
    id: string;
    body: ComputeResourceDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      vendor?: string;
      technology?: string;
      quantumComputationModel?:
        | 'GATE_BASED'
        | 'MEASUREMENT_BASED'
        | 'QUANTUM_ANNEALING';
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.UpdateComputeResourcePath,
      'put'
    );
    if (params) {
      rb.path('id', params.id, {});

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
          return r as StrictHttpResponse<{
            id?: string;
            name: string;
            vendor?: string;
            technology?: string;
            quantumComputationModel?:
              | 'GATE_BASED'
              | 'MEASUREMENT_BASED'
              | 'QUANTUM_ANNEALING';
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Update the basic properties of a compute resource (e.g. name). References to sub-objects (e.g. a compute resource property) are not updated via this operation - use the corresponding sub-route for updating them (e.g. /compute-resources/{id}/compute-resource-properties). Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateComputeResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputeResource(params: {
    id: string;
    body: ComputeResourceDto;
  }): Observable<{
    id?: string;
    name: string;
    vendor?: string;
    technology?: string;
    quantumComputationModel?:
      | 'GATE_BASED'
      | 'MEASUREMENT_BASED'
      | 'QUANTUM_ANNEALING';
    _links?: Array<Link>;
  }> {
    return this.updateComputeResource$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            vendor?: string;
            technology?: string;
            quantumComputationModel?:
              | 'GATE_BASED'
              | 'MEASUREMENT_BASED'
              | 'QUANTUM_ANNEALING';
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            vendor?: string;
            technology?: string;
            quantumComputationModel?:
              | 'GATE_BASED'
              | 'MEASUREMENT_BASED'
              | 'QUANTUM_ANNEALING';
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deleteComputeResource
   */
  static readonly DeleteComputeResourcePath = '/v1/compute-resources/{id}';

  /**
   * Delete a compute resource. This also removes all references to other entities (e.g. software platform)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputeResource$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.DeleteComputeResourcePath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
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
   * Delete a compute resource. This also removes all references to other entities (e.g. software platform)
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteComputeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputeResource(params: { id: string }): Observable<void> {
    return this.deleteComputeResource$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getCloudServicesForComputeResource
   */
  static readonly GetCloudServicesForComputeResourcePath =
    '/v1/compute-resources/{id}/cloud-services';

  /**
   * Get referenced cloud services for a compute resource
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCloudServicesForComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudServicesForComputeResource$Response(params: {
    id: string;

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
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetCloudServicesForComputeResourcePath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<{
            _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
          }>;
        })
      );
  }

  /**
   * Get referenced cloud services for a compute resource
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCloudServicesForComputeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudServicesForComputeResource(params: {
    id: string;

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
  }): Observable<{
    _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
  }> {
    return this.getCloudServicesForComputeResource$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
          }>
        ) =>
          r.body as {
            _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
          }
      )
    );
  }

  /**
   * Path part for operation getComputingResourcePropertiesForComputeResource
   */
  static readonly GetComputingResourcePropertiesForComputeResourcePath =
    '/v1/compute-resources/{id}/compute-resource-properties';

  /**
   * Get referenced compute resource properties for a compute resource.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputingResourcePropertiesForComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResourcePropertiesForComputeResource$Response(params: {
    id: string;

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
  }): Observable<
    StrictHttpResponse<{
      _embedded?: {
        computeResourceProperties?: Array<
          EntityModelComputeResourcePropertyDto
        >;
      };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetComputingResourcePropertiesForComputeResourcePath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<{
            _embedded?: {
              computeResourceProperties?: Array<
                EntityModelComputeResourcePropertyDto
              >;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Get referenced compute resource properties for a compute resource.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputingResourcePropertiesForComputeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResourcePropertiesForComputeResource(params: {
    id: string;

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
  }): Observable<{
    _embedded?: {
      computeResourceProperties?: Array<EntityModelComputeResourcePropertyDto>;
    };
    page?: PageMetadata;
  }> {
    return this.getComputingResourcePropertiesForComputeResource$Response(
      params
    ).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              computeResourceProperties?: Array<
                EntityModelComputeResourcePropertyDto
              >;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              computeResourceProperties?: Array<
                EntityModelComputeResourcePropertyDto
              >;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation addComputingResourcePropertyToComputeResource
   */
  static readonly AddComputingResourcePropertyToComputeResourcePath =
    '/v1/compute-resources/{id}/compute-resource-properties';

  /**
   * Define the basic properties of a compute resource property and add a reference to the defined compute resource property. Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addComputingResourcePropertyToComputeResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addComputingResourcePropertyToComputeResource$Response(params: {
    id: string;
    body: ComputeResourcePropertyDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      vendor?: string;
      technology?: string;
      quantumComputationModel?:
        | 'GATE_BASED'
        | 'MEASUREMENT_BASED'
        | 'QUANTUM_ANNEALING';
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.AddComputingResourcePropertyToComputeResourcePath,
      'post'
    );
    if (params) {
      rb.path('id', params.id, {});

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
          return r as StrictHttpResponse<{
            id?: string;
            name: string;
            vendor?: string;
            technology?: string;
            quantumComputationModel?:
              | 'GATE_BASED'
              | 'MEASUREMENT_BASED'
              | 'QUANTUM_ANNEALING';
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Define the basic properties of a compute resource property and add a reference to the defined compute resource property. Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addComputingResourcePropertyToComputeResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addComputingResourcePropertyToComputeResource(params: {
    id: string;
    body: ComputeResourcePropertyDto;
  }): Observable<{
    id?: string;
    name: string;
    vendor?: string;
    technology?: string;
    quantumComputationModel?:
      | 'GATE_BASED'
      | 'MEASUREMENT_BASED'
      | 'QUANTUM_ANNEALING';
    _links?: Array<Link>;
  }> {
    return this.addComputingResourcePropertyToComputeResource$Response(
      params
    ).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            vendor?: string;
            technology?: string;
            quantumComputationModel?:
              | 'GATE_BASED'
              | 'MEASUREMENT_BASED'
              | 'QUANTUM_ANNEALING';
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            vendor?: string;
            technology?: string;
            quantumComputationModel?:
              | 'GATE_BASED'
              | 'MEASUREMENT_BASED'
              | 'QUANTUM_ANNEALING';
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation getSoftwarePlatformsForComputeResource
   */
  static readonly GetSoftwarePlatformsForComputeResourcePath =
    '/v1/compute-resources/{id}/software-platforms';

  /**
   * Get referenced software platform for a compute resource
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatformsForComputeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformsForComputeResource$Response(params: {
    id: string;

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
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetSoftwarePlatformsForComputeResourcePath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<{
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
          }>;
        })
      );
  }

  /**
   * Get referenced software platform for a compute resource
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoftwarePlatformsForComputeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatformsForComputeResource(params: {
    id: string;

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
  }): Observable<{
    _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
  }> {
    return this.getSoftwarePlatformsForComputeResource$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
          }>
        ) =>
          r.body as {
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
          }
      )
    );
  }

  /**
   * Path part for operation getSoftwarePlatforms
   */
  static readonly GetSoftwarePlatformsPath = '/v1/software-platforms';

  /**
   * Retrieve all software platforms
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
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
      page?: PageMetadata;
    }>
  > {
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
          return r as StrictHttpResponse<{
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Retrieve all software platforms
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
  }): Observable<{
    _embedded?: { softwarePlatforms?: Array<EntityModelSoftwarePlatformDto> };
    page?: PageMetadata;
  }> {
    return this.getSoftwarePlatforms$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              softwarePlatforms?: Array<EntityModelSoftwarePlatformDto>;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation createSoftwarePlatform
   */
  static readonly CreateSoftwarePlatformPath = '/v1/software-platforms';

  /**
   * Define the basic properties of a software platform. References to sub-objects (e.g. a compute resource) can be added via sub-routes (e.g. /software-platforms/{id}/compute-resources). Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createSoftwarePlatform()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSoftwarePlatform$Response(params: {
    body: SoftwarePlatformDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      link?: string;
      licence?: string;
      version?: string;
      _links?: Array<Link>;
    }>
  > {
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
          return r as StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            licence?: string;
            version?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Define the basic properties of a software platform. References to sub-objects (e.g. a compute resource) can be added via sub-routes (e.g. /software-platforms/{id}/compute-resources). Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createSoftwarePlatform$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSoftwarePlatform(params: {
    body: SoftwarePlatformDto;
  }): Observable<{
    id?: string;
    name: string;
    link?: string;
    licence?: string;
    version?: string;
    _links?: Array<Link>;
  }> {
    return this.createSoftwarePlatform$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            licence?: string;
            version?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            link?: string;
            licence?: string;
            version?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation getSoftwarePlatform
   */
  static readonly GetSoftwarePlatformPath = '/v1/software-platforms/{id}';

  /**
   * Retrieve a specific software platform and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoftwarePlatform$Response(params: {
    id: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      link?: string;
      licence?: string;
      version?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetSoftwarePlatformPath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            licence?: string;
            version?: string;
            _links?: Array<Link>;
          }>;
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
    id: string;
  }): Observable<{
    id?: string;
    name: string;
    link?: string;
    licence?: string;
    version?: string;
    _links?: Array<Link>;
  }> {
    return this.getSoftwarePlatform$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            licence?: string;
            version?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            link?: string;
            licence?: string;
            version?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation updateSoftwarePlatform
   */
  static readonly UpdateSoftwarePlatformPath = '/v1/software-platforms/{id}';

  /**
   * Update the basic properties of a software platform (e.g. name). References to sub-objects (e.g. a compute resource) are not updated via this operation - use the corresponding sub-route for updating them (e.g. /software-platforms/{id}/compute-resources). Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSoftwarePlatform()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSoftwarePlatform$Response(params: {
    id: string;
    body: SoftwarePlatformDto;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      link?: string;
      licence?: string;
      version?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.UpdateSoftwarePlatformPath,
      'put'
    );
    if (params) {
      rb.path('id', params.id, {});

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
          return r as StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            licence?: string;
            version?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Update the basic properties of a software platform (e.g. name). References to sub-objects (e.g. a compute resource) are not updated via this operation - use the corresponding sub-route for updating them (e.g. /software-platforms/{id}/compute-resources). Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSoftwarePlatform$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSoftwarePlatform(params: {
    id: string;
    body: SoftwarePlatformDto;
  }): Observable<{
    id?: string;
    name: string;
    link?: string;
    licence?: string;
    version?: string;
    _links?: Array<Link>;
  }> {
    return this.updateSoftwarePlatform$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            licence?: string;
            version?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            link?: string;
            licence?: string;
            version?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation deleteSoftwarePlatform
   */
  static readonly DeleteSoftwarePlatformPath = '/v1/software-platforms/{id}';

  /**
   * Delete a software platform. This also removes all references to other entities (e.g. compute resource)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSoftwarePlatform$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.DeleteSoftwarePlatformPath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
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
  deleteSoftwarePlatform(params: { id: string }): Observable<void> {
    return this.deleteSoftwarePlatform$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getCloudServicesForSoftwarePlatform
   */
  static readonly GetCloudServicesForSoftwarePlatformPath =
    '/v1/software-platforms/{id}/cloud-services';

  /**
   * Get referenced cloud services for a software platform.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCloudServicesForSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudServicesForSoftwarePlatform$Response(params: {
    id: string;

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
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetCloudServicesForSoftwarePlatformPath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<{
            _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Get referenced cloud services for a software platform.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCloudServicesForSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCloudServicesForSoftwarePlatform(params: {
    id: string;

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
  }): Observable<{
    _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
    page?: PageMetadata;
  }> {
    return this.getCloudServicesForSoftwarePlatform$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: { cloudServices?: Array<EntityModelCloudServiceDto> };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation addCloudServiceReferenceToSoftwarePlatform
   */
  static readonly AddCloudServiceReferenceToSoftwarePlatformPath =
    '/v1/software-platforms/{id}/cloud-services/{csId}';

  /**
   * Add a reference to an existing cloud service (that was previously created via a POST on /cloud-services/). Custom ID will be ignored. For the cloud service only the ID is required, other cloud service attributes will not change. If the cloud service doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCloudServiceReferenceToSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  addCloudServiceReferenceToSoftwarePlatform$Response(params: {
    id: string;
    csId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.AddCloudServiceReferenceToSoftwarePlatformPath,
      'post'
    );
    if (params) {
      rb.path('id', params.id, {});
      rb.path('csId', params.csId, {});
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
   * Add a reference to an existing cloud service (that was previously created via a POST on /cloud-services/). Custom ID will be ignored. For the cloud service only the ID is required, other cloud service attributes will not change. If the cloud service doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addCloudServiceReferenceToSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addCloudServiceReferenceToSoftwarePlatform(params: {
    id: string;
    csId: string;
  }): Observable<void> {
    return this.addCloudServiceReferenceToSoftwarePlatform$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation deleteCloudServiceReferenceFromSoftwarePlatform
   */
  static readonly DeleteCloudServiceReferenceFromSoftwarePlatformPath =
    '/v1/software-platforms/{id}/cloud-services/{csId}';

  /**
   * Delete a reference to an cloud service of the software platform.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCloudServiceReferenceFromSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCloudServiceReferenceFromSoftwarePlatform$Response(params: {
    id: string;
    csId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.DeleteCloudServiceReferenceFromSoftwarePlatformPath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
      rb.path('csId', params.csId, {});
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
   * Delete a reference to an cloud service of the software platform.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteCloudServiceReferenceFromSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCloudServiceReferenceFromSoftwarePlatform(params: {
    id: string;
    csId: string;
  }): Observable<void> {
    return this.deleteCloudServiceReferenceFromSoftwarePlatform$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation getComputeResourcesForSoftwarePlatform
   */
  static readonly GetComputeResourcesForSoftwarePlatformPath =
    '/v1/software-platforms/{id}/compute-resources';

  /**
   * Get referenced compute resources for a software platform.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputeResourcesForSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcesForSoftwarePlatform$Response(params: {
    id: string;

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
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { computeResources?: Array<EntityModelComputeResourceDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetComputeResourcesForSoftwarePlatformPath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<{
            _embedded?: {
              computeResources?: Array<EntityModelComputeResourceDto>;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Get referenced compute resources for a software platform.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputeResourcesForSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputeResourcesForSoftwarePlatform(params: {
    id: string;

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
  }): Observable<{
    _embedded?: { computeResources?: Array<EntityModelComputeResourceDto> };
    page?: PageMetadata;
  }> {
    return this.getComputeResourcesForSoftwarePlatform$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              computeResources?: Array<EntityModelComputeResourceDto>;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              computeResources?: Array<EntityModelComputeResourceDto>;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation addComputeResourceReferenceToSoftwarePlatform
   */
  static readonly AddComputeResourceReferenceToSoftwarePlatformPath =
    '/v1/software-platforms/{id}/compute-resources/{crId}';

  /**
   * Add a reference to an existing compute resource(that was previously created via a POST on /compute-resources/). Custom ID will be ignored. For the compute resource only the ID is required, other compute resource attributes will not change. If the compute resource doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addComputeResourceReferenceToSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  addComputeResourceReferenceToSoftwarePlatform$Response(params: {
    id: string;
    crId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.AddComputeResourceReferenceToSoftwarePlatformPath,
      'post'
    );
    if (params) {
      rb.path('id', params.id, {});
      rb.path('crId', params.crId, {});
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
   * Add a reference to an existing compute resource(that was previously created via a POST on /compute-resources/). Custom ID will be ignored. For the compute resource only the ID is required, other compute resource attributes will not change. If the compute resource doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addComputeResourceReferenceToSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addComputeResourceReferenceToSoftwarePlatform(params: {
    id: string;
    crId: string;
  }): Observable<void> {
    return this.addComputeResourceReferenceToSoftwarePlatform$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation deleteComputeResourceReferenceFromSoftwarePlatform
   */
  static readonly DeleteComputeResourceReferenceFromSoftwarePlatformPath =
    '/v1/software-platforms/{id}/compute-resources/{crId}';

  /**
   * Delete a reference to an compute resource of the software platform.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComputeResourceReferenceFromSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputeResourceReferenceFromSoftwarePlatform$Response(params: {
    id: string;
    crId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.DeleteComputeResourceReferenceFromSoftwarePlatformPath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
      rb.path('crId', params.crId, {});
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
   * Delete a reference to an compute resource of the software platform.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteComputeResourceReferenceFromSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputeResourceReferenceFromSoftwarePlatform(params: {
    id: string;
    crId: string;
  }): Observable<void> {
    return this.deleteComputeResourceReferenceFromSoftwarePlatform$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation getImplementationsForSoftwarePlatform
   */
  static readonly GetImplementationsForSoftwarePlatformPath =
    '/v1/software-platforms/{id}/implementations';

  /**
   * Get referenced implementations for a software platform.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationsForSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsForSoftwarePlatform$Response(params: {
    id: string;

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
  }): Observable<
    StrictHttpResponse<{
      _embedded?: { implementations?: Array<EntityModelImplementationDto> };
      page?: PageMetadata;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetImplementationsForSoftwarePlatformPath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<{
            _embedded?: {
              implementations?: Array<EntityModelImplementationDto>;
            };
            page?: PageMetadata;
          }>;
        })
      );
  }

  /**
   * Get referenced implementations for a software platform.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationsForSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationsForSoftwarePlatform(params: {
    id: string;

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
  }): Observable<{
    _embedded?: { implementations?: Array<EntityModelImplementationDto> };
    page?: PageMetadata;
  }> {
    return this.getImplementationsForSoftwarePlatform$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            _embedded?: {
              implementations?: Array<EntityModelImplementationDto>;
            };
            page?: PageMetadata;
          }>
        ) =>
          r.body as {
            _embedded?: {
              implementations?: Array<EntityModelImplementationDto>;
            };
            page?: PageMetadata;
          }
      )
    );
  }

  /**
   * Path part for operation getImplementationForSoftwarePlatform
   */
  static readonly GetImplementationForSoftwarePlatformPath =
    '/v1/software-platforms/{id}/implementations/{implId}';

  /**
   * Get a specific referenced implementation of a software platform.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementationForSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationForSoftwarePlatform$Response(params: {
    id: string;
    implId: string;
  }): Observable<
    StrictHttpResponse<{
      id?: string;
      name: string;
      link?: string;
      inputFormat?: string;
      outputFormat?: string;
      description?: string;
      contributors?: string;
      assumptions?: string;
      parameter?: string;
      dependencies?: string;
      _links?: Array<Link>;
    }>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.GetImplementationForSoftwarePlatformPath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
      rb.path('implId', params.implId, {});
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
          return r as StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            inputFormat?: string;
            outputFormat?: string;
            description?: string;
            contributors?: string;
            assumptions?: string;
            parameter?: string;
            dependencies?: string;
            _links?: Array<Link>;
          }>;
        })
      );
  }

  /**
   * Get a specific referenced implementation of a software platform.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementationForSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementationForSoftwarePlatform(params: {
    id: string;
    implId: string;
  }): Observable<{
    id?: string;
    name: string;
    link?: string;
    inputFormat?: string;
    outputFormat?: string;
    description?: string;
    contributors?: string;
    assumptions?: string;
    parameter?: string;
    dependencies?: string;
    _links?: Array<Link>;
  }> {
    return this.getImplementationForSoftwarePlatform$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<{
            id?: string;
            name: string;
            link?: string;
            inputFormat?: string;
            outputFormat?: string;
            description?: string;
            contributors?: string;
            assumptions?: string;
            parameter?: string;
            dependencies?: string;
            _links?: Array<Link>;
          }>
        ) =>
          r.body as {
            id?: string;
            name: string;
            link?: string;
            inputFormat?: string;
            outputFormat?: string;
            description?: string;
            contributors?: string;
            assumptions?: string;
            parameter?: string;
            dependencies?: string;
            _links?: Array<Link>;
          }
      )
    );
  }

  /**
   * Path part for operation addImplementationReferenceToSoftwarePlatform
   */
  static readonly AddImplementationReferenceToSoftwarePlatformPath =
    '/v1/software-platforms/{id}/implementations/{implId}';

  /**
   * Add a reference to an existing implementation (that was previously created via a POST on /implementations/). Custom ID will be ignored. For the implementation only the ID is required, other implementation attributes will not change. If the implementation doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addImplementationReferenceToSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  addImplementationReferenceToSoftwarePlatform$Response(params: {
    id: string;
    implId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.AddImplementationReferenceToSoftwarePlatformPath,
      'post'
    );
    if (params) {
      rb.path('id', params.id, {});
      rb.path('implId', params.implId, {});
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
   * Add a reference to an existing implementation (that was previously created via a POST on /implementations/). Custom ID will be ignored. For the implementation only the ID is required, other implementation attributes will not change. If the implementation doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addImplementationReferenceToSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addImplementationReferenceToSoftwarePlatform(params: {
    id: string;
    implId: string;
  }): Observable<void> {
    return this.addImplementationReferenceToSoftwarePlatform$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation deleteImplementationReferenceFromSoftwarePlatform
   */
  static readonly DeleteImplementationReferenceFromSoftwarePlatformPath =
    '/v1/software-platforms/{id}/implementations/{implId}';

  /**
   * Delete a reference to an implementation of the software platform.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteImplementationReferenceFromSoftwarePlatform()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImplementationReferenceFromSoftwarePlatform$Response(params: {
    id: string;
    implId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ExecutionEnvironmentsService.DeleteImplementationReferenceFromSoftwarePlatformPath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
      rb.path('implId', params.implId, {});
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
   * Delete a reference to an implementation of the software platform.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteImplementationReferenceFromSoftwarePlatform$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImplementationReferenceFromSoftwarePlatform(params: {
    id: string;
    implId: string;
  }): Observable<void> {
    return this.deleteImplementationReferenceFromSoftwarePlatform$Response(
      params
    ).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }
}
