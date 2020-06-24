/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AlgorithmDto } from '../models/algorithm-dto';
import { AlgorithmRelationDto } from '../models/algorithm-relation-dto';
import { ApplicationAreaDto } from '../models/application-area-dto';
import { CollectionModelEntityModelAlgorithmRelationDto } from '../models/collection-model-entity-model-algorithm-relation-dto';
import { CollectionModelEntityModelApplicationAreaDto } from '../models/collection-model-entity-model-application-area-dto';
import { CollectionModelEntityModelImplementationDto } from '../models/collection-model-entity-model-implementation-dto';
import { CollectionModelEntityModelPatternRelationDto } from '../models/collection-model-entity-model-pattern-relation-dto';
import { CollectionModelEntityModelProblemTypeDto } from '../models/collection-model-entity-model-problem-type-dto';
import { CollectionModelEntityModelPublicationDto } from '../models/collection-model-entity-model-publication-dto';
import { ComputingResourceDto } from '../models/computing-resource-dto';
import { EntityModelAlgorithmDto } from '../models/entity-model-algorithm-dto';
import { EntityModelAlgorithmRelationDto } from '../models/entity-model-algorithm-relation-dto';
import { EntityModelApplicationAreaDto } from '../models/entity-model-application-area-dto';
import { EntityModelComputingResourceDto } from '../models/entity-model-computing-resource-dto';
import { EntityModelImplementationDto } from '../models/entity-model-implementation-dto';
import { EntityModelPatternRelationDto } from '../models/entity-model-pattern-relation-dto';
import { ImplementationDto } from '../models/implementation-dto';
import { PagedModelEntityModelAlgorithmDto } from '../models/paged-model-entity-model-algorithm-dto';
import { PagedModelEntityModelComputingResourceDto } from '../models/paged-model-entity-model-computing-resource-dto';
import { PatternRelationDto } from '../models/pattern-relation-dto';
import { ProblemTypeDto } from '../models/problem-type-dto';
import { PublicationDto } from '../models/publication-dto';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAlgorithms
   */
  static readonly GetAlgorithmsPath = '/algorithms/';

  /**
   * Retrieve all algorithms (quantum, hybrid and classic)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithms()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithms$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<PagedModelEntityModelAlgorithmDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetAlgorithmsPath, 'get');
    if (params) {

      rb.query('page', params.page, {});
      rb.query('size', params.size, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PagedModelEntityModelAlgorithmDto>;
      })
    );
  }

  /**
   * Retrieve all algorithms (quantum, hybrid and classic)
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithms(params?: {
    page?: number;
    size?: number;

  }): Observable<PagedModelEntityModelAlgorithmDto> {

    return this.getAlgorithms$Response(params).pipe(
      map((r: StrictHttpResponse<PagedModelEntityModelAlgorithmDto>) => r.body as PagedModelEntityModelAlgorithmDto)
    );
  }

  /**
   * Path part for operation createAlgorithm
   */
  static readonly CreateAlgorithmPath = '/algorithms/';

  /**
   * Define the basic properties of an algorithm. References to subobjects (e.g. a problemtype) can be added via subroutes (e.g. /algorithm/id/problem-types)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgorithm$Response(params: {
      body: AlgorithmDto
  }): Observable<StrictHttpResponse<EntityModelAlgorithmDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateAlgorithmPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelAlgorithmDto>;
      })
    );
  }

  /**
   * Define the basic properties of an algorithm. References to subobjects (e.g. a problemtype) can be added via subroutes (e.g. /algorithm/id/problem-types)
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgorithm(params: {
      body: AlgorithmDto
  }): Observable<EntityModelAlgorithmDto> {

    return this.createAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelAlgorithmDto>) => r.body as EntityModelAlgorithmDto)
    );
  }

  /**
   * Path part for operation getApplicationAreas
   */
  static readonly GetApplicationAreasPath = '/algorithms/{algoId}/application-areas';

  /**
   * Get the problem types for an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationAreas()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreas$Response(params: {
    algoId: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelApplicationAreaDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetApplicationAreasPath, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelApplicationAreaDto>;
      })
    );
  }

  /**
   * Get the problem types for an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplicationAreas$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationAreas(params: {
    algoId: string;

  }): Observable<CollectionModelEntityModelApplicationAreaDto> {

    return this.getApplicationAreas$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelApplicationAreaDto>) => r.body as CollectionModelEntityModelApplicationAreaDto)
    );
  }

  /**
   * Path part for operation add
   */
  static readonly AddPath = '/algorithms/{algoId}/application-areas';

  /**
   * Add a reference to an existing applicationArea (that was previously created via a POST on /application-area/. If the applicationArea doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add$Response(params: {
    algoId: string;
      body: ApplicationAreaDto
  }): Observable<StrictHttpResponse<CollectionModelEntityModelApplicationAreaDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.AddPath, 'post');
    if (params) {

      rb.path('algoId', params.algoId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelApplicationAreaDto>;
      })
    );
  }

  /**
   * Add a reference to an existing applicationArea (that was previously created via a POST on /application-area/. If the applicationArea doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `add$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add(params: {
    algoId: string;
      body: ApplicationAreaDto
  }): Observable<CollectionModelEntityModelApplicationAreaDto> {

    return this.add$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelApplicationAreaDto>) => r.body as CollectionModelEntityModelApplicationAreaDto)
    );
  }

  /**
   * Path part for operation getAlgorithm
   */
  static readonly GetAlgorithmPath = '/algorithms/{algoId}';

  /**
   * Retrieve an specific algorithm and its basic properties
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithm$Response(params: {
    algoId: string;

  }): Observable<StrictHttpResponse<EntityModelAlgorithmDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetAlgorithmPath, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelAlgorithmDto>;
      })
    );
  }

  /**
   * Retrieve an specific algorithm and its basic properties
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithm(params: {
    algoId: string;

  }): Observable<EntityModelAlgorithmDto> {

    return this.getAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelAlgorithmDto>) => r.body as EntityModelAlgorithmDto)
    );
  }

  /**
   * Path part for operation updateAlgorithm
   */
  static readonly UpdateAlgorithmPath = '/algorithms/{algoId}';

  /**
   * Update the basic properties of an algorithm (e.g. name). References to subobjects (e.g. a problemtype) are not updated via this operation - use the corresponding subroute for updating them (e.g. algorithm/{id}/problem-type).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithm$Response(params: {
    algoId: string;
      body: AlgorithmDto
  }): Observable<StrictHttpResponse<EntityModelAlgorithmDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateAlgorithmPath, 'put');
    if (params) {

      rb.path('algoId', params.algoId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelAlgorithmDto>;
      })
    );
  }

  /**
   * Update the basic properties of an algorithm (e.g. name). References to subobjects (e.g. a problemtype) are not updated via this operation - use the corresponding subroute for updating them (e.g. algorithm/{id}/problem-type).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithm(params: {
    algoId: string;
      body: AlgorithmDto
  }): Observable<EntityModelAlgorithmDto> {

    return this.updateAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelAlgorithmDto>) => r.body as EntityModelAlgorithmDto)
    );
  }

  /**
   * Path part for operation deleteAlgorithm
   */
  static readonly DeleteAlgorithmPath = '/algorithms/{algoId}';

  /**
   * Delete an algorithm. This also deletes all entities that depend on it (e.g., the algorith's relation to another algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithm$Response(params: {
    algoId: string;

  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteAlgorithmPath, 'delete');
    if (params) {

      rb.path('algoId', params.algoId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{  }>;
      })
    );
  }

  /**
   * Delete an algorithm. This also deletes all entities that depend on it (e.g., the algorith's relation to another algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithm(params: {
    algoId: string;

  }): Observable<{  }> {

    return this.deleteAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

  /**
   * Path part for operation getPublications
   */
  static readonly GetPublicationsPath = '/algorithms/{algoId}/publications';

  /**
   * Get referenced publications for an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublications()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications$Response(params: {
    algoId: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelPublicationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetPublicationsPath, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelPublicationDto>;
      })
    );
  }

  /**
   * Get referenced publications for an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPublications$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublications(params: {
    algoId: string;

  }): Observable<CollectionModelEntityModelPublicationDto> {

    return this.getPublications$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelPublicationDto>) => r.body as CollectionModelEntityModelPublicationDto)
    );
  }

  /**
   * Path part for operation updatePublications
   */
  static readonly UpdatePublicationsPath = '/algorithms/{algoId}/publications';

  /**
   * Update all references to existing publication (that were previously created via a POST on /publications/). The values (e.g. type) of each publication are not changes through this operation. If one of the publications doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePublications()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePublications$Response(params: {
    algoId: string;
      body: Array<PublicationDto>
  }): Observable<StrictHttpResponse<CollectionModelEntityModelPublicationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdatePublicationsPath, 'put');
    if (params) {

      rb.path('algoId', params.algoId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelPublicationDto>;
      })
    );
  }

  /**
   * Update all references to existing publication (that were previously created via a POST on /publications/). The values (e.g. type) of each publication are not changes through this operation. If one of the publications doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePublications$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePublications(params: {
    algoId: string;
      body: Array<PublicationDto>
  }): Observable<CollectionModelEntityModelPublicationDto> {

    return this.updatePublications$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelPublicationDto>) => r.body as CollectionModelEntityModelPublicationDto)
    );
  }

  /**
   * Path part for operation addPublication
   */
  static readonly AddPublicationPath = '/algorithms/{algoId}/publications';

  /**
   * Add a reference to an existing publication (that was previously created via a POST on /publications/. If the publication doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPublication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPublication$Response(params: {
    algoId: string;
      body: PublicationDto
  }): Observable<StrictHttpResponse<CollectionModelEntityModelPublicationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.AddPublicationPath, 'post');
    if (params) {

      rb.path('algoId', params.algoId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelPublicationDto>;
      })
    );
  }

  /**
   * Add a reference to an existing publication (that was previously created via a POST on /publications/. If the publication doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addPublication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPublication(params: {
    algoId: string;
      body: PublicationDto
  }): Observable<CollectionModelEntityModelPublicationDto> {

    return this.addPublication$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelPublicationDto>) => r.body as CollectionModelEntityModelPublicationDto)
    );
  }

  /**
   * Path part for operation getProblemTypes
   */
  static readonly GetProblemTypesPath = '/algorithms/{algoId}/problem-types';

  /**
   * Get the problem types for an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProblemTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypes$Response(params: {
    algoId: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelProblemTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetProblemTypesPath, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelProblemTypeDto>;
      })
    );
  }

  /**
   * Get the problem types for an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProblemTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypes(params: {
    algoId: string;

  }): Observable<CollectionModelEntityModelProblemTypeDto> {

    return this.getProblemTypes$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelProblemTypeDto>) => r.body as CollectionModelEntityModelProblemTypeDto)
    );
  }

  /**
   * Path part for operation updateProblemTypes
   */
  static readonly UpdateProblemTypesPath = '/algorithms/{algoId}/problem-types';

  /**
   * Update all references to existing problemTypes (that were previously created via a POST on /problem-types/). The values (e.g. name) of each problem-types are not changes through this operation. If one of the problemType doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProblemTypes()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProblemTypes$Response(params: {
    algoId: string;
      body: Array<ProblemTypeDto>
  }): Observable<StrictHttpResponse<CollectionModelEntityModelProblemTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateProblemTypesPath, 'put');
    if (params) {

      rb.path('algoId', params.algoId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelProblemTypeDto>;
      })
    );
  }

  /**
   * Update all references to existing problemTypes (that were previously created via a POST on /problem-types/). The values (e.g. name) of each problem-types are not changes through this operation. If one of the problemType doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateProblemTypes$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProblemTypes(params: {
    algoId: string;
      body: Array<ProblemTypeDto>
  }): Observable<CollectionModelEntityModelProblemTypeDto> {

    return this.updateProblemTypes$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelProblemTypeDto>) => r.body as CollectionModelEntityModelProblemTypeDto)
    );
  }

  /**
   * Path part for operation addProblemType
   */
  static readonly AddProblemTypePath = '/algorithms/{algoId}/problem-types';

  /**
   * Add a reference to an existing problemType (that was previously created via a POST on /problem-types/. If the problemType doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addProblemType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProblemType$Response(params: {
    algoId: string;
      body: ProblemTypeDto
  }): Observable<StrictHttpResponse<CollectionModelEntityModelProblemTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.AddProblemTypePath, 'post');
    if (params) {

      rb.path('algoId', params.algoId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelProblemTypeDto>;
      })
    );
  }

  /**
   * Add a reference to an existing problemType (that was previously created via a POST on /problem-types/. If the problemType doesn't exist yet, a 404 error is thrown.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addProblemType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProblemType(params: {
    algoId: string;
      body: ProblemTypeDto
  }): Observable<CollectionModelEntityModelProblemTypeDto> {

    return this.addProblemType$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelProblemTypeDto>) => r.body as CollectionModelEntityModelProblemTypeDto)
    );
  }

  /**
   * Path part for operation getApplicationArea
   */
  static readonly GetApplicationAreaPath = '/algorithms/{algoId}/application-areas/{applicationAreaId}';

  /**
   * Get a specific applicationArea of an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationArea()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationArea$Response(params: {
    algoId: string;
    applicationAreaId: string;

  }): Observable<StrictHttpResponse<EntityModelApplicationAreaDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetApplicationAreaPath, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('applicationAreaId', params.applicationAreaId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelApplicationAreaDto>;
      })
    );
  }

  /**
   * Get a specific applicationArea of an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplicationArea$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationArea(params: {
    algoId: string;
    applicationAreaId: string;

  }): Observable<EntityModelApplicationAreaDto> {

    return this.getApplicationArea$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelApplicationAreaDto>) => r.body as EntityModelApplicationAreaDto)
    );
  }

  /**
   * Path part for operation deleteReferenceToApplicationArea
   */
  static readonly DeleteReferenceToApplicationAreaPath = '/algorithms/{algoId}/application-areas/{applicationAreaId}';

  /**
   * Delete a reference to a applicationArea of an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteReferenceToApplicationArea()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToApplicationArea$Response(params: {
    algoId: string;
    applicationAreaId: string;

  }): Observable<StrictHttpResponse<EntityModelApplicationAreaDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteReferenceToApplicationAreaPath, 'delete');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('applicationAreaId', params.applicationAreaId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelApplicationAreaDto>;
      })
    );
  }

  /**
   * Delete a reference to a applicationArea of an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteReferenceToApplicationArea$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReferenceToApplicationArea(params: {
    algoId: string;
    applicationAreaId: string;

  }): Observable<EntityModelApplicationAreaDto> {

    return this.deleteReferenceToApplicationArea$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelApplicationAreaDto>) => r.body as EntityModelApplicationAreaDto)
    );
  }

  /**
   * Path part for operation getPatternRelations
   */
  static readonly GetPatternRelationsPath = '/algorithms/{algoId}/pattern-relations';

  /**
   * Get pattern relations for an algorithms.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelations$Response(params: {
    algoId: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelPatternRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetPatternRelationsPath, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelPatternRelationDto>;
      })
    );
  }

  /**
   * Get pattern relations for an algorithms.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternRelations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelations(params: {
    algoId: string;

  }): Observable<CollectionModelEntityModelPatternRelationDto> {

    return this.getPatternRelations$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelPatternRelationDto>) => r.body as CollectionModelEntityModelPatternRelationDto)
    );
  }

  /**
   * Path part for operation createPatternRelation
   */
  static readonly CreatePatternRelationPath = '/algorithms/{algoId}/pattern-relations';

  /**
   * Add a Pattern Relation from this Algorithm to a given Pattern."
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPatternRelation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelation$Response(params: {
    algoId: string;
      body: PatternRelationDto
  }): Observable<StrictHttpResponse<EntityModelPatternRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreatePatternRelationPath, 'post');
    if (params) {

      rb.path('algoId', params.algoId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelPatternRelationDto>;
      })
    );
  }

  /**
   * Add a Pattern Relation from this Algorithm to a given Pattern."
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPatternRelation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatternRelation(params: {
    algoId: string;
      body: PatternRelationDto
  }): Observable<EntityModelPatternRelationDto> {

    return this.createPatternRelation$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPatternRelationDto>) => r.body as EntityModelPatternRelationDto)
    );
  }

  /**
   * Path part for operation getPatternRelation
   */
  static readonly GetPatternRelationPath = '/algorithms/{algoId}/pattern-relations/{relationId}/';

  /**
   * Get a certain pattern relation for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatternRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelation$Response(params: {
    algoId: string;
    relationId: string;

  }): Observable<StrictHttpResponse<EntityModelPatternRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetPatternRelationPath, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('relationId', params.relationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelPatternRelationDto>;
      })
    );
  }

  /**
   * Get a certain pattern relation for an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatternRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatternRelation(params: {
    algoId: string;
    relationId: string;

  }): Observable<EntityModelPatternRelationDto> {

    return this.getPatternRelation$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPatternRelationDto>) => r.body as EntityModelPatternRelationDto)
    );
  }

  /**
   * Path part for operation updatePatternRelations
   */
  static readonly UpdatePatternRelationsPath = '/algorithms/{algoId}/pattern-relations/{relationId}';

  /**
   * Update a references to a pattern.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatternRelations()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelations$Response(params: {
    algoId: string;
    relationId: string;
      body: PatternRelationDto
  }): Observable<StrictHttpResponse<EntityModelPatternRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdatePatternRelationsPath, 'put');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('relationId', params.relationId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelPatternRelationDto>;
      })
    );
  }

  /**
   * Update a references to a pattern.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePatternRelations$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatternRelations(params: {
    algoId: string;
    relationId: string;
      body: PatternRelationDto
  }): Observable<EntityModelPatternRelationDto> {

    return this.updatePatternRelations$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelPatternRelationDto>) => r.body as EntityModelPatternRelationDto)
    );
  }

  /**
   * Path part for operation deleteAPatternRelation
   */
  static readonly DeleteAPatternRelationPath = '/algorithms/{algoId}/pattern-relations/{relationId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAPatternRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAPatternRelation$Response(params: {
    algoId: string;
    relationId: string;

  }): Observable<StrictHttpResponse<AlgorithmRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteAPatternRelationPath, 'delete');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('relationId', params.relationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AlgorithmRelationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAPatternRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAPatternRelation(params: {
    algoId: string;
    relationId: string;

  }): Observable<AlgorithmRelationDto> {

    return this.deleteAPatternRelation$Response(params).pipe(
      map((r: StrictHttpResponse<AlgorithmRelationDto>) => r.body as AlgorithmRelationDto)
    );
  }

  /**
   * Path part for operation getAlgorithmRelations
   */
  static readonly GetAlgorithmRelationsPath = '/algorithms/{algoId}/algorithm-relations';

  /**
   * Retrieve all relations for an algorithm.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmRelations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelations$Response(params: {
    algoId: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelAlgorithmRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetAlgorithmRelationsPath, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelAlgorithmRelationDto>;
      })
    );
  }

  /**
   * Retrieve all relations for an algorithm.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmRelations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelations(params: {
    algoId: string;

  }): Observable<CollectionModelEntityModelAlgorithmRelationDto> {

    return this.getAlgorithmRelations$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelAlgorithmRelationDto>) => r.body as CollectionModelEntityModelAlgorithmRelationDto)
    );
  }

  /**
   * Path part for operation addAlgorithmRelation
   */
  static readonly AddAlgorithmRelationPath = '/algorithms/{algoId}/algorithm-relations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addAlgorithmRelation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addAlgorithmRelation$Response(params: {
    algoId: string;
      body: AlgorithmRelationDto
  }): Observable<StrictHttpResponse<EntityModelAlgorithmRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.AddAlgorithmRelationPath, 'post');
    if (params) {

      rb.path('algoId', params.algoId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelAlgorithmRelationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addAlgorithmRelation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addAlgorithmRelation(params: {
    algoId: string;
      body: AlgorithmRelationDto
  }): Observable<EntityModelAlgorithmRelationDto> {

    return this.addAlgorithmRelation$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelAlgorithmRelationDto>) => r.body as EntityModelAlgorithmRelationDto)
    );
  }

  /**
   * Path part for operation getAlgorithmRelation
   */
  static readonly GetAlgorithmRelationPath = '/algorithms/{algoId}/algorithm-relations/{relationId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelation$Response(params: {
    algoId: string;
    relationId: string;

  }): Observable<StrictHttpResponse<EntityModelAlgorithmRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetAlgorithmRelationPath, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('relationId', params.relationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelAlgorithmRelationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelation(params: {
    algoId: string;
    relationId: string;

  }): Observable<EntityModelAlgorithmRelationDto> {

    return this.getAlgorithmRelation$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelAlgorithmRelationDto>) => r.body as EntityModelAlgorithmRelationDto)
    );
  }

  /**
   * Path part for operation updateAlgorithmRelation
   */
  static readonly UpdateAlgorithmRelationPath = '/algorithms/{algoId}/algorithm-relations/{relationId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAlgorithmRelation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithmRelation$Response(params: {
    algoId: string;
    relationId: string;
      body: AlgorithmRelationDto
  }): Observable<StrictHttpResponse<EntityModelAlgorithmRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateAlgorithmRelationPath, 'put');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('relationId', params.relationId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelAlgorithmRelationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAlgorithmRelation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithmRelation(params: {
    algoId: string;
    relationId: string;
      body: AlgorithmRelationDto
  }): Observable<EntityModelAlgorithmRelationDto> {

    return this.updateAlgorithmRelation$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelAlgorithmRelationDto>) => r.body as EntityModelAlgorithmRelationDto)
    );
  }

  /**
   * Path part for operation deleteAlgorithmRelation
   */
  static readonly DeleteAlgorithmRelationPath = '/algorithms/{algoId}/algorithm-relations/{relationId}';

  /**
   * Delete a relation of the algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAlgorithmRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithmRelation$Response(params: {
    algoId: string;
    relationId: string;

  }): Observable<StrictHttpResponse<AlgorithmRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteAlgorithmRelationPath, 'delete');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('relationId', params.relationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AlgorithmRelationDto>;
      })
    );
  }

  /**
   * Delete a relation of the algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAlgorithmRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithmRelation(params: {
    algoId: string;
    relationId: string;

  }): Observable<AlgorithmRelationDto> {

    return this.deleteAlgorithmRelation$Response(params).pipe(
      map((r: StrictHttpResponse<AlgorithmRelationDto>) => r.body as AlgorithmRelationDto)
    );
  }

  /**
   * Path part for operation getComputingResources
   */
  static readonly GetComputingResourcesPath = '/algorithms/{algoId}/computing-resources';

  /**
   * Retrieve the required computing resources of an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputingResources()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResources$Response(params: {
    algoId: string;
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<PagedModelEntityModelComputingResourceDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetComputingResourcesPath, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PagedModelEntityModelComputingResourceDto>;
      })
    );
  }

  /**
   * Retrieve the required computing resources of an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputingResources$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResources(params: {
    algoId: string;
    page?: number;
    size?: number;

  }): Observable<PagedModelEntityModelComputingResourceDto> {

    return this.getComputingResources$Response(params).pipe(
      map((r: StrictHttpResponse<PagedModelEntityModelComputingResourceDto>) => r.body as PagedModelEntityModelComputingResourceDto)
    );
  }

  /**
   * Path part for operation addComputingResource
   */
  static readonly AddComputingResourcePath = '/algorithms/{algoId}/computing-resources';

  /**
   * Add a computing resource (e.g. a certain number of qubits) that is requiered by an algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addComputingResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addComputingResource$Response(params: {
    algoId: string;
      body: ComputingResourceDto
  }): Observable<StrictHttpResponse<EntityModelAlgorithmDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.AddComputingResourcePath, 'post');
    if (params) {

      rb.path('algoId', params.algoId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelAlgorithmDto>;
      })
    );
  }

  /**
   * Add a computing resource (e.g. a certain number of qubits) that is requiered by an algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addComputingResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addComputingResource(params: {
    algoId: string;
      body: ComputingResourceDto
  }): Observable<EntityModelAlgorithmDto> {

    return this.addComputingResource$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelAlgorithmDto>) => r.body as EntityModelAlgorithmDto)
    );
  }

  /**
   * Path part for operation getImplementation
   */
  static readonly GetImplementationPath = '/algorithms/{algoId}/implementations/{implId}';

  /**
   * Retrieve a specific implemention of the algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementation$Response(params: {
    algoId: string;
    implId: string;

  }): Observable<StrictHttpResponse<EntityModelImplementationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetImplementationPath, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelImplementationDto>;
      })
    );
  }

  /**
   * Retrieve a specific implemention of the algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementation(params: {
    algoId: string;
    implId: string;

  }): Observable<EntityModelImplementationDto> {

    return this.getImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelImplementationDto>) => r.body as EntityModelImplementationDto)
    );
  }

  /**
   * Path part for operation updateImplementation
   */
  static readonly UpdateImplementationPath = '/algorithms/{algoId}/implementations/{implId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImplementation$Response(params: {
    algoId: string;
    implId: string;
      body: ImplementationDto
  }): Observable<StrictHttpResponse<EntityModelImplementationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateImplementationPath, 'put');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelImplementationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImplementation(params: {
    algoId: string;
    implId: string;
      body: ImplementationDto
  }): Observable<EntityModelImplementationDto> {

    return this.updateImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelImplementationDto>) => r.body as EntityModelImplementationDto)
    );
  }

  /**
   * Path part for operation deleteImplementation
   */
  static readonly DeleteImplementationPath = '/algorithms/{algoId}/implementations/{implId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteImplementation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImplementation$Response(params: {
    algoId: string;
    implId: string;

  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteImplementationPath, 'delete');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{  }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteImplementation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImplementation(params: {
    algoId: string;
    implId: string;

  }): Observable<{  }> {

    return this.deleteImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

  /**
   * Path part for operation getImplementations
   */
  static readonly GetImplementationsPath = '/algorithms/{algoId}/implementations/';

  /**
   * Retrieve all implementations for the algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImplementations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementations$Response(params: {
    algoId: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelImplementationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetImplementationsPath, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelImplementationDto>;
      })
    );
  }

  /**
   * Retrieve all implementations for the algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImplementations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImplementations(params: {
    algoId: string;

  }): Observable<CollectionModelEntityModelImplementationDto> {

    return this.getImplementations$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelImplementationDto>) => r.body as CollectionModelEntityModelImplementationDto)
    );
  }

  /**
   * Path part for operation createImplementation
   */
  static readonly CreateImplementationPath = '/algorithms/{algoId}/implementations/';

  /**
   * Create a new implementation for the algorithm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createImplementation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImplementation$Response(params: {
    algoId: string;
      body: ImplementationDto
  }): Observable<StrictHttpResponse<EntityModelImplementationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateImplementationPath, 'post');
    if (params) {

      rb.path('algoId', params.algoId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelImplementationDto>;
      })
    );
  }

  /**
   * Create a new implementation for the algorithm
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createImplementation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImplementation(params: {
    algoId: string;
      body: ImplementationDto
  }): Observable<EntityModelImplementationDto> {

    return this.createImplementation$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelImplementationDto>) => r.body as EntityModelImplementationDto)
    );
  }

  /**
   * Path part for operation getComputingResources1
   */
  static readonly GetComputingResources1Path = '/algorithms/{algoId}/implementations/{implId}/computing-resources';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComputingResources1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResources1$Response(params: {
    algoId: string;
    implId: string;
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<PagedModelEntityModelComputingResourceDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetComputingResources1Path, 'get');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PagedModelEntityModelComputingResourceDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComputingResources1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComputingResources1(params: {
    algoId: string;
    implId: string;
    page?: number;
    size?: number;

  }): Observable<PagedModelEntityModelComputingResourceDto> {

    return this.getComputingResources1$Response(params).pipe(
      map((r: StrictHttpResponse<PagedModelEntityModelComputingResourceDto>) => r.body as PagedModelEntityModelComputingResourceDto)
    );
  }

  /**
   * Path part for operation addComputingResource1
   */
  static readonly AddComputingResource1Path = '/algorithms/{algoId}/implementations/{implId}/computing-resources';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addComputingResource1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addComputingResource1$Response(params: {
    algoId: string;
    implId: string;
      body: ComputingResourceDto
  }): Observable<StrictHttpResponse<EntityModelComputingResourceDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.AddComputingResource1Path, 'post');
    if (params) {

      rb.path('algoId', params.algoId, {});
      rb.path('implId', params.implId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelComputingResourceDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addComputingResource1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addComputingResource1(params: {
    algoId: string;
    implId: string;
      body: ComputingResourceDto
  }): Observable<EntityModelComputingResourceDto> {

    return this.addComputingResource1$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelComputingResourceDto>) => r.body as EntityModelComputingResourceDto)
    );
  }

}
