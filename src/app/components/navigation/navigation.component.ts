import { Component, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ApiConfiguration } from 'api-atlas/api-configuration';
import { Observable, from } from 'rxjs';
import {
  QcAtlasUiRepositoryConfigurationService,
  UiFeatures,
} from '../../directives/qc-atlas-ui-repository-configuration.service';
import { UtilService } from '../../util/util.service';
import { PlanqkPlatformLoginService } from '../../services/planqk-platform-login.service';
import { OnDemandComponent } from '../on-demand-execution/ondemand.component';

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
    this.planqkPlatformLoginService
      .isLoggedIn()
      .subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          this.bearerTokenSet = true;
          this.config.rootUrl = 'https://platform.planqk.de/qc-catalog';
          // this.reloadStartPage();
          this.utilService.callSnackBar(
            'Successfully logged into the PlanQK platform.'
          );
        } else {
          this.utilService.callSnackBar('Not logged into the PlanQK platform.');
        }
      });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  onSettings(): void {}

  login(): void {
    if (!this.bearerTokenSet) {
      // login
      this.planqkPlatformLoginService.loginToPlanqkPlatform();
    } else {
      // logout
      this.bearerTokenSet = false;
      this.config.rootUrl = 'http://localhost:6626/atlas';
      this.reloadStartPage().subscribe(() => {
        this.planqkPlatformLoginService.logoutFromPlanqkPlatform();
        this.utilService.callSnackBar(
          'Successfully logged out of the PlanQK platform.'
        );
      });
    }
  }

  reloadStartPage(): Observable<boolean> {
    return from(
      this.router
        .navigateByUrl(location.origin, { skipLocationChange: true })
        .then(() => this.router.navigate(['/algorithms']))
    );
  }
}
