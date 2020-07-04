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
  selectedAlgorithms: any[] = [];
  tableColumns = ['Name', 'Acronym', 'Type', 'Problem'];
  variableNames = ['name', 'acronym', 'computationModel', 'problem'];
  routingVariable = 'id';
  searchParameter = '';
  sortData: any = {
    active: '',
    direction: '',
  };
  pagingInfo = {
    _links: {
      prev: {
        href: 'http://previousPage',
      },
      next: {
        href: 'http://nextPage',
      },
      first: {
        href: 'http://firstPage',
      },
      last: {
        href: 'http://lastPage',
      },
      self: {
        href: 'http://currentPage',
      },
    },
    page: {
      size: 10,
      totalElements: 2,
      totalPages: 5,
      number: 0,
    },
  };
  paginatorConfig = {
    amountChoices: [1, 2, 3],
    selectedAmount: 1,
  };

  constructor(
    private algorithmService: AlgorithmService,
    private genericDataService: GenericDataService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAlgorithms(this.generateGetParams());
  }

  getAlgorithms(params: any): void {
    this.algorithmService.getAlgorithms(params).subscribe((data) => {
      // Adjust Paging and Hateoas data
      this.prepareAlgorithmdata(JSON.parse(JSON.stringify(data)));
    });
  }

  getAlgorithmsHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareAlgorithmdata(data);
    });
  }

  prepareAlgorithmdata(data): void {
    // Read all incoming data
    this.algorithms = data._embedded.algorithms;
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  selectionChanged(event): void {
    this.selectedAlgorithms = event;
  }

  pageChanged(event): void {
    this.getAlgorithmsHateoas(event);
  }

  dataSorted(event): void {
    this.sortData = event;
    this.getAlgorithms(this.generateGetParams());
  }

  paginatorConfigChanged(event): void {
    this.paginatorConfig = event;
    this.getAlgorithms(this.generateGetParams());
  }

  deleteElements(): void {
    // Iterate all selected algorithms and delete them
    for (const algorithm of this.selectedAlgorithms) {
      this.algorithmService
        .deleteAlgorithm(this.generateDeleteParams(algorithm.id))
        .subscribe(() => {
          // Refresh Algorithms after delete
          this.getAlgorithms(this.generateGetParams());
        });
    }

    // Clear selected algorithms
    this.selectedAlgorithms = [];
  }

  addElement(): void {
    this.openAddAlgorithmDialog();
  }

  searchElement(event): void {
    this.searchParameter = event;
    this.getAlgorithms(this.generateGetParams());
  }

  generateGetParams(): any {
    const params: any = {};
    params.page = this.pagingInfo.page.number;
    params.size = this.paginatorConfig.selectedAmount;

    if (this.sortData.direction && this.sortData.active) {
      params.sort = this.sortData.direction;
      params.sortBy = this.sortData.active;
    }

    if (this.searchParameter) {
      params.search = this.searchParameter;
    }

    return params;
  }

  generateDeleteParams(algoId: string): any {
    const params: any = {};
    params.algoId = algoId;
    return params;
  }

  openAddAlgorithmDialog(): void {
    const params: any = {};
    const dialogRef = this.dialog.open(AddAlgorithmDialogComponent, {
      width: '400px',
      data: { title: 'Add new algorithm' },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      const algorithmDto: any = {
        name: dialogResult.name,
        computationModel: dialogResult.computationModel.toUpperCase(),
      };

      if (algorithmDto.computationModel === 'QUANTUM') {
        algorithmDto.quantumComputationModel = dialogResult.quantumComputationModel.toUpperCase();
      }

      params.body = algorithmDto as AlgorithmDto;

      this.algorithmService.createAlgorithm(params).subscribe((data) => {
        this.router.navigate([data.id]);
      });
    });
  }
}
