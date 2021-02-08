import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompilerAnalysisResultDto } from 'api-nisq/models/compiler-analysis-result-dto';
import { map, switchMap, tap, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CompilerAnalysisResultService } from 'api-nisq/services/compiler-analysis-result.service';
import { ExecutionResultDto } from 'api-nisq/models/execution-result-dto';
import { ChangePageGuard } from '../../../../services/deactivation-guard';

@Component({
  selector: 'app-implementation-execution',
  templateUrl: './implementation-execution.component.html',
  styleUrls: ['./implementation-execution.component.scss'],
})
export class ImplementationExecutionComponent implements OnInit {
  @Input() algo: AlgorithmDto;
  @Input() impl: ImplementationDto;
  @Input() guard: ChangePageGuard;

  analyzeColumns = [
    'qpu',
    'compiler',
    'analyzedDepth',
    'analyzedWidth',
    'time',
    'execution',
  ];

  compilerResults$: Observable<CompilerAnalysisResultDto[]>;
  expandedElement: CompilerAnalysisResultDto | null;
  expandedElementExecResult: ExecutionResultDto | null;

  sort$ = new BehaviorSubject<string[] | undefined>(undefined);

  constructor(
    private readonly http: HttpClient,
    private readonly compilerResultService: CompilerAnalysisResultService
  ) {}

  ngOnInit(): void {
    this.compilerResults$ = this.sort$
      .pipe(
        switchMap((sort) =>
          this.compilerResultService.getCompilerAnalysisResults({
            sort,
          })
        )
      )
      .pipe(tap(() => (this.expandedElement = null)))
      .pipe(
        map((dto) =>
          dto.compilerAnalysisResultList.filter(
            (compilerResult) => compilerResult.circuitName === this.impl.name
          )
        )
      );
  }

  changeSort(active: string, direction: 'asc' | 'desc' | ''): void {
    if (!active || !direction) {
      this.sort$.next(undefined);
    } else {
      this.sort$.next([`${active},${direction}`]);
    }
  }

  hasExecutionResult(analysisResult: CompilerAnalysisResultDto): boolean {
    return !!Object.keys(analysisResult._links).find((key) =>
      key.startsWith('execute-')
    );
  }

  showExecutionResult(analysisResult: CompilerAnalysisResultDto): void {
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
