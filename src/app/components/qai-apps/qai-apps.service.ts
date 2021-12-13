import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseService } from '../../../../generated/api-atlas/base-service';
import { ApiConfiguration } from '../../../../generated/api-atlas/api-configuration';
import { StrictHttpResponse } from '../../../../generated/api-atlas/strict-http-response';
import { RequestBuilder } from '../../../../generated/api-atlas/request-builder';
import { QAIAppDto } from './qai-app-dto';

@Injectable({
  providedIn: 'root',
})
export class QAIAppService extends BaseService {
  static readonly GetQAIAppsPath = '/tosca/applications';
  static readonly GetQAIAppPath = '/tosca/applications/{qaiAppId}';
  static readonly CreateQAIApp = '/tosca/applications';

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Retrieve all qAI apps.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQAIApps()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQAIApps$Response(): Observable<StrictHttpResponse<QAIAppDto[]>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      QAIAppService.GetQAIAppsPath,
      'get'
    );

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => r as StrictHttpResponse<QAIAppDto[]>)
      );
  }

  /**
   * Retrieve all aQAI apps.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQAIApps$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQAIApps(): Observable<QAIAppDto[]> {
    return this.getQAIApps$Response().pipe(
      map((r: StrictHttpResponse<QAIAppDto[]>) => r.body)
    );
  }

  getQAIApp$Response(params: {
    qaiAppId: string;
  }): Observable<StrictHttpResponse<QAIAppDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      QAIAppService.GetQAIAppPath,
      'get'
    );
    if (params) {
      rb.path('qaiAppId', params.qaiAppId, {});
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
        map((r: HttpResponse<any>) => r as StrictHttpResponse<QAIAppDto>)
      );
  }

  getQAIApp(params: { qaiAppId: string }): Observable<QAIAppDto> {
    return this.getQAIApp$Response(params).pipe(
      map((r: StrictHttpResponse<QAIAppDto>) => r.body)
    );
  }

  createQAIApp(file: File, name: string): Observable<HttpEvent<object>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('payload', JSON.stringify({ name }));

    const upload = this.http.post(
      this.rootUrl + QAIAppService.CreateQAIApp,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );

    return upload as Observable<HttpEvent<object>>;
  }

  deleteQAIApp(params: { qaiAppId: string }): Observable<HttpResponse<null>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      QAIAppService.GetQAIAppPath,
      'delete'
    );

    if (params) {
      rb.path('qaiAppId', params.qaiAppId, {});
    }

    return this.http
      .request(rb.build())
      .pipe(filter((r: any) => r instanceof HttpResponse));
  }
}
