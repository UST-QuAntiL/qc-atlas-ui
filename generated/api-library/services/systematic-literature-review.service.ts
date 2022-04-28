/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BibEntryDto } from '../models/bib-entry-dto';
import { CrawlStatus } from '../models/crawl-status';
import { Library } from '../models/library';
import { StudyDto } from '../models/study-dto';

@Injectable({
  providedIn: 'root',
})
export class SystematicLiteratureReviewService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getCrawlStatus
   */
  static readonly GetCrawlStatusPath = '/studies/{studyName}/crawl';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCrawlStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCrawlStatus$Response(params: {
    studyName: string;
  }): Observable<StrictHttpResponse<CrawlStatus>> {

    const rb = new RequestBuilder(this.rootUrl, SystematicLiteratureReviewService.GetCrawlStatusPath, 'get');
    if (params) {
      rb.path('studyName', params.studyName, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CrawlStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCrawlStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCrawlStatus(params: {
    studyName: string;
  }): Observable<CrawlStatus> {

    return this.getCrawlStatus$Response(params).pipe(
      map((r: StrictHttpResponse<CrawlStatus>) => r.body as CrawlStatus)
    );
  }

  /**
   * Path part for operation crawlStudy
   */
  static readonly CrawlStudyPath = '/studies/{studyName}/crawl';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `crawlStudy()` instead.
   *
   * This method doesn't expect any request body.
   */
  crawlStudy$Response(params: {
    studyName: string;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, SystematicLiteratureReviewService.CrawlStudyPath, 'post');
    if (params) {
      rb.path('studyName', params.studyName, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `crawlStudy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  crawlStudy(params: {
    studyName: string;
  }): Observable<any> {

    return this.crawlStudy$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation getStudyNames
   */
  static readonly GetStudyNamesPath = '/studies';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudyNames()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudyNames$Response(params?: {
  }): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, SystematicLiteratureReviewService.GetStudyNamesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<string>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getStudyNames$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudyNames(params?: {
  }): Observable<Array<string>> {

    return this.getStudyNames$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation createStudy
   */
  static readonly CreateStudyPath = '/studies';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createStudy()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createStudy$Response(params?: {
    body?: StudyDto
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, SystematicLiteratureReviewService.CreateStudyPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createStudy$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createStudy(params?: {
    body?: StudyDto
  }): Observable<any> {

    return this.createStudy$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation deleteStudy
   */
  static readonly DeleteStudyPath = '/studies/{studyName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteStudy()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteStudy$Response(params: {
    studyName: string;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, SystematicLiteratureReviewService.DeleteStudyPath, 'delete');
    if (params) {
      rb.path('studyName', params.studyName, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteStudy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteStudy(params: {
    studyName: string;
  }): Observable<any> {

    return this.deleteStudy$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation getStudyDefinition
   */
  static readonly GetStudyDefinitionPath = '/studies/{studyName}/studyDefinition';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudyDefinition()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudyDefinition$Response(params: {
    studyName: string;
  }): Observable<StrictHttpResponse<StudyDto>> {

    const rb = new RequestBuilder(this.rootUrl, SystematicLiteratureReviewService.GetStudyDefinitionPath, 'get');
    if (params) {
      rb.path('studyName', params.studyName, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StudyDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getStudyDefinition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudyDefinition(params: {
    studyName: string;
  }): Observable<StudyDto> {

    return this.getStudyDefinition$Response(params).pipe(
      map((r: StrictHttpResponse<StudyDto>) => r.body as StudyDto)
    );
  }

  /**
   * Path part for operation getLibraryEntries1
   */
  static readonly GetLibraryEntries1Path = '/studies/{studyName}/results';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLibraryEntries1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLibraryEntries1$Response(params: {
    studyName: string;
  }): Observable<StrictHttpResponse<Library>> {

    const rb = new RequestBuilder(this.rootUrl, SystematicLiteratureReviewService.GetLibraryEntries1Path, 'get');
    if (params) {
      rb.path('studyName', params.studyName, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Library>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLibraryEntries1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLibraryEntries1(params: {
    studyName: string;
  }): Observable<Library> {

    return this.getLibraryEntries1$Response(params).pipe(
      map((r: StrictHttpResponse<Library>) => r.body as Library)
    );
  }

  /**
   * Path part for operation addEntryToLibrary1
   */
  static readonly AddEntryToLibrary1Path = '/studies/{studyName}/results';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addEntryToLibrary1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEntryToLibrary1$Response(params: {
    studyName: string;
    body?: BibEntryDto
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, SystematicLiteratureReviewService.AddEntryToLibrary1Path, 'post');
    if (params) {
      rb.path('studyName', params.studyName, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addEntryToLibrary1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEntryToLibrary1(params: {
    studyName: string;
    body?: BibEntryDto
  }): Observable<any> {

    return this.addEntryToLibrary1$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation deleteLibrary1
   */
  static readonly DeleteLibrary1Path = '/studies/{studyName}/results';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLibrary1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLibrary1$Response(params: {
    studyName: string;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, SystematicLiteratureReviewService.DeleteLibrary1Path, 'delete');
    if (params) {
      rb.path('studyName', params.studyName, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteLibrary1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLibrary1(params: {
    studyName: string;
  }): Observable<any> {

    return this.deleteLibrary1$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation getBibEntryMatchingCiteKey1
   */
  static readonly GetBibEntryMatchingCiteKey1Path = '/studies/{studyName}/results/{citeKey}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBibEntryMatchingCiteKey1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBibEntryMatchingCiteKey1$Response(params: {
    citeKey: string;
    studyName: string;
  }): Observable<StrictHttpResponse<BibEntryDto>> {

    const rb = new RequestBuilder(this.rootUrl, SystematicLiteratureReviewService.GetBibEntryMatchingCiteKey1Path, 'get');
    if (params) {
      rb.path('citeKey', params.citeKey, {});
      rb.path('studyName', params.studyName, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BibEntryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getBibEntryMatchingCiteKey1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBibEntryMatchingCiteKey1(params: {
    citeKey: string;
    studyName: string;
  }): Observable<BibEntryDto> {

    return this.getBibEntryMatchingCiteKey1$Response(params).pipe(
      map((r: StrictHttpResponse<BibEntryDto>) => r.body as BibEntryDto)
    );
  }

  /**
   * Path part for operation updateEntry1
   */
  static readonly UpdateEntry1Path = '/studies/{studyName}/results/{citeKey}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateEntry1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateEntry1$Response(params: {
    citeKey: string;
    studyName: string;
    body?: BibEntryDto
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, SystematicLiteratureReviewService.UpdateEntry1Path, 'put');
    if (params) {
      rb.path('citeKey', params.citeKey, {});
      rb.path('studyName', params.studyName, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateEntry1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateEntry1(params: {
    citeKey: string;
    studyName: string;
    body?: BibEntryDto
  }): Observable<any> {

    return this.updateEntry1$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation deleteEntryFromLibrary1
   */
  static readonly DeleteEntryFromLibrary1Path = '/studies/{studyName}/results/{citeKey}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEntryFromLibrary1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEntryFromLibrary1$Response(params: {
    citeKey: string;
    studyName: string;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, SystematicLiteratureReviewService.DeleteEntryFromLibrary1Path, 'delete');
    if (params) {
      rb.path('citeKey', params.citeKey, {});
      rb.path('studyName', params.studyName, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEntryFromLibrary1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEntryFromLibrary1(params: {
    citeKey: string;
    studyName: string;
  }): Observable<any> {

    return this.deleteEntryFromLibrary1$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
