import { Component, OnInit } from '@angular/core';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { AlgorithmDto } from 'api-atlas/models';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AddAlgorithmDialogComponent } from '../dialogs/add-algorithm-dialog.component';
import { UtilService } from '../../../util/util.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import { QueryParams } from '../../generics/data-list/data-list.component';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { PagingInfo } from '../../../util/PagingInfo';

@Component({
  selector: 'app-algorithm-list',
  templateUrl: './algorithm-list.component.html',
  styleUrls: ['./algorithm-list.component.scss'],
})
export class AlgorithmListComponent implements OnInit {
  algorithms: AlgorithmDto[] = [];
  tableColumns = ['Name', 'Acronym', 'Type', 'Problem'];
  variableNames = ['name', 'acronym', 'computationModel', 'problem'];
  pagingInfo: PagingInfo<AlgorithmDto> = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };
  loading = true;

  constructor(
    private algorithmService: AlgorithmService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getAlgorithms(params: QueryParams): void {
    this.algorithmService.getAlgorithms(params).subscribe(
      (data) => {
        this.loading = false;
        this.prepareAlgorithmData(data);
      },
      () => {
        this.loading = false;
        this.utilService.callSnackBar(
          'Error! Algorithms could not be retrieved.'
        );
      }
    );
  }

  prepareAlgorithmData(data): void {
    // Read all incoming data
    if (data.content) {
      this.algorithms = data.content;
    } else {
      this.algorithms = [];
    }
    this.pagingInfo.totalPages = data.totalPages;
    this.pagingInfo.number = data.number;
    this.pagingInfo.sort = data.sort;
  }

  onElementClicked(algorithm: AlgorithmDto): void {
    this.router.navigate(['algorithms', algorithm.id]);
  }

  onAddElement(): void {
    const dialogRef = this.utilService.createDialog(
      AddAlgorithmDialogComponent,
      {
        title: 'Add new algorithm',
      }
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const algorithmDto: any = {
          name: dialogResult.name,
          computationModel: dialogResult.computationModel,
        };

        if (algorithmDto.computationModel === 'QUANTUM') {
          algorithmDto.quantumComputationModel =
            dialogResult.quantumComputationModel;
        }

        this.algorithmService.createAlgorithm({ body: algorithmDto }).subscribe(
          (data) => {
            this.utilService.callSnackBar(
              'Algorithm was successfully created.'
            );
            this.router.navigate(['algorithms', data.id]);
          },
          () => {
            this.utilService.callSnackBar(
              'Error! Algorithm could not be created.'
            );
          }
        );
      }
    });
  }

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
          let successfulDeletions = 0;
          for (const algorithm of event.elements) {
            deletionTasks.push(
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
            );
          }
          forkJoin(deletionTasks).subscribe(() => {
            if (
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
            );
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }
}
