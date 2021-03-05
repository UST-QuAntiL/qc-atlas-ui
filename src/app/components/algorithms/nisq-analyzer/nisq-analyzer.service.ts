import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import {
  AnalysisResultService,
  CompilerAnalysisResultService,
  RootService,
} from 'api-nisq/services';
import {
  AnalysisJobDto,
  AnalysisJobListDto,
  AnalysisResultDto,
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
    private analysisResultService: AnalysisResultService,
    private compilerAnalysisResult: CompilerAnalysisResultService,
    private rootService: RootService,
    private http: HttpClient
  ) {}

  getParams(algoId: string): Observable<ParameterDto[]> {
    return this.rootService
      .getSelectionParams({ algoId })
      .pipe(map((list) => list.parameters));
  }

  analyze(body: SelectionRequestDto): Observable<AnalysisJobDto> {
    return this.rootService
      .selectImplementations({ body })
      .pipe(map((job) => job));
  }

  getJob(resId: string): Observable<AnalysisJobDto> {
    return this.analysisResultService.getAnalysisJob({ resId });
  }

  execute(resId: string) {
    return this.analysisResultService.executeAnalysisResult({
      resId,
    });
  }

  executeCompilationResult(resId: string) {
    return this.compilerAnalysisResult.executeCompilationResult({
      resId,
    });
  }

  /**
   * Collapse params with the same name
   *
   * NOTE: Doesn't handle restrictions yet and only allows one description!
   *
   * @param params
   */
  collapseParams(params: ParameterDto[]) {
    const paramMap: { [key: string]: ParameterDto } = {};
    for (const param of params) {
      const finalParam = paramMap[param.name];
      if (!finalParam) {
        // Note: Make a copy, so we can modify props!
        paramMap[param.name] = { ...param };
        continue;
      }
      const replaceDescription =
        finalParam.description === 'Parameter of rule.' && param.description;
      if (!finalParam.description || replaceDescription) {
        finalParam.description = param.description;
      }
    }
    return Object.values(paramMap);
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
