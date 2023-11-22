import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ConcreteSolutionDto } from 'generated/api-atlas/models/concrete-solution-dto';
import { ConcreteSolutionService } from 'generated/api-atlas/services/concrete-solution.service';
import { UtilService } from '../../../util/util.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { PagingInfo } from '../../../util/PagingInfo';
import { QueryParams, SelectParams } from '../../generics/data-list/data-list.component';
import { CreateConcreteSolutionDialogComponent } from '../dialogs/create-concrete-solution-dialog.component';

@Component({
  selector: 'app-pattern-concrete-solutions-list',
  templateUrl: './pattern-concrete-solutions-list.component.html',
  styleUrls: ['./pattern-concrete-solutions-list.component.scss'],
})
export class PatternConcreteSolutionListComponent implements OnInit {
  @Input() patternConcreteSolutions: ConcreteSolutionDto[];
  tableColumns = [
    'ID',
    'Name',
    'Qubit Count',
    'Header',
    'Measurement',
    'Start Pattern',
    'End Pattern',
  ];
  variableNames = [
    'id',
    'name',
    'qubitCount',
    'hasHeader',
    'hasMeasurment',
    'startPattern',
    'endPattern',
  ];
  pagingInfo: PagingInfo<ConcreteSolutionDto> = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };
  loading = true;

  constructor(
    private concreteSolutionService: ConcreteSolutionService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getPatternConcreteSolutions(params: QueryParams): void {
    this.concreteSolutionService.getPatternConcreteSolutions(params).subscribe(
      (data) => {
        this.preparePatternConcreteSolutionsData(data);
      },
      () => {
        this.utilService.callSnackBar(
          'Error! Concrete Solutions could not be retrieved.'
        );
      }
    );
  }

  preparePatternConcreteSolutionsData(data): void {
    // Read all incoming data
    if (data.content) {
      this.patternConcreteSolutions = data.content;
    } else {
      // If no content, set to empty array
      this.patternConcreteSolutions = [];
    }

    this.pagingInfo.totalPages = data.totalPages;
    this.pagingInfo.number = data.number;
    this.pagingInfo.sort = data.sort;
  }

  onElementClicked(concreteSolution: ConcreteSolutionDto): void {
    this.router.navigate(['concrete-solutions', concreteSolution.id]);
  }

  onAddConcreteSolution(): void {
    this.utilService
      .createDialog(CreateConcreteSolutionDialogComponent, {
        title: 'Add new concrete solution for this pattern',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.concreteSolutionService
            .createConcreteSolution({
              patternId: window.location.href.split('/')[length - 1],
              body: {
                id: null,
                name: dialogResult.name,
                description: dialogResult.description,
                qubitCount: dialogResult.qubitCount,
                inputParameterFormat: dialogResult.inputParameterFormat,
                hasHeader: dialogResult.hasHeader,
                hasMeasurement: dialogResult.hasMeasurement,
                startPattern: dialogResult.startPattern,
                endPattern: dialogResult.endPattern,
                concreteSolutionType: 'FILE',
              },
            })
            .subscribe(
              (data) => {
                this.router.navigate([
                  'patterns',
                  window.location.href.split('/')[length - 1],
                  'concrete-solutions',
                  data.id,
                ]);
                this.utilService.callSnackBar(
                  'Concrete Solution was successfully created.'
                );
              },
              () => {
                this.utilService.callSnackBar(
                  'Error! Concrete Solution could not be created.'
                );
              }
            );
        }
      });
  }

  onDeleteElements(event: SelectParams): void {
    this.utilService
      .createDialog(ConfirmDialogComponent, {
        title: 'Confirm Deletion',
        message:
          'Are you sure you want to delete the following concrete solution(s): ',
        data: event.elements,
        variableName: 'id',
        yesButtonText: 'yes',
        noButtonText: 'no',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const deletionTasks = [];
          const snackbarMessages = [];
          let successfulDeletions = 0;
          for (const concreteSolution of event.elements) {
            deletionTasks.push(
              this.concreteSolutionService
                .deleteConcreteSolution({
                  concreteSolutionId: concreteSolution.id,
                })
                .toPromise()
                .then(() => {
                  successfulDeletions++;
                  snackbarMessages.push(
                    'Successfully deleted concrete solution "' +
                      concreteSolution.id +
                      '".'
                  );
                })
                .catch(() => {
                  snackbarMessages.push(
                    'Could not delete algorithm "' + concreteSolution.id + '".'
                  );
                })
            );
          }
          forkJoin(deletionTasks).subscribe(() => {
            if (
              this.utilService.isLastPageEmptyAfterDeletion(
                successfulDeletions,
                this.patternConcreteSolutions.length,
                this.pagingInfo
              )
            ) {
              event.queryParams.page--;
            }
            this.getPatternConcreteSolutions(event.queryParams);
            snackbarMessages.push(
              this.utilService.generateFinishingSnackbarMessage(
                successfulDeletions,
                event.elements.length,
                'publications'
              )
            );
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }
}
