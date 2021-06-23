/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Image } from '../models/image';
import { ImageModel } from '../models/image-model';

@Injectable({
  providedIn: 'root',
})
export class ImageControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation addImage
   */
  static readonly AddImagePath = '/add-image';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addImage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addImage$Response(params: {
    body: Image;
  }): Observable<StrictHttpResponse<Image>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ImageControllerService.AddImagePath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }
    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Image>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addImage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addImage(params: { body: Image }): Observable<Image> {
    return this.addImage$Response(params).pipe(
      map((r: StrictHttpResponse<Image>) => r.body as Image)
    );
  }

  /**
   * Path part for operation getImageAndCommentsById
   */
  static readonly GetImageAndCommentsByIdPath =
    '/get-image-and-comments-by-id/{imageId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImageAndCommentsById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageAndCommentsById$Response(params: {
    imageId: string;
  }): Observable<StrictHttpResponse<ImageModel>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ImageControllerService.GetImageAndCommentsByIdPath,
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
          return r as StrictHttpResponse<ImageModel>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImageAndCommentsById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageAndCommentsById(params: { imageId: string }): Observable<ImageModel> {
    return this.getImageAndCommentsById$Response(params).pipe(
      map((r: StrictHttpResponse<ImageModel>) => r.body as ImageModel)
    );
  }

  /**
   * Path part for operation getImageById
   */
  static readonly GetImageByIdPath = '/get-image-by-id/{imageId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImageById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageById$Response(params: {
    imageId: string;
  }): Observable<StrictHttpResponse<Array<string>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ImageControllerService.GetImageByIdPath,
      'get'
    );
    if (params) {
      rb.path('imageId', params.imageId, {});
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: 'image/svg+xml',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<string>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImageById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageById(params: { imageId: string }): Observable<Array<string>> {
    return this.getImageById$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation updateImage
   */
  static readonly UpdateImagePath = '/update-image/{imageId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateImage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImage$Response(params: {
    imageId: string;
    body: Array<string>;
  }): Observable<StrictHttpResponse<Array<string>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ImageControllerService.UpdateImagePath,
      'post'
    );
    if (params) {
      rb.path('imageId', params.imageId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: 'image/svg+xml',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<string>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateImage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImage(params: {
    imageId: string;
    body: Array<string>;
  }): Observable<Array<string>> {
    return this.updateImage$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }
}
