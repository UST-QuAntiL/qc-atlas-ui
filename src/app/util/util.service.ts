import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as deepEqual from 'fast-deep-equal';
import { LatexContent } from 'api-latex/models/latex-content';
import { RenderLatexControllerService } from 'api-latex/services/render-latex-controller.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MissingEntityDialogComponent } from '../components/dialogs/missing-entity-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  isSelectedColor = 'primary';

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private latexRendererService: RenderLatexControllerService
  ) {}

  public callSnackBar(text: string): void {
    this.snackBar.open(text, 'Ok', {
      duration: 2000,
    });
  }

  public createDialog(
    dialogComponent: any,
    data: any,
    width?: any,
    height?: any
  ): MatDialogRef<any> {
    return this.dialog.open(dialogComponent, {
      width: width || '400px',
      height: height || undefined,
      data,
    });
  }

  public createMissingEntityDialog(
    missingEntity: string,
    currentEntity: string
  ): void {
    this.dialog.open(MissingEntityDialogComponent, {
      width: '600px',
      data: { missingEntity, currentEntity },
    });
  }

  public getColorOfSelectedButton(selectedEntity: any, id: string): string {
    if (!selectedEntity) {
      return null;
    }
    if (id === selectedEntity.id) {
      return this.isSelectedColor;
    }
  }

  public objectsEqual(source: any, target: any): boolean {
    return deepEqual(source, target);
  }

  public getBlobFromDataUri(dataURI: string): Blob {
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

  public getDataUriFromBlob(blob: Blob): string {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    let dataUri: string;
    fileReader.onload = () => {
      dataUri = fileReader.result.toString();
    };
    return dataUri;
  }

  public renderLatexContentAndReturnUrlToPdfBlob(
    latexContent: string,
    additionalPackages: string[] = [],
    output = 'pdf'
  ): Observable<string> {
    const packages = [
      '\\usepackage{amsmath}',
      '\\usepackage{tikz}',
      '\\usetikzlibrary{quantikz}',
    ];
    if (additionalPackages) {
      for (const additionalPackage of additionalPackages) {
        packages.push(additionalPackage);
      }
    }
    const latexBody: LatexContent = {
      content: latexContent,
      latexPackages: packages,
      output,
    };
    return this.latexRendererService.renderLatexAsPdf({ body: latexBody }).pipe(
      map((response: string[]) => {
        if (response) {
          const latexBlob = this.createBlobFromRenderedResult(response);
          return URL.createObjectURL(latexBlob);
        }
      })
    );
  }

  public formatLatexContent(latexContent: string) {}

  private createBlobFromRenderedResult(renderedData: any): Blob {
    return new Blob([renderedData], {
      type: 'application/pdf',
    });
  }
}
