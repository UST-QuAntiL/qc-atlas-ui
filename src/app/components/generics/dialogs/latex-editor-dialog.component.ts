import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { RenderLatexControllerService } from 'api-latex/services/render-latex-controller.service';
import { LatexContent } from 'api-latex/models';

@Component({
  selector: 'app-latex-editor-dialog',
  templateUrl: './latex-editor-dialog.component.html',
  styleUrls: ['./latex-editor-dialog.component.scss'],
})
export class LatexEditorDialogComponent implements OnInit {
  latexRenderText = '';
  latexPackages: string[] = [];
  generatedOutput: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<LatexEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private latexRendererService: RenderLatexControllerService
  ) {}

  ngOnInit(): void {
    this.latexRenderText = this.data.inputText ? this.data.inputText : '';
    this.data.latexPackages.forEach((latexPackage) =>
      this.latexPackages.push(latexPackage)
    );
  }

  onGenerateLatex(): void {
    const latexBody: LatexContent = {
      content: this.latexRenderText,
      latexPackages: this.latexPackages,
      output: this.data.output ? this.data.output : 'pdf',
    };
    this.latexRendererService.renderLatexAsPdf({ body: latexBody }).subscribe(
      (response) => {
        if (response) {
          this.generatedOutput = response;
          this.dialogRef.close(this.generatedOutput);
        } else {
          this.generatedOutput = ['No response received'];
        }
      },
      (e) => {
        console.log('error');
        console.log(e);
      }
    );
  }
}

export interface DialogData {
  title: string;
  inputText?: string;
  latexPackages?: string[];
  output?: string;
}
