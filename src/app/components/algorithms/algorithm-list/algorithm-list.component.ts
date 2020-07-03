import { Component, OnInit } from '@angular/core';
import { AlgorithmService } from 'api/services/algorithm.service';
import { GenericDataService } from '../../../util/generic-data.service';

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
    private genericDataService: GenericDataService
  ) {}

  ngOnInit(): void {
    this.getAlgorithms(this.generateGetParams());
  }

  getAlgorithms(params: any): void {
    console.log(params);
    this.algorithmService.getAlgorithms(params).subscribe((data) => {
      this.prepareAlgorithmdata(JSON.parse(JSON.stringify(data)));
    });
  }

  getAlgorithmsHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareAlgorithmdata(data);
    });
  }

  prepareAlgorithmdata(data): void {
    // Clear current algorithms
    this.algorithms = [];

    // Read all incoming algorithms
    const classicAlgs = data._embedded.classicAlgorithmDtoes;
    const quantumAlgs = data._embedded.quantumAlgorithmDtoes;

    // Adjust Paging and Hateoas data
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;

    // Adjust Algorithm data
    if (classicAlgs) {
      this.algorithms = this.algorithms.concat(classicAlgs);
    }
    if (quantumAlgs) {
      this.algorithms = this.algorithms.concat(quantumAlgs);
    }
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
    console.log('Add Element');
  }

  searchElement(event): void {
    console.log(event);
  }

  generateGetParams(): any {
    const params: any = {};
    params.page = this.pagingInfo.page.number;
    params.size = this.paginatorConfig.selectedAmount;

    if (this.sortData.direction && this.sortData.active) {
      params.sort = this.sortData.direction;
      params.sortBy = this.sortData.active;
    }

    return params;
  }

  generateDeleteParams(algoId: string): any {
    const params: any = {};
    params.algoId = algoId;
    return params;
  }
}
