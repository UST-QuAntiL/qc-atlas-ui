import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RenderLatexControllerService } from 'api-latex/services/render-latex-controller.service';
import { LatexEditorDialogComponent } from '../dialogs/latex-editor-dialog.component';
import { UtilService } from '../../../util/util.service';
import { DoProvider } from './abstract-value-accessor';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [DoProvider(TextInputComponent)],
})
export class TextInputComponent implements OnInit {
  @Output() onSaveChanges: EventEmitter<string> = new EventEmitter<string>();
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() name = '';
  @Input() value: string;
  @Input() multiline = false;
  @Input() maxLines = 1;
  @Input() isLink: boolean;
  @Input() pattern?: string;
  @Input() opensLatexEditor: boolean;

  inputValue: string;
  latexText: string;
  renderOutput = 'pdf';
  urlToRenderedPdfBlob: string;

  constructor(
    private utilService: UtilService,
    private latexRendererService: RenderLatexControllerService
  ) {}

  saveChanges(): void {
    if (this.opensLatexEditor) {
      this.onSaveChanges.emit(this.latexText);
    } else {
      this.onSaveChanges.emit(this.inputValue);
    }
  }

  inputChanged(): void {
    if (this.opensLatexEditor) {
      this.onChange.emit(this.latexText);
    } else {
      if (!this.inputValue) {
        this.inputValue = null;
      }
      this.onChange.emit(this.inputValue);
    }
  }

  openLink(): void {
    window.open(this.inputValue, '_blank');
  }

  ngOnInit(): void {
    if (this.opensLatexEditor) {
      this.latexText = this.value;
      if (this.value) {
        this.renderLatexContent(
          this.latexText,
          this.utilService.getDefaultLatexPackages()
        );
      }
    } else {
      this.inputValue = this.value;
    }
  }

  openLatexEditor(): void {
    const packages = this.utilService.getDefaultLatexPackages();
    const dialogRef = this.utilService.createDialog(
      LatexEditorDialogComponent,
      {
        title: 'LaTeX Render Editor',
        inputText: this.latexText,
        latexPackages: packages,
      },
      'auto'
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult.latexText !== this.latexText) {
        this.latexText = dialogResult.latexText;
        this.renderLatexContent(this.latexText, dialogResult.latexPackages);
        this.inputChanged();
      }
    });
  }

  private renderLatexContent(latexValue: string, latexPackages: string[]): any {
    return this.utilService
      .renderLatexContentAndReturnUrlToPdfBlob(
        latexValue,
        latexPackages,
        this.renderOutput
      )
      .subscribe((blobUrl) => {
        this.urlToRenderedPdfBlob = blobUrl;
      });
  }
}
