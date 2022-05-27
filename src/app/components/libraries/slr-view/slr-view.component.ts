import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { SystematicLiteratureReviewService } from 'api-library/services/systematic-literature-review.service';
import { StudyDto } from 'api-library/models/study-dto';
import { interval, timer } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
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
  slr: string;
  slrs$: string[];

  uiConfig: QcAtlasUiConfiguration;
  slrsExist: boolean;
  searchText = '';
  selection = new SelectionModel<any>(true, []);
  tableColumns = ['Cite Key', 'Title', 'Authors', 'Entry Type', 'Date'];
  variableNames = ['id', 'title', 'author', 'entrytype', 'date'];
  entries: TableEntry[] = [];
  allEntries: TableEntry[] = [];

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
        this.slr = this.slrs$[0];
        this.getSLR(this.slr);
        this.slrsExist = true;
      } else {
        this.slrsExist = false;
      }
    });
  }

  getSLR(slrName: string): void {
    this.entries = [];
    this.allEntries = [];
    this.slr = slrName;
    this.slrService
      .getStudyDefinition({ studyName: slrName })
      .subscribe((study) => {
        if (!study.studyDefinition['last-search-date']) {
          this.utilService.callSnackBar(
            'Study "' + this.slr + '" has not yet been crawled.'
          );
        } else {
          this.slrService
            .getLibraryEntries1({ studyName: this.slr })
            .subscribe((bibentries) => {
              bibentries.bibEntries.forEach((entry) => {
                this.entries.push({
                  id: entry.citationKey,
                  author: entry.author,
                  title: entry.title,
                  entrytype: entry.entryType,
                  date: entry.date,
                });
              });
              this.allEntries = this.entries;
            });
        }
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
              this.slr = dialogResult.study.studyDefinition.title;
              this.slrsExist = true;
              this.getSLR(this.slr);
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

  onSearchChange(): void {}

  onDeleteEntries(): void {}

  sortData(): void {}

  masterToggle() {
    return null;
  }

  isAllSelected() {
    return false;
  }

  dataEntryIsDisabled(dataEntry: TableEntry) {
    return false;
  }

  rowToggle(dataEntry: TableEntry) {
    return null;
  }

  onElementClicked(dataEntry: TableEntry) {
    return false;
  }

  onSingleDelete(dataEntry: TableEntry) {}

  onCrawlSLR(): void {
    this.slrService
      .crawlStudy({ studyName: this.slr, body: '' })
      .subscribe(() => {
        const pollSubscription = interval(500)
          .pipe(
            startWith(0),
            switchMap(() =>
              this.slrService.getCrawlStatus({ studyName: this.slr })
            )
          )
          .subscribe((res) => {
            console.log(res.currentlyCrawling);
            if (!res.currentlyCrawling) {
              pollSubscription.unsubscribe();
              this.getSLR(this.slr);
            }
          });
      });
  }
}

interface TableEntry {
  id: string;
  author?: string;
  title?: string;
  entrytype?: string;
  date?: string;
  keywords?: string;
}
