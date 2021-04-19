import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShowOnFeatureDirective } from '../util/show-on-feature.direct';
import { QcAtlasUiRepositoryConfigurationService } from './qc-atlas-ui-repository-configuration.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ShowOnFeatureDirective],
  exports: [ShowOnFeatureDirective],
  providers: [QcAtlasUiRepositoryConfigurationService],
})
export class QcAtlasUiFeatureToggleModule {}
