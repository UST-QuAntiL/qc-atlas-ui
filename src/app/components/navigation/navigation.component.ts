import { Component, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiConfiguration } from 'api-atlas/api-configuration';
import { Observable, from } from 'rxjs';
import { filter } from 'rxjs/operators';
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

  activeGroup: 'libraries' | 'execution' | 'components' | null = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public configData: QcAtlasUiRepositoryConfigurationService,
    private config: ApiConfiguration,
    private utilService: UtilService,
    private planqkPlatformLoginService: PlanqkPlatformLoginService
  ) {}

  ngOnInit(): void {
    if (this.activeRoute.firstChild) {
      const path = this.activeRoute.firstChild.snapshot.url?.[0]?.path;
      this.onUrlChanged(path);
    }

    this.router.events
      .pipe(filter<NavigationEnd>((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.url.length < 2) {
          this.onUrlChanged('');
          return;
        }
        this.onUrlChanged(event.url.substring(1));
      });
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

  private onUrlChanged(newPath: string): void {
    if (newPath === '') {
      this.activeGroup = null;
      return;
    }
    console.log(newPath);
    if (newPath === 'libraries' || newPath === 'slr') {
      this.activeGroup = 'libraries';
      return;
    }

    if (newPath.startsWith('execution-environments')) {
      this.activeGroup = 'execution';
      return;
    }

    if (
      newPath.startsWith('problem-types') ||
      newPath.startsWith('application-areas') ||
      newPath.startsWith('algorithm-relation-types') ||
      newPath.startsWith('pattern-relation-types') ||
      newPath.startsWith('compute-resource-property-types')
    ) {
      this.activeGroup = 'components';
      return;
    }

    this.activeGroup = null;
  }
}
