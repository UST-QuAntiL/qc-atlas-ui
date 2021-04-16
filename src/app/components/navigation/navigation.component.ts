import { Component, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {
  QcAtlasUiConfiguration,
  QcAtlasUiRepositoryConfigurationService,
  UiFeatures,
} from '../../directives/qc-atlas-ui-repository-configuration.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  UiFeatures = UiFeatures;
  patternAtlasFeatureIsSet: boolean;
  config: QcAtlasUiConfiguration;

  title = 'qc-atlas-ui';
  hideNav = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private configData: QcAtlasUiRepositoryConfigurationService
  ) {}

  ngOnInit(): void {
    this.config = this.configData.configuration;
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.hideNav = true;
        } else {
          this.hideNav = false;
        }
      });
  }

  checkPatternAtlasFeatureMode(): void {
    this.patternAtlasFeatureIsSet = this.config.features.patternAtlas;
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  onSettings(): void {}
}
