/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CollectionModelEntityModelCalibrationMatrixDto } from '../models/collection-model-entity-model-calibration-matrix-dto';
import { CollectionModelEntityModelGateCharacteristicsDto } from '../models/collection-model-entity-model-gate-characteristics-dto';
import { CollectionModelEntityModelGateDto } from '../models/collection-model-entity-model-gate-dto';
import { CollectionModelEntityModelProviderDto } from '../models/collection-model-entity-model-provider-dto';
import { CollectionModelEntityModelQpuDto } from '../models/collection-model-entity-model-qpu-dto';
import { CollectionModelEntityModelQubitCharacteristicsDto } from '../models/collection-model-entity-model-qubit-characteristics-dto';
import { CollectionModelEntityModelQubitDto } from '../models/collection-model-entity-model-qubit-dto';
import { EntityModelGateDto } from '../models/entity-model-gate-dto';
import { EntityModelProviderDto } from '../models/entity-model-provider-dto';
import { EntityModelQpuDto } from '../models/entity-model-qpu-dto';
import { EntityModelQubitDto } from '../models/entity-model-qubit-dto';
import { RepresentationModelObject } from '../models/representation-model-object';

@Injectable({
  providedIn: 'root',
})
export class ProviderService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getProviders
   */
  static readonly GetProvidersPath = '/providers';

  /**
   * Retrieve all quantum hardware providers.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProviders()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProviders$Response(params?: {}): Observable<
    StrictHttpResponse<CollectionModelEntityModelProviderDto>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProviderService.GetProvidersPath,
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
          return r as StrictHttpResponse<CollectionModelEntityModelProviderDto>;
        })
      );
  }

  /**
   * Retrieve all quantum hardware providers.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProviders$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProviders(params?: {}): Observable<CollectionModelEntityModelProviderDto> {
    return this.getProviders$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CollectionModelEntityModelProviderDto>) =>
          r.body as CollectionModelEntityModelProviderDto
      )
    );
  }

  /**
   * Path part for operation getProvider
   */
  static readonly GetProviderPath = '/providers/{providerId}';

  /**
   * Retrieve a specific provider and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvider()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvider$Response(params: {
    providerId: string;
  }): Observable<StrictHttpResponse<EntityModelProviderDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProviderService.GetProviderPath,
      'get'
    );
    if (params) {
      rb.path('providerId', params.providerId, {});
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
          return r as StrictHttpResponse<EntityModelProviderDto>;
        })
      );
  }

  /**
   * Retrieve a specific provider and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProvider$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvider(params: {
    providerId: string;
  }): Observable<EntityModelProviderDto> {
    return this.getProvider$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelProviderDto>) =>
          r.body as EntityModelProviderDto
      )
    );
  }

  /**
   * Path part for operation getQpUs
   */
  static readonly GetQpUsPath = '/providers/{providerId}/qpus';

  /**
   * Retrieve all QPUs of the provider.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQpUs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQpUs$Response(params: {
    providerId: string;
  }): Observable<StrictHttpResponse<CollectionModelEntityModelQpuDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProviderService.GetQpUsPath,
      'get'
    );
    if (params) {
      rb.path('providerId', params.providerId, {});
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
          return r as StrictHttpResponse<CollectionModelEntityModelQpuDto>;
        })
      );
  }

  /**
   * Retrieve all QPUs of the provider.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQpUs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQpUs(params: {
    providerId: string;
  }): Observable<CollectionModelEntityModelQpuDto> {
    return this.getQpUs$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CollectionModelEntityModelQpuDto>) =>
          r.body as CollectionModelEntityModelQpuDto
      )
    );
  }

  /**
   * Path part for operation getQpu
   */
  static readonly GetQpuPath = '/providers/{providerId}/qpus/{qpuId}';

  /**
   * Retrieve a specific QPU and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQpu()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQpu$Response(params: {
    providerId: string;
    qpuId: string;
  }): Observable<StrictHttpResponse<EntityModelQpuDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProviderService.GetQpuPath,
      'get'
    );
    if (params) {
      rb.path('providerId', params.providerId, {});
      rb.path('qpuId', params.qpuId, {});
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
          return r as StrictHttpResponse<EntityModelQpuDto>;
        })
      );
  }

  /**
   * Retrieve a specific QPU and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQpu$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQpu(params: {
    providerId: string;
    qpuId: string;
  }): Observable<EntityModelQpuDto> {
    return this.getQpu$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelQpuDto>) =>
          r.body as EntityModelQpuDto
      )
    );
  }

  /**
   * Path part for operation getLinksToAggregatedData
   */
  static readonly GetLinksToAggregatedDataPath =
    '/providers/{providerId}/qpus/{qpuId}/aggregated-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLinksToAggregatedData()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLinksToAggregatedData$Response(params: {
    providerId: string;
    qpuId: string;
  }): Observable<StrictHttpResponse<RepresentationModelObject>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProviderService.GetLinksToAggregatedDataPath,
      'get'
    );
    if (params) {
      rb.path('providerId', params.providerId, {});
      rb.path('qpuId', params.qpuId, {});
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
          return r as StrictHttpResponse<RepresentationModelObject>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLinksToAggregatedData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLinksToAggregatedData(params: {
    providerId: string;
    qpuId: string;
  }): Observable<RepresentationModelObject> {
    return this.getLinksToAggregatedData$Response(params).pipe(
      map(
        (r: StrictHttpResponse<RepresentationModelObject>) =>
          r.body as RepresentationModelObject
      )
    );
  }

  /**
   * Path part for operation getCalibrationMatrix
   */
  static readonly GetCalibrationMatrixPath =
    '/providers/{providerId}/qpus/{qpuId}/aggregated-data/calibration-matrix';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCalibrationMatrix()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCalibrationMatrix$Response(params: {
    providerId: string;
    qpuId: string;
    latest: boolean;
  }): Observable<
    StrictHttpResponse<CollectionModelEntityModelCalibrationMatrixDto>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProviderService.GetCalibrationMatrixPath,
      'get'
    );
    if (params) {
      rb.path('providerId', params.providerId, {});
      rb.path('qpuId', params.qpuId, {});
      rb.query('latest', params.latest, {});
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
          return r as StrictHttpResponse<
            CollectionModelEntityModelCalibrationMatrixDto
          >;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCalibrationMatrix$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCalibrationMatrix(params: {
    providerId: string;
    qpuId: string;
    latest: boolean;
  }): Observable<CollectionModelEntityModelCalibrationMatrixDto> {
    return this.getCalibrationMatrix$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<CollectionModelEntityModelCalibrationMatrixDto>
        ) => r.body as CollectionModelEntityModelCalibrationMatrixDto
      )
    );
  }

  /**
   * Path part for operation getQubits
   */
  static readonly GetQubitsPath = '/providers/{providerId}/qpus/{qpuId}/qubits';

  /**
   * Retrieve all Qubits of the QPU.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQubits()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQubits$Response(params: {
    providerId: string;
    qpuId: string;
  }): Observable<StrictHttpResponse<CollectionModelEntityModelQubitDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProviderService.GetQubitsPath,
      'get'
    );
    if (params) {
      rb.path('providerId', params.providerId, {});
      rb.path('qpuId', params.qpuId, {});
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
          return r as StrictHttpResponse<CollectionModelEntityModelQubitDto>;
        })
      );
  }

  /**
   * Retrieve all Qubits of the QPU.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQubits$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQubits(params: {
    providerId: string;
    qpuId: string;
  }): Observable<CollectionModelEntityModelQubitDto> {
    return this.getQubits$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CollectionModelEntityModelQubitDto>) =>
          r.body as CollectionModelEntityModelQubitDto
      )
    );
  }

  /**
   * Path part for operation getQubit
   */
  static readonly GetQubitPath =
    '/providers/{providerId}/qpus/{qpuId}/qubits/{qubitId}';

  /**
   * Retrieve a specific Qubit and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQubit()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQubit$Response(params: {
    providerId: string;
    qpuId: string;
    qubitId: string;
  }): Observable<StrictHttpResponse<EntityModelQubitDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProviderService.GetQubitPath,
      'get'
    );
    if (params) {
      rb.path('providerId', params.providerId, {});
      rb.path('qpuId', params.qpuId, {});
      rb.path('qubitId', params.qubitId, {});
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
          return r as StrictHttpResponse<EntityModelQubitDto>;
        })
      );
  }

  /**
   * Retrieve a specific Qubit and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQubit$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQubit(params: {
    providerId: string;
    qpuId: string;
    qubitId: string;
  }): Observable<EntityModelQubitDto> {
    return this.getQubit$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelQubitDto>) =>
          r.body as EntityModelQubitDto
      )
    );
  }

  /**
   * Path part for operation getQubitCharacterisitcs
   */
  static readonly GetQubitCharacterisitcsPath =
    '/providers/{providerId}/qpus/{qpuId}/qubits/{qubitId}/characteristics';

  /**
   * Retrieve the calibration characteristics from the given qubit. By using the latest parameter only the latest data is retrieved, otherwise all available data.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQubitCharacterisitcs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQubitCharacterisitcs$Response(params: {
    providerId: string;
    qpuId: string;
    qubitId: string;
    latest: boolean;
  }): Observable<
    StrictHttpResponse<CollectionModelEntityModelQubitCharacteristicsDto>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProviderService.GetQubitCharacterisitcsPath,
      'get'
    );
    if (params) {
      rb.path('providerId', params.providerId, {});
      rb.path('qpuId', params.qpuId, {});
      rb.path('qubitId', params.qubitId, {});
      rb.query('latest', params.latest, {});
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
          return r as StrictHttpResponse<
            CollectionModelEntityModelQubitCharacteristicsDto
          >;
        })
      );
  }

  /**
   * Retrieve the calibration characteristics from the given qubit. By using the latest parameter only the latest data is retrieved, otherwise all available data.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQubitCharacterisitcs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQubitCharacterisitcs(params: {
    providerId: string;
    qpuId: string;
    qubitId: string;
    latest: boolean;
  }): Observable<CollectionModelEntityModelQubitCharacteristicsDto> {
    return this.getQubitCharacterisitcs$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<
            CollectionModelEntityModelQubitCharacteristicsDto
          >
        ) => r.body as CollectionModelEntityModelQubitCharacteristicsDto
      )
    );
  }

  /**
   * Path part for operation getGates
   */
  static readonly GetGatesPath =
    '/providers/{providerId}/qpus/{qpuId}/qubits/{qubitId}/gates';

  /**
   * Retrieve all Gates that can be executed on the Qubit.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGates()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGates$Response(params: {
    providerId: string;
    qpuId: string;
    qubitId: string;
  }): Observable<StrictHttpResponse<CollectionModelEntityModelGateDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProviderService.GetGatesPath,
      'get'
    );
    if (params) {
      rb.path('providerId', params.providerId, {});
      rb.path('qpuId', params.qpuId, {});
      rb.path('qubitId', params.qubitId, {});
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
          return r as StrictHttpResponse<CollectionModelEntityModelGateDto>;
        })
      );
  }

  /**
   * Retrieve all Gates that can be executed on the Qubit.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getGates$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGates(params: {
    providerId: string;
    qpuId: string;
    qubitId: string;
  }): Observable<CollectionModelEntityModelGateDto> {
    return this.getGates$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CollectionModelEntityModelGateDto>) =>
          r.body as CollectionModelEntityModelGateDto
      )
    );
  }

  /**
   * Path part for operation getGate
   */
  static readonly GetGatePath =
    '/providers/{providerId}/qpus/{qpuId}/qubits/{qubitId}/gates/{gateId}';

  /**
   * Retrieve a specific Qubit and its basic properties.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGate$Response(params: {
    providerId: string;
    qpuId: string;
    qubitId: string;
    gateId: string;
  }): Observable<StrictHttpResponse<EntityModelGateDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProviderService.GetGatePath,
      'get'
    );
    if (params) {
      rb.path('providerId', params.providerId, {});
      rb.path('qpuId', params.qpuId, {});
      rb.path('qubitId', params.qubitId, {});
      rb.path('gateId', params.gateId, {});
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
          return r as StrictHttpResponse<EntityModelGateDto>;
        })
      );
  }

  /**
   * Retrieve a specific Qubit and its basic properties.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getGate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGate(params: {
    providerId: string;
    qpuId: string;
    qubitId: string;
    gateId: string;
  }): Observable<EntityModelGateDto> {
    return this.getGate$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelGateDto>) =>
          r.body as EntityModelGateDto
      )
    );
  }

  /**
   * Path part for operation getGateCharacterisitcs
   */
  static readonly GetGateCharacterisitcsPath =
    '/providers/{providerId}/qpus/{qpuId}/qubits/{qubitId}/gates/{gateId}/characteristics';

  /**
   * Retrieve the calibration characteristics from the given gate. By using the latest parameter only the latest data is retrieved, otherwise all available data.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGateCharacterisitcs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGateCharacterisitcs$Response(params: {
    providerId: string;
    qpuId: string;
    qubitId: string;
    gateId: string;
    latest: boolean;
  }): Observable<
    StrictHttpResponse<CollectionModelEntityModelGateCharacteristicsDto>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProviderService.GetGateCharacterisitcsPath,
      'get'
    );
    if (params) {
      rb.path('providerId', params.providerId, {});
      rb.path('qpuId', params.qpuId, {});
      rb.path('qubitId', params.qubitId, {});
      rb.path('gateId', params.gateId, {});
      rb.query('latest', params.latest, {});
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
          return r as StrictHttpResponse<
            CollectionModelEntityModelGateCharacteristicsDto
          >;
        })
      );
  }

  /**
   * Retrieve the calibration characteristics from the given gate. By using the latest parameter only the latest data is retrieved, otherwise all available data.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getGateCharacterisitcs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGateCharacterisitcs(params: {
    providerId: string;
    qpuId: string;
    qubitId: string;
    gateId: string;
    latest: boolean;
  }): Observable<CollectionModelEntityModelGateCharacteristicsDto> {
    return this.getGateCharacterisitcs$Response(params).pipe(
      map(
        (
          r: StrictHttpResponse<
            CollectionModelEntityModelGateCharacteristicsDto
          >
        ) => r.body as CollectionModelEntityModelGateCharacteristicsDto
      )
    );
  }
}
