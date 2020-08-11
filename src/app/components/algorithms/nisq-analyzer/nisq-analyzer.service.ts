import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { ImplementationDto as AtlasImplementationDto } from 'api-atlas/models/implementation-dto';
import { ImplementationService as NISQImplementationService } from 'api-nisq/services/implementation.service';
import { ImplementationDto as NISQImplementationDto } from 'api-nisq/models/implementation-dto';
import { ImplementationListDto as NISQImplementationListDto } from 'api-nisq/models/implementation-list-dto';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NisqAnalyzerService {
  algorithmId: string;
  ibmqQueueSizeUrl =
    'https://api.quantum-computing.ibm.com/api/Backends/<backendName>/queue/status?';

  constructor(
    private algorithmService: AlgorithmService,
    private nisqImplementationService: NISQImplementationService,
    private http: HttpClient
  ) {}

  getImplementations(): Observable<NISQImplementationListDto> {
    return this.nisqImplementationService.getImplementations({
      algoId: this.algorithmId,
    });
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
