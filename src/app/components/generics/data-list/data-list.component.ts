import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
})
export class DataListComponent implements OnInit {
  @Input() data: any[];
  @Input() variableNames: string[];
  @Input() dataColumns: string[];
  @Input() linkObject: any;
  @Input() externalLinkVariables: string[];
  @Input() allowAdd: boolean;
  @Input() addIcon = 'playlist_add';
  @Input() allowSelection: boolean;
  @Input() submitSelectionIcon = 'delete';
  @Input() allowSearch: boolean;
  @Input() allowSort: boolean;
  @Input() pagination: any;
  @Input() paginatorConfig: any;
  @Output() elementClicked = new EventEmitter<any>();
  @Output() addElement = new EventEmitter<void>();
  @Output() linkElement = new EventEmitter<any>();
  @Output() linkConfigChange = new EventEmitter<string>();
  @Output() submitSelectedElements = new EventEmitter<DeleteParams>(); // changed
  @Output() pageChange = new EventEmitter<string>();
  @Output() datalistConfigChanged = new EventEmitter<any>();
  selection = new SelectionModel<any>(true, []);
  searchText = '';
  linkSearchText = '';
  sortDirection = '';
  sortActiveElement = '';

  constructor() {}

  ngOnInit(): void {
    if (this.pagination) {
      this.generateInitialPaginator();
    }

    this.datalistConfigChanged.emit(this.generateGetParameter());
  }

  isAllSelected(): boolean {
    return this.data.length === this.selection.selected.length;
  }

  // Toggle all check boxes
  masterToggle(): void {
    const isAllSelected = this.isAllSelected();
    this.data.forEach((element) => {
      this.changeSelection(element, !isAllSelected);
    });
  }

  rowToggle(row: any): void {
    this.changeSelection(row, !this.selection.isSelected(row));
  }

  changePage(link: string): void {
    this.pageChange.emit(link);
    this.selection.clear();
  }

  onElementClicked(element): void {
    this.elementClicked.emit(element);
    this.selection.clear();
  }

  // changed
  onSelectionSubmitted(): void {
    this.submitSelectedElements.emit(this.generateDeleteParameter());
    this.selection.clear();
  }

  onSingleDelete(element): void {
    const deleteElement: any[] = [element];
    const deleteParams = this.generateDeleteParameter();
    deleteParams.elements = deleteElement;
    this.submitSelectedElements.emit(deleteParams);
    this.selection.clear();
  }

  onAdd(): void {
    this.addElement.emit();
    this.selection.clear();
  }

  onLinkElement(element: any): void {
    this.linkElement.emit(element);
    this.linkSearchText = '';
  }

  onLinkConfigChange(): void {
    this.linkConfigChange.emit(this.linkSearchText);
  }

  sortData(event: any): void {
    this.sortDirection = event.direction;
    this.sortActiveElement = event.active;
    this.datalistConfigChanged.emit(this.generateGetParameter());
    this.selection.clear();
  }

  onChangePagingatorConfig(): void {
    this.datalistConfigChanged.emit(this.generateGetParameter());
    this.selection.clear();
  }

  onSearchChange(): void {
    this.datalistConfigChanged.emit(this.generateGetParameter());
    this.selection.clear();
  }

  private changeSelection(row: any, select: boolean): void {
    if (select !== this.selection.isSelected(row)) {
      this.selection.toggle(row);
    }
  }

  private generateDeleteParameter(): DeleteParams {
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
      // comma-delimited list of properties, last element is the direction!
      params.sort = `${this.sortActiveElement},${this.sortDirection}`;
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
  sort?: string;
  search?: string;
}

export interface DeleteParams {
  elements: any;
  queryParams: QueryParams;
}
