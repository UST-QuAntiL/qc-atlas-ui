import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() latexActive = false;

  inputValue: string;
  toggleLatex = false;
  packedLatexValue: string;
  urlToRenderedPdfBlob: string;

  constructor(private utilService: UtilService) {}

  saveChanges(): void {
    if (this.toggleLatex) {
      this.onSaveChanges.emit(this.packedLatexValue);
    } else {
      this.onSaveChanges.emit(this.inputValue);
    }
  }

  inputChanged(): void {
    if (this.toggleLatex) {
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
    this.toggleLatex = this.latexActive
      ? this.utilService.isLatexText(this.value)
      : false;
    if (this.toggleLatex) {
      this.packedLatexValue = this.value;
      this.renderLatexContent(this.packedLatexValue);
    } else {
      this.inputValue = this.value;
    }
  }

  toggleLatexFlag(): void {
    if (this.toggleLatex) {
      this.packedLatexValue = this.inputValue;
      this.inputValue = null;
      this.renderLatexContent(this.packedLatexValue);
    } else {
      this.inputValue = this.utilService.getUnpackedLatexText(
        this.packedLatexValue
      );
      this.urlToRenderedPdfBlob = null;
      if (this.inputValue !== this.value) {
        this.inputChanged();
      }
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
      if (
        dialogResult !== undefined &&
        dialogResult !== this.packedLatexValue
      ) {
        this.packedLatexValue = dialogResult;
        this.inputChanged();
        this.renderLatexContent(this.packedLatexValue);
      }
    });
  }

  private renderLatexContent(latexValue: string): void {
    this.utilService
      .renderPackedDataAndReturnUrlToPdfBlob(latexValue)
      .subscribe((blobUrl) => {
        this.urlToRenderedPdfBlob = blobUrl;
      });
  }
}
