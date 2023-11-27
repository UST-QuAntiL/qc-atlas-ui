import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileDto } from 'api-atlas/models/file-dto';
import { ConcreteSolutionService } from 'generated/api-atlas/services/concrete-solution.service';
import { forkJoin } from 'rxjs';
import { UtilService } from '../../../util/util.service';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { PagingInfo } from '../../../util/PagingInfo';
import { AddFileDialogComponent } from '../dialogs/add-file-dialog.component';
import { SelectParams } from '../../generics/data-list/data-list.component';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-concrete-solution-view',
  templateUrl: './concrete-solution-view.component.html',
})
export class ConcreteSolutionViewComponent implements OnInit {
  file: FileDto[];
  tableColumns = ['Name', 'URL'];
  variableNames = ['name', 'fileURL'];
  pagingInfo: PagingInfo<FileDto> = {};
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

  getAttachedFile(): void {
    this.concreteSolutionService.getAttachedFile().subscribe(
      (data) => {
        this.file = [data];
      },
      () => {
        this.loading = false;
        this.utilService.callSnackBar('Error! File could not be retrieved.');
      }
    );
  }

  onAddElement(): void {
    this.utilService.createDialog(AddFileDialogComponent, {
      title: 'Add new File',
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
                .deleteAttachedFile({
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
                    'Could not delete concrete solution "' +
                      concreteSolution.id +
                      '".'
                  );
                })
            );
          }
        }
      });
  }
}
