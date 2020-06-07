import { Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { ComponentType } from '@angular/cdk/portal';

import { MissingEntityDialogComponent } from '../components/dialogs/missing-entity-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  isSelectedColor = 'primary';

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}

  public callSnackBar(addedEntity: string): void {
    this.snackBar.open('Successfully added new ' + addedEntity, 'Ok', {
      duration: 2000,
    });
  }

  public createDialog<R = any, T = any, D = any>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    title: string,
    data?: D
  ): MatDialogRef<T, R> {
    return this.dialog.open(componentOrTemplateRef, {
      width: '400px',
      data: { title: 'Add new ' + title, ...data },
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
}
