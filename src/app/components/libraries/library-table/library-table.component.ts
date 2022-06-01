import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { forkJoin } from 'rxjs';
import { BibEntryDto } from 'api-library/models/bib-entry-dto';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import {
  QcAtlasUiConfiguration,
  QcAtlasUiRepositoryConfigurationService,
} from '../../../directives/qc-atlas-ui-repository-configuration.service';
import { UtilService } from '../../../util/util.service';
import { AddBibentryDialogComponent } from '../dialogs/add-bibentry-dialog/add-bibentry-dialog.component';
import { LibraryAndStudyService } from '../library-and-study.service';

@Component({
  selector: 'app-library-table',
  templateUrl: './library-table.component.html',
  styleUrls: ['./library-table.component.scss'],
})
export class LibraryTableComponent implements OnInit {
  @Input() addIcon = 'playlist_add';
  @Input() emptyTableMessage = 'No elements found';
  @Input() serviceType = 'library';
  @Input() showTable = false;
  @Output() elementClicked = new EventEmitter<any>();
  @Output() updateClicked = new EventEmitter<any>();
  library: string;
  selection = new SelectionModel<any>(true, []);
  entries: TableEntry[] = [];
  allEntries: TableEntry[] = [];
  tableColumns = ['Cite Key', 'Title', 'Authors', 'Entry Type', 'Date'];
  variableNames = ['id', 'title', 'author', 'entrytype', 'date'];
  searchText = '';
  disabledDataEntries: Set<any> = new Set<any>();
  uiConfig: QcAtlasUiConfiguration;

  constructor(
    private libraryService: LibraryAndStudyService,
    private configService: QcAtlasUiRepositoryConfigurationService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.uiConfig = this.configService.configuration;
  }

  getLibrary(libraryName: string): void {
    this.entries = [];
    this.allEntries = [];
    this.library = libraryName;
    this.libraryService
      .getLibraryEntries(this.serviceType, this.library)
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

  onAddEntry(): void {
    this.utilService
      .createDialog(AddBibentryDialogComponent, {
        title: 'Add a new bibTeX entry',
        bibEntry: {},
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult.bibEntry) {
          const bibEntryDto = dialogResult.bibEntry as BibEntryDto;
          this.libraryService
            .addEntryToLibrary(this.serviceType, this.library, bibEntryDto)
            .subscribe(() => this.getLibrary(this.library));
        }
      });
  }

  onElementClicked(element): void {
    this.elementClicked.emit(element);
    this.selection.clear();
    this.libraryService
      .getBibEntryMatchingCiteKey(this.serviceType, element.id, this.library)
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
              this.libraryService
                .updateEntry(
                  this.serviceType,
                  bibEntryDto.citationKey,
                  this.library,
                  bibEntryDto
                )
                .subscribe(() => this.getLibrary(this.library));
            }
          });
      });
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
              this.libraryService
                .deleteEntryFromLibrary(
                  this.serviceType,
                  element.id,
                  this.library
                )
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
            this.getLibrary(this.library);
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

  isAllSelected(): boolean {
    return (
      this.entries.length ===
      this.selection.selected.length + this.disabledDataEntries.size
    );
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

  onUpdateClicked(element): void {
    this.updateClicked.emit(element);
    this.selection.clear();
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
          this.libraryService
            .deleteEntryFromLibrary(this.serviceType, element.id, this.library)
            .toPromise()
            .then(() => {
              this.utilService.callSnackBar(
                'Successfully deleted entry "' + element.id + '".'
              );
              this.getLibrary(this.library);
            })
            .catch(() => {
              this.utilService.callSnackBar(
                'Could not delete entry "' + element.id + '".'
              );
            });
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
}

interface TableEntry {
  id: string;
  author?: string;
  title?: string;
  entrytype?: string;
  date?: string;
  keywords?: string;
}
