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
  latexValue: string;
  urlToRenderedPdfBlob: string;

  constructor(
    private utilService: UtilService,
    private latexRendererService: RenderLatexControllerService
  ) {}

  saveChanges(): void {
    if (this.opensLatexEditor) {
      this.onSaveChanges.emit(this.latexValue);
    } else {
      this.onSaveChanges.emit(this.inputValue);
    }
  }

  inputChanged(): void {
    if (this.opensLatexEditor) {
      this.onChange.emit(this.latexValue);
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
      this.latexValue = this.value;
      if (this.value) {
        this.renderLatexContent(this.latexValue);
      }
    } else {
      this.inputValue = this.value;
    }
  }

  openLatexEditor(): void {
    const doalogRef = this.utilService.createDialog(
      LatexEditorDialogComponent,
      {
        title: 'LaTeX Render Editor',
        inputText:
          //   'Example equation: $\\sqrt{16}=2^{2}$',
          // latexPackages: ['\\usepackage{amsmath}'],
          // eslint-disable-next-line max-len
          'content":"\\begin{quantikz}\n\t\\lstick{$\\ket{0}$} & \\gate{H} & \\ctrl{1} & \\gate{H} & \\ctrl{1} & \\swap{2} & \\ctrl{1} & \\qw \\\\ \n \t \\lstick{$\\ket{0}$} & \\gate{D} & \\targ{} & \\octrl{-1} & \\control{} & \\qw & \\octrl{1} & \\qw \\\\ \n \t &&&&& \\targX{} & \\gate{F} & \\qw \n \\end{quantikz}',
        latexPackages: ['\\usepackage{tikz}', '\\usetikzlibrary{quantikz}'],
        output: 'pdf',
      },
      undefined
    );

    doalogRef.afterClosed().subscribe((dialogResult) => {
      console.log(dialogResult);
      if (dialogResult !== this.latexValue) {
        this.latexValue = dialogResult;
        this.renderLatexContent(this.latexValue);
        this.inputChanged();
      }
    });
  }

  private renderLatexContent(latexValue: string): any {
    return this.utilService
      .renderLatexContentAndReturnUrlToPdfBlob(latexValue)
      .subscribe((blobUrl) => {
        this.urlToRenderedPdfBlob = blobUrl;
      });
  }
}
