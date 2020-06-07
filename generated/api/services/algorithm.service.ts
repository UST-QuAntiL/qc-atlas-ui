/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AlgoRelationTypeDto } from '../models/algo-relation-type-dto';
import { AlgorithmDto } from '../models/algorithm-dto';
import { AlgorithmRelationDto } from '../models/algorithm-relation-dto';
import { CollectionModelEntityModelAlgorithmRelationDto } from '../models/collection-model-entity-model-algorithm-relation-dto';
import { CollectionModelEntityModelProblemTypeDto } from '../models/collection-model-entity-model-problem-type-dto';
import { CollectionModelEntityModelTagDto } from '../models/collection-model-entity-model-tag-dto';
import { Link } from '../models/link';
import { PagedModelEntityModelAlgorithmDto } from '../models/paged-model-entity-model-algorithm-dto';
import { ProblemTypeDto } from '../models/problem-type-dto';
import { TagDto } from '../models/tag-dto';

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
   * Path part for operation getAlgorithm
   */
  static readonly GetAlgorithmPath = '/algorithms/v1/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithm$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetAlgorithmPath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithm(params: {
    id: string;

  }): Observable<{ 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> }> {

    return this.getAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation updateAlgorithm
   */
  static readonly UpdateAlgorithmPath = '/algorithms/v1/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithm$Response(params: {
    id: string;
      body: AlgorithmDto
  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateAlgorithmPath, 'put');
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
        return r as StrictHttpResponse<{ 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithm(params: {
    id: string;
      body: AlgorithmDto
  }): Observable<{ 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> }> {

    return this.updateAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation deleteAlgorithm
   */
  static readonly DeleteAlgorithmPath = '/algorithms/v1/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAlgorithm()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithm$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteAlgorithmPath, 'delete');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{  }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAlgorithm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithm(params: {
    id: string;

  }): Observable<{  }> {

    return this.deleteAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

  /**
   * Path part for operation getAlgorithms
   */
  static readonly GetAlgorithmsPath = '/algorithms/v1/';

  /**
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
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PagedModelEntityModelAlgorithmDto>;
      })
    );
  }

  /**
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
  static readonly CreateAlgorithmPath = '/algorithms/v1/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAlgorithm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgorithm$Response(params: {
      body: AlgorithmDto
  }): Observable<StrictHttpResponse<{ 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.CreateAlgorithmPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAlgorithm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAlgorithm(params: {
      body: AlgorithmDto
  }): Observable<{ 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> }> {

    return this.createAlgorithm$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'name': string, 'acronym'?: string, 'intent'?: string, 'problem'?: string, 'inputFormat'?: string, 'algoParameter'?: string, 'outputFormat'?: string, 'sketch'?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL', 'solution'?: string, 'assumptions'?: string, 'computationModel': 'CLASSIC' | 'QUANTUM' | 'HYBRID', 'problemTypes'?: Array<ProblemTypeDto>, 'applicationAreas'?: Array<string>, 'tags'?: Array<TagDto>, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getTags
   */
  static readonly GetTagsPath = '/algorithms/v1/{id}/tags';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTags()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelTagDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetTagsPath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelTagDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTags$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags(params: {
    id: string;

  }): Observable<CollectionModelEntityModelTagDto> {

    return this.getTags$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelTagDto>) => r.body as CollectionModelEntityModelTagDto)
    );
  }

  /**
   * Path part for operation deleteAlgorithmRelation
   */
  static readonly DeleteAlgorithmRelationPath = '/algorithms/v1/{sourceAlgorithmId}/algorithm-relations/{relationId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAlgorithmRelation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithmRelation$Response(params: {
    sourceAlgorithmId: string;
    relationId: string;

  }): Observable<StrictHttpResponse<AlgorithmRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.DeleteAlgorithmRelationPath, 'delete');
    if (params) {

      rb.path('sourceAlgorithmId', params.sourceAlgorithmId, {});
      rb.path('relationId', params.relationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AlgorithmRelationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAlgorithmRelation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAlgorithmRelation(params: {
    sourceAlgorithmId: string;
    relationId: string;

  }): Observable<AlgorithmRelationDto> {

    return this.deleteAlgorithmRelation$Response(params).pipe(
      map((r: StrictHttpResponse<AlgorithmRelationDto>) => r.body as AlgorithmRelationDto)
    );
  }

  /**
   * Path part for operation getAlgorithmRelations
   */
  static readonly GetAlgorithmRelationsPath = '/algorithms/v1/{sourceAlgorithmId}/algorithm-relations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlgorithmRelations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelations$Response(params: {
    sourceAlgorithmId: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelAlgorithmRelationDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetAlgorithmRelationsPath, 'get');
    if (params) {

      rb.path('sourceAlgorithmId', params.sourceAlgorithmId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelAlgorithmRelationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlgorithmRelations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlgorithmRelations(params: {
    sourceAlgorithmId: string;

  }): Observable<CollectionModelEntityModelAlgorithmRelationDto> {

    return this.getAlgorithmRelations$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelAlgorithmRelationDto>) => r.body as CollectionModelEntityModelAlgorithmRelationDto)
    );
  }

  /**
   * Path part for operation updateAlgorithmRelation
   */
  static readonly UpdateAlgorithmRelationPath = '/algorithms/v1/{sourceAlgorithmId}/algorithm-relations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAlgorithmRelation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAlgorithmRelation$Response(params: {
    sourceAlgorithmId: string;
      body: AlgorithmRelationDto
  }): Observable<StrictHttpResponse<{ 'id'?: string, 'sourceAlgorithm': AlgorithmDto, 'targetAlgorithm': AlgorithmDto, 'algoRelationType': AlgoRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.UpdateAlgorithmRelationPath, 'put');
    if (params) {

      rb.path('sourceAlgorithmId', params.sourceAlgorithmId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'id'?: string, 'sourceAlgorithm': AlgorithmDto, 'targetAlgorithm': AlgorithmDto, 'algoRelationType': AlgoRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }>;
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
    sourceAlgorithmId: string;
      body: AlgorithmRelationDto
  }): Observable<{ 'id'?: string, 'sourceAlgorithm': AlgorithmDto, 'targetAlgorithm': AlgorithmDto, 'algoRelationType': AlgoRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }> {

    return this.updateAlgorithmRelation$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'id'?: string, 'sourceAlgorithm': AlgorithmDto, 'targetAlgorithm': AlgorithmDto, 'algoRelationType': AlgoRelationTypeDto, 'description'?: string, '_links'?: Array<Link> }>) => r.body as { 'id'?: string, 'sourceAlgorithm': AlgorithmDto, 'targetAlgorithm': AlgorithmDto, 'algoRelationType': AlgoRelationTypeDto, 'description'?: string, '_links'?: Array<Link> })
    );
  }

  /**
   * Path part for operation getProblemTypes
   */
  static readonly GetProblemTypesPath = '/algorithms/v1/{id}/problem-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProblemTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypes$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelProblemTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlgorithmService.GetProblemTypesPath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelProblemTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProblemTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTypes(params: {
    id: string;

  }): Observable<CollectionModelEntityModelProblemTypeDto> {

    return this.getProblemTypes$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelProblemTypeDto>) => r.body as CollectionModelEntityModelProblemTypeDto)
    );
  }

}
