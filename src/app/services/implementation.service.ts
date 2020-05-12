import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { Parameter } from "../model/parameter.model";
import {
  Implementation,
  ImplementationDtos,
} from "../model/implementation.model";

@Injectable({
  providedIn: "root",
})
export class ImplementationService {
  constructor(private httpClient: HttpClient) {}

  getImplementationsForAlgorithm(
    algoId: number
  ): Observable<ImplementationDtos> {
    return this.httpClient.get<ImplementationDtos>(
      environment.API_URL +
        environment.ALGORITHM_ENDPOINT +
        algoId +
        environment.IMPLEMENTATION_ENDPOINT
    );
  }

  getImplementationById(
    algoId: number,
    implId: number
  ): Observable<Implementation> {
    return this.httpClient.get<Implementation>(
      environment.API_URL +
        environment.ALGORITHM_ENDPOINT +
        algoId +
        environment.IMPLEMENTATION_ENDPOINT +
        implId
    );
  }

  createImplementationWithJson(
    algoId: number,
    jsonString: string
  ): Observable<Implementation> {
    return this.httpClient.post<Implementation>(
      environment.API_URL +
        environment.ALGORITHM_ENDPOINT +
        algoId +
        environment.IMPLEMENTATION_ENDPOINT,
      JSON.parse(jsonString)
    );
  }

  createImplementation(
    algoId: number,
    implementation: Implementation
  ): Observable<Implementation> {
    return this.httpClient.post<Implementation>(
      environment.API_URL +
        environment.ALGORITHM_ENDPOINT +
        algoId +
        environment.IMPLEMENTATION_ENDPOINT,
      implementation
    );
  }

  addParameter(
    parameter: Parameter,
    algoId: number,
    implId: number,
    type: string
  ): Observable<Parameter> {
    return type === "input"
      ? this.addInputParameter(parameter, algoId, implId)
      : this.addOutputParameter(parameter, algoId, implId);
  }

  addInputParameter(
    parameter: Parameter,
    algoId: number,
    implId: number
  ): Observable<Parameter> {
    return this.httpClient.post<Parameter>(
      environment.API_URL +
        environment.ALGORITHM_ENDPOINT +
        algoId +
        environment.IMPLEMENTATION_ENDPOINT +
        implId +
        environment.INPUT_PARAMETERS,
      parameter
    );
  }

  addOutputParameter(
    parameter: Parameter,
    algoId: number,
    implId: number
  ): Observable<Parameter> {
    return this.httpClient.post<Parameter>(
      environment.API_URL +
        environment.ALGORITHM_ENDPOINT +
        algoId +
        environment.IMPLEMENTATION_ENDPOINT +
        implId +
        environment.OUTPUT_PARAMETERS,
      parameter
    );
  }
}
