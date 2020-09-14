import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TagDto } from 'api-atlas/models';

@Component({
  selector: 'app-tags-dialog-component',
  templateUrl: './tags-dialog.component.html',
  styleUrls: ['./tags-dialog.component.scss'],
})
export class TagsDialogComponent {
  formGroup = new FormGroup({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    value: new FormControl('', Validators.required),
    // eslint-disable-next-line @typescript-eslint/unbound-method
    category: new FormControl('', Validators.required),
  });

  selectedCategory: string;
  resultTag: TagDto;

  constructor(
    public dialogRef: MatDialogRef<TagsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TagsDialogData,
    public dialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onTagValueSelected(value: string): void {
    const tag = this.data.allTags.find((t) => t.value === value);
    if (tag) {
      this.resultTag = tag;
      this.formGroup.patchValue({ category: tag.category });
    } else {
      this.resultTag = { value, category: this.selectedCategory };
    }
  }

  onTagCategorySelected(category: string): void {
    this.formGroup.patchValue({ value: '' });
    this.selectedCategory = category;
    if (this.resultTag) {
      this.resultTag.category = category;
    }
  }

  getValues(): string[] {
    if (this.selectedCategory) {
      return this.data.allTags
        .filter((tag) => tag.category === this.selectedCategory)
        .map((tag) => tag.value);
    }
    return this.data.allTags.map((tag) => tag.value);
  }

  getCategories(allTags: TagDto[]): string[] {
    return Array.from(new Set(allTags.map((tag) => tag.category)));
  }
}

export interface TagsDialogData {
  allTags: TagDto[];
  categoryToColor: Record<string, string>;
}
