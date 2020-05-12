import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Sdk, SdkDtos } from "../model/sdk.model";

@Injectable({
  providedIn: "root",
})
export class SdkService {
  constructor(private httpClient: HttpClient) {}

  createSdk(sdk: Sdk): Observable<Sdk> {
    return this.httpClient.post<Sdk>(
      environment.API_URL + environment.SDK_ENDPOINT,
      sdk
    );
  }

  createSdkWithJson(jsonString: string): Observable<Sdk> {
    return this.httpClient.post<Sdk>(
      environment.API_URL + environment.SDK_ENDPOINT,
      JSON.parse(jsonString)
    );
  }

  getAllSdks(): Observable<SdkDtos> {
    return this.httpClient.get<SdkDtos>(
      environment.API_URL + environment.SDK_ENDPOINT
    );
  }

  getSdkByHref(href: string): Observable<Sdk> {
    return this.httpClient.get<Sdk>(href);
  }
}
