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
  @Input() opensLatexEditor: boolean;

  inputValue: string;
  latexValue: string;
  urlToRenderedPdfBlob: string;

  constructor(private utilService: UtilService) {}

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

  ngOnInit() {
    if (this.opensLatexEditor) {
      this.latexValue = this.value;
      if (this.value) {
        this.updateUrlToRenderedPdfBlob(this.latexValue);
      }
    } else {
      this.inputValue = this.value;
    }
  }

  dataURItoBlob(dataURI): Blob {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob
    return new Blob([ab], { type: mimeString });
  }

  updateUrlToRenderedPdfBlob(stringValue: string): any {
    this.urlToRenderedPdfBlob = URL.createObjectURL(
      this.dataURItoBlob(stringValue)
    );
  }

  openLatexEditor() {
    const doalogRef = this.utilService.createDialog(
      LatexEditorDialogComponent,
      {
        title: 'LaTeX Render Editor',
        inputText: 'Example equation: $\\sqrt{16}=2^{2}$',
        latexPackages: ['\\usepackage{amsmath}'],
        // eslint-disable-next-line max-len
        //   'content":"\\begin{quantikz}\n\t\\lstick{$\\ket{0}$} & \\gate{H} & \\ctrl{1} & \\gate{H} & \\ctrl{1} & \\swap{2} & \\ctrl{1} & \\qw \\\\ \n \t \\lstick{$\\ket{0}$} & \\gate{D} & \\targ{} & \\octrl{-1} & \\control{} & \\qw & \\octrl{1} & \\qw \\\\ \n \t &&&&& \\targX{} & \\gate{F} & \\qw \n \\end{quantikz}',
        // latexPackages: ['\\usepackage{tikz}', '\\usetikzlibrary{quantikz}'],
        output: 'pdf',
      }
    );

    doalogRef.afterClosed().subscribe((dialogResult) => {
      const latexBlob = new Blob([dialogResult], { type: 'application/pdf' });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(latexBlob);
      fileReader.onload = () => {
        this.latexValue = fileReader.result.toString();
        this.updateUrlToRenderedPdfBlob(this.latexValue);
        if (this.latexValue !== this.value) {
          this.inputChanged();
        }
      };
    });
  }
}
