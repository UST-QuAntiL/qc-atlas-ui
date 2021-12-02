import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbLink } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { UtilService } from '../../../util/util.service';
import { UiFeatures } from '../../../directives/qc-atlas-ui-repository-configuration.service';
import { ChangePageGuard } from '../../../services/deactivation-guard';
import { QAIAppService } from '../qai-apps.service';
import { QAIAppDto } from '../qai-app-dto';

@Component({
  selector: 'app-qai-app-view',
  templateUrl: './qai-app-view.component.html',
  styleUrls: ['./qai-app-view.component.scss'],
})
export class QAIAppViewComponent implements OnInit, OnDestroy {
  readonly UiFeatures = UiFeatures;

  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];
  qaiApp: QAIAppDto;
  qaiAppFrontend: QAIAppDto;

  private routeSub: Subscription;

  constructor(
    private qaiAppService: QAIAppService,
    private route: ActivatedRoute,
    private utilService: UtilService,
    public guard: ChangePageGuard
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(({ qaiAppId }) => {
      this.qaiAppService.getQAIApp({ qaiAppId }).subscribe(
        (qaiApp) => {
          console.log(qaiApp);
          this.qaiApp = qaiApp;
          this.qaiAppFrontend = JSON.parse(JSON.stringify(qaiApp)) as QAIAppDto; // copy object
          this.links[0] = {
            heading: qaiApp.name,
            subHeading: '',
          };
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Algorithm could not be retrieved.'
          );
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  createBreadcrumbHeader(algorithm: AlgorithmDto): string {
    const header = algorithm.name;

    return algorithm.acronym ? header + ' (' + algorithm.acronym + ')' : header;
  }
}
