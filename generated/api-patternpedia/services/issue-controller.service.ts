/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Issue } from '../models/issue';
import { IssueComment } from '../models/issue-comment';

@Injectable({
  providedIn: 'root',
})
export class IssueControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getAllIssues
   */
  static readonly GetAllIssuesPath = '/issues';

  /**
   * Retrieve all issues
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllIssues()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllIssues$Response(params?: {}): Observable<
    StrictHttpResponse<Array<Issue>>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      IssueControllerService.GetAllIssuesPath,
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
          return r as StrictHttpResponse<Array<Issue>>;
        })
      );
  }

  /**
   * Retrieve all issues
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllIssues$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllIssues(params?: {}): Observable<Array<Issue>> {
    return this.getAllIssues$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Issue>>) => r.body as Array<Issue>)
    );
  }

  /**
   * Path part for operation createIssue
   */
  static readonly CreateIssuePath = '/issues';

  /**
   * Create an issue
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createIssue()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createIssue$Response(params: {
    body: Issue;
  }): Observable<StrictHttpResponse<Issue>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      IssueControllerService.CreateIssuePath,
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
          return r as StrictHttpResponse<Issue>;
        })
      );
  }

  /**
   * Create an issue
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createIssue$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createIssue(params: { body: Issue }): Observable<Issue> {
    return this.createIssue$Response(params).pipe(
      map((r: StrictHttpResponse<Issue>) => r.body as Issue)
    );
  }

  /**
   * Path part for operation getIssueByUri
   */
  static readonly GetIssueByUriPath = '/issues/?uri={issueUri}';

  /**
   * Retrieve issue by URI
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIssueByUri()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIssueByUri$Response(params: {
    issueUri: string;
  }): Observable<StrictHttpResponse<Issue>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      IssueControllerService.GetIssueByUriPath,
      'get'
    );
    if (params) {
      rb.path('issueUri', params.issueUri, {});
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
          return r as StrictHttpResponse<Issue>;
        })
      );
  }

  /**
   * Retrieve issue by URI
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getIssueByUri$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIssueByUri(params: { issueUri: string }): Observable<Issue> {
    return this.getIssueByUri$Response(params).pipe(
      map((r: StrictHttpResponse<Issue>) => r.body as Issue)
    );
  }

  /**
   * Path part for operation updateIssueCommentRating
   */
  static readonly UpdateIssueCommentRatingPath =
    '/issues/comments/{issueCommentId}/users/{userId}/rating/{rating}';

  /**
   * Update an issue comment rating
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateIssueCommentRating()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateIssueCommentRating$Response(params: {
    issueCommentId: string;
    userId: string;
    rating: string;
  }): Observable<StrictHttpResponse<Issue>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      IssueControllerService.UpdateIssueCommentRatingPath,
      'put'
    );
    if (params) {
      rb.path('issueCommentId', params.issueCommentId, {});
      rb.path('userId', params.userId, {});
      rb.path('rating', params.rating, {});
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
          return r as StrictHttpResponse<Issue>;
        })
      );
  }

  /**
   * Update an issue comment rating
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateIssueCommentRating$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateIssueCommentRating(params: {
    issueCommentId: string;
    userId: string;
    rating: string;
  }): Observable<Issue> {
    return this.updateIssueCommentRating$Response(params).pipe(
      map((r: StrictHttpResponse<Issue>) => r.body as Issue)
    );
  }

  /**
   * Path part for operation getIssueById
   */
  static readonly GetIssueByIdPath = '/issues/{issueId}';

  /**
   * Retrieve issue by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIssueById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIssueById$Response(params: {
    issueId: string;
  }): Observable<StrictHttpResponse<Issue>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      IssueControllerService.GetIssueByIdPath,
      'get'
    );
    if (params) {
      rb.path('issueId', params.issueId, {});
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
          return r as StrictHttpResponse<Issue>;
        })
      );
  }

  /**
   * Retrieve issue by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getIssueById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIssueById(params: { issueId: string }): Observable<Issue> {
    return this.getIssueById$Response(params).pipe(
      map((r: StrictHttpResponse<Issue>) => r.body as Issue)
    );
  }

  /**
   * Path part for operation updateIssue
   */
  static readonly UpdateIssuePath = '/issues/{issueId}';

  /**
   * Update an issue
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateIssue()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateIssue$Response(params: {
    issueId: string;
    body: Issue;
  }): Observable<StrictHttpResponse<Issue>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      IssueControllerService.UpdateIssuePath,
      'put'
    );
    if (params) {
      rb.path('issueId', params.issueId, {});

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
          return r as StrictHttpResponse<Issue>;
        })
      );
  }

  /**
   * Update an issue
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateIssue$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateIssue(params: { issueId: string; body: Issue }): Observable<Issue> {
    return this.updateIssue$Response(params).pipe(
      map((r: StrictHttpResponse<Issue>) => r.body as Issue)
    );
  }

  /**
   * Path part for operation deleteIssue
   */
  static readonly DeleteIssuePath = '/issues/{issueId}';

  /**
   * Delete an issue
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteIssue()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteIssue$Response(params: {
    issueId: string;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      IssueControllerService.DeleteIssuePath,
      'delete'
    );
    if (params) {
      rb.path('issueId', params.issueId, {});
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
   * Delete an issue
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteIssue$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteIssue(params: { issueId: string }): Observable<{}> {
    return this.deleteIssue$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation createIssueComment
   */
  static readonly CreateIssueCommentPath =
    '/issues/{issueId}/comments/{userId}';

  /**
   * Create an issue comment
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createIssueComment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createIssueComment$Response(params: {
    issueId: string;
    userId: string;
    body: IssueComment;
  }): Observable<StrictHttpResponse<Issue>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      IssueControllerService.CreateIssueCommentPath,
      'post'
    );
    if (params) {
      rb.path('issueId', params.issueId, {});
      rb.path('userId', params.userId, {});

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
          return r as StrictHttpResponse<Issue>;
        })
      );
  }

  /**
   * Create an issue comment
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createIssueComment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createIssueComment(params: {
    issueId: string;
    userId: string;
    body: IssueComment;
  }): Observable<Issue> {
    return this.createIssueComment$Response(params).pipe(
      map((r: StrictHttpResponse<Issue>) => r.body as Issue)
    );
  }

  /**
   * Path part for operation updateIssueRating
   */
  static readonly UpdateIssueRatingPath =
    '/issues/{issueId}/users/{userId}/rating/{rating}';

  /**
   * Update an issue rating
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateIssueRating()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateIssueRating$Response(params: {
    issueId: string;
    userId: string;
    rating: string;
  }): Observable<StrictHttpResponse<Issue>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      IssueControllerService.UpdateIssueRatingPath,
      'put'
    );
    if (params) {
      rb.path('issueId', params.issueId, {});
      rb.path('userId', params.userId, {});
      rb.path('rating', params.rating, {});
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
          return r as StrictHttpResponse<Issue>;
        })
      );
  }

  /**
   * Update an issue rating
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateIssueRating$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateIssueRating(params: {
    issueId: string;
    userId: string;
    rating: string;
  }): Observable<Issue> {
    return this.updateIssueRating$Response(params).pipe(
      map((r: StrictHttpResponse<Issue>) => r.body as Issue)
    );
  }
}
