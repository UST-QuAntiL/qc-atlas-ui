import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { EntityModelAlgorithmDto } from 'api-atlas/models/entity-model-algorithm-dto';
import { EntityModelImplementationDto } from 'api-atlas/models/entity-model-implementation-dto';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { Router } from '@angular/router';
import { UtilService } from '../../../util/util.service';
import { CreateImplementationDialogComponent } from '../dialogs/create-implementation-dialog.component';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';

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

  constructor(
    private algorithmService: AlgorithmService,
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getImplementations();
  }

  getImplementations(): void {
    this.algorithmService
      .getImplementationsOfAlgorithm({ algorithmId: this.algorithm.id })
      .subscribe(
        (impls) => {
          if (impls._embedded) {
            this.implementations = impls._embedded.implementations;
          } else {
            this.implementations = [];
          }
        },
        (error) => {
          console.log(error);
        }
      );
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
    const dialogRef = this.utilService.createDialog(ConfirmDialogComponent, {
      title: 'Confirm Deletion',
      message:
        'Are you sure you want to delete the following implementation(s):',
      data: event.elements,
      variableName: 'name',
      yesButtonText: 'yes',
      noButtonText: 'no',
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        // Iterate all selected algorithms and delete them
        for (const implementation of event.elements) {
          this.algorithmService
            .deleteImplementation({
              algorithmId: this.algorithm.id,
              implementationId: implementation.id,
            })
            .subscribe(() => {
              // Refresh Algorithms after delete
              this.getImplementations();
              this.utilService.callSnackBar(
                'Successfully deleted implementation(s)'
              );
            });
        }
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
}
