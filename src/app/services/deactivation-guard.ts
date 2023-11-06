import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import * as deepEqual from 'fast-deep-equal';
import { Subject } from 'rxjs';
import { AlgorithmViewComponent } from '../components/algorithms/algorithm-view/algorithm-view.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../components/generics/dialogs/confirm-dialog.component';
import { UtilService } from '../util/util.service';
import { ImplementationViewComponent } from '../components/algorithms/implementation-view/implementation-view.component';
import { PublicationViewComponent } from '../components/publications/publication-view/publication-view.component';
import { CloudServiceViewComponent } from '../components/execution-environments/cloud-services/cloud-service-view/cloud-service-view.component';
import { ComputeResourceViewComponent } from '../components/execution-environments/compute-resource/compute-resource-view/compute-resource-view.component';
import { SoftwarePlatformViewComponent } from '../components/execution-environments/software-platforms/software-platform-view/software-platform-view.component';

@Injectable()
export class ChangePageGuard
  implements
    CanDeactivate<
      | AlgorithmViewComponent
      | ImplementationViewComponent
      | PublicationViewComponent
      | CloudServiceViewComponent
      | ComputeResourceViewComponent
      | SoftwarePlatformViewComponent
    >
{
  savedChanges = false;
  constructor(private _router: Router, private utilService: UtilService) {}

  canDeactivate(
    component:
      | AlgorithmViewComponent
      | ImplementationViewComponent
      | PublicationViewComponent
      | CloudServiceViewComponent
      | ComputeResourceViewComponent
      | SoftwarePlatformViewComponent
  ) {
    const leavePage = new Subject<boolean>();
    if (!this.savedChanges) {
      const dialogData: ConfirmDialogData = {
        title: 'Confirm Page Change',
        message:
          'You have unsaved changes. Do you want to continue without saving?',
        yesButtonText: 'yes',
        noButtonText: 'no',
      };
      const dialogRef = this.utilService.createDialog(
        ConfirmDialogComponent,
        dialogData
      );
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          leavePage.next(true);
        } else {
          leavePage.next(false);
        }
      });
      return leavePage.asObservable();
    }
    return true;
  }

  public objectsEqual<T>(source: T, target: T): boolean {
    this.savedChanges = deepEqual(source, target);
    return this.savedChanges;
  }
}
