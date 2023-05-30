import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { QAIAppService } from 'app/components/qai-apps/qai-apps.service';
import { QAIAppDto } from 'app/components/qai-apps/qai-app-dto';
import { AddQAIAppDialogComponent } from '../dialogs/add-qai-app-dialog.component';
import { UtilService } from "app/util/util.service";
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import { PaginatorConfig } from "app/util/paginatorConfig";
import { PagingInfo } from "app/util/PagingInfo";

@Component({
  selector: 'app-qai-app-list',
  templateUrl: './qai-app-list.component.html',
})
export class QAIAppListComponent implements OnInit {
  qAIApps: QAIAppDto[] = [];
  tableColumns = ['Name'];
  variableNames = ['name'];
  pagingInfo: PagingInfo<QAIAppDto> = {};
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
        this.prepareQAIAppData(data);
      },
      () => {
        this.loading = false;
        this.utilService.callSnackBar(
          'Error! QAI apps could not be retrieved.'
        );
      }
    );
  }

  prepareQAIAppData(data): void {
    if (data.content) {
      this.qAIApps = data.content;
      this.pagingInfo.totalPages = data.totalPages;
      this.pagingInfo.number = data.number;
      this.pagingInfo.sort = data.sort;
    } else {
      this.qAIApps = data;
    }
  }

  onElementClicked(qAIApp: QAIAppDto): void {
    this.router.navigate(['qai-apps', qAIApp.id]);
  }

  onAddElement(): void {
    this.utilService.createDialog(AddQAIAppDialogComponent, {
      title: 'Add new qAI app',
    });
  }

  // TODO: disable deleting qAI apps that come from the platform
  onDeleteElements(event): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete the following qAI app(s):',
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
          let successfulDeletions = 0;

          for (const qaiApp of event.elements) {
            deletionTasks.push(
              this.qAIAppService
                .deleteQAIApp({
                  qaiAppId: qaiApp.id,
                })
                .toPromise()
                .then(() => {
                  successfulDeletions++;
                  snackbarMessages.push(
                    'Successfully deleted qAI app "' + qaiApp.name + '".'
                  );
                })
                .catch(() => {
                  snackbarMessages.push(
                    'Could not delete qAI app "' + qaiApp.name + '".'
                  );
                })
            );
          }

          forkJoin(deletionTasks).subscribe(() => {
            if (
              this.utilService.isLastPageEmptyAfterDeletion(
                successfulDeletions,
                this.qAIApps.length,
                this.pagingInfo
              )
            ) {
              event.queryParams.page--;
            }
            this.getQAIApps();
            snackbarMessages.push(
              this.utilService.generateFinishingSnackbarMessage(
                successfulDeletions,
                event.elements.length,
                'qAI apps'
              )
            );
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }
}
