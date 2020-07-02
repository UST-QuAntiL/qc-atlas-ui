import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
})
export class DataListComponent implements OnInit {
  @Input() data: any[];
  @Input() dataColumns: string[];
  @Input() allowSelection: boolean;
  @Input() allowSearch: boolean;
  @Input() variableNames: string[];
  @Input() pagination: any;
  @Input() paginatorConfig: any;
  @Input() routingVariable: string;
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() pageChange = new EventEmitter<string>();
  @Output() deleteElements = new EventEmitter<void>();
  @Output() addElement = new EventEmitter<void>();
  @Output() paginationConfigChange = new EventEmitter<any>();
  @Output() searchElement = new EventEmitter<string>();
  @Output() dataSorted = new EventEmitter<any>();
  selection = new SelectionModel<any>(true, []);
  searchText = '';

  constructor() {}

  @HostListener('input')
  oninput() {
    this.searchElement.emit(this.searchText);
  }

  ngOnInit(): void {}

  isAllSelected() {
    return this.data.length === this.selection.selected.length;
  }

  // Toggle all check boxes
  masterToggle() {
    const isAllSelected = this.isAllSelected();
    this.data.forEach((element) => {
      this.changeSelection(element, isAllSelected ? false : true);
    });
    this.selectionChange.emit(this.selection.selected);
  }

  rowToggle(row: any, select: boolean) {
    this.changeSelection(row, !this.selection.isSelected(row));
    this.selectionChange.emit(this.selection.selected);
  }

  isArray(data): boolean {
    return Array.isArray(data);
  }

  printArray(dataArray: any) {
    let result = '';
    for (const data of dataArray) {
      result = result.concat(data) + ',';
    }
  }

  changePage(link: string) {
    this.pageChange.emit(link);
  }

  onDelete() {
    this.deleteElements.emit();
    this.selection.clear();
  }

  onAdd() {
    this.addElement.emit();
  }

  sortData(event: any) {
    this.dataSorted.emit(event);
  }

  onChangePagingatorConfig() {
    this.paginationConfigChange.emit(this.paginatorConfig);
  }

  private changeSelection(row: any, select: boolean) {
    if (select !== this.selection.isSelected(row)) {
      this.selection.toggle(row);
    }
  }
}
