import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilService } from "app/util/util.service";
import { QAIAppService } from '../qai-apps.service';
import { QAIAppDto } from '../qai-app-dto';

@Component({
  selector: 'app-add-qai-app-dialog-component',
  styleUrls: ['./add-qai-app-dialog.scss'],
  templateUrl: 'add-qai-app-dialog.html',
})
export class AddQAIAppDialogComponent implements OnInit {
  algorithmForm: UntypedFormGroup;
  uploadProgress = 0;
  uploadSub: Subscription;
  selectedFile: File;
  uploadInProgress = false;

  constructor(
    public dialogRef: MatDialogRef<AddQAIAppDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private router: Router,
    private qAIAppService: QAIAppService,
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

    this.uploadSub = this.qAIAppService
      .createQAIApp(this.selectedFile, this.name.value)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              100 * (event.loaded / event.total)
            );
          } else if (event.type === HttpEventType.Response) {
            const qaiApp = event.body as QAIAppDto;

            this.utilService.callSnackBar('qAI app was successfully created.');
            this.router.navigate(['qai-apps', qaiApp.id]);
            this.dialogRef.close();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.utilService.callSnackBar(
            'Could not create new qAI app: ' + error.message
          );
        },
        complete: () => {
          this.uploadInProgress = false;
        },
      });
  }

  ngOnInit(): void {
    this.algorithmForm = new UntypedFormGroup({
      name: new UntypedFormControl(null, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });
  }

  isRequiredDataMissing(): boolean {
    return this.name.errors?.required || this.selectedFile === undefined;
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
