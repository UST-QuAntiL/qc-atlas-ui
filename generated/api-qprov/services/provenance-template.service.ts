/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CollectionModelEntityModelProvDocumentDto } from '../models/collection-model-entity-model-prov-document-dto';
import { EntityModelProvDocumentDto } from '../models/entity-model-prov-document-dto';
import { RepresentationModelObject } from '../models/representation-model-object';

@Injectable({
  providedIn: 'root',
})
export class ProvenanceTemplateService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getProvenanceTemplates
   */
  static readonly GetProvenanceTemplatesPath = '/provenance-templates';

  /**
   * Retrieve all stored PROV templates.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvenanceTemplates()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvenanceTemplates$Response(params?: {

  }): Observable<StrictHttpResponse<CollectionModelEntityModelProvDocumentDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceTemplateService.GetProvenanceTemplatesPath, 'get');
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
   * Retrieve all stored PROV templates.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvenanceTemplates$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvenanceTemplates(params?: {

  }): Observable<CollectionModelEntityModelProvDocumentDto> {

    return this.getProvenanceTemplates$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelProvDocumentDto>) => r.body as CollectionModelEntityModelProvDocumentDto)
    );
  }

  /**
   * Path part for operation handleProvTemplateUpload
   */
  static readonly HandleProvTemplateUploadPath = '/provenance-templates';

  /**
   * Create a new PROV template by uploading the corresponding file.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `handleProvTemplateUpload()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  handleProvTemplateUpload$Response(params: {
    format: 'PROVN' | 'XML' | 'TURTLE' | 'RDFXML' | 'TRIG' | 'JSON' | 'JSONLD' | 'DOT' | 'JPEG' | 'PNG' | 'SVG' | 'PDF';
      body?: { 'file'?: Blob }
  }): Observable<StrictHttpResponse<EntityModelProvDocumentDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceTemplateService.HandleProvTemplateUploadPath, 'post');
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
   * Create a new PROV template by uploading the corresponding file.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `handleProvTemplateUpload$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  handleProvTemplateUpload(params: {
    format: 'PROVN' | 'XML' | 'TURTLE' | 'RDFXML' | 'TRIG' | 'JSON' | 'JSONLD' | 'DOT' | 'JPEG' | 'PNG' | 'SVG' | 'PDF';
      body?: { 'file'?: Blob }
  }): Observable<EntityModelProvDocumentDto> {

    return this.handleProvTemplateUpload$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvDocumentDto>) => r.body as EntityModelProvDocumentDto)
    );
  }

  /**
   * Path part for operation getProvTemplate
   */
  static readonly GetProvTemplatePath = '/provenance-templates/{provTemplateId}';

  /**
   * Retrieve a specific PROV template.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvTemplate$Response(params: {
    provTemplateId: number;

  }): Observable<StrictHttpResponse<EntityModelProvDocumentDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceTemplateService.GetProvTemplatePath, 'get');
    if (params) {

      rb.path('provTemplateId', params.provTemplateId, {});

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
   * Retrieve a specific PROV template.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvTemplate(params: {
    provTemplateId: number;

  }): Observable<EntityModelProvDocumentDto> {

    return this.getProvTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelProvDocumentDto>) => r.body as EntityModelProvDocumentDto)
    );
  }

  /**
   * Path part for operation deleteProvTemplate
   */
  static readonly DeleteProvTemplatePath = '/provenance-templates/{provTemplateId}';

  /**
   * Delete a PROV template.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProvTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProvTemplate$Response(params: {
    provTemplateId: number;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceTemplateService.DeleteProvTemplatePath, 'delete');
    if (params) {

      rb.path('provTemplateId', params.provTemplateId, {});

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
   * Delete a PROV template.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteProvTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProvTemplate(params: {
    provTemplateId: number;

  }): Observable<void> {

    return this.deleteProvTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProvTemplateJpeg
   */
  static readonly GetProvTemplateJpegPath = '/provenance-templates/{provTemplateId}/jpeg';

  /**
   * Retrieve a specific PROV template and return it as JPEG image.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvTemplateJpeg()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvTemplateJpeg$Response(params: {
    provTemplateId: number;

  }): Observable<StrictHttpResponse<RepresentationModelObject>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceTemplateService.GetProvTemplateJpegPath, 'get');
    if (params) {

      rb.path('provTemplateId', params.provTemplateId, {});

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
   * Retrieve a specific PROV template and return it as JPEG image.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvTemplateJpeg$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvTemplateJpeg(params: {
    provTemplateId: number;

  }): Observable<RepresentationModelObject> {

    return this.getProvTemplateJpeg$Response(params).pipe(
      map((r: StrictHttpResponse<RepresentationModelObject>) => r.body as RepresentationModelObject)
    );
  }

  /**
   * Path part for operation getProvTemplateParameters
   */
  static readonly GetProvTemplateParametersPath = '/provenance-templates/{provTemplateId}/parameters';

  /**
   * Retrieve the parameters that are required to instantiate a PROV document from a PROV template.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvTemplateParameters()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvTemplateParameters$Response(params: {
    provTemplateId: number;

  }): Observable<StrictHttpResponse<RepresentationModelObject>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceTemplateService.GetProvTemplateParametersPath, 'get');
    if (params) {

      rb.path('provTemplateId', params.provTemplateId, {});

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
   * Retrieve the parameters that are required to instantiate a PROV document from a PROV template.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvTemplateParameters$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvTemplateParameters(params: {
    provTemplateId: number;

  }): Observable<RepresentationModelObject> {

    return this.getProvTemplateParameters$Response(params).pipe(
      map((r: StrictHttpResponse<RepresentationModelObject>) => r.body as RepresentationModelObject)
    );
  }

  /**
   * Path part for operation getProvTemplatePdf
   */
  static readonly GetProvTemplatePdfPath = '/provenance-templates/{provTemplateId}/pdf';

  /**
   * Retrieve a specific PROV template and return it as PDF.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvTemplatePdf()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvTemplatePdf$Response(params: {
    provTemplateId: number;

  }): Observable<StrictHttpResponse<RepresentationModelObject>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceTemplateService.GetProvTemplatePdfPath, 'get');
    if (params) {

      rb.path('provTemplateId', params.provTemplateId, {});

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
   * Retrieve a specific PROV template and return it as PDF.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvTemplatePdf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvTemplatePdf(params: {
    provTemplateId: number;

  }): Observable<RepresentationModelObject> {

    return this.getProvTemplatePdf$Response(params).pipe(
      map((r: StrictHttpResponse<RepresentationModelObject>) => r.body as RepresentationModelObject)
    );
  }

  /**
   * Path part for operation getProvTemplateXml
   */
  static readonly GetProvTemplateXmlPath = '/provenance-templates/{provTemplateId}/xml-document';

  /**
   * Retrieve a specific PROV template and return it as serialized XML document.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvTemplateXml()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvTemplateXml$Response(params: {
    provTemplateId: number;

  }): Observable<StrictHttpResponse<RepresentationModelObject>> {

    const rb = new RequestBuilder(this.rootUrl, ProvenanceTemplateService.GetProvTemplateXmlPath, 'get');
    if (params) {

      rb.path('provTemplateId', params.provTemplateId, {});

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
   * Retrieve a specific PROV template and return it as serialized XML document.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvTemplateXml$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvTemplateXml(params: {
    provTemplateId: number;

  }): Observable<RepresentationModelObject> {

    return this.getProvTemplateXml$Response(params).pipe(
      map((r: StrictHttpResponse<RepresentationModelObject>) => r.body as RepresentationModelObject)
    );
  }

}
