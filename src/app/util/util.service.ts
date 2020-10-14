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
  timeOut = 3000;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}

  public callSnackBar(text: string): void {
    this.snackBar.open(text, 'OK', {
      duration: this.timeOut,
    });
  }

  public callSnackBarSequence(messages: string[]): void {
    messages.forEach((message, index) => {
      setTimeout(() => {
        this.snackBar.open(message, 'OK', {
          duration: this.timeOut,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }, index * (this.timeOut + 500)); // 500 => timeout between two messages
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

  /**
   * This method returns the url to the last page of a table after the creation of the new object.
   *
   * @param currentUrl
   * @param pagingInfo
   * @return correctUrl
   */
  public getLastPageAfterCreation(currentUrl: string, pagingInfo: any): string {
    const url = new URL(currentUrl);
    let correctPage;

    if (url.searchParams.get('sort') || url.searchParams.get('search')) {
      return currentUrl;
    }

    // If current last page is not full, then it stays the last page
    if (pagingInfo.page.totalElements % pagingInfo.page.size !== 0) {
      correctPage = pagingInfo.page.totalPages - 1;
    } else {
      correctPage = pagingInfo.page.totalPages;
    }

    // Adjust URL with correct page parameter
    url.searchParams.set('page', correctPage.toString());
    return url.toString();
  }

  /**
   * This method checks if the current page is the last one and if it will become empty after the deletion of elements.
   *
   * @param elementsDeleted
   * @param currentAmountOfElements
   * @param pagingInfo
   * @return isEmpty
   */
  public isLastPageEmptyAfterDeletion(
    elementsDeleted: number,
    currentAmountOfElements: number,
    pagingInfo: any
  ): boolean {
    return (
      currentAmountOfElements === elementsDeleted &&
      pagingInfo.page.number !== 0 &&
      pagingInfo.page.number === pagingInfo.page.totalPages - 1
    );
  }

  /**
   * This method returns the final snackbar message after the deletion of elements.
   *
   * @param successfulDeletions
   * @param expectedDeletions
   * @param objectType
   * @return deletionMessage
   */
  public generateFinalDeletionMessage(
    successfulDeletions: number,
    expectedDeletions: number,
    objectType: string
  ): string {
    return (
      'Successfully deleted ' +
      successfulDeletions +
      '/' +
      expectedDeletions +
      ' ' +
      objectType +
      '.'
    );
  }
}
