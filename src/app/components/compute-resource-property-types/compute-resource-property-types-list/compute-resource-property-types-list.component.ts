import { Component, OnInit } from '@angular/core';
import { ComputeResourcePropertyTypesService } from 'api-atlas/services/compute-resource-property-types.service';
import { GenericDataService } from '../../../util/generic-data.service';
import { UtilService } from '../../../util/util.service';

@Component({
  selector: 'app-compute-resource-property-types-list',
  templateUrl: './compute-resource-property-types-list.component.html',
  styleUrls: ['./compute-resource-property-types-list.component.scss'],
})
export class ComputeResourcePropertyTypesListComponent implements OnInit {
  computeResourcePropertyTypes: any[] = [];
  tableColumns = ['Name'];
  variableNames = ['name'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private computeResourcePropertyTypeService: ComputeResourcePropertyTypesService,
    private genericDataService: GenericDataService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getComputeResourcePropertyTypes(params: any): void {}

  getComputeResourcePropertyTypesHateoas(url: string): void {}

  prepareComputeResourcePropertyTypeData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.computeResourcePropertyTypes = data._embedded.patternRelationTypes;
    } else {
      this.computeResourcePropertyTypes = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  onAddElement(): void {}

  onDeleteElements(event): void {}

  onEditElement(event: any): void {}
}
