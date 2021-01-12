/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CollectionModelEntityModelProvActivityDto } from '../models/collection-model-entity-model-prov-activity-dto';
import { CollectionModelEntityModelProvAgentDto } from '../models/collection-model-entity-model-prov-agent-dto';
import { CollectionModelEntityModelProvDocumentDto } from '../models/collection-model-entity-model-prov-document-dto';
import { CollectionModelEntityModelProvEntityDto } from '../models/collection-model-entity-model-prov-entity-dto';
import { EntityModelProvActivityDto } from '../models/entity-model-prov-activity-dto';
import { EntityModelProvAgentDto } from '../models/entity-model-prov-agent-dto';
import { EntityModelProvDocumentDto } from '../models/entity-model-prov-document-dto';
import { EntityModelProvEntityDto } from '../models/entity-model-prov-entity-dto';
import { EntityModelProvNamespaceDto } from '../models/entity-model-prov-namespace-dto';
import { ProvActivityDto } from '../models/prov-activity-dto';
import { ProvAgentDto } from '../models/prov-agent-dto';
import { ProvEntityDto } from '../models/prov-entity-dto';
import { ProvNamespaceDto } from '../models/prov-namespace-dto';
import { QualifiedName } from '../models/qualified-name';
import { RepresentationModelObject } from '../models/representation-model-object';

