import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LibrariesService } from 'api-library/services/libraries.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { Option } from '../../generics/property-input/select-input.component';
import {
  QcAtlasUiConfiguration,
  QcAtlasUiRepositoryConfigurationService,
} from '../../../directives/qc-atlas-ui-repository-configuration.service';
import { AddBibentryDialogComponent } from '../dialogs/add-bibentry-dialog/add-bibentry-dialog.component';
import { UtilService } from '../../../util/util.service';
import { BibEntryDto } from 'api-library/models/bib-entry-dto';

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
  searchText = '';
  tableColumns = [
    'Cite Key',
    'Title',
    'Authors',
    'Date',
    'Entry Type'
  ];
  variableNames = ['id', 'title', 'author', 'date', 'entrytype'];
  loading = true;
  libraries$: Observable<Option[]>;
  library: string;
  disabledDataEntries: Set<any> = new Set<any>();

  uiConfig: QcAtlasUiConfiguration;

  constructor(
    private libraryService: LibrariesService,
    private configService: QcAtlasUiRepositoryConfigurationService,
    private utilService: UtilService
  ) {
  }

  ngOnInit(): void {
    this.uiConfig = this.configService.configuration;
    this.libraries$ = this.libraryService.getLibraryNames().pipe(
      map((libraries) =>
        libraries.map((library) => ({
          label: library.substr(0, library.length - 4),
          value: library.substr(0, library.length - 4),
        }))
      )
    );
  }

  getLibrary(libraryName: string): void {
    this.entries = [];
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
        this.loading = false;
      });
  }

  onElementClicked(element): void {
    this.elementClicked.emit(element);
    this.selection.clear();
  }

  onAddEntry(): void {
    this.utilService
      .createDialog(AddBibentryDialogComponent, {
        title: 'Add a new bib entry',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        const bibEntryDto = dialogResult as BibEntryDto;
        this.libraryService
          .addEntryToLibrary({ libraryName: this.library, body: bibEntryDto })
          .subscribe(() => this.getLibrary(this.library));
      });
  }

  onDeleteEntriesSubmitted(): void {
  }

  onDeleteElements(event): void {
  }

  sortData(event): void {
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
    // const deleteElement: any[] = [element];
    // const deleteParams = this.generateSelectParameter();
    // deleteParams.elements = deleteElement;
    // this.submitDeleteElements.emit(deleteParams);
    // this.selection.clear();
  }

  onSearchChange(): void {
    // this.datalistConfigChanged.emit(this.generateGetParameter());
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
