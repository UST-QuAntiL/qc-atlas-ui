/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ComputeResourcePropertyTypeDto } from '../models/compute-resource-property-type-dto';
import { EntityModelComputeResourcePropertyTypeDto } from '../models/entity-model-compute-resource-property-type-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';

@Injectable({
  providedIn: 'root',
})
export class ComputeResourcePropertyTypesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getResourcePropertyTypes
   */
  static readonly GetResourcePropertyTypesPath = '/v1/compute-resource-property-types';

  /**
   * Retrieve all compute resource property types.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResourcePropertyTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourcePropertyTypes$Response(params?: {

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

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'computeResourcePropertyTypes'?: Array<EntityModelComputeResourcePropertyTypeDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, ComputeResourcePropertyTypesService.GetResourcePropertyTypesPath, 'get');
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
        return r as StrictHttpResponse<{ '_embedded'?: { 'computeResourcePropertyTypes'?: Array<EntityModelComputeResourcePropertyTypeDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * Retrieve all compute resource property types.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getResourcePropertyTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourcePropertyTypes(params?: {

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

  }): Observable<{ '_embedded'?: { 'computeResourcePropertyTypes'?: Array<EntityModelComputeResourcePropertyTypeDto> }, 'page'?: PageMetadata }> {

    return this.getResourcePropertyTypes$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'computeResourcePropertyTypes'?: Array<EntityModelComputeResourcePropertyTypeDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'computeResourcePropertyTypes'?: Array<EntityModelComputeResourcePropertyTypeDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation createComputingResourcePropertyType
   */
  static readonly CreateComputingResourcePropertyTypePath = '/v1/compute-resource-property-types';

  /**
   * Define the basic properties of an compute resource property type.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createComputingResourcePropertyType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputingResourcePropertyType$Response(params: {
      body: ComputeResourcePropertyTypeDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, ComputeResourcePropertyTypesService.CreateComputingResourcePropertyTypePath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Define the basic properties of an compute resource property type.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createComputingResourcePropertyType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputingResourcePropertyType(params: {
      body: ComputeResourcePropertyTypeDto
  }): Observable<{ 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }> {

    return this.createComputingResourcePropertyType$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getComputingResourcePropertyType
   */
  static readonly GetComputingResourcePropertyTypePath = '/v1/compute-resource-property-types/{computeResourcePropertyTypeId}';

  /**
   * Retrieve a specific compute resource property type and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputingResourcePropertyType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResourcePropertyType$Response(params: {
    computeResourcePropertyTypeId: string;

  }): Observable<StrictHttpResponse<{ 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, ComputeResourcePropertyTypesService.GetComputingResourcePropertyTypePath, 'get');
    if (params) {

      rb.path('computeResourcePropertyTypeId', params.computeResourcePropertyTypeId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Retrieve a specific compute resource property type and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputingResourcePropertyType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResourcePropertyType(params: {
    computeResourcePropertyTypeId: string;

  }): Observable<{ 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }> {

    return this.getComputingResourcePropertyType$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation updateComputingResourcePropertyType
   */
  static readonly UpdateComputingResourcePropertyTypePath = '/v1/compute-resource-property-types/{computeResourcePropertyTypeId}';

  /**
   * Update the basic properties of an compute resource property type (e.g. name).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComputingResourcePropertyType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputingResourcePropertyType$Response(params: {
    computeResourcePropertyTypeId: string;
      body: ComputeResourcePropertyTypeDto
  }): Observable<StrictHttpResponse<{ 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, ComputeResourcePropertyTypesService.UpdateComputingResourcePropertyTypePath, 'put');
    if (params) {

      rb.path('computeResourcePropertyTypeId', params.computeResourcePropertyTypeId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Update the basic properties of an compute resource property type (e.g. name).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateComputingResourcePropertyType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputingResourcePropertyType(params: {
    computeResourcePropertyTypeId: string;
      body: ComputeResourcePropertyTypeDto
  }): Observable<{ 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }> {

    return this.updateComputingResourcePropertyType$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>) => r.body as { 'id': string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteComputingResourcePropertyType
   */
  static readonly DeleteComputingResourcePropertyTypePath = '/v1/compute-resource-property-types/{computeResourcePropertyTypeId}';

  /**
   * Delete an compute resource property type.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComputingResourcePropertyType()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputingResourcePropertyType$Response(params: {
    computeResourcePropertyTypeId: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ComputeResourcePropertyTypesService.DeleteComputingResourcePropertyTypePath, 'delete');
    if (params) {

      rb.path('computeResourcePropertyTypeId', params.computeResourcePropertyTypeId, {});

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
   * Delete an compute resource property type.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteComputingResourcePropertyType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputingResourcePropertyType(params: {
    computeResourcePropertyTypeId: string;

  }): Observable<void> {

    return this.deleteComputingResourcePropertyType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
