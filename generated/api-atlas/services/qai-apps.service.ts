import { Injectable } from '@angular/core';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { QAIAppDto } from '../models/qai-app-dto';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { RequestBuilder } from '../request-builder';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QAIAppService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  static readonly GetQAIAppsPath = '/tosca/applications';

/**
 * Retrieve all qAI apps.
 *
 * This method provides access to the full `HttpResponse`, allowing access to response headers.
 * To access only the response body, use `getQAIApps()` instead.
 *
 * This method doesn't expect any request body.
 */
  getQAIApps$Response(): Observable<StrictHttpResponse<Array<QAIAppDto>>> {
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
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<QAIAppDto>>;
        })
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
   getQAIApps(): Observable<Array<QAIAppDto>> {
    return this.getQAIApps$Response().pipe(
      map(
        (r: StrictHttpResponse<Array<QAIAppDto>>) => r.body as Array<QAIAppDto>
      )
    );
  }
}
