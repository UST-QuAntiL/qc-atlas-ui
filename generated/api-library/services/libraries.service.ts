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
import { Library } from '../models/library';
import { NewLibraryDto } from '../models/new-library-dto';

@Injectable({
  providedIn: 'root',
})
export class LibrariesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getLibraryNames
   */
  static readonly GetLibraryNamesPath = '/libraries';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLibraryNames()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLibraryNames$Response(params?: {}): Observable<
    StrictHttpResponse<Array<string>>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      LibrariesService.GetLibraryNamesPath,
      'get'
    );
    if (params) {
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
          return r as StrictHttpResponse<Array<string>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLibraryNames$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLibraryNames(params?: {}): Observable<Array<string>> {
    return this.getLibraryNames$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation createNewLibrary
   */
  static readonly CreateNewLibraryPath = '/libraries';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNewLibrary()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewLibrary$Response(params?: {
    body?: NewLibraryDto;
  }): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      LibrariesService.CreateNewLibraryPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<any>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createNewLibrary$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewLibrary(params?: { body?: NewLibraryDto }): Observable<any> {
    return this.createNewLibrary$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation getLibraryEntries
   */
  static readonly GetLibraryEntriesPath = '/libraries/{libraryName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLibraryEntries()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLibraryEntries$Response(params: {
    libraryName: string;
  }): Observable<StrictHttpResponse<Library>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      LibrariesService.GetLibraryEntriesPath,
      'get'
    );
    if (params) {
      rb.path('libraryName', params.libraryName, {});
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
          return r as StrictHttpResponse<Library>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLibraryEntries$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLibraryEntries(params: { libraryName: string }): Observable<Library> {
    return this.getLibraryEntries$Response(params).pipe(
      map((r: StrictHttpResponse<Library>) => r.body as Library)
    );
  }

  /**
   * Path part for operation addEntryToLibrary
   */
  static readonly AddEntryToLibraryPath = '/libraries/{libraryName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addEntryToLibrary()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEntryToLibrary$Response(params: {
    libraryName: string;
    body?: BibEntryDto;
  }): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      LibrariesService.AddEntryToLibraryPath,
      'post'
    );
    if (params) {
      rb.path('libraryName', params.libraryName, {});
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<any>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addEntryToLibrary$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEntryToLibrary(params: {
    libraryName: string;
    body?: BibEntryDto;
  }): Observable<any> {
    return this.addEntryToLibrary$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation deleteLibrary
   */
  static readonly DeleteLibraryPath = '/libraries/{libraryName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLibrary()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLibrary$Response(params: {
    libraryName: string;
  }): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      LibrariesService.DeleteLibraryPath,
      'delete'
    );
    if (params) {
      rb.path('libraryName', params.libraryName, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<any>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteLibrary$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLibrary(params: { libraryName: string }): Observable<any> {
    return this.deleteLibrary$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation getBibEntryMatchingCiteKey
   */
  static readonly GetBibEntryMatchingCiteKeyPath =
    '/libraries/{libraryName}/{citeKey}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBibEntryMatchingCiteKey()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBibEntryMatchingCiteKey$Response(params: {
    citeKey: string;
    libraryName: string;
  }): Observable<StrictHttpResponse<BibEntryDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      LibrariesService.GetBibEntryMatchingCiteKeyPath,
      'get'
    );
    if (params) {
      rb.path('citeKey', params.citeKey, {});
      rb.path('libraryName', params.libraryName, {});
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
          return r as StrictHttpResponse<BibEntryDto>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getBibEntryMatchingCiteKey$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBibEntryMatchingCiteKey(params: {
    citeKey: string;
    libraryName: string;
  }): Observable<BibEntryDto> {
    return this.getBibEntryMatchingCiteKey$Response(params).pipe(
      map((r: StrictHttpResponse<BibEntryDto>) => r.body as BibEntryDto)
    );
  }

  /**
   * Path part for operation updateEntry
   */
  static readonly UpdateEntryPath = '/libraries/{libraryName}/{citeKey}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateEntry()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateEntry$Response(params: {
    citeKey: string;
    libraryName: string;
    body?: BibEntryDto;
  }): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      LibrariesService.UpdateEntryPath,
      'put'
    );
    if (params) {
      rb.path('citeKey', params.citeKey, {});
      rb.path('libraryName', params.libraryName, {});
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'blob',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<any>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateEntry$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateEntry(params: {
    citeKey: string;
    libraryName: string;
    body?: BibEntryDto;
  }): Observable<any> {
    return this.updateEntry$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation deleteEntryFromLibrary
   */
  static readonly DeleteEntryFromLibraryPath =
    '/libraries/{libraryName}/{citeKey}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEntryFromLibrary()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEntryFromLibrary$Response(params: {
    citeKey: string;
    libraryName: string;
  }): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      LibrariesService.DeleteEntryFromLibraryPath,
      'delete'
    );
    if (params) {
      rb.path('citeKey', params.citeKey, {});
      rb.path('libraryName', params.libraryName, {});
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
          return r as StrictHttpResponse<any>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEntryFromLibrary$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEntryFromLibrary(params: {
    citeKey: string;
    libraryName: string;
  }): Observable<any> {
    return this.deleteEntryFromLibrary$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation getBibEntryMatchingCiteKey1
   */
  static readonly GetBibEntryMatchingCiteKey1Path =
    '/libraries/{libraryName}/{citeKey}/{cslStyle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBibEntryMatchingCiteKey1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBibEntryMatchingCiteKey1$Response(params: {
    citeKey: string;
    cslStyle: string;
    libraryName: string;
  }): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      LibrariesService.GetBibEntryMatchingCiteKey1Path,
      'get'
    );
    if (params) {
      rb.path('citeKey', params.citeKey, {});
      rb.path('cslStyle', params.cslStyle, {});
      rb.path('libraryName', params.libraryName, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: 'text/html',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<string>;
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
    cslStyle: string;
    libraryName: string;
  }): Observable<string> {
    return this.getBibEntryMatchingCiteKey1$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getCslStyles
   */
  static readonly GetCslStylesPath = '/libraries/{libraryName}/styles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCslStyles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCslStyles$Response(params: {
    libraryName: string;
  }): Observable<StrictHttpResponse<Array<string>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      LibrariesService.GetCslStylesPath,
      'get'
    );
    if (params) {
      rb.path('libraryName', params.libraryName, {});
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
          return r as StrictHttpResponse<Array<string>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCslStyles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCslStyles(params: { libraryName: string }): Observable<Array<string>> {
    return this.getCslStyles$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }
}
