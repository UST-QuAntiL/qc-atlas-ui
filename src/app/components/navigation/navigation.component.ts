import { Component, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ApiConfiguration } from 'api-atlas/api-configuration';
import { map, switchMap } from 'rxjs/operators';
import {
  QcAtlasUiRepositoryConfigurationService,
  UiFeatures,
} from '../../directives/qc-atlas-ui-repository-configuration.service';
import { UtilService } from '../../util/util.service';
import { PlanqkPlatformLoginDialogComponent } from '../dialogs/planqk-platform-login-dialog.component';
import { PlanqkPlatformLoginService } from '../../services/planqk-platform-login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  UiFeatures = UiFeatures;

  title = 'qc-atlas-ui';
  hideNav = false;
  bearerTokenSet = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public configData: QcAtlasUiRepositoryConfigurationService,
    private config: ApiConfiguration,
    private utilService: UtilService,
    private planqkPlatformLoginService: PlanqkPlatformLoginService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.hideNav = state.matches;
      });
    if (localStorage.getItem('bearerToken')) {
      this.bearerTokenSet = true;
      this.config.rootUrl = 'https://platform.planqk.de/qc-catalog';
    }
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  onSettings(): void {}

  login(): void {
    if (!this.bearerTokenSet) {
      const dialogRef = this.utilService.createDialog(
        PlanqkPlatformLoginDialogComponent,
        { title: 'Login to the PlanQK Platform' }
      );
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this.planqkPlatformLoginService
            .loginToPlanqkPlatform(dialogResult.name, dialogResult.password)
            .subscribe(
              (authResponse) => {
                if (
                  authResponse.access_token &&
                  authResponse.refresh_token &&
                  localStorage.getItem('bearerToken') &&
                  localStorage.getItem('refreshToken')
                ) {
                  this.bearerTokenSet = true;
                  this.config.rootUrl = 'https://platform.planqk.de/qc-catalog';
                  this.reloadStartPage();
                  this.utilService.callSnackBar('Successfully logged in.');
                }
              },
              () => {
                this.utilService.callSnackBar('Error! Login failed.');
              }
            );
        }
      });
    } else {
      this.planqkPlatformLoginService.logoutFromPlanqkPlatform();
      this.bearerTokenSet = false;
      this.config.rootUrl = 'http://localhost:8080/atlas';
      this.reloadStartPage();
      this.utilService.callSnackBar('Successfully logged out.');
    }
  }

  reloadStartPage(): void {
    this.router
      .navigateByUrl('http://localhost:4200', { skipLocationChange: true })
      .then(() => this.router.navigate(['/algorithms']));
  }
}
