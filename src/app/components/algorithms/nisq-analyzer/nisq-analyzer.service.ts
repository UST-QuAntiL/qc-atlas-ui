import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { ImplementationService, RootService } from 'api-nisq/services';
import { ImplementationListDto, ParameterDto } from 'api-nisq/models';
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
    return this.rootService.getSelectionParams({ algoId }).pipe(
      map((list) => {
        console.log(list);
        return list.parameters;
      })
    );
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
