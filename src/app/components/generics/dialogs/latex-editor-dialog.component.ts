import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { RenderLatexControllerService } from 'api-latex/services/render-latex-controller.service';
import { UtilService } from '../../../util/util.service';

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
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.defaultLatexPackages = this.utilService.getDefaultLatexPackages();
    if (this.data.packedLatexValue) {
      const inputData = this.utilService.unpackTextAndPackages(
        this.data.packedLatexValue
      );
      this.inputText = inputData.latexContent;
      this.latexPackages = inputData.latexPackages.join('\n');
    }
  }

  onSubmit(): void {
    this.dialogRef.close(
      this.utilService.packTextAndPackages(
        this.formatInputString(this.inputText),
        this.formatPackages(this.latexPackages)
      )
    );
  }

  formatInputString(input: string): string {
    let latexRenderText = '';
    latexRenderText = input.split('\\n').join('\n');
    latexRenderText = latexRenderText.split('\\t').join('\t');
    latexRenderText = latexRenderText.split('\\r').join('\r');
    return latexRenderText;
  }

  formatPackages(packages: string): string[] {
    return packages.split(',').join('\n').split('\n');
  }

  onGenerateLatex(): void {
    this.urlToRenderedPdfBlob = undefined;
    this.utilService
      .renderLatexContentAndReturnUrlToPdfBlob(
        this.formatInputString(this.inputText),
        this.formatPackages(this.latexPackages)
      )
      .subscribe((response) => {
        this.urlToRenderedPdfBlob = response;
      });
  }
}

export interface DialogData {
  title: string;
  packedLatexValue?: string;
}
