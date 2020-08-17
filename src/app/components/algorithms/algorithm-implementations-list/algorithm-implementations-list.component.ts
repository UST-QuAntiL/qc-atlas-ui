import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmService } from 'api/services/algorithm.service';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import { EntityModelImplementationDto } from 'api/models/entity-model-implementation-dto';
import { ImplementationDto } from 'api/models/implementation-dto';
import { Router } from '@angular/router';
import { UtilService } from '../../../util/util.service';
import { CreateImplementationDialogComponent } from '../dialogs/create-implementation-dialog.component';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.algorithmService
      .getImplementations({ algoId: this.algorithm.id })
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
            name: dialogResult.name,
          };
          this.algorithmService
            .createImplementation({
              algoId: this.algorithm.id,
              body: implementationDto,
            })
            .subscribe((data) => {
              this.router.navigate([
                'algorithms',
                this.algorithm.id,
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

  onDeleteImplementation(event): void {}

  onDatalistConfigChanged(event): void {}

  onPageChanged(event): void {}

  onImplementationClicked(implementation: EntityModelImplementationDto): void {
    this.router.navigate([
      'algorithms',
      this.algorithm.id,
      'implementations',
      implementation.id,
    ]);
  }
}
