import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibEntryDto } from 'api-library/models/bib-entry-dto';

@Component({
  selector: 'app-add-bibentry-dialog',
  templateUrl: './add-bibentry-dialog.component.html',
  styleUrls: ['./add-bibentry-dialog.component.scss'],
})
export class AddBibentryDialogComponent implements OnInit {
  bibEntryForm: FormGroup;
  fields = [
    'citationKey',
    'entryType',
    'title',
    'author',
    'date',
    'month',
    'year',
    'booktitle',
    'series',
    'volume',
    'number',
    'pages',
    'chapter',
    'edition',
    'publisher',
    'editor',
    'journal',
    'howpublished',
    'institution',
    'organization',
    'school',
    'address',
    'note',
  ];

  constructor(
    public dialogRef: MatDialogRef<AddBibentryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BibEntryDto,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.bibEntryForm = this.formBuilder.group(this.fields);

    for (const f of this.fields) {
      if (f === 'citationKey') {
        this.bibEntryForm.addControl(
          f,
          // eslint-disable-next-line @typescript-eslint/unbound-method
          this.formBuilder.control(this.data.citationKey, [Validators.required])
        );
      } else if (f === 'entryType') {
        this.bibEntryForm.addControl(
          f,
          // eslint-disable-next-line @typescript-eslint/unbound-method
          this.formBuilder.control(this.data.entryType, [Validators.required])
        );
      } else {
        this.bibEntryForm.addControl(f, this.formBuilder.control(''));
      }
    }

    this.dialogRef.beforeClosed().subscribe(() => {
      for (const f of this.fields) {
        const value = this.bibEntryForm.get(f).value;
        if (value !== '') {
          this.data[f] = value;
        }
      }
    });
  }

  isRequiredDataMissing(): boolean {
    return false;
  }
}
