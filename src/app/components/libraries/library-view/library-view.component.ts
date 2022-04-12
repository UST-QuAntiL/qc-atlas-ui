import { Component, OnInit } from '@angular/core';
import { LibrariesService } from 'api-library/services/libraries.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Option } from '../../generics/property-input/select-input.component';

@Component({
  selector: 'app-library-view',
  templateUrl: './library-view.component.html',
  styleUrls: ['./library-view.component.scss'],
})
export class LibraryViewComponent implements OnInit {
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

  getLibrary(): void {}
}
