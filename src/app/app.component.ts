import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { QcAtlasUiRepositoryConfigurationService } from './directives/qc-atlas-ui-repository-configuration.service';
import { UtilService } from './util/util.service';
import { AtlasQpuUpdateService } from './util/AtlasQpuUpdate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: 'qc-atlas-ui';
  loading = true;

  constructor(
    private configService: QcAtlasUiRepositoryConfigurationService,
    private utilService: UtilService,
    private atlasQpuUpdateService: AtlasQpuUpdateService
  ) {}

  ngOnInit(): void {
    this.configService.getConfigurationFromBackend().subscribe(
      () => {
        this.loading = false;
        this.atlasQpuUpdateService.runQpuUpdate();
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.utilService.callSnackBar(
          'Error while loading config from config server!' + error.message
        );
      }
    );
  }
}
