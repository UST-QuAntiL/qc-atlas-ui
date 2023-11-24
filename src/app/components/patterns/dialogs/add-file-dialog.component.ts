import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/util/util.service';
import { ConcreteSolutionService } from 'generated/api-atlas/services/concrete-solution.service';
import { ConcreteSolutionDto } from 'generated/api-atlas/models/concrete-solution-dto';

@Component({
  selector: 'app-add-file-dialog.component',
  styleUrls: ['./add-file-dialog.component.scss'],
  templateUrl: 'add-file-dialog.component.html',
})
export class AddFileDialogComponent implements OnInit {
  algorithmForm: FormGroup;
  uploadProgress = 0;
  uploadSub: Subscription;
  selectedFile: File;
  uploadInProgress = false;

  constructor(
    public dialogRef: MatDialogRef<AddFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private router: Router,
    private concreteSolutionService: ConcreteSolutionService,
    private utilService: UtilService
  ) {}

  get name(): AbstractControl | null {
    return this.algorithmForm.get('name');
  }

  onCancelClick(): void {
    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
      this.utilService.callSnackBar('Canceled upload.');
    }

    this.dialogRef.close();
  }

  onUploadClick(): void {
    this.algorithmForm.controls['name'].disable();
    this.dialogRef.disableClose = true;
    this.uploadInProgress = true;

    this.uploadSub = this.concreteSolutionService
      .attacheFile(this.selectedFile)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              100 * (event.loaded / event.total)
            );
          } else if (event.type === HttpEventType.Response) {
            this.utilService.callSnackBar('File was successfully uploaded.');
            window.location.reload();
            this.dialogRef.close();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.utilService.callSnackBar(
            'Could not upload the File: ' + error.message
          );
        },
        complete: () => {
          this.uploadInProgress = false;
        },
      });
  }

  ngOnInit(): void {
    this.algorithmForm = new FormGroup({
      name: new FormControl(null, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });
  }

  isRequiredDataMissing(): boolean {
    return this.selectedFile === undefined;
  }

  extractSegmentFromUrl(url: string, index: number): string {
    const segments = url.split('/');

    // Adjust index for negative values
    if (index < 0) {
      index = segments.length + index;
    }

    // Return the segment if index is within bounds
    return index >= 0 && index < segments.length ? segments[index] : '';
  }

  onFileSelected(event): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
    }
  }
}

export interface DialogData {
  title: string;
}
