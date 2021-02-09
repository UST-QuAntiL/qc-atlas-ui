import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompilerAnalysisResultDto } from 'api-nisq/models/compiler-analysis-result-dto';
import { CompilationJobDto } from 'api-nisq/models/compilation-job-dto';
import { map, switchMap, tap, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CompilerAnalysisResultService } from 'api-nisq/services/compiler-analysis-result.service';
import { ExecutionResultDto } from 'api-nisq/models/execution-result-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { EntityModelComputeResourceDto } from 'api-atlas/models/entity-model-compute-resource-dto';
import { RootService } from 'api-nisq/services';
import { CompilerSelectionDto } from 'api-nisq/models';
import { ChangePageGuard } from '../../../../services/deactivation-guard';
import { AddAlgorithmRelationDialogComponent } from '../../dialogs/add-algorithm-relation-dialog.component';
import { UtilService } from '../../../../util/util.service';
import { GenericDataService } from '../../../../util/generic-data.service';
import { ImplementationExecutionDialogComponent } from '../dialogs/implementation-execution-dialog/implementation-execution-dialog.component';
import { CreateComputeResourceDialogComponent } from '../../../execution-environments/compute-resource/dialogs/create-compute-resource-dialog.component';

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
    'provider',
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
    private readonly compilerResultService: CompilerAnalysisResultService,
    private utilService: UtilService,
    private rootService: RootService
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

  onAddElement(): void {
    this.utilService
      .createDialog(ImplementationExecutionDialogComponent, {
        title: 'Start Compilation',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const computeResourceDto: ComputeResourceDto = {
            id: null,
            name: dialogResult.name,
          };
          const compilerSelectionDto: CompilerSelectionDto = {
            providerName: 'ibmq',
            circuitLanguage: 'Qiskit',
            circuitName: 'test',
            qpuName: 'ibmq_qasm_simulator',
            circuitUrl:
              'https://raw.githubusercontent.com/UST-QuAntiL/nisq-analyzer-content/master/compiler-selection/Shor/shor-fix-15-qiskit.py',
            token:
              'e03bd2c9aa8b6afc80a3e071a99ecd8b32126b7df796228bdccfeb4e3d406e318b4c9bea020fcf0bfd51e9511367b5d7a118ae86ae388fc9097c123650954544',
          };
          this.rootService
            .selectCompilerForFile1$Json({
              providerName: 'ibmq',
              circuitLanguage: 'Qiskit',
              circuitName: 'test',
              qpuName: 'ibmq_qasm_simulator',
              token:
                'e03bd2c9aa8b6afc80a3e071a99ecd8b32126b7df796228bdccfeb4e3d406e318b4c9bea020fcf0bfd51e9511367b5d7a118ae86ae388fc9097c123650954544',
              body: compilerSelectionDto,
            })
            .subscribe(
              (compilationJob: CompilationJobDto) => {
                this.utilService.callSnackBar(
                  'Successfully created compilation job "' +
                    compilationJob.id +
                    '".'
                );
              },
              () => {
                this.utilService.callSnackBar(
                  'Error! Could not create compute resource.'
                );
              }
            );
        }
      });
  }
}
