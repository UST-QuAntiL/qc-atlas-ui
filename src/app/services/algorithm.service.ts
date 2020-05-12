import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { Parameter } from "../model/parameter.model";
import { Algorithm, AlgorithmDtos } from "../model/algorithm.model";

@Injectable({
  providedIn: "root",
})
export class AlgorithmService {
  constructor(private httpClient: HttpClient) {}

  createAlgorithm(algorithm: Algorithm): Observable<Algorithm> {
    return this.httpClient.post<Algorithm>(
      environment.API_URL + environment.ALGORITHM_ENDPOINT,
      algorithm
    );
  }

  createAlgorithmWithJson(jsonString: string): Observable<Algorithm> {
    return this.httpClient.post<Algorithm>(
      environment.API_URL + environment.ALGORITHM_ENDPOINT,
      JSON.parse(jsonString)
    );
  }

  getAlgorithmById(id: number): Observable<Algorithm> {
    return this.httpClient.get<Algorithm>(
      environment.API_URL + environment.ALGORITHM_ENDPOINT + id
    );
  }

  getAllAlgorithms(): Observable<AlgorithmDtos> {
    return this.httpClient.get<AlgorithmDtos>(
      environment.API_URL + environment.ALGORITHM_ENDPOINT
    );
  }

  addParameter(
    parameter: Parameter,
    algorithmId: number,
    type: string
  ): Observable<Parameter> {
    return type === "input"
      ? this.addInputParameter(parameter, algorithmId)
      : this.addOutputParameter(parameter, algorithmId);
  }

  addInputParameter(
    parameter: Parameter,
    algorithmId: number
  ): Observable<Parameter> {
    return this.httpClient.post<Parameter>(
      environment.API_URL +
        environment.ALGORITHM_ENDPOINT +
        algorithmId +
        environment.INPUT_PARAMETERS,
      parameter
    );
  }

  addOutputParameter(
    parameter: Parameter,
    algorithmId: number
  ): Observable<Parameter> {
    return this.httpClient.post<Parameter>(
      environment.API_URL +
        environment.ALGORITHM_ENDPOINT +
        algorithmId +
        environment.OUTPUT_PARAMETERS,
      parameter
    );
  }
}
