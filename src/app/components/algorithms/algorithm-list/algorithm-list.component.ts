import { Component, OnInit } from '@angular/core';
import { AlgorithmService } from 'api/services/algorithm.service';
import { MatDialog } from '@angular/material/dialog';
import { AlgorithmDto } from 'api/models';
import { Router } from '@angular/router';
import { GenericDataService } from '../../../util/generic-data.service';
import { AddAlgorithmDialogComponent } from '../dialogs/add-algorithm-dialog.component';

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
    amountChoices: [1, 2, 3],
    selectedAmount: 1,
  };

  constructor(
    private algorithmService: AlgorithmService,
    private genericDataService: GenericDataService,
    private dialog: MatDialog,
    private router: Router
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

  onAddElement(): void {
    const params: any = {};
    const dialogRef = this.dialog.open(AddAlgorithmDialogComponent, {
      width: '400px',
      data: { title: 'Add new algorithm' },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
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
        this.router.navigate([data.id]);
      });
    });
  }

  onDeleteElements(event): void {
    // Iterate all selected algorithms and delete them
    for (const algorithm of event.elements) {
      this.algorithmService
        .deleteAlgorithm(this.generateDeleteParams(algorithm.id))
        .subscribe(() => {
          // Refresh Algorithms after delete
          this.getAlgorithms(event.queryParams);
        });
    }
  }

  onPageChanged(event): void {
    this.getAlgorithmsHateoas(event);
  }

  onDatalistConfigChanged(event): void {
    this.getAlgorithms(event);
  }

  generateDeleteParams(algoId: string): any {
    const params: any = {};
    params.algoId = algoId;
    return params;
  }
}
