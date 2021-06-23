/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CollectionModelConcreteSolution } from '../models/collection-model-concrete-solution';
import { CollectionModelEntityModelDesignModel } from '../models/collection-model-entity-model-design-model';
import { CollectionModelEntityModelEdgeDto } from '../models/collection-model-entity-model-edge-dto';
import { CollectionModelEntityModelPatternInstanceDto } from '../models/collection-model-entity-model-pattern-instance-dto';
import { DesignModel } from '../models/design-model';
import { EdgeDto } from '../models/edge-dto';
import { EntityModelDesignModel } from '../models/entity-model-design-model';
import { EntityModelMapStringListString } from '../models/entity-model-map-string-list-string';
import { FileDto } from '../models/file-dto';
import { Pattern } from '../models/pattern';
import { PositionDto } from '../models/position-dto';

@Injectable({
  providedIn: 'root',
})
export class DesignModelControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getDesignModels
   */
  static readonly GetDesignModelsPath = '/design-models';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDesignModels()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDesignModels$Response(params?: {}): Observable<
    StrictHttpResponse<CollectionModelEntityModelDesignModel>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelControllerService.GetDesignModelsPath,
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
          return r as StrictHttpResponse<CollectionModelEntityModelDesignModel>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDesignModels$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDesignModels(params?: {}): Observable<
    CollectionModelEntityModelDesignModel
  > {
    return this.getDesignModels$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CollectionModelEntityModelDesignModel>) =>
          r.body as CollectionModelEntityModelDesignModel
      )
    );
  }

  /**
   * Path part for operation createDesignModel
   */
  static readonly CreateDesignModelPath = '/design-models';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDesignModel()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDesignModel$Response(params: {
    body: DesignModel;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelControllerService.CreateDesignModelPath,
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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createDesignModel$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDesignModel(params: { body: DesignModel }): Observable<{}> {
    return this.createDesignModel$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getDesignModelPatternEdgeTypes
   */
  static readonly GetDesignModelPatternEdgeTypesPath =
    '/design-models/edge-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDesignModelPatternEdgeTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDesignModelPatternEdgeTypes$Response(params?: {}): Observable<
    StrictHttpResponse<EntityModelMapStringListString>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelControllerService.GetDesignModelPatternEdgeTypesPath,
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
          return r as StrictHttpResponse<EntityModelMapStringListString>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDesignModelPatternEdgeTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDesignModelPatternEdgeTypes(params?: {}): Observable<
    EntityModelMapStringListString
  > {
    return this.getDesignModelPatternEdgeTypes$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelMapStringListString>) =>
          r.body as EntityModelMapStringListString
      )
    );
  }

  /**
   * Path part for operation getDesignModel
   */
  static readonly GetDesignModelPath = '/design-models/{designModelId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDesignModel()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDesignModel$Response(params: {
    designModelId: string;
  }): Observable<StrictHttpResponse<EntityModelDesignModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelControllerService.GetDesignModelPath,
      'get'
    );
    if (params) {
      rb.path('designModelId', params.designModelId, {});
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
          return r as StrictHttpResponse<EntityModelDesignModel>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDesignModel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDesignModel(params: {
    designModelId: string;
  }): Observable<EntityModelDesignModel> {
    return this.getDesignModel$Response(params).pipe(
      map(
        (r: StrictHttpResponse<EntityModelDesignModel>) =>
          r.body as EntityModelDesignModel
      )
    );
  }

  /**
   * Path part for operation deleteDesignModelById
   */
  static readonly DeleteDesignModelByIdPath = '/design-models/{designModelId}';

  /**
   * Delete DesignModel by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDesignModelById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDesignModelById$Response(params: {
    designModelId: string;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelControllerService.DeleteDesignModelByIdPath,
      'delete'
    );
    if (params) {
      rb.path('designModelId', params.designModelId, {});
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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * Delete DesignModel by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDesignModelById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDesignModelById(params: { designModelId: string }): Observable<{}> {
    return this.deleteDesignModelById$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation aggregateConcreteSolutions
   */
  static readonly AggregateConcreteSolutionsPath =
    '/design-models/{designModelId}/aggregate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `aggregateConcreteSolutions()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  aggregateConcreteSolutions$Response(params: {
    designModelId: string;
    body: {};
  }): Observable<StrictHttpResponse<Array<FileDto>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelControllerService.AggregateConcreteSolutionsPath,
      'post'
    );
    if (params) {
      rb.path('designModelId', params.designModelId, {});

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
          return r as StrictHttpResponse<Array<FileDto>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `aggregateConcreteSolutions$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  aggregateConcreteSolutions(params: {
    designModelId: string;
    body: {};
  }): Observable<Array<FileDto>> {
    return this.aggregateConcreteSolutions$Response(params).pipe(
      map((r: StrictHttpResponse<Array<FileDto>>) => r.body as Array<FileDto>)
    );
  }

  /**
   * Path part for operation checkConcreteSolutions
   */
  static readonly CheckConcreteSolutionsPath =
    '/design-models/{designModelId}/concrete-solutions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkConcreteSolutions()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkConcreteSolutions$Response(params: {
    designModelId: string;
  }): Observable<StrictHttpResponse<CollectionModelConcreteSolution>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelControllerService.CheckConcreteSolutionsPath,
      'get'
    );
    if (params) {
      rb.path('designModelId', params.designModelId, {});
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
          return r as StrictHttpResponse<CollectionModelConcreteSolution>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `checkConcreteSolutions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkConcreteSolutions(params: {
    designModelId: string;
  }): Observable<CollectionModelConcreteSolution> {
    return this.checkConcreteSolutions$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CollectionModelConcreteSolution>) =>
          r.body as CollectionModelConcreteSolution
      )
    );
  }

  /**
   * Path part for operation getDesignModelPatternEdges
   */
  static readonly GetDesignModelPatternEdgesPath =
    '/design-models/{designModelId}/edges';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDesignModelPatternEdges()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDesignModelPatternEdges$Response(params: {
    designModelId: string;
  }): Observable<StrictHttpResponse<CollectionModelEntityModelEdgeDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelControllerService.GetDesignModelPatternEdgesPath,
      'get'
    );
    if (params) {
      rb.path('designModelId', params.designModelId, {});
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
          return r as StrictHttpResponse<CollectionModelEntityModelEdgeDto>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDesignModelPatternEdges$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDesignModelPatternEdges(params: {
    designModelId: string;
  }): Observable<CollectionModelEntityModelEdgeDto> {
    return this.getDesignModelPatternEdges$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CollectionModelEntityModelEdgeDto>) =>
          r.body as CollectionModelEntityModelEdgeDto
      )
    );
  }

  /**
   * Path part for operation addDesignModelEdge
   */
  static readonly AddDesignModelEdgePath =
    '/design-models/{designModelId}/edges';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDesignModelEdge()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDesignModelEdge$Response(params: {
    designModelId: string;
    body: EdgeDto;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelControllerService.AddDesignModelEdgePath,
      'post'
    );
    if (params) {
      rb.path('designModelId', params.designModelId, {});

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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addDesignModelEdge$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDesignModelEdge(params: {
    designModelId: string;
    body: EdgeDto;
  }): Observable<{}> {
    return this.addDesignModelEdge$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getDesignModelPatternEdges1
   */
  static readonly GetDesignModelPatternEdges1Path =
    '/design-models/{designModelId}/edges/{sourceId}/{targetId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDesignModelPatternEdges1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDesignModelPatternEdges1$Response(params: {
    designModelId: string;
    sourceId: string;
    targetId: string;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelControllerService.GetDesignModelPatternEdges1Path,
      'delete'
    );
    if (params) {
      rb.path('designModelId', params.designModelId, {});
      rb.path('sourceId', params.sourceId, {});
      rb.path('targetId', params.targetId, {});
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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDesignModelPatternEdges1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDesignModelPatternEdges1(params: {
    designModelId: string;
    sourceId: string;
    targetId: string;
  }): Observable<{}> {
    return this.getDesignModelPatternEdges1$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getDesignModelPatternInstances
   */
  static readonly GetDesignModelPatternInstancesPath =
    '/design-models/{designModelId}/patterns';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDesignModelPatternInstances()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDesignModelPatternInstances$Response(params: {
    designModelId: string;
  }): Observable<
    StrictHttpResponse<CollectionModelEntityModelPatternInstanceDto>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelControllerService.GetDesignModelPatternInstancesPath,
      'get'
    );
    if (params) {
      rb.path('designModelId', params.designModelId, {});
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
            CollectionModelEntityModelPatternInstanceDto
          >;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDesignModelPatternInstances$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDesignModelPatternInstances(params: {
    designModelId: string;
  }): Observable<CollectionModelEntityModelPatternInstanceDto> {
    return this.getDesignModelPatternInstances$Response(params).pipe(
      map(
        (r: StrictHttpResponse<CollectionModelEntityModelPatternInstanceDto>) =>
          r.body as CollectionModelEntityModelPatternInstanceDto
      )
    );
  }

  /**
   * Path part for operation addDesignModelPatternInstance
   */
  static readonly AddDesignModelPatternInstancePath =
    '/design-models/{designModelId}/patterns';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDesignModelPatternInstance()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDesignModelPatternInstance$Response(params: {
    designModelId: string;
    body: Pattern;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelControllerService.AddDesignModelPatternInstancePath,
      'post'
    );
    if (params) {
      rb.path('designModelId', params.designModelId, {});

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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addDesignModelPatternInstance$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDesignModelPatternInstance(params: {
    designModelId: string;
    body: Pattern;
  }): Observable<{}> {
    return this.addDesignModelPatternInstance$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation deleteDesignModelPatternInstance
   */
  static readonly DeleteDesignModelPatternInstancePath =
    '/design-models/{designModelId}/patterns/{patternInstanceId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDesignModelPatternInstance()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDesignModelPatternInstance$Response(params: {
    designModelId: string;
    patternInstanceId: string;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelControllerService.DeleteDesignModelPatternInstancePath,
      'delete'
    );
    if (params) {
      rb.path('designModelId', params.designModelId, {});
      rb.path('patternInstanceId', params.patternInstanceId, {});
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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDesignModelPatternInstance$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDesignModelPatternInstance(params: {
    designModelId: string;
    patternInstanceId: string;
  }): Observable<{}> {
    return this.deleteDesignModelPatternInstance$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation putDesignModelPatternInstancePosition
   */
  static readonly PutDesignModelPatternInstancePositionPath =
    '/design-models/{designModelId}/patterns/{patternInstanceId}/position';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putDesignModelPatternInstancePosition()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putDesignModelPatternInstancePosition$Response(params: {
    designModelId: string;
    patternInstanceId: string;
    body: PositionDto;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DesignModelControllerService.PutDesignModelPatternInstancePositionPath,
      'put'
    );
    if (params) {
      rb.path('designModelId', params.designModelId, {});
      rb.path('patternInstanceId', params.patternInstanceId, {});

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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putDesignModelPatternInstancePosition$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putDesignModelPatternInstancePosition(params: {
    designModelId: string;
    patternInstanceId: string;
    body: PositionDto;
  }): Observable<{}> {
    return this.putDesignModelPatternInstancePosition$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }
}
