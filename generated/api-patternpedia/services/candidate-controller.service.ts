/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Candidate } from '../models/candidate';
import { CandidateComment } from '../models/candidate-comment';
import { CandidateModel } from '../models/candidate-model';
import { CollectionModelEntityModelCandidateModel } from '../models/collection-model-entity-model-candidate-model';

@Injectable({
  providedIn: 'root',
})
export class CandidateControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllCandiates
   */
  static readonly GetAllCandiatesPath = '/candidates';

  /**
   * Retrieve all candidates
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCandiates()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCandiates$Response(params?: {

  }): Observable<StrictHttpResponse<CollectionModelEntityModelCandidateModel>> {

    const rb = new RequestBuilder(this.rootUrl, CandidateControllerService.GetAllCandiatesPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CollectionModelEntityModelCandidateModel>;
      })
    );
  }

  /**
   * Retrieve all candidates
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllCandiates$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCandiates(params?: {

  }): Observable<CollectionModelEntityModelCandidateModel> {

    return this.getAllCandiates$Response(params).pipe(
      map((r: StrictHttpResponse<CollectionModelEntityModelCandidateModel>) => r.body as CollectionModelEntityModelCandidateModel)
    );
  }

  /**
   * Path part for operation createCandidate
   */
  static readonly CreateCandidatePath = '/candidates';

  /**
   * Create a candidate
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCandidate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCandidate$Response(params: {
      body: CandidateModel
  }): Observable<StrictHttpResponse<Candidate>> {

    const rb = new RequestBuilder(this.rootUrl, CandidateControllerService.CreateCandidatePath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Candidate>;
      })
    );
  }

  /**
   * Create a candidate
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createCandidate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCandidate(params: {
      body: CandidateModel
  }): Observable<Candidate> {

    return this.createCandidate$Response(params).pipe(
      map((r: StrictHttpResponse<Candidate>) => r.body as Candidate)
    );
  }

  /**
   * Path part for operation getCandidateByUri
   */
  static readonly GetCandidateByUriPath = '/candidates/?uri={candidateUri}';

  /**
   * Retrieve a single candidate by URI
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCandidateByUri()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCandidateByUri$Response(params: {
    candidateUri: string;

  }): Observable<StrictHttpResponse<Candidate>> {

    const rb = new RequestBuilder(this.rootUrl, CandidateControllerService.GetCandidateByUriPath, 'get');
    if (params) {

      rb.path('candidateUri', params.candidateUri, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Candidate>;
      })
    );
  }

  /**
   * Retrieve a single candidate by URI
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCandidateByUri$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCandidateByUri(params: {
    candidateUri: string;

  }): Observable<Candidate> {

    return this.getCandidateByUri$Response(params).pipe(
      map((r: StrictHttpResponse<Candidate>) => r.body as Candidate)
    );
  }

  /**
   * Path part for operation updateCandidateCommentRating
   */
  static readonly UpdateCandidateCommentRatingPath = '/candidates/comments/{candidateCommentId}/users/{userId}/rating/{rating}';

  /**
   * Update rating of a candidate comment
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCandidateCommentRating()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateCandidateCommentRating$Response(params: {
    candidateCommentId: string;
    userId: string;
    rating: string;

  }): Observable<StrictHttpResponse<Candidate>> {

    const rb = new RequestBuilder(this.rootUrl, CandidateControllerService.UpdateCandidateCommentRatingPath, 'put');
    if (params) {

      rb.path('candidateCommentId', params.candidateCommentId, {});
      rb.path('userId', params.userId, {});
      rb.path('rating', params.rating, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Candidate>;
      })
    );
  }

  /**
   * Update rating of a candidate comment
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCandidateCommentRating$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateCandidateCommentRating(params: {
    candidateCommentId: string;
    userId: string;
    rating: string;

  }): Observable<Candidate> {

    return this.updateCandidateCommentRating$Response(params).pipe(
      map((r: StrictHttpResponse<Candidate>) => r.body as Candidate)
    );
  }

  /**
   * Path part for operation getCandidateById
   */
  static readonly GetCandidateByIdPath = '/candidates/{candidateId}';

  /**
   * Retrieve a single candidate by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCandidateById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCandidateById$Response(params: {
    candidateId: string;

  }): Observable<StrictHttpResponse<Candidate>> {

    const rb = new RequestBuilder(this.rootUrl, CandidateControllerService.GetCandidateByIdPath, 'get');
    if (params) {

      rb.path('candidateId', params.candidateId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Candidate>;
      })
    );
  }

  /**
   * Retrieve a single candidate by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCandidateById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCandidateById(params: {
    candidateId: string;

  }): Observable<Candidate> {

    return this.getCandidateById$Response(params).pipe(
      map((r: StrictHttpResponse<Candidate>) => r.body as Candidate)
    );
  }

  /**
   * Path part for operation updateCandidate
   */
  static readonly UpdateCandidatePath = '/candidates/{candidateId}';

  /**
   * Update a candidate
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCandidate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCandidate$Response(params: {
    candidateId: string;
      body: Candidate
  }): Observable<StrictHttpResponse<Candidate>> {

    const rb = new RequestBuilder(this.rootUrl, CandidateControllerService.UpdateCandidatePath, 'put');
    if (params) {

      rb.path('candidateId', params.candidateId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Candidate>;
      })
    );
  }

  /**
   * Update a candidate
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCandidate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCandidate(params: {
    candidateId: string;
      body: Candidate
  }): Observable<Candidate> {

    return this.updateCandidate$Response(params).pipe(
      map((r: StrictHttpResponse<Candidate>) => r.body as Candidate)
    );
  }

  /**
   * Path part for operation deleteCandidateById
   */
  static readonly DeleteCandidateByIdPath = '/candidates/{candidateId}';

  /**
   * Delete candidate by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCandidateById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCandidateById$Response(params: {
    candidateId: string;

  }): Observable<StrictHttpResponse<{}>> {

    const rb = new RequestBuilder(this.rootUrl, CandidateControllerService.DeleteCandidateByIdPath, 'delete');
    if (params) {

      rb.path('candidateId', params.candidateId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{}>;
      })
    );
  }

  /**
   * Delete candidate by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteCandidateById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCandidateById(params: {
    candidateId: string;

  }): Observable<{}> {

    return this.deleteCandidateById$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation createCandidateComment
   */
  static readonly CreateCandidateCommentPath = '/candidates/{candidateId}/comments/{userId}';

  /**
   * Create a candidate comment
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCandidateComment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCandidateComment$Response(params: {
    candidateId: string;
    userId: string;
      body: CandidateComment
  }): Observable<StrictHttpResponse<Candidate>> {

    const rb = new RequestBuilder(this.rootUrl, CandidateControllerService.CreateCandidateCommentPath, 'post');
    if (params) {

      rb.path('candidateId', params.candidateId, {});
      rb.path('userId', params.userId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Candidate>;
      })
    );
  }

  /**
   * Create a candidate comment
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createCandidateComment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCandidateComment(params: {
    candidateId: string;
    userId: string;
      body: CandidateComment
  }): Observable<Candidate> {

    return this.createCandidateComment$Response(params).pipe(
      map((r: StrictHttpResponse<Candidate>) => r.body as Candidate)
    );
  }

  /**
   * Path part for operation updateCandidateRating
   */
  static readonly UpdateCandidateRatingPath = '/candidates/{candidateId}/users/{userId}/rating/{rating}';

  /**
   * Update rating of a candidate
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCandidateRating()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateCandidateRating$Response(params: {
    candidateId: string;
    userId: string;
    rating: string;

  }): Observable<StrictHttpResponse<Candidate>> {

    const rb = new RequestBuilder(this.rootUrl, CandidateControllerService.UpdateCandidateRatingPath, 'put');
    if (params) {

      rb.path('candidateId', params.candidateId, {});
      rb.path('userId', params.userId, {});
      rb.path('rating', params.rating, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/hal+json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Candidate>;
      })
    );
  }

  /**
   * Update rating of a candidate
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCandidateRating$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateCandidateRating(params: {
    candidateId: string;
    userId: string;
    rating: string;

  }): Observable<Candidate> {

    return this.updateCandidateRating$Response(params).pipe(
      map((r: StrictHttpResponse<Candidate>) => r.body as Candidate)
    );
  }

}
