import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as deepEqual from 'fast-deep-equal';
import { LatexContent } from 'api-latex/models/latex-content';
import { RenderLatexControllerService } from 'api-latex/services/render-latex-controller.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MissingEntityDialogComponent } from '../components/dialogs/missing-entity-dialog.component';
import { LatexRendererServiceConstants } from './latex-renderer-service-constants';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  isSelectedColor = 'primary';

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private latexRendererService: RenderLatexControllerService,
    private latexRendererServiceConstants: LatexRendererServiceConstants
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

  public renderPackedDataAndReturnUrlToPdfBlob(
    packedData: string,
    output: string
  ): Observable<string> {
    const data = this.latexRendererServiceConstants.unpackTextAndPackages(
      packedData
    );
    return this.renderLatexContentAndReturnUrlToPdfBlob(
      data.latexContent,
      data.latexPackages,
      output
    );
  }

  public renderLatexContentAndReturnUrlToPdfBlob(
    latexContent: string,
    additionalPackages: string,
    outputType: string
  ): Observable<string> {
    const packages = this.latexRendererServiceConstants.getDefaultLatexPackages();
    if (additionalPackages) {
      for (const additionalPackage of this.latexRendererServiceConstants.formatLatexPackagesToArray(
        additionalPackages
      )) {
        if (!packages.includes(additionalPackage)) {
          packages.push(additionalPackage);
        }
      }
    }
    const latexBody: LatexContent = {
      content: this.latexRendererServiceConstants.formatLatexContent(
        latexContent
      ),
      latexPackages: packages,
      output: outputType,
    };
    return this.latexRendererService.renderLatexAsPdf({ body: latexBody }).pipe(
      map((response: string[]) => {
        if (response) {
          const latexBlob = this.latexRendererServiceConstants.createBlobFromRenderedResult(
            response
          );
          return URL.createObjectURL(latexBlob);
        }
      })
    );
  }
}
