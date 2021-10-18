import { Component, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ApiConfiguration } from 'api-atlas/api-configuration';
import {
  QcAtlasUiRepositoryConfigurationService,
  UiFeatures,
} from '../../directives/qc-atlas-ui-repository-configuration.service';
import { UtilService } from '../../util/util.service';
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
    console.log('navigation component ngOnInit');
    this.planqkPlatformLoginService
      .isLoggedIn()
      .subscribe((loggedIn: boolean) => {
        console.log(loggedIn ? 'logged in' : 'not logged in');
        if (loggedIn) {
          this.planqkPlatformLoginService
            .getBearerToken()
            .subscribe((token: string) =>
              console.log('bearer token: ' + token)
            );
          console.log(
            'refresh token: ' +
              this.planqkPlatformLoginService.getRefreshToken()
          );

          this.bearerTokenSet = true;
          this.config.rootUrl = 'https://platform.planqk.de/qc-catalog';
          this.reloadStartPage();
          this.utilService.callSnackBar('Successfully logged in.');
        }
      });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  onSettings(): void {}

  login(): void {
    console.log('logging in');

    if (!this.bearerTokenSet) {
      this.planqkPlatformLoginService.loginToPlanqkPlatform();
    } else {
      this.planqkPlatformLoginService.logoutFromPlanqkPlatform();
      this.bearerTokenSet = false;
      this.config.rootUrl = 'http://localhost:6626/atlas';
      this.reloadStartPage();
      this.utilService.callSnackBar('Successfully logged out.');
    }
  }

  reloadStartPage(): void {
    this.router
      .navigateByUrl(location.origin, { skipLocationChange: true })
      .then(() => this.router.navigate(['/algorithms']));
  }
}
