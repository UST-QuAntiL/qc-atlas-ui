import { Component, OnInit } from '@angular/core';
import { AlgorithmDto } from 'api-atlas/models';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { QAIAppService } from 'src/app/components/qai-apps/qai-apps.service';
import { QAIAppDto } from 'src/app/components/qai-apps/qai-app-dto';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AddQAIAppDialogComponent,
  DialogData,
} from '../dialogs/add-qai-app-dialog.component';
import { UtilService } from '../../../util/util.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { PagingInfo } from '../../../util/PagingInfo';

@Component({
  selector: 'app-qai-app-list',
  templateUrl: './qai-app-list.component.html',
  styleUrls: ['./qai-app-list.component.scss'],
})
export class QAIAppListComponent implements OnInit {
  qAIApps: QAIAppDto[] = [];
  tableColumns = ['Name'];
  variableNames = ['name'];
  pagingInfo: PagingInfo<AlgorithmDto> = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };
  loading = true;

  constructor(
    private qAIAppService: QAIAppService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getQAIApps(): void {
    this.qAIAppService.getQAIApps().subscribe(
      (data) => {
        this.loading = false;
        this.qAIApps = data;
      },
      () => {
        this.loading = false;
        this.utilService.callSnackBar(
          'Error! QAI apps could not be retrieved.'
        );
      }
    );
  }

  onElementClicked(qAIApp: QAIAppDto): void {
    this.router.navigate(['qai-apps', qAIApp.id]);
  }

  onAddElement(): void {
    const dialogRef = this.utilService.createDialog(AddQAIAppDialogComponent, {
      title: 'Add new qAI app',
    });

    dialogRef.afterClosed().subscribe((dialogResult: DialogData) => {
      if (dialogResult) {
        this.qAIAppService
          .createQAIApp(dialogResult.file, dialogResult.name)
          .subscribe({
            next: (data) => {
              this.utilService.callSnackBar(
                'qAI app was successfully created.'
              );
              this.router.navigate(['qai-apps', data.id]);
            },
            error: (error: HttpErrorResponse) => {
              this.utilService.callSnackBar(
                'Could not create new qAI app: ' + error.message
              );
            },
            complete: () => {},
          });
      }
    });
  }

  // TODO: disable deleting qAI apps that come from the platform
  onDeleteElements(event): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete the following algorithm(s):',
      data: event.elements,
      variableName: 'name',
      yesButtonText: 'yes',
      noButtonText: 'no',
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, dialogData)
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const deletionTasks = [];
          const snackbarMessages = [];
          // let successfulDeletions = 0;
          for (const algorithm of event.elements) {
            /* deletionTasks.push(
              this.algorithmService
                .deleteAlgorithm({
                  algorithmId: algorithm.id,
                })
                .toPromise()
                .then(() => {
                  successfulDeletions++;
                  snackbarMessages.push(
                    'Successfully deleted algorithm "' + algorithm.name + '".'
                  );
                })
                .catch(() => {
                  snackbarMessages.push(
                    'Could not delete algorithm "' + algorithm.name + '".'
                  );
                })
            );*/
          }
          forkJoin(deletionTasks).subscribe(() => {
            /* if (
              this.utilService.isLastPageEmptyAfterDeletion(
                successfulDeletions,
                this.algorithms.length,
                this.pagingInfo
              )
            ) {
              event.queryParams.page--;
            }
            this.getAlgorithms(event.queryParams);
            snackbarMessages.push(
              this.utilService.generateFinishingSnackbarMessage(
                successfulDeletions,
                event.elements.length,
                'algorithms'
              )
            );*/
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }
}
