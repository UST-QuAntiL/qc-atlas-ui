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
  urlToRenderedPdfBlob: string;

  constructor(
    public dialogRef: MatDialogRef<LatexEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private latexRendererService: RenderLatexControllerService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.inputText = this.data.inputText ? this.data.inputText : '';
  }

  onSubmit(): void {
    this.dialogRef.close({
      latexText: this.formatInputString(this.inputText),
      latexPackages: this.formatPackages(this.latexPackages),
    });
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
    this.urlToRenderedPdfBlob = null;
    this.utilService
      .renderLatexContentAndReturnUrlToPdfBlob(
        this.formatInputString(this.inputText),
        this.formatPackages(this.latexPackages),
        this.data.output
      )
      .subscribe((response) => {
        this.urlToRenderedPdfBlob = response;
      });
  }
}

export interface DialogData {
  title: string;
  inputText?: string;
  latexPackages?: string[];
  output?: string;
}
