import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { SystematicLiteratureReviewService } from 'api-library/services/systematic-literature-review.service';
import { StudyDto } from 'api-library/models/study-dto';
import { forkJoin, interval, Observable } from 'rxjs';
import { finalize, startWith, switchMap } from 'rxjs/operators';
import { Study } from 'api-library/models/study';
import { BibEntryDto } from 'api-library/models/bib-entry-dto';
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
import { AddBibentryDialogComponent } from '../dialogs/add-bibentry-dialog/add-bibentry-dialog.component';

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
  study: Study;

  uiConfig: QcAtlasUiConfiguration;
  slrsExist: boolean;
  searchText = '';
  selection = new SelectionModel<any>(true, []);
  tableColumns = ['Cite Key', 'Title', 'Authors', 'Entry Type', 'Date'];
  variableNames = ['id', 'title', 'author', 'entrytype', 'date'];
  entries: TableEntry[] = [];
  allEntries: TableEntry[] = [];
  disabledDataEntries: Set<any> = new Set<any>();
  crawlingFinished = true;

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

  fillSlrTable(): void {
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

  onSLRChanged(slrName: string): void {
    this.slr = slrName;
    this.getSlr(slrName).subscribe((study) => {
      this.study = study.studyDefinition;
      this.entries = [];
      this.allEntries = [];
      if (study.studyDefinition['last-search-date']) {
        this.fillSlrTable();
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

  onSearchChange(): void {
    this.entries = this.allEntries;
    this.entries = this.entries.filter((entry) => {
      const term = this.searchText.toLowerCase();
      return (
        entry.entrytype.toLowerCase().includes(term) ||
        entry.id.toLowerCase().includes(term) ||
        entry.author?.toLowerCase().includes(term) ||
        entry.keywords?.toLowerCase().includes(term) ||
        entry.date?.toLowerCase().includes(term) ||
        entry.title?.toLowerCase().includes(term)
      );
    });
    this.selection.clear();
  }

  onDeleteEntries(): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete the following entries:',
      data: this.selection.selected,
      variableName: 'id',
      yesButtonText: 'yes',
      noButtonText: 'no',
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, dialogData)
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const deletionTasks = [];
          const snackbarMessages = [];
          let successfulDeletions = 0;
          this.selection.selected.forEach((element) => {
            deletionTasks.push(
              this.slrService
                .deleteEntryFromLibrary1({
                  citeKey: element.id,
                  studyName: this.slr,
                })
                .toPromise()
                .then(() => {
                  successfulDeletions++;
                  snackbarMessages.push(
                    'Successfully deleted entry "' + element.id + '".'
                  );
                })
                .catch(() => {
                  snackbarMessages.push(
                    'Could not delete entry "' + element.id + '".'
                  );
                })
            );
          });
          forkJoin(deletionTasks).subscribe(() => {
            this.onSLRChanged(this.slr);
            this.selection.clear();
            this.utilService.callSnackBar(
              'Successfully deleted ' +
                successfulDeletions +
                '/' +
                dialogResult.data.length +
                ' entries.'
            );
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }

  sortData(): void {
    this.selection.clear();
  }

  // Toggle all check boxes
  masterToggle(): void {
    const isAllSelected = this.isAllSelected();
    this.entries.forEach((element) => {
      if (!this.dataEntryIsDisabled(element)) {
        this.changeSelection(element, !isAllSelected);
      }
    });
  }

  isAllSelected(): boolean {
    return (
      this.entries.length ===
      this.selection.selected.length + this.disabledDataEntries.size
    );
  }

  dataEntryIsDisabled(dataEntry: any): boolean {
    return this.disabledDataEntries.has(dataEntry.id);
  }

  rowToggle(row: any): void {
    this.changeSelection(row, !this.selection.isSelected(row));
  }

  changeSelection(row: any, select: boolean): void {
    if (select !== this.selection.isSelected(row)) {
      this.selection.toggle(row);
    }
  }

  onElementClicked(element): void {
    this.elementClicked.emit(element);
    this.selection.clear();
    this.slrService
      .getBibEntryMatchingCiteKey2({
        citeKey: element.id,
        studyName: this.slr,
      })
      .subscribe((bibEntry) => {
        this.utilService
          .createDialog(AddBibentryDialogComponent, {
            title: 'Update bibTeX entry',
            bibEntry,
          })
          .afterClosed()
          .subscribe((dialogResult) => {
            if (dialogResult.bibEntry) {
              const bibEntryDto = dialogResult.bibEntry as BibEntryDto;
              this.slrService
                .updateEntry1({
                  citeKey: bibEntryDto.citationKey,
                  studyName: this.slr,
                  body: bibEntryDto,
                })
                .subscribe(() => this.onSLRChanged(this.slr));
            }
          });
      });
  }

  onSingleDelete(element): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete the following entry:',
      data: [element],
      variableName: 'id',
      yesButtonText: 'yes',
      noButtonText: 'no',
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, dialogData)
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.slrService
            .deleteEntryFromLibrary1({
              citeKey: element.id,
              studyName: this.slr,
            })
            .toPromise()
            .then(() => {
              this.utilService.callSnackBar(
                'Successfully deleted entry "' + element.id + '".'
              );
              this.onCrawlSLR();
            })
            .catch(() => {
              this.utilService.callSnackBar(
                'Could not delete entry "' + element.id + '".'
              );
            });
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
              this.fillSlrTable();
              this.updateStudy();
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

interface TableEntry {
  id: string;
  author?: string;
  title?: string;
  entrytype?: string;
  date?: string;
  keywords?: string;
}
