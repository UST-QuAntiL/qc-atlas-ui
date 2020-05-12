import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { Provider, ProviderDtoList } from "../model/provider.model";

@Injectable({
  providedIn: "root",
})
export class ProviderService {
  constructor(private httpClient: HttpClient) {}

  createProvider(provider: Provider): Observable<Provider> {
    return this.httpClient.post<Provider>(
      environment.API_URL + environment.PROVIDER_ENDPOINT,
      provider
    );
  }

  createProviderWithJson(jsonString: string): Observable<Provider> {
    return this.httpClient.post<Provider>(
      environment.API_URL + environment.PROVIDER_ENDPOINT,
      JSON.parse(jsonString)
    );
  }

  getAllProviders(): Observable<ProviderDtoList> {
    return this.httpClient.get<ProviderDtoList>(
      environment.API_URL + environment.PROVIDER_ENDPOINT
    );
  }
}
