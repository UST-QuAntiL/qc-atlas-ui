import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
})
export class DataListComponent implements OnInit {
  @Input() data: any[];
  @Input() disabledData: any[];
  @Input() variableNames: string[];
  @Input() dataColumns: string[];
  @Input() externalLinkVariables: string[];
  @Input() allowAdd: boolean;
  @Input() allowEdit: boolean;
  @Input() addIcon = 'playlist_add';
  @Input() allowDelete = false;
  @Input() allowLink = false;
  @Input() allowSearch = false;
  @Input() allowSort = false;
  @Input() pagination: any;
  @Input() paginatorConfig: any;
  @Input() emptyTableMessage = 'No elements found';
  @Input() smallTable = false;
  @Output() elementClicked = new EventEmitter<any>();
  @Output() urlClicked = new EventEmitter<UrlData>();
  @Output() updateClicked = new EventEmitter<any>();
  @Output() addElement = new EventEmitter<void>();
  @Output() submitDeleteElements = new EventEmitter<SelectParams>();
  @Output() submitLinkElements = new EventEmitter<SelectParams>();
  @Output() pageChange = new EventEmitter<string>();
  @Output() datalistConfigChanged = new EventEmitter<QueryParams>();
  selection = new SelectionModel<any>(true, []);
  searchText = '';
  sortDirection = '';
  sortActiveElement = '';
  disabledDataEntries: Set<any> = new Set<any>();

  constructor() {}

  ngOnInit(): void {
    if (this.pagination) {
      this.generateInitialPaginator();
    }
    this.datalistConfigChanged.emit(this.generateGetParameter());
    this.initializeDataEntryDisabled();
  }

  isAllSelected(): boolean {
    return (
      this.data.length ===
      this.selection.selected.length + this.disabledDataEntries.size
    );
  }

  // Toggle all check boxes
  masterToggle(): void {
    const isAllSelected = this.isAllSelected();
    this.data.forEach((element) => {
      if (!this.dataEntryIsDisabled(element)) {
        this.changeSelection(element, !isAllSelected);
      }
    });
  }

  rowToggle(row: any): void {
    this.changeSelection(row, !this.selection.isSelected(row));
  }

  isLink(variableName): boolean {
    return (
      this.externalLinkVariables &&
      this.externalLinkVariables.includes(variableName)
    );
  }

  changePage(link: string): void {
    this.pageChange.emit(link);
    this.selection.clear();
  }

  onElementClicked(element): void {
    this.elementClicked.emit(element);
    this.selection.clear();
  }

  onUpdateClicked(element): void {
    this.updateClicked.emit(element);
    this.selection.clear();
  }

  onUrlClicked(event, element, variableName): void {
    event.stopPropagation();
    const urlData: UrlData = {
      element,
      variableName,
    };
    this.urlClicked.emit(urlData);
  }

  onDeleteSubmitted(): void {
    this.submitDeleteElements.emit(this.generateSelectParameter());
    this.selection.clear();
  }

  onLinkSubmitted() {
    this.submitLinkElements.emit(this.generateSelectParameter());
    this.selection.clear();
  }

  onSingleDelete(element): void {
    const deleteElement: any[] = [element];
    const deleteParams = this.generateSelectParameter();
    deleteParams.elements = deleteElement;
    this.submitDeleteElements.emit(deleteParams);
    this.selection.clear();
  }

  onSingleLink(element): void {
    const linkElement: any[] = [element];
    const linkParams = this.generateSelectParameter();
    linkParams.elements = linkElement;
    this.submitLinkElements.emit(linkParams);
    this.selection.clear();
  }

  onAdd(): void {
    this.addElement.emit();
    this.selection.clear();
  }

  sortData(event: any): void {
    this.sortDirection = event.direction;
    this.sortActiveElement = event.active;
    this.datalistConfigChanged.emit(this.generateGetParameter());
    this.selection.clear();
  }

  onChangePaginatorConfig(): void {
    this.datalistConfigChanged.emit(this.generateGetParameter());
    this.selection.clear();
  }

  onSearchChange(): void {
    this.datalistConfigChanged.emit(this.generateGetParameter());
    this.selection.clear();
  }

  initializeDataEntryDisabled(): void {
    if (
      this.data &&
      this.data.length > 0 &&
      this.disabledData &&
      this.disabledData.length > 0
    ) {
      for (const dataEntry of this.data) {
        for (const linkedObject of this.disabledData) {
          if (dataEntry.id === linkedObject.id) {
            this.disabledDataEntries.add(dataEntry.id);
          }
        }
      }
    }
  }

  dataEntryIsDisabled(dataEntry: any): boolean {
    return this.disabledDataEntries.has(dataEntry.id);
  }

  private changeSelection(row: any, select: boolean): void {
    if (select !== this.selection.isSelected(row)) {
      this.selection.toggle(row);
    }
  }

  private generateSelectParameter(): SelectParams {
    return {
      elements: this.selection.selected,
      queryParams: this.generateGetParameter(),
    };
  }

  private generateGetParameter(): QueryParams {
    const params: QueryParams = {};
    if (this.pagination) {
      params.page = this.pagination.page.number;

      if (this.paginatorConfig) {
        params.size = this.paginatorConfig.selectedAmount;
      }
    }

    if (this.sortDirection && this.sortActiveElement) {
      params.sort = [this.sortActiveElement + ',' + this.sortDirection];
    }

    if (this.allowSearch && this.searchText) {
      params.search = this.searchText;
    }

    return params;
  }

  private generateInitialPaginator(): void {
    if (!this.pagination._links) {
      this.pagination._links = {};
    }
    if (!this.pagination.page) {
      this.pagination.page = {};
    }
    if (!this.pagination.page.number) {
      this.pagination.page.number = 0;
    }
  }
}

export interface QueryParams {
  page?: number;
  size?: number;
  sort?: string[];
  search?: string;
}

export interface SelectParams {
  elements: any;
  queryParams: QueryParams;
}

export interface LinkObject {
  title: string;
  subtitle: string;
  displayVariable: string;
  data: any[];
  linkedData?: any[];
}

export interface UrlData {
  element: any;
  variableName: string;
}
