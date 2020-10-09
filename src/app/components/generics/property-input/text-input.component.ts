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
  packedLatexValue: string;
  renderOutput = 'pdf';
  urlToRenderedPdfBlob: string;

  constructor(
    private utilService: UtilService,
    private latexRendererService: RenderLatexControllerService
  ) {}

  saveChanges(): void {
    if (this.opensLatexEditor) {
      this.onSaveChanges.emit(this.packedLatexValue);
    } else {
      this.onSaveChanges.emit(this.inputValue);
    }
  }

  inputChanged(): void {
    if (this.opensLatexEditor) {
      this.onChange.emit(this.packedLatexValue);
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
      this.packedLatexValue = this.value;
      if (this.value) {
        this.renderLatexContent(this.packedLatexValue);
      }
    } else {
      this.inputValue = this.value;
    }
  }

  openLatexEditor(): void {
    const dialogRef = this.utilService.createDialog(
      LatexEditorDialogComponent,
      {
        title: 'LaTeX Render Editor',
        packedLatexValue: this.packedLatexValue,
      },
      'auto'
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult !== this.packedLatexValue) {
        this.packedLatexValue = dialogResult;
        this.renderLatexContent(this.packedLatexValue);
        this.inputChanged();
      }
    });
  }

  private renderLatexContent(latexValue: string): any {
    return this.utilService
      .renderPackedDataAndReturnUrlToPdfBlob(latexValue, this.renderOutput)
      .subscribe((blobUrl) => {
        this.urlToRenderedPdfBlob = blobUrl;
      });
  }
}
