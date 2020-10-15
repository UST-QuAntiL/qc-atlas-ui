import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { EntityModelAlgorithmDto } from 'api-atlas/models/entity-model-algorithm-dto';
import { EntityModelImplementationDto } from 'api-atlas/models/entity-model-implementation-dto';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UtilService } from '../../../util/util.service';
import { CreateImplementationDialogComponent } from '../dialogs/create-implementation-dialog.component';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';
import { GenericDataService } from '../../../util/generic-data.service';

@Component({
  selector: 'app-algorithm-implementations-list',
  templateUrl: './algorithm-implementations-list.component.html',
  styleUrls: ['./algorithm-implementations-list.component.scss'],
})
export class AlgorithmImplementationsListComponent implements OnInit {
  @Input() algorithm: EntityModelAlgorithmDto;

  implementations: EntityModelImplementationDto[];
  variableNames: string[] = ['name', 'description', 'dependencies'];
  tableColumns: string[] = ['Name', 'Description', 'Dependencies'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private algorithmService: AlgorithmService,
    private utilService: UtilService,
    private router: Router,
    private genericDataService: GenericDataService
  ) {}

  ngOnInit(): void {}

  getImplementations(params): void {
    this.algorithmService.getImplementationsOfAlgorithm(params).subscribe(
      (implementations) => {
        this.prepareImplementationData(implementations);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getImplementationsHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((relations) => {
      this.prepareImplementationData(relations);
    });
  }

  prepareImplementationData(implementations): void {
    if (implementations._embedded) {
      this.implementations = implementations._embedded.implementations;
    } else {
      this.implementations = [];
    }
    this.pagingInfo.page = implementations.page;
    this.pagingInfo._links = implementations._links;
  }

  onAddImplementation(): void {
    this.utilService
      .createDialog(CreateImplementationDialogComponent, {
        title: 'Add new implementation for this algorithm',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const implementationDto: ImplementationDto = {
            id: null,
            name: dialogResult.name,
          };
          this.algorithmService
            .createImplementation({
              algorithmId: this.algorithm.id,
              body: implementationDto,
            })
            .subscribe((data) => {
              this.router.navigate([
                'algorithms',
                data.implementedAlgorithmId,
                'implementations',
                data.id,
              ]);
              this.utilService.callSnackBar(
                'Successfully added implementation'
              );
            });
        }
      });
  }

  onDeleteImplementation(event): void {
    this.utilService
      .createDialog(ConfirmDialogComponent, {
        title: 'Confirm Deletion',
        message:
          'Are you sure you want to delete the following implementation(s):',
        data: event.elements,
        variableName: 'name',
        yesButtonText: 'yes',
        noButtonText: 'no',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const deletionTasks = [];
          const snackbarMessages = [];
          let successfulDeletions = 0;
          for (const implementation of event.elements) {
            deletionTasks.push(
              this.algorithmService
                .deleteImplementation({
                  algorithmId: this.algorithm.id,
                  implementationId: implementation.id,
                })
                .toPromise()
                .then(() => {
                  successfulDeletions++;
                  snackbarMessages.push(
                    'Successfully deleted implementation "' +
                      implementation.name +
                      '"'
                  );
                })
            );
          }
          forkJoin(deletionTasks).subscribe(() => {
            if (
              this.utilService.isLastPageEmptyAfterDeletion(
                successfulDeletions,
                event.elements.length,
                this.pagingInfo
              )
            ) {
              this.getImplementationsHateoas(this.pagingInfo._links.prev.href);
            } else {
              this.getImplementationsHateoas(this.pagingInfo._links.self.href);
            }
            snackbarMessages.push(
              this.utilService.generateFinishingSnackbarMessage(
                successfulDeletions,
                dialogResult.data.length,
                'implementations'
              )
            );
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }

  onImplementationClicked(implementation: EntityModelImplementationDto): void {
    this.router.navigate([
      'algorithms',
      this.algorithm.id,
      'implementations',
      implementation.id,
    ]);
  }

  onDatalistConfigChanged(event) {
    event.algorithmId = this.algorithm.id;
    this.getImplementations(event);
  }
}
