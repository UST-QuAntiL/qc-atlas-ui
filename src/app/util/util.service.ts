import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as deepEqual from 'fast-deep-equal';
import { MissingEntityDialogComponent } from '../components/dialogs/missing-entity-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  isSelectedColor = 'primary';

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}

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
}
