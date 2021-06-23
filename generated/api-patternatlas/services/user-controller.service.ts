/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { UserEntity } from '../models/user-entity';

@Injectable({
  providedIn: 'root',
})
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getAllUsers
   */
  static readonly GetAllUsersPath = '/users';

  /**
   * Retrieve all users
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params?: {}): Observable<
    StrictHttpResponse<Array<UserEntity>>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      UserControllerService.GetAllUsersPath,
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
          return r as StrictHttpResponse<Array<UserEntity>>;
        })
      );
  }

  /**
   * Retrieve all users
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params?: {}): Observable<Array<UserEntity>> {
    return this.getAllUsers$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<UserEntity>>) =>
          r.body as Array<UserEntity>
      )
    );
  }

  /**
   * Path part for operation createUser
   */
  static readonly CreateUserPath = '/users';

  /**
   * Create a user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser$Response(params: {
    body: UserEntity;
  }): Observable<StrictHttpResponse<UserEntity>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      UserControllerService.CreateUserPath,
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
          return r as StrictHttpResponse<UserEntity>;
        })
      );
  }

  /**
   * Create a user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser(params: { body: UserEntity }): Observable<UserEntity> {
    return this.createUser$Response(params).pipe(
      map((r: StrictHttpResponse<UserEntity>) => r.body as UserEntity)
    );
  }

  /**
   * Path part for operation getUserById
   */
  static readonly GetUserByIdPath = '/users/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: {
    userId: string;
  }): Observable<StrictHttpResponse<UserEntity>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      UserControllerService.GetUserByIdPath,
      'get'
    );
    if (params) {
      rb.path('userId', params.userId, {});
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
          return r as StrictHttpResponse<UserEntity>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: { userId: string }): Observable<UserEntity> {
    return this.getUserById$Response(params).pipe(
      map((r: StrictHttpResponse<UserEntity>) => r.body as UserEntity)
    );
  }

  /**
   * Path part for operation updateUser
   */
  static readonly UpdateUserPath = '/users/{userId}';

  /**
   * Update a user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: {
    userId: string;
    body: UserEntity;
  }): Observable<StrictHttpResponse<UserEntity>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      UserControllerService.UpdateUserPath,
      'put'
    );
    if (params) {
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
          return r as StrictHttpResponse<UserEntity>;
        })
      );
  }

  /**
   * Update a user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser(params: {
    userId: string;
    body: UserEntity;
  }): Observable<UserEntity> {
    return this.updateUser$Response(params).pipe(
      map((r: StrictHttpResponse<UserEntity>) => r.body as UserEntity)
    );
  }

  /**
   * Path part for operation deleteUser
   */
  static readonly DeleteUserPath = '/users/{userId}';

  /**
   * Delete a user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: {
    userId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      UserControllerService.DeleteUserPath,
      'delete'
    );
    if (params) {
      rb.path('userId', params.userId, {});
    }
    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * Delete a user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: { userId: string }): Observable<void> {
    return this.deleteUser$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
