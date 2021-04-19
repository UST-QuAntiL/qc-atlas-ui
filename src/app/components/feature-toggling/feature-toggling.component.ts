import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BreadcrumbLink } from '../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import {
  QcAtlasUiConfiguration,
  QcAtlasUiRepositoryConfigurationService,
  UiFeatures,
} from '../../directives/qc-atlas-ui-repository-configuration.service';
import { UtilService } from '../../util/util.service';

@Component({
  selector: 'app-feature-toggling',
  templateUrl: './feature-toggling.component.html',
  styleUrls: ['./feature-toggling.component.scss'],
})
export class FeatureTogglingComponent implements OnInit {
  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];

  readonly UiFeatures = UiFeatures;
  config: QcAtlasUiConfiguration;

  constructor(
    private http: HttpClient,
    private configService: QcAtlasUiRepositoryConfigurationService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.config = this.configService.configuration;

    this.links[0] = {
      heading: 'Feature Selection',
      subHeading: 'Set the visibility of supported features',
    };
  }

  toggleFeature(feature: UiFeatures, event: Event): void {
    this.configService.applyConfig(feature, event.target['checked']).subscribe(
      () => this.utilService.callSnackBar('Successfully saved config!'),
      (error: HttpErrorResponse) =>
        this.utilService.callSnackBar(
          'Error while saving config!' + error.message
        )
    );
  }
}
