/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { DiscussionComment } from '../models/discussion-comment';
import { DiscussionTopic } from '../models/discussion-topic';
import { DiscussionTopicModel } from '../models/discussion-topic-model';

@Injectable({
  providedIn: 'root',
})
export class DiscussionControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation addDiscussionComment
   */
  static readonly AddDiscussionCommentPath = '/add-comment/{topicId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDiscussionComment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDiscussionComment$Response(params: {
    topicId: string;
    body: DiscussionComment;
  }): Observable<StrictHttpResponse<DiscussionComment>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DiscussionControllerService.AddDiscussionCommentPath,
      'post'
    );
    if (params) {
      rb.path('topicId', params.topicId, {});

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
          return r as StrictHttpResponse<DiscussionComment>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addDiscussionComment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDiscussionComment(params: {
    topicId: string;
    body: DiscussionComment;
  }): Observable<DiscussionComment> {
    return this.addDiscussionComment$Response(params).pipe(
      map(
        (r: StrictHttpResponse<DiscussionComment>) =>
          r.body as DiscussionComment
      )
    );
  }

  /**
   * Path part for operation addDiscussionTopic
   */
  static readonly AddDiscussionTopicPath = '/add-topic';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDiscussionTopic()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDiscussionTopic$Response(params: {
    body: DiscussionTopic;
  }): Observable<StrictHttpResponse<DiscussionTopic>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DiscussionControllerService.AddDiscussionTopicPath,
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
          return r as StrictHttpResponse<DiscussionTopic>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addDiscussionTopic$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDiscussionTopic(params: {
    body: DiscussionTopic;
  }): Observable<DiscussionTopic> {
    return this.addDiscussionTopic$Response(params).pipe(
      map((r: StrictHttpResponse<DiscussionTopic>) => r.body as DiscussionTopic)
    );
  }

  /**
   * Path part for operation deleteDiscussionTopic
   */
  static readonly DeleteDiscussionTopicPath = '/delete-topic/{topicId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDiscussionTopic()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionTopic$Response(params: {
    topicId: string;
  }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DiscussionControllerService.DeleteDiscussionTopicPath,
      'delete'
    );
    if (params) {
      rb.path('topicId', params.topicId, {});
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
   * To access the full response (for headers, for example), `deleteDiscussionTopic$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionTopic(params: { topicId: string }): Observable<{}> {
    return this.deleteDiscussionTopic$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }

  /**
   * Path part for operation getCommentsByTopic
   */
  static readonly GetCommentsByTopicPath = '/get-comments-by-topic/{topicId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCommentsByTopic()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentsByTopic$Response(params: {
    topicId: string;
  }): Observable<StrictHttpResponse<Array<DiscussionComment>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DiscussionControllerService.GetCommentsByTopicPath,
      'get'
    );
    if (params) {
      rb.path('topicId', params.topicId, {});
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
          return r as StrictHttpResponse<Array<DiscussionComment>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCommentsByTopic$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentsByTopic(params: {
    topicId: string;
  }): Observable<Array<DiscussionComment>> {
    return this.getCommentsByTopic$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<DiscussionComment>>) =>
          r.body as Array<DiscussionComment>
      )
    );
  }

  /**
   * Path part for operation getTopicsByImageId
   */
  static readonly GetTopicsByImageIdPath = '/get-topic-by-image/{imageId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTopicsByImageId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopicsByImageId$Response(params: {
    imageId: string;
  }): Observable<StrictHttpResponse<Array<DiscussionTopic>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DiscussionControllerService.GetTopicsByImageIdPath,
      'get'
    );
    if (params) {
      rb.path('imageId', params.imageId, {});
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
          return r as StrictHttpResponse<Array<DiscussionTopic>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTopicsByImageId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopicsByImageId(params: {
    imageId: string;
  }): Observable<Array<DiscussionTopic>> {
    return this.getTopicsByImageId$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<DiscussionTopic>>) =>
          r.body as Array<DiscussionTopic>
      )
    );
  }

  /**
   * Path part for operation getTopicsAndCommentsByImageId
   */
  static readonly GetTopicsAndCommentsByImageIdPath =
    '/get-topics-and-comments-by-image/{imageId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTopicsAndCommentsByImageId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopicsAndCommentsByImageId$Response(params: {
    imageId: string;
  }): Observable<StrictHttpResponse<Array<DiscussionTopicModel>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      DiscussionControllerService.GetTopicsAndCommentsByImageIdPath,
      'get'
    );
    if (params) {
      rb.path('imageId', params.imageId, {});
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
          return r as StrictHttpResponse<Array<DiscussionTopicModel>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTopicsAndCommentsByImageId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopicsAndCommentsByImageId(params: {
    imageId: string;
  }): Observable<Array<DiscussionTopicModel>> {
    return this.getTopicsAndCommentsByImageId$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<DiscussionTopicModel>>) =>
          r.body as Array<DiscussionTopicModel>
      )
    );
  }
}
