import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { AlgorithmDto } from 'api-atlas/models';
import { AnalysisResultDto, ExecutionResultDto } from 'api-nisq/models';
import { AnalysisResultService } from 'api-nisq/services';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-algorithm-nisq-analyzer-results',
  templateUrl: './nisq-analyzer-results.component.html',
  styleUrls: ['./nisq-analyzer-results.component.scss'],
})
export class NisqAnalyzerResultsComponent implements OnInit {
  @Input() algo: AlgorithmDto;

  analyzeColumns = [
    'inputParameters',
    'implementation.name',
    'qpu.name',
    'analysedWidth',
    'analysedDepth',
    'time',
    'execution',
  ];
  analyzerResults$: Observable<AnalysisResultDto[]>;
  expandedElement: AnalysisResultDto | null;
  expandedElementExecResult: ExecutionResultDto | null;

  sort$ = new BehaviorSubject<string[] | undefined>(undefined);

  constructor(
    private readonly http: HttpClient,
    private readonly analysisResultService: AnalysisResultService
  ) {}

  ngOnInit(): void {
    this.analyzerResults$ = this.sort$
      .pipe(
        switchMap((sort) =>
          this.analysisResultService.getAnalysisResults({
            algoId: this.algo.id,
            sort,
          })
        )
      )
      .pipe(tap(() => (this.expandedElement = null)))
      .pipe(map((dto) => dto.analysisResultList));
  }

  changeSort(active: string, direction: 'asc' | 'desc' | ''): void {
    if (!active || !direction) {
      this.sort$.next(undefined);
    } else {
      this.sort$.next([`${active},${direction}`]);
    }
  }

  formatParameters(analysisResult: AnalysisResultDto): string {
    const result: string[] = [];
    for (const key of Object.keys(analysisResult.inputParameters)) {
      if (key === 'token') {
        continue;
      }
      result.push(`${key}: ${analysisResult.inputParameters[key]}`);
    }
    return result.join(' ');
  }

  hasExecutionResult(analysisResult: AnalysisResultDto): boolean {
    return !!Object.keys(analysisResult._links).find((key) =>
      key.startsWith('execute-')
    );
  }

  showExecutionResult(analysisResult: AnalysisResultDto): void {
    if (Object.is(this.expandedElement, analysisResult)) {
      this.expandedElement = undefined;
      this.expandedElementExecResult = undefined;
      return;
    }
    const key = Object.keys(analysisResult._links).find((k) =>
      k.startsWith('execute-')
    );
    const href = analysisResult._links[key].href;
    this.http.get<ExecutionResultDto>(href).subscribe((dto) => {
      this.expandedElement = analysisResult;
      this.expandedElementExecResult = dto;
    });
  }
}
