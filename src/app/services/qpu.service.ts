import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Qpu, QpuDtoList } from "../model/qpu.model";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root",
})
export class QpuService {
  constructor(private httpClient: HttpClient) {}

  getQpusForProvider(providerId: number): Observable<QpuDtoList> {
    return this.httpClient.get<QpuDtoList>(
      environment.API_URL +
        environment.PROVIDER_ENDPOINT +
        providerId +
        environment.QPU_ENDPOINT
    );
  }

  createQpuWithJson(providerId: number, jsonString: string): Observable<Qpu> {
    return this.httpClient.post<Qpu>(
      environment.API_URL +
        environment.PROVIDER_ENDPOINT +
        providerId +
        environment.QPU_ENDPOINT,
      JSON.parse(jsonString)
    );
  }

  createQpu(providerId: number, qpu: Qpu): Observable<Qpu> {
    return this.httpClient.post<Qpu>(
      environment.API_URL +
        environment.PROVIDER_ENDPOINT +
        providerId +
        environment.QPU_ENDPOINT,
      qpu
    );
  }
}
