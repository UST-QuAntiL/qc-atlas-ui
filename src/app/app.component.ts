import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { QcAtlasUiRepositoryConfigurationService } from './directives/qc-atlas-ui-repository-configuration.service';
import { UtilService } from './util/util.service';

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
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.configService.getConfigurationFromBackend().subscribe(
      () => (this.loading = false),
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.utilService.callSnackBar(
          'Error while loading config from config server!' + error.message
        );
      }
    );
  }
}
