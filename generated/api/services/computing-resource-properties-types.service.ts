/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ComputingResourcePropertyTypeDto } from '../models/computing-resource-property-type-dto';
import { EntityModelComputingResourcePropertyTypeDto } from '../models/entity-model-computing-resource-property-type-dto';
import { Link } from '../models/link';
import { PageMetadata } from '../models/page-metadata';

@Injectable({
  providedIn: 'root',
})
export class ComputingResourcePropertiesTypesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getResourcePropertyTypes
   */
  static readonly GetResourcePropertyTypesPath = '/v1/computing-resource-properties-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResourcePropertyTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourcePropertyTypes$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<{ '_embedded'?: { 'computingResourcePropertyTypes'?: Array<EntityModelComputingResourcePropertyTypeDto> }, 'page'?: PageMetadata }>> {

    const rb = new RequestBuilder(this.rootUrl, ComputingResourcePropertiesTypesService.GetResourcePropertyTypesPath, 'get');
    if (params) {

      rb.query('page', params.page, {});
      rb.query('size', params.size, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ '_embedded'?: { 'computingResourcePropertyTypes'?: Array<EntityModelComputingResourcePropertyTypeDto> }, 'page'?: PageMetadata }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getResourcePropertyTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourcePropertyTypes(params?: {
    page?: number;
    size?: number;

  }): Observable<{ '_embedded'?: { 'computingResourcePropertyTypes'?: Array<EntityModelComputingResourcePropertyTypeDto> }, 'page'?: PageMetadata }> {

    return this.getResourcePropertyTypes$Response(params).pipe(
      map((r: StrictHttpResponse<{ '_embedded'?: { 'computingResourcePropertyTypes'?: Array<EntityModelComputingResourcePropertyTypeDto> }, 'page'?: PageMetadata }>) => r.body as { '_embedded'?: { 'computingResourcePropertyTypes'?: Array<EntityModelComputingResourcePropertyTypeDto> }, 'page'?: PageMetadata })
    );
  }

  /**
   * Path part for operation createComputingResourcePropertyType
   */
  static readonly CreateComputingResourcePropertyTypePath = '/v1/computing-resource-properties-types';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createComputingResourcePropertyType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputingResourcePropertyType$Response(params: {
      body: ComputingResourcePropertyTypeDto
  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, ComputingResourcePropertiesTypesService.CreateComputingResourcePropertyTypePath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createComputingResourcePropertyType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComputingResourcePropertyType(params: {
      body: ComputingResourcePropertyTypeDto
  }): Observable<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }> {

    return this.createComputingResourcePropertyType$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getComputingResourcePropertyType
   */
  static readonly GetComputingResourcePropertyTypePath = '/v1/computing-resource-properties-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputingResourcePropertyType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResourcePropertyType$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, ComputingResourcePropertiesTypesService.GetComputingResourcePropertyTypePath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputingResourcePropertyType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResourcePropertyType(params: {
    id: string;

  }): Observable<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }> {

    return this.getComputingResourcePropertyType$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation updateComputingResourcePropertyType
   */
  static readonly UpdateComputingResourcePropertyTypePath = '/v1/computing-resource-properties-types/{id}';

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComputingResourcePropertyType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputingResourcePropertyType$Response(params: {
    id: string;
      body: ComputingResourcePropertyTypeDto
  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, ComputingResourcePropertiesTypesService.UpdateComputingResourcePropertyTypePath, 'put');
    if (params) {

      rb.path('id', params.id, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * Custom ID will be ignored.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateComputingResourcePropertyType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComputingResourcePropertyType(params: {
    id: string;
      body: ComputingResourcePropertyTypeDto
  }): Observable<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }> {

    return this.updateComputingResourcePropertyType$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteComputingResourcePropertyType
   */
  static readonly DeleteComputingResourcePropertyTypePath = '/v1/computing-resource-properties-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComputingResourcePropertyType()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputingResourcePropertyType$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, ComputingResourcePropertiesTypesService.DeleteComputingResourcePropertyTypePath, 'delete');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteComputingResourcePropertyType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComputingResourcePropertyType(params: {
    id: string;

  }): Observable<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }> {

    return this.deleteComputingResourcePropertyType$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name': string, 'datatype': 'INTEGER' | 'STRING' | 'FLOAT', 'description'?: string, '_links'?: Array<Link> })
    );
  }

}
