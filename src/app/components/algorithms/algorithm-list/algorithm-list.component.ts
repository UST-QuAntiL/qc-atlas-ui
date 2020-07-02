import { Component, OnInit } from '@angular/core';
import { AlgorithmService } from 'api/services/algorithm.service';

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
  queryParams: any = {};
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

  constructor(private algorithmService: AlgorithmService) {
  }

  ngOnInit(): void {
    this.getAlgorithms();
  }

  getAlgorithms(): void {
    // TODO: Fix generated services
    this.queryParams.page = this.pagingInfo.page.number;
    this.queryParams.size = this.paginatorConfig.selectedAmount;

    this.algorithmService.getAlgorithms(this.queryParams).subscribe((data) => {
      const jsonData = JSON.parse(JSON.stringify(data));
      this.pagingInfo.page = jsonData.page;
      this.pagingInfo._links = jsonData._links;
      const classicAlgs = jsonData._embedded.classicAlgorithmDtoes;
      const quantumAlgs = jsonData._embedded.quantumAlgorithmDtoes;
      if (classicAlgs) {
        this.algorithms = this.algorithms.concat(classicAlgs);
      }
      if (quantumAlgs) {
        this.algorithms = this.algorithms.concat(quantumAlgs);
      }
      console.log(this.algorithms);
    });
  }

  selectionChanged(event) {
    this.selectedAlgorithms = event;
    console.log(this.selectedAlgorithms);
  }

  pageChanged(event) {
    const newPageUrl = event;
    console.log(newPageUrl);
  }

  dataSorted(event) {
    this.sortData = event;
    console.log(this.sortData);
  }

  paginatorConfigChanged(event) {
    this.paginatorConfig = event;
    console.log(this.paginatorConfig);
  }

  deleteElements() {
    console.log('Delete Elements: ');
    console.log(this.selectedAlgorithms);
  }

  addElement() {
    console.log('Add Element');
  }

  searchElement(event) {
    const searchText = event;
    console.log(searchText);
  }
}
