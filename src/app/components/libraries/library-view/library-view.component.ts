import { Component, OnInit } from '@angular/core';
import { LibrariesService } from 'api-library/services/libraries.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BibEntryDto } from 'api-library/models/bib-entry-dto';
import { Option } from '../../generics/property-input/select-input.component';

@Component({
  selector: 'app-library-view',
  templateUrl: './library-view.component.html',
  styleUrls: ['./library-view.component.scss'],
})
export class LibraryViewComponent implements OnInit {
  entries: TableEntry[] = [];
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

  constructor(private libraryService: LibrariesService) {}

  ngOnInit(): void {
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

  onElementClicked(entry: BibEntryDto): void {}

  onAddElement(): void {}

  onDeleteElements(event): void {}
}

interface TableEntry {
  id: string;
  author?: string;
  title?: string;
  entrytype?: string;
  date?: string;
  keywords?: string;
}