@Injectable({
  providedIn: 'root',
})
export class ProvenanceDocumentService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getProvenanceDocuments
   */
  static readonly GetProvenanceDocumentsPath = '/provenance-documents';

  /**
   * Retrieve all stored PROV documents.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvenanceDocuments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvenanceDocuments$Response(params?: {

  }): Observable<StrictHttpResponse<CollectionModelEntityModelProvDocumentDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.GetProvenanceDocumentsPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelProvDocumentDto>;
      })
    );
  }

  /**
   * Retrieve all stored PROV documents.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvenanceDocuments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvenanceDocuments(params?: {

  }): Observable<CollectionModelEntityModelProvDocumentDto> {

    return this.getProvenanceDocuments$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelProvDocumentDto>) => r.body as CollectionModelEntityModelProvDocumentDto)
    );
  }

  /**
   * Path part for operation createProvDocument
   */
  static readonly CreateProvDocumentPath = '/provenance-documents';

  /**
   * Create a new PROV document and return the link which can then be used to retrieve, update, and delete it.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProvDocument()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProvDocument$Response(params?: {
    format?: 'PROVN' | 'XML' | 'TURTLE' | 'RDFXML' | 'TRIG' | 'JSON' | 'JSONLD' | 'DOT' | 'JPEG' | 'PNG' | 'SVG' | 'PDF';
      body?: { 'file'?: Blob }
  }): Observable<StrictHttpResponse<EntityModelProvDocumentDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.CreateProvDocumentPath, 'post');
    if (params) {

      rb.query('format', params.format, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelProvDocumentDto>;
      })
    );
  }

  /**
   * Create a new PROV document and return the link which can then be used to retrieve, update, and delete it.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createProvDocument$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProvDocument(params?: {
    format?: 'PROVN' | 'XML' | 'TURTLE' | 'RDFXML' | 'TRIG' | 'JSON' | 'JSONLD' | 'DOT' | 'JPEG' | 'PNG' | 'SVG' | 'PDF';
      body?: { 'file'?: Blob }
  }): Observable<EntityModelProvDocumentDto> {

    return this.createProvDocument$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvDocumentDto>) => r.body as EntityModelProvDocumentDto)
    );
  }

  /**
   * Path part for operation getProvDocument
   */
  static readonly GetProvDocumentPath = '/provenance-documents/{provDocumentId}';

  /**
   * Retrieve a specific PROV document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvDocument()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvDocument$Response(params: {
    provDocumentId: number;

  }): Observable<StrictHttpResponse<EntityModelProvDocumentDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.GetProvDocumentPath, 'get');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelProvDocumentDto>;
      })
    );
  }

  /**
   * Retrieve a specific PROV document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvDocument$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvDocument(params: {
    provDocumentId: number;

  }): Observable<EntityModelProvDocumentDto> {

    return this.getProvDocument$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvDocumentDto>) => r.body as EntityModelProvDocumentDto)
    );
  }

  /**
   * Path part for operation deleteProvDocument
   */
  static readonly DeleteProvDocumentPath = '/provenance-documents/{provDocumentId}';

  /**
   * Delete a PROV document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProvDocument()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProvDocument$Response(params: {
    provDocumentId: number;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.DeleteProvDocumentPath, 'delete');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});

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
   * Delete a PROV document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteProvDocument$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProvDocument(params: {
    provDocumentId: number;

  }): Observable<void> {

    return this.deleteProvDocument$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProvActivities
   */
  static readonly GetProvActivitiesPath = '/provenance-documents/{provDocumentId}/activities';

  /**
   * Retrieve all PROV activities of the PROV document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvActivities()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvActivities$Response(params: {
    provDocumentId: number;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelProvActivityDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.GetProvActivitiesPath, 'get');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelProvActivityDto>;
      })
    );
  }

  /**
   * Retrieve all PROV activities of the PROV document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvActivities$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvActivities(params: {
    provDocumentId: number;

  }): Observable<CollectionModelEntityModelProvActivityDto> {

    return this.getProvActivities$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelProvActivityDto>) => r.body as CollectionModelEntityModelProvActivityDto)
    );
  }

  /**
   * Path part for operation addProvActivityToDocument
   */
  static readonly AddProvActivityToDocumentPath = '/provenance-documents/{provDocumentId}/activities';

  /**
   * Create a new PROV activity in the specified PROV document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addProvActivityToDocument()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProvActivityToDocument$Response(params: {
    provDocumentId: number;
      body: QualifiedName
  }): Observable<StrictHttpResponse<EntityModelProvActivityDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.AddProvActivityToDocumentPath, 'post');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelProvActivityDto>;
      })
    );
  }

  /**
   * Create a new PROV activity in the specified PROV document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addProvActivityToDocument$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProvActivityToDocument(params: {
    provDocumentId: number;
      body: QualifiedName
  }): Observable<EntityModelProvActivityDto> {

    return this.addProvActivityToDocument$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvActivityDto>) => r.body as EntityModelProvActivityDto)
    );
  }

  /**
   * Path part for operation getProvActivity
   */
  static readonly GetProvActivityPath = '/provenance-documents/{provDocumentId}/activities/{provActitvityId}';

  /**
   * Retrieve a specific PROV activity.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvActivity()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvActivity$Response(params: {
    provDocumentId: number;
    provActitvityId: number;

  }): Observable<StrictHttpResponse<EntityModelProvActivityDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.GetProvActivityPath, 'get');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});
      rb.path('provActitvityId', params.provActitvityId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelProvActivityDto>;
      })
    );
  }

  /**
   * Retrieve a specific PROV activity.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvActivity$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvActivity(params: {
    provDocumentId: number;
    provActitvityId: number;

  }): Observable<EntityModelProvActivityDto> {

    return this.getProvActivity$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvActivityDto>) => r.body as EntityModelProvActivityDto)
    );
  }

  /**
   * Path part for operation deleteProvActivity
   */
  static readonly DeleteProvActivityPath = '/provenance-documents/{provDocumentId}/activities/{provActitvityId}';

  /**
   * Delete a PROV activity.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProvActivity()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProvActivity$Response(params: {
    provDocumentId: number;
    provActitvityId: number;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.DeleteProvActivityPath, 'delete');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});
      rb.path('provActitvityId', params.provActitvityId, {});

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
   * Delete a PROV activity.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteProvActivity$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProvActivity(params: {
    provDocumentId: number;
    provActitvityId: number;

  }): Observable<void> {

    return this.deleteProvActivity$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation setProvActivity
   */
  static readonly SetProvActivityPath = '/provenance-documents/{provDocumentId}/activities/{provActivityId}';

  /**
   * Update the activity in a specific PROV document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setProvActivity()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setProvActivity$Response(params: {
    provDocumentId: number;
    provActivityId: number;
      body: ProvActivityDto
  }): Observable<StrictHttpResponse<EntityModelProvActivityDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.SetProvActivityPath, 'put');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});
      rb.path('provActivityId', params.provActivityId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelProvActivityDto>;
      })
    );
  }

  /**
   * Update the activity in a specific PROV document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setProvActivity$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setProvActivity(params: {
    provDocumentId: number;
    provActivityId: number;
      body: ProvActivityDto
  }): Observable<EntityModelProvActivityDto> {

    return this.setProvActivity$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvActivityDto>) => r.body as EntityModelProvActivityDto)
    );
  }

  /**
   * Path part for operation getProvAgents
   */
  static readonly GetProvAgentsPath = '/provenance-documents/{provDocumentId}/agents';

  /**
   * Retrieve all PROV agents of the PROV document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvAgents()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvAgents$Response(params: {
    provDocumentId: number;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelProvAgentDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.GetProvAgentsPath, 'get');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelProvAgentDto>;
      })
    );
  }

  /**
   * Retrieve all PROV agents of the PROV document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvAgents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvAgents(params: {
    provDocumentId: number;

  }): Observable<CollectionModelEntityModelProvAgentDto> {

    return this.getProvAgents$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelProvAgentDto>) => r.body as CollectionModelEntityModelProvAgentDto)
    );
  }

  /**
   * Path part for operation addProvAgentToDocument
   */
  static readonly AddProvAgentToDocumentPath = '/provenance-documents/{provDocumentId}/agents';

  /**
   * Create a new PROV agent in the specified PROV document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addProvAgentToDocument()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProvAgentToDocument$Response(params: {
    provDocumentId: number;
      body: QualifiedName
  }): Observable<StrictHttpResponse<EntityModelProvAgentDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.AddProvAgentToDocumentPath, 'post');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelProvAgentDto>;
      })
    );
  }

  /**
   * Create a new PROV agent in the specified PROV document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addProvAgentToDocument$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProvAgentToDocument(params: {
    provDocumentId: number;
      body: QualifiedName
  }): Observable<EntityModelProvAgentDto> {

    return this.addProvAgentToDocument$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvAgentDto>) => r.body as EntityModelProvAgentDto)
    );
  }

  /**
   * Path part for operation getProvAgent
   */
  static readonly GetProvAgentPath = '/provenance-documents/{provDocumentId}/agents/{provAgentId}';

  /**
   * Retrieve a specific PROV agent.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvAgent()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvAgent$Response(params: {
    provDocumentId: number;
    provAgentId: number;

  }): Observable<StrictHttpResponse<EntityModelProvAgentDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.GetProvAgentPath, 'get');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});
      rb.path('provAgentId', params.provAgentId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelProvAgentDto>;
      })
    );
  }

  /**
   * Retrieve a specific PROV agent.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvAgent$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvAgent(params: {
    provDocumentId: number;
    provAgentId: number;

  }): Observable<EntityModelProvAgentDto> {

    return this.getProvAgent$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvAgentDto>) => r.body as EntityModelProvAgentDto)
    );
  }

  /**
   * Path part for operation setProvAgent
   */
  static readonly SetProvAgentPath = '/provenance-documents/{provDocumentId}/agents/{provAgentId}';

  /**
   * Update the agent in a specific PROV document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setProvAgent()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setProvAgent$Response(params: {
    provDocumentId: number;
    provAgentId: number;
      body: ProvAgentDto
  }): Observable<StrictHttpResponse<EntityModelProvAgentDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.SetProvAgentPath, 'put');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});
      rb.path('provAgentId', params.provAgentId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelProvAgentDto>;
      })
    );
  }

  /**
   * Update the agent in a specific PROV document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setProvAgent$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setProvAgent(params: {
    provDocumentId: number;
    provAgentId: number;
      body: ProvAgentDto
  }): Observable<EntityModelProvAgentDto> {

    return this.setProvAgent$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvAgentDto>) => r.body as EntityModelProvAgentDto)
    );
  }

  /**
   * Path part for operation deleteProvAgent
   */
  static readonly DeleteProvAgentPath = '/provenance-documents/{provDocumentId}/agents/{provAgentId}';

  /**
   * Delete a PROV agent.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProvAgent()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProvAgent$Response(params: {
    provDocumentId: number;
    provAgentId: number;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.DeleteProvAgentPath, 'delete');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});
      rb.path('provAgentId', params.provAgentId, {});

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
   * Delete a PROV agent.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteProvAgent$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProvAgent(params: {
    provDocumentId: number;
    provAgentId: number;

  }): Observable<void> {

    return this.deleteProvAgent$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProvEntities
   */
  static readonly GetProvEntitiesPath = '/provenance-documents/{provDocumentId}/entities';

  /**
   * Retrieve all PROV entities of the PROV document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvEntities()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvEntities$Response(params: {
    provDocumentId: number;

  }): Observable<StrictHttpResponse<CollectionModelEntityModelProvEntityDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.GetProvEntitiesPath, 'get');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelProvEntityDto>;
      })
    );
  }

  /**
   * Retrieve all PROV entities of the PROV document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvEntities$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvEntities(params: {
    provDocumentId: number;

  }): Observable<CollectionModelEntityModelProvEntityDto> {

    return this.getProvEntities$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelProvEntityDto>) => r.body as CollectionModelEntityModelProvEntityDto)
    );
  }

  /**
   * Path part for operation addProvEntityToDocument
   */
  static readonly AddProvEntityToDocumentPath = '/provenance-documents/{provDocumentId}/entities';

  /**
   * Create a new PROV entity in the specified PROV document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addProvEntityToDocument()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProvEntityToDocument$Response(params: {
    provDocumentId: number;
      body: QualifiedName
  }): Observable<StrictHttpResponse<EntityModelProvEntityDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.AddProvEntityToDocumentPath, 'post');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelProvEntityDto>;
      })
    );
  }

  /**
   * Create a new PROV entity in the specified PROV document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addProvEntityToDocument$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProvEntityToDocument(params: {
    provDocumentId: number;
      body: QualifiedName
  }): Observable<EntityModelProvEntityDto> {

    return this.addProvEntityToDocument$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvEntityDto>) => r.body as EntityModelProvEntityDto)
    );
  }

  /**
   * Path part for operation getProvEntity
   */
  static readonly GetProvEntityPath = '/provenance-documents/{provDocumentId}/entities/{provEntityId}';

  /**
   * Retrieve a specific PROV entity.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvEntity()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvEntity$Response(params: {
    provDocumentId: number;
    provEntityId: number;

  }): Observable<StrictHttpResponse<EntityModelProvEntityDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.GetProvEntityPath, 'get');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});
      rb.path('provEntityId', params.provEntityId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelProvEntityDto>;
      })
    );
  }

  /**
   * Retrieve a specific PROV entity.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvEntity$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvEntity(params: {
    provDocumentId: number;
    provEntityId: number;

  }): Observable<EntityModelProvEntityDto> {

    return this.getProvEntity$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvEntityDto>) => r.body as EntityModelProvEntityDto)
    );
  }

  /**
   * Path part for operation setProvEntity
   */
  static readonly SetProvEntityPath = '/provenance-documents/{provDocumentId}/entities/{provEntityId}';

  /**
   * Update the entity in a specific PROV document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setProvEntity()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setProvEntity$Response(params: {
    provDocumentId: number;
    provEntityId: number;
      body: ProvEntityDto
  }): Observable<StrictHttpResponse<EntityModelProvEntityDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.SetProvEntityPath, 'put');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});
      rb.path('provEntityId', params.provEntityId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelProvEntityDto>;
      })
    );
  }

  /**
   * Update the entity in a specific PROV document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setProvEntity$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setProvEntity(params: {
    provDocumentId: number;
    provEntityId: number;
      body: ProvEntityDto
  }): Observable<EntityModelProvEntityDto> {

    return this.setProvEntity$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvEntityDto>) => r.body as EntityModelProvEntityDto)
    );
  }

  /**
   * Path part for operation deleteProvEntity
   */
  static readonly DeleteProvEntityPath = '/provenance-documents/{provDocumentId}/entities/{provEntityId}';

  /**
   * Delete a PROV entity.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProvEntity()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProvEntity$Response(params: {
    provDocumentId: number;
    provEntityId: number;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.DeleteProvEntityPath, 'delete');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});
      rb.path('provEntityId', params.provEntityId, {});

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
   * Delete a PROV entity.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteProvEntity$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProvEntity(params: {
    provDocumentId: number;
    provEntityId: number;

  }): Observable<void> {

    return this.deleteProvEntity$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProvDocumentJpeg
   */
  static readonly GetProvDocumentJpegPath = '/provenance-documents/{provDocumentId}/jpeg';

  /**
   * Retrieve a specific PROV document and return it as JPEG image.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvDocumentJpeg()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvDocumentJpeg$Response(params: {
    provDocumentId: number;

  }): Observable<StrictHttpResponse<RepresentationModelObject>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.GetProvDocumentJpegPath, 'get');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RepresentationModelObject>;
      })
    );
  }

  /**
   * Retrieve a specific PROV document and return it as JPEG image.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvDocumentJpeg$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvDocumentJpeg(params: {
    provDocumentId: number;

  }): Observable<RepresentationModelObject> {

    return this.getProvDocumentJpeg$Response(params).pipe(
      map((r: StrictHttpResponse<RepresentationModelObject>) => r.body as RepresentationModelObject)
    );
  }

  /**
   * Path part for operation getProvNamespace
   */
  static readonly GetProvNamespacePath = '/provenance-documents/{provDocumentId}/namespace';

  /**
   * Retrieve the namespace of a specific PROV document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvNamespace()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvNamespace$Response(params: {
    provDocumentId: number;

  }): Observable<StrictHttpResponse<EntityModelProvNamespaceDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.GetProvNamespacePath, 'get');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelProvNamespaceDto>;
      })
    );
  }

  /**
   * Retrieve the namespace of a specific PROV document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvNamespace$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvNamespace(params: {
    provDocumentId: number;

  }): Observable<EntityModelProvNamespaceDto> {

    return this.getProvNamespace$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvNamespaceDto>) => r.body as EntityModelProvNamespaceDto)
    );
  }

  /**
   * Path part for operation setProvNamespace
   */
  static readonly SetProvNamespacePath = '/provenance-documents/{provDocumentId}/namespace';

  /**
   * Update the namespace of a specific PROV document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setProvNamespace()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setProvNamespace$Response(params: {
    provDocumentId: number;
      body: ProvNamespaceDto
  }): Observable<StrictHttpResponse<EntityModelProvNamespaceDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.SetProvNamespacePath, 'put');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelProvNamespaceDto>;
      })
    );
  }

  /**
   * Update the namespace of a specific PROV document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setProvNamespace$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setProvNamespace(params: {
    provDocumentId: number;
      body: ProvNamespaceDto
  }): Observable<EntityModelProvNamespaceDto> {

    return this.setProvNamespace$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvNamespaceDto>) => r.body as EntityModelProvNamespaceDto)
    );
  }

  /**
   * Path part for operation getProvDocumentPdf
   */
  static readonly GetProvDocumentPdfPath = '/provenance-documents/{provDocumentId}/pdf';

  /**
   * Retrieve a specific PROV document and return it as PDF.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvDocumentPdf()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvDocumentPdf$Response(params: {
    provDocumentId: number;

  }): Observable<StrictHttpResponse<RepresentationModelObject>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.GetProvDocumentPdfPath, 'get');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RepresentationModelObject>;
      })
    );
  }

  /**
   * Retrieve a specific PROV document and return it as PDF.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvDocumentPdf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvDocumentPdf(params: {
    provDocumentId: number;

  }): Observable<RepresentationModelObject> {

    return this.getProvDocumentPdf$Response(params).pipe(
      map((r: StrictHttpResponse<RepresentationModelObject>) => r.body as RepresentationModelObject)
    );
  }

  /**
   * Path part for operation getProvDocumentXml
   */
  static readonly GetProvDocumentXmlPath = '/provenance-documents/{provDocumentId}/xml-document';

  /**
   * Retrieve a specific PROV document and return it as serialized XML document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvDocumentXml()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvDocumentXml$Response(params: {
    provDocumentId: number;

  }): Observable<StrictHttpResponse<RepresentationModelObject>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceDocumentService.GetProvDocumentXmlPath, 'get');
    if (params) {

      rb.path('provDocumentId', params.provDocumentId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RepresentationModelObject>;
      })
    );
  }

  /**
   * Retrieve a specific PROV document and return it as serialized XML document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvDocumentXml$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvDocumentXml(params: {
    provDocumentId: number;

  }): Observable<RepresentationModelObject> {

    return this.getProvDocumentXml$Response(params).pipe(
      map((r: StrictHttpResponse<RepresentationModelObject>) => r.body as RepresentationModelObject)
    );
  }

}
