import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { ImplementationService, RootService } from 'api-nisq/services';
import {
  AnalysisResultDto,
  ImplementationListDto,
  ParameterDto,
  SelectionRequestDto,
} from 'api-nisq/models';
import { map } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NisqAnalyzerService {
  ibmqQueueSizeUrl =
    'https://api.quantum-computing.ibm.com/api/Backends/<backendName>/queue/status?';
  constructor(
    private algorithmService: AlgorithmService,
    private nisqImplementationService: ImplementationService,
    private rootService: RootService,
    private http: HttpClient
  ) {}

  getParams(algoId: string): Observable<ParameterDto[]> {
    return this.rootService
      .getSelectionParams({ algoId })
      .pipe(map((list) => list.parameters));
  }

  analyze(body: SelectionRequestDto): Observable<AnalysisResultDto[]> {
    return this.rootService
      .selectImplementations({ body })
      .pipe(map((list) => list.analysisResultList));
  }

  getImplementations(algoId: string): Observable<ImplementationListDto> {
    return this.nisqImplementationService.getImplementations({ algoId });
  }

  getIBMQBackendState(
    backendName: string
  ): Observable<HttpResponse<QiskitBackendState>> {
    const url = this.ibmqQueueSizeUrl.replace(/<backendName>/g, backendName);
    return this.http.get<QiskitBackendState>(url, { observe: 'response' });
  }
}

interface QiskitBackendState {
  state: boolean;
  status: string;
  message: string;
  lengthQueue: number;
  backend_version: string;
}
