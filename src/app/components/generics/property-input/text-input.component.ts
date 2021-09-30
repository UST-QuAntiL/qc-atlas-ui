import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LatexEditorDialogComponent } from '../dialogs/latex-editor-dialog.component';
import { UtilService } from '../../../util/util.service';
import {
  QcAtlasUiConfiguration,
  QcAtlasUiRepositoryConfigurationService,
  UiFeatures,
} from '../../../directives/qc-atlas-ui-repository-configuration.service';
import { DoProvider } from './abstract-value-accessor';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [DoProvider(TextInputComponent)],
})
export class TextInputComponent implements OnInit, OnChanges {
  @Output() onSaveChanges: EventEmitter<string> = new EventEmitter<string>();
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() name = '';
  @Input() value: string;
  @Input() multiline = false;
  @Input() maxLines = 1;
  @Input() isLink: boolean;
  @Input() pattern?: string;
  @Input() baseValue: string;

  // TODO fix latex-renderer service running in a docker container to leverage the latex feature
  @Input() latexActive = true;

  @ViewChild('renderedLatexField') renderedLatexField;

  inputValue: string;
  toggleLatex = false;
  packedLatexValue: string;
  urlToRenderedBlob: SafeUrl;

  uiConfig: QcAtlasUiConfiguration;

  constructor(
    private utilService: UtilService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private configService: QcAtlasUiRepositoryConfigurationService
  ) {
    iconRegistry.addSvgIcon(
      'latex',
      sanitizer.bypassSecurityTrustResourceUrl('assets/latex_icon.svg')
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('value')) {
      this.inputValue = changes.value.currentValue;
    }
  }

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
    this.uiConfig = this.configService.configuration;
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
      this.urlToRenderedBlob = null;
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
      .renderPackedDataAndReturnUrlToPdfBlob(
        latexValue,
        (this.renderedLatexField.nativeElement.offsetWidth / 2480) * 3
      )
      .subscribe((url) => {
        this.urlToRenderedBlob = this.sanitizer.bypassSecurityTrustUrl(url);
      });
  }
}
