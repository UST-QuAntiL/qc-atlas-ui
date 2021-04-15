import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BreadcrumbLink } from '../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import {
  QcAtlasUiConfiguration,
  QcAtlasUiRepositoryConfigurationService,
  UiFeatures,
} from '../../directives/qc-atlas-ui-repository-configuration.service';
import { environment } from '../../../environments/environment';
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
    private configData: QcAtlasUiRepositoryConfigurationService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.config = this.configData.configuration;

    this.links[0] = {
      heading: 'Feature Selection',
      subHeading: 'Set the visibility of supported features',
    };
  }

  toggleFeature(event, feature): void {
    let url = environment.CONFIG_SEVER_URL + '/features/';
    let value = '';
    if (feature === 'qprov') {
      url += this.UiFeatures.QPROV;
      value = String(this.config.features.qprov);
    } else if (feature === 'patternAtlas') {
      url += this.UiFeatures.PATTERN_ATLAS;
      value = String(this.config.features.patternAtlas);
    } else if (feature === 'nisqAnalyzerCompilerComparison') {
      url += this.UiFeatures.NISQ_ANALYZER_COMPILER_COMPARISON;
      value = String(this.config.features.nisqAnalyzerCompilerComparison);
    } else if (feature === 'nisqAnalyzer') {
      url += this.UiFeatures.NISQ_ANALYZER;
      value = String(this.config.features.nisqAnalyzer);
    } else {
      console.error('Feature does not exist');
    }

    this.http.put(url, {}, { params: { value } }).subscribe(
      () => this.utilService.callSnackBar('Successfully saved config!'),
      (error) =>
        this.utilService.callSnackBar(
          'Error while saving config!' + error.message
        )
    );
  }
}
