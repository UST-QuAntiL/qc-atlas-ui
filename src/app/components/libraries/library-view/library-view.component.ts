import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LibrariesService } from 'api-library/services/libraries.service';
import { SelectionModel } from '@angular/cdk/collections';
import { BibEntryDto } from 'api-library/models/bib-entry-dto';
import { NewLibraryDto } from 'api-library/models';
import {
  QcAtlasUiConfiguration,
  QcAtlasUiRepositoryConfigurationService,
} from '../../../directives/qc-atlas-ui-repository-configuration.service';
import { AddBibentryDialogComponent } from '../dialogs/add-bibentry-dialog/add-bibentry-dialog.component';
import { UtilService } from '../../../util/util.service';
import { AddLibraryDialogComponent } from '../dialogs/add-library-dialog/add-library-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-library-view',
  templateUrl: './library-view.component.html',
  styleUrls: ['./library-view.component.scss'],
})
export class LibraryViewComponent implements OnInit {
  @Input() addIcon = 'playlist_add';
  @Input() emptyTableMessage = 'No elements found';
  @Output() elementClicked = new EventEmitter<any>();
  @Output() updateClicked = new EventEmitter<any>();
  selection = new SelectionModel<any>(true, []);
  entries: TableEntry[] = [];
  allEntries: TableEntry[] = [];
  searchText = '';
  tableColumns = ['Cite Key', 'Title', 'Authors', 'Entry Type', 'Date'];
  variableNames = ['id', 'title', 'author', 'entrytype', 'date'];
  libraries$: string[];
  library: string;
  disabledDataEntries: Set<any> = new Set<any>();
  librariesExist = false;

  uiConfig: QcAtlasUiConfiguration;

  constructor(
    private libraryService: LibrariesService,
    private configService: QcAtlasUiRepositoryConfigurationService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.uiConfig = this.configService.configuration;
    this.getLibraryNames();
  }

  getLibraryNames(): void {
    this.libraryService.getLibraryNames().subscribe((libraries) => {
      this.libraries$ = libraries ?? [];
      if (this.libraries$.length > 0) {
        this.libraries$ = this.libraries$.map((lib) =>
          lib.substr(0, lib.length - 4)
        );
        this.library = this.libraries$[0];
        this.getLibrary(this.library);
        this.librariesExist = true;
      } else {
        this.librariesExist = false;
      }
    });
  }

  getLibrary(libraryName: string): void {
    this.entries = [];
    this.allEntries = [];
    this.library = libraryName;
    this.libraryService
      .getLibraryEntries({ libraryName: this.library })
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

  onAddLibrary(): void {
    this.utilService
      .createDialog(AddLibraryDialogComponent, {
        title: 'Create new library',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        const libraryDTO: NewLibraryDto = { libraryName: dialogResult.name };
        this.libraryService.createNewLibrary({ body: libraryDTO }).subscribe(
          () => {
            this.libraryService.getLibraryNames().subscribe((libraries) => {
              this.libraries$ = libraries ?? [];
              this.libraries$ = this.libraries$.map((lib) =>
                lib.substr(0, lib.length - 4)
              );
              this.library = dialogResult.name;
              this.librariesExist = true;
              this.getLibrary(this.library);
            });
            this.utilService.callSnackBar(
              'Successfully added the library "' + this.library + '".'
            );
          },
          () => {
            this.utilService.callSnackBar(
              'Error! Library "' + this.library + '" could not be created.'
            );
          }
        );
      });
  }

  onElementClicked(element): void {
    this.elementClicked.emit(element);
    this.selection.clear();
  }

  onAddEntry(): void {
    this.utilService
      .createDialog(AddBibentryDialogComponent, {})
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const bibEntryDto = dialogResult as BibEntryDto;
          this.libraryService
            .addEntryToLibrary({ libraryName: this.library, body: bibEntryDto })
            .subscribe(() => this.getLibrary(this.library));
        }
      });
  }

  onDeleteLibrary(): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this library?',
      yesButtonText: 'yes',
      noButtonText: 'no',
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, dialogData)
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.libraryService
            .deleteLibrary({ libraryName: this.library })
            .subscribe(
              () => {
                this.getLibraryNames();
                this.utilService.callSnackBar(
                  'Successfully deleted the library "' + this.library + '".'
                );
              },
              () => {
                this.utilService.callSnackBar(
                  'Error! Library "' + this.library + '" could not be deleted.'
                );
              }
            );
        }
      });
  }

  onDeleteEntriesSubmitted(): void {}

  onDeleteElements(event): void {}

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
            .deleteEntryFromLibrary({
              citeKey: element.id,
              libraryName: this.library,
            })
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
