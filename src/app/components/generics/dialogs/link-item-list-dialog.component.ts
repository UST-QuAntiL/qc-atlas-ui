import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { QueryParams } from '../data-list/data-list.component';

@Component({
  selector: 'app-link-item-list-dialog',
  templateUrl: './link-item-list-dialog.component.html',
  styleUrls: ['./link-item-list-dialog.component.scss'],
})
export class LinkItemListDialogComponent implements OnInit {
  @Output() onDataListConfigChanged = new EventEmitter<QueryParams>();
  @Output() onPageChanged = new EventEmitter<string>();
  @Output() onElementClicked = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<LinkItemListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onLinkElements(event): void {
    this.data.selectedItems = event.elements;
    this.dialogRef.close(this.data);
  }
}

export interface DialogData {
  title: string;
  data?: any[];
  selectedItems?: any[];
  variableNames: string[];
  tableColumns: string[];
  pagingInfo?: any;
  paginatorConfig?: any;
  noButtonText: string;
}
