/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { DiscussionCommentDto } from '../models/discussion-comment-dto';
import { DiscussionTopicDto } from '../models/discussion-topic-dto';
import { EntityModelDiscussionCommentDto } from '../models/entity-model-discussion-comment-dto';
import { EntityModelDiscussionTopicDto } from '../models/entity-model-discussion-topic-dto';
import { PagedModelEntityModelDiscussionCommentDto } from '../models/paged-model-entity-model-discussion-comment-dto';
import { PagedModelEntityModelDiscussionTopicDto } from '../models/paged-model-entity-model-discussion-topic-dto';

@Injectable({
  providedIn: 'root',
})
export class DiscussionTopicService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getDiscussionComments
   */
  static readonly GetDiscussionCommentsPath = '/discussion-topics/{topicId}/discussion-comments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionComments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionComments$Response(params: {
    topicId: string;
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<PagedModelEntityModelDiscussionCommentDto>> {

    const rb = new RequestBuilder(this.rootUrl, DiscussionTopicService.GetDiscussionCommentsPath, 'get');
    if (params) {

      rb.path('topicId', params.topicId, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PagedModelEntityModelDiscussionCommentDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionComments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionComments(params: {
    topicId: string;
    page?: number;
    size?: number;

  }): Observable<PagedModelEntityModelDiscussionCommentDto> {

    return this.getDiscussionComments$Response(params).pipe(
      map((r: StrictHttpResponse<PagedModelEntityModelDiscussionCommentDto>) => r.body as PagedModelEntityModelDiscussionCommentDto)
    );
  }

  /**
   * Path part for operation createDiscussionComment
   */
  static readonly CreateDiscussionCommentPath = '/discussion-topics/{topicId}/discussion-comments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDiscussionComment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionComment$Response(params: {
    topicId: string;
      body: DiscussionCommentDto
  }): Observable<StrictHttpResponse<EntityModelDiscussionCommentDto>> {

    const rb = new RequestBuilder(this.rootUrl, DiscussionTopicService.CreateDiscussionCommentPath, 'post');
    if (params) {

      rb.path('topicId', params.topicId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelDiscussionCommentDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createDiscussionComment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionComment(params: {
    topicId: string;
      body: DiscussionCommentDto
  }): Observable<EntityModelDiscussionCommentDto> {

    return this.createDiscussionComment$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelDiscussionCommentDto>) => r.body as EntityModelDiscussionCommentDto)
    );
  }

  /**
   * Path part for operation getDiscussionComment
   */
  static readonly GetDiscussionCommentPath = '/discussion-topics/{topicId}/discussion-comments/{commentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionComment()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionComment$Response(params: {
    topicId: string;
    commentId: string;

  }): Observable<StrictHttpResponse<EntityModelDiscussionCommentDto>> {

    const rb = new RequestBuilder(this.rootUrl, DiscussionTopicService.GetDiscussionCommentPath, 'get');
    if (params) {

      rb.path('topicId', params.topicId, {});
      rb.path('commentId', params.commentId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelDiscussionCommentDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionComment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionComment(params: {
    topicId: string;
    commentId: string;

  }): Observable<EntityModelDiscussionCommentDto> {

    return this.getDiscussionComment$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelDiscussionCommentDto>) => r.body as EntityModelDiscussionCommentDto)
    );
  }

  /**
   * Path part for operation updateDiscussionComment
   */
  static readonly UpdateDiscussionCommentPath = '/discussion-topics/{topicId}/discussion-comments/{commentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDiscussionComment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionComment$Response(params: {
    topicId: string;
    commentId: string;
      body: DiscussionCommentDto
  }): Observable<StrictHttpResponse<EntityModelDiscussionCommentDto>> {

    const rb = new RequestBuilder(this.rootUrl, DiscussionTopicService.UpdateDiscussionCommentPath, 'put');
    if (params) {

      rb.path('topicId', params.topicId, {});
      rb.path('commentId', params.commentId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelDiscussionCommentDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateDiscussionComment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionComment(params: {
    topicId: string;
    commentId: string;
      body: DiscussionCommentDto
  }): Observable<EntityModelDiscussionCommentDto> {

    return this.updateDiscussionComment$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelDiscussionCommentDto>) => r.body as EntityModelDiscussionCommentDto)
    );
  }

  /**
   * Path part for operation deleteDiscussionComment
   */
  static readonly DeleteDiscussionCommentPath = '/discussion-topics/{topicId}/discussion-comments/{commentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDiscussionComment()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionComment$Response(params: {
    topicId: string;
    commentId: string;

  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, DiscussionTopicService.DeleteDiscussionCommentPath, 'delete');
    if (params) {

      rb.path('topicId', params.topicId, {});
      rb.path('commentId', params.commentId, {});

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
   * To access the full response (for headers, for example), `deleteDiscussionComment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionComment(params: {
    topicId: string;
    commentId: string;

  }): Observable<{  }> {

    return this.deleteDiscussionComment$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

  /**
   * Path part for operation getDiscussionTopic
   */
  static readonly GetDiscussionTopicPath = '/discussion-topics/{topicId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionTopic()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopic$Response(params: {
    topicId: string;

  }): Observable<StrictHttpResponse<EntityModelDiscussionTopicDto>> {

    const rb = new RequestBuilder(this.rootUrl, DiscussionTopicService.GetDiscussionTopicPath, 'get');
    if (params) {

      rb.path('topicId', params.topicId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelDiscussionTopicDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionTopic$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopic(params: {
    topicId: string;

  }): Observable<EntityModelDiscussionTopicDto> {

    return this.getDiscussionTopic$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelDiscussionTopicDto>) => r.body as EntityModelDiscussionTopicDto)
    );
  }

  /**
   * Path part for operation updateDiscussionTopic
   */
  static readonly UpdateDiscussionTopicPath = '/discussion-topics/{topicId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDiscussionTopic()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionTopic$Response(params: {
    topicId: string;
      body: DiscussionTopicDto
  }): Observable<StrictHttpResponse<EntityModelDiscussionTopicDto>> {

    const rb = new RequestBuilder(this.rootUrl, DiscussionTopicService.UpdateDiscussionTopicPath, 'put');
    if (params) {

      rb.path('topicId', params.topicId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelDiscussionTopicDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateDiscussionTopic$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDiscussionTopic(params: {
    topicId: string;
      body: DiscussionTopicDto
  }): Observable<EntityModelDiscussionTopicDto> {

    return this.updateDiscussionTopic$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelDiscussionTopicDto>) => r.body as EntityModelDiscussionTopicDto)
    );
  }

  /**
   * Path part for operation deleteDiscussionTopic
   */
  static readonly DeleteDiscussionTopicPath = '/discussion-topics/{topicId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDiscussionTopic()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionTopic$Response(params: {
    topicId: string;

  }): Observable<StrictHttpResponse<DiscussionTopicDto>> {

    const rb = new RequestBuilder(this.rootUrl, DiscussionTopicService.DeleteDiscussionTopicPath, 'delete');
    if (params) {

      rb.path('topicId', params.topicId, {});

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DiscussionTopicDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDiscussionTopic$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDiscussionTopic(params: {
    topicId: string;

  }): Observable<DiscussionTopicDto> {

    return this.deleteDiscussionTopic$Response(params).pipe(
      map((r: StrictHttpResponse<DiscussionTopicDto>) => r.body as DiscussionTopicDto)
    );
  }

  /**
   * Path part for operation getDiscussionTopics
   */
  static readonly GetDiscussionTopicsPath = '/discussion-topics/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDiscussionTopics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopics$Response(params?: {
    page?: number;
    size?: number;

  }): Observable<StrictHttpResponse<PagedModelEntityModelDiscussionTopicDto>> {

    const rb = new RequestBuilder(this.rootUrl, DiscussionTopicService.GetDiscussionTopicsPath, 'get');
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
        return r as StrictHttpResponse<PagedModelEntityModelDiscussionTopicDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDiscussionTopics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDiscussionTopics(params?: {
    page?: number;
    size?: number;

  }): Observable<PagedModelEntityModelDiscussionTopicDto> {

    return this.getDiscussionTopics$Response(params).pipe(
      map((r: StrictHttpResponse<PagedModelEntityModelDiscussionTopicDto>) => r.body as PagedModelEntityModelDiscussionTopicDto)
    );
  }

  /**
   * Path part for operation createDiscussionTopic
   */
  static readonly CreateDiscussionTopicPath = '/discussion-topics/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDiscussionTopic()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionTopic$Response(params: {
      body: DiscussionTopicDto
  }): Observable<StrictHttpResponse<EntityModelDiscussionTopicDto>> {

    const rb = new RequestBuilder(this.rootUrl, DiscussionTopicService.CreateDiscussionTopicPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EntityModelDiscussionTopicDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createDiscussionTopic$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDiscussionTopic(params: {
      body: DiscussionTopicDto
  }): Observable<EntityModelDiscussionTopicDto> {

    return this.createDiscussionTopic$Response(params).pipe(
      map((r: StrictHttpResponse<EntityModelDiscussionTopicDto>) => r.body as EntityModelDiscussionTopicDto)
    );
  }

}
