import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { RenderLatexControllerService } from 'api-latex/services/render-latex-controller.service';
import { UtilService } from '../../../util/util.service';
import { LatexRendererServiceConstants } from '../../../util/latex-renderer-service-constants';

@Component({
  selector: 'app-latex-editor-dialog',
  templateUrl: './latex-editor-dialog.component.html',
  styleUrls: ['./latex-editor-dialog.component.scss'],
})
export class LatexEditorDialogComponent implements OnInit {
  inputText = '';
  latexPackages = '';
  defaultLatexPackages = [];
  urlToRenderedPdfBlob: string;

  constructor(
    public dialogRef: MatDialogRef<LatexEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private latexRendererService: RenderLatexControllerService,
    private utilService: UtilService,
    private latexRendererServiceConstants: LatexRendererServiceConstants
  ) {}

  ngOnInit(): void {
    this.defaultLatexPackages = this.latexRendererServiceConstants.getDefaultLatexPackages();
    if (this.data.packedLatexValue) {
      const inputData = this.latexRendererServiceConstants.unpackTextAndPackages(
        this.data.packedLatexValue
      );
      this.inputText = inputData.latexContent;
      this.latexPackages = inputData.latexPackages;
    }
  }

  onSubmit(): void {
    this.dialogRef.close(
      this.latexRendererServiceConstants.packTextAndPackages(
        this.inputText,
        this.latexRendererServiceConstants
          .formatLatexPackagesToArray(this.latexPackages)
          .join('\n')
      )
    );
  }

  onGenerateLatex(): void {
    this.urlToRenderedPdfBlob = undefined;
    this.utilService
      .renderLatexContentAndReturnUrlToPdfBlob(
        this.inputText,
        this.latexPackages,
        this.data.outputFormat
      )
      .subscribe((response) => {
        this.urlToRenderedPdfBlob = response;
      });
  }
}

export interface DialogData {
  title: string;
  packedLatexValue?: string;
  outputFormat?: string;
}
