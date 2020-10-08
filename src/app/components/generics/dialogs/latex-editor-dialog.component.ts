import { Component, Inject, Input, OnInit, Output } from '@angular/core';
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
  latexRenderText = '';
  latexPackages: string[] = [];
  generatedOutput: string[] = [];
  urlToRenderedPdfBlob = '';
  constructor(
    public dialogRef: MatDialogRef<LatexEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private latexRendererService: RenderLatexControllerService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.latexRenderText = this.data.inputText ? this.data.inputText : '';
    this.data.latexPackages.forEach((latexPackage) =>
      this.latexPackages.push(latexPackage)
    );
  }

  onGenerateLatex(): void {
    this.utilService
      .renderLatexContentAndReturnUrlToPdfBlob(
        this.latexRenderText,
        this.latexPackages,
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
