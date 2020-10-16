import { Component, OnInit } from '@angular/core';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { AlgorithmDto } from 'api-atlas/models';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { GenericDataService } from '../../../util/generic-data.service';
import { AddAlgorithmDialogComponent } from '../dialogs/add-algorithm-dialog.component';
import { UtilService } from '../../../util/util.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-algorithm-list',
  templateUrl: './algorithm-list.component.html',
  styleUrls: ['./algorithm-list.component.scss'],
})
export class AlgorithmListComponent implements OnInit {
  algorithms: any[] = [];
  tableColumns = ['Name', 'Acronym', 'Type', 'Problem'];
  variableNames = ['name', 'acronym', 'computationModel', 'problem'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private algorithmService: AlgorithmService,
    private genericDataService: GenericDataService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getAlgorithms(params: any): void {
    this.algorithmService.getAlgorithms(params).subscribe((data) => {
      this.prepareAlgorithmData(JSON.parse(JSON.stringify(data)));
    });
  }

  getAlgorithmsHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareAlgorithmData(data);
    });
  }

  prepareAlgorithmData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.algorithms = data._embedded.algorithms;
    } else {
      this.algorithms = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  onElementClicked(algorithm: any): void {
    this.router.navigate(['algorithms', algorithm.id]);
  }

  onAddElement(): void {
    const params: any = {};
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

        params.body = algorithmDto as AlgorithmDto;

        this.algorithmService.createAlgorithm(params).subscribe((data) => {
          this.utilService.callSnackBar('Successfully added algorithm');
          this.router.navigate(['algorithms', data.id]);
        });
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
          let successfulDeletions = 0;
          for (const algorithm of event.elements) {
            deletionTasks.push(
              this.algorithmService
                .deleteAlgorithm({
                  algorithmId: algorithm.id,
                })
                .toPromise()
                .then(() => successfulDeletions++)
            );
          }
          forkJoin(deletionTasks).subscribe(() => {
            console.log(this.pagingInfo.page);
            if (
              this.utilService.isLastPageEmptyAfterDeletion(
                successfulDeletions,
                this.algorithms.length,
                this.pagingInfo
              )
            ) {
              this.getAlgorithmsHateoas(this.pagingInfo._links.prev.href);
            } else {
              this.getAlgorithmsHateoas(this.pagingInfo._links.self.href);
            }
            this.utilService.callSnackBar(
              'Successfully deleted ' +
                successfulDeletions +
                '/' +
                dialogResult.data.length +
                ' algorithms.'
            );
          });
        }
      });
  }

  onPageChanged(event): void {
    this.getAlgorithmsHateoas(event);
  }

  onDatalistConfigChanged(event): void {
    this.getAlgorithms(event);
  }
}
