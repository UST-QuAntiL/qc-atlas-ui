import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SystematicLiteratureReviewService } from 'api-library/services/systematic-literature-review.service';
import { StudyDto } from 'api-library/models/study-dto';
import { interval, Observable } from 'rxjs';
import { finalize, startWith, switchMap } from 'rxjs/operators';
import { Study } from 'api-library/models/study';
import {
  QcAtlasUiConfiguration,
  QcAtlasUiRepositoryConfigurationService,
} from '../../../directives/qc-atlas-ui-repository-configuration.service';
import { UtilService } from '../../../util/util.service';
import { AddSlrDialogComponent } from '../dialogs/add-slr-dialog/add-slr-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import { LibraryTableComponent } from '../library-table/library-table.component';
import { ServiceType } from '../library-and-study.service';

@Component({
  selector: 'app-slr-view',
  templateUrl: './slr-view.component.html',
  styleUrls: ['./slr-view.component.scss'],
})
export class SlrViewComponent implements OnInit {
  @Input() addIcon = 'playlist_add';
  @Input() emptyTableMessage = 'No elements found';
  @Output() elementClicked = new EventEmitter<any>();
  @Output() updateClicked = new EventEmitter<any>();
  @ViewChild(LibraryTableComponent)
  libraryTable!: LibraryTableComponent;
  slr: string;
  slrs$: string[];
  study: Study;
  uiConfig: QcAtlasUiConfiguration;
  slrsExist: boolean;
  crawlingFinished = true;
  serviceType = ServiceType.STUDY;

  constructor(
    private slrService: SystematicLiteratureReviewService,
    private configService: QcAtlasUiRepositoryConfigurationService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.uiConfig = this.configService.configuration;
    this.getSLRNames();
  }

  getSLRNames(): void {
    this.slrService.getStudyNames().subscribe((studies) => {
      this.slrs$ = studies ?? [];
      if (this.slrs$.length > 0) {
        this.onSLRChanged(this.slrs$[0]);
        this.slrsExist = true;
      } else {
        this.slrsExist = false;
      }
    });
  }

  getSlr(slrName: string): Observable<StudyDto> {
    return this.slrService.getStudyDefinition({ studyName: slrName });
  }

  onSLRChanged(slrName: string): void {
    this.slr = slrName;
    this.getSlr(slrName).subscribe((study) => {
      this.study = study.studyDefinition;
      if (study.studyDefinition['last-search-date']) {
        this.libraryTable.getLibrary(this.slr);
      }
    });
  }

  updateStudy(): void {
    this.getSlr(this.slr).subscribe((study) => {
      this.study = study.studyDefinition;
    });
  }

  onAddSLR(): void {
    this.utilService
      .createDialog(AddSlrDialogComponent, {
        title: 'Create new study',
        study: {},
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (!dialogResult) {
          return;
        }
        const studyDTO: StudyDto = dialogResult.study;
        console.log(studyDTO);
        this.slrService.createStudy({ body: studyDTO }).subscribe(
          () => {
            this.slrService.getStudyNames().subscribe((studies) => {
              this.slrs$ = studies ?? [];
              this.onSLRChanged(dialogResult.study.studyDefinition.title);
              this.slrsExist = true;
              this.onCrawlSLR();
            });
            this.utilService.callSnackBar(
              'Successfully added the study "' +
                studyDTO.studyDefinition.title +
                '".'
            );
          },
          () => {
            this.utilService.callSnackBar(
              'Error! Study "' +
                studyDTO.studyDefinition.title +
                '" could not be created.'
            );
          }
        );
      });
  }

  onDeleteSLR(): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this study?',
      yesButtonText: 'yes',
      noButtonText: 'no',
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, dialogData)
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.slrService.deleteStudy({ studyName: this.slr }).subscribe(
            () => {
              this.utilService.callSnackBar(
                'Successfully deleted the study "' + this.slr + '".'
              );
              this.getSLRNames();
            },
            () => {
              this.utilService.callSnackBar(
                'Error! Study "' + this.slr + '" could not be deleted.'
              );
            }
          );
        }
      });
  }

  onCrawlSLR(): void {
    this.slrService.crawlStudy({ studyName: this.slr, body: '' }).subscribe(
      () => {
        this.crawlingFinished = false;
        this.utilService.callSnackBar(
          'Started crawling for study "' + this.slr + '".'
        );
        const pollSubscription = interval(500)
          .pipe(
            finalize(() => (this.crawlingFinished = true)),
            startWith(0),
            switchMap(() =>
              this.slrService.getCrawlStatus({ studyName: this.slr })
            )
          )
          .subscribe((res) => {
            console.log(res.currentlyCrawling);
            if (!res.currentlyCrawling) {
              pollSubscription.unsubscribe();
              this.libraryTable.getLibrary(this.slr);
              this.updateStudy();
              this.utilService.callSnackBar(
                'Crawling for study "' + this.slr + '" is finished.'
              );
            }
          });
      },
      () => {
        this.utilService.callSnackBar(
          'Error! Study "' + this.slr + '" could not be crawled.'
        );
      }
    );
  }
}
