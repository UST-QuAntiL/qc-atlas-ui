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
import { CreateSoftwarePlatformDialogComponent } from '../../execution-environments/software-platforms/dialogs/create-software-platform-dialog.component';
import { AddBibentryDialogComponent } from '../dialogs/add-bibentry-dialog/add-bibentry-dialog.component';
import { UtilService } from '../../../util/util.service';

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
    'Entry Type',
    'Keywords',
  ];
  variableNames = ['id', 'title', 'author', 'date', 'entrytype', 'keywords'];
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
        libraries.libraryNames.map((library) => ({
          label: library,
          value: library,
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
            id: entry.citekey,
            author: entry.author,
            title: entry.title,
            entrytype: entry.entrytype,
            date: entry.date,
            keywords: entry.keywords,
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
        console.log(dialogResult);
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
