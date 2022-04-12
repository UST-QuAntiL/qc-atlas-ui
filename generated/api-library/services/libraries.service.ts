/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BibEntryDto } from '../models/bib-entry-dto';
import { NewLibraryConfiguration } from '../models/new-library-configuration';
import { LibraryNames } from 'api-library/models/library-names';
import { BibEntries } from 'api-library/models/bib-entries';

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
    getLibraryNames$Response(params?: {}): Observable<StrictHttpResponse<LibraryNames>> {
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
                    accept: '*/*',
                })
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return (r as HttpResponse<any>).clone({
                        body: undefined,
                    }) as StrictHttpResponse<LibraryNames>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `getLibraryNames$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getLibraryNames(params?: {}): Observable<LibraryNames> {
        return this.getLibraryNames$Response(params).pipe(
            map((r: StrictHttpResponse<LibraryNames>) => r.body as LibraryNames)
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
        body?: NewLibraryConfiguration;
    }): Observable<StrictHttpResponse<void>> {
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
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `createNewLibrary$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    createNewLibrary(params?: {
        body?: NewLibraryConfiguration;
    }): Observable<void> {
        return this.createNewLibrary$Response(params).pipe(
            map((r: StrictHttpResponse<void>) => r.body as void)
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
    }): Observable<StrictHttpResponse<BibEntries>> {
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
                    accept: '*/*',
                })
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return (r as HttpResponse<any>).clone({
                        body: undefined,
                    }) as StrictHttpResponse<BibEntries>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `getLibraryEntries$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getLibraryEntries(params: { libraryName: string }): Observable<BibEntries> {
        return this.getLibraryEntries$Response(params).pipe(
            map((r: StrictHttpResponse<BibEntries>) => r.body as BibEntries)
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
    }): Observable<StrictHttpResponse<void>> {
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
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `addEntryToLibrary$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    addEntryToLibrary(params: {
        libraryName: string;
        body?: BibEntryDto;
    }): Observable<void> {
        return this.addEntryToLibrary$Response(params).pipe(
            map((r: StrictHttpResponse<void>) => r.body as void)
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
    }): Observable<StrictHttpResponse<void>> {
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
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `deleteLibrary$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    deleteLibrary(params: { libraryName: string }): Observable<void> {
        return this.deleteLibrary$Response(params).pipe(
            map((r: StrictHttpResponse<void>) => r.body as void)
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
    }): Observable<StrictHttpResponse<void>> {
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
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `getBibEntryMatchingCiteKey$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getBibEntryMatchingCiteKey(params: {
        citeKey: string;
        libraryName: string;
    }): Observable<void> {
        return this.getBibEntryMatchingCiteKey$Response(params).pipe(
            map((r: StrictHttpResponse<void>) => r.body as void)
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
    }): Observable<StrictHttpResponse<void>> {
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
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `updateEntry$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    updateEntry(params: {
        citeKey: string;
        libraryName: string;
        body?: BibEntryDto;
    }): Observable<void> {
        return this.updateEntry$Response(params).pipe(
            map((r: StrictHttpResponse<void>) => r.body as void)
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
    }): Observable<StrictHttpResponse<void>> {
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
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `deleteEntryFromLibrary$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    deleteEntryFromLibrary(params: {
        citeKey: string;
        libraryName: string;
    }): Observable<void> {
        return this.deleteEntryFromLibrary$Response(params).pipe(
            map((r: StrictHttpResponse<void>) => r.body as void)
        );
    }
}
