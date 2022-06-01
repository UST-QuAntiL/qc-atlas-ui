import { Injectable } from '@angular/core';
import { LibrariesService } from 'api-library/services/libraries.service';
import { SystematicLiteratureReviewService } from 'api-library/services/systematic-literature-review.service';
import { Observable } from 'rxjs';
import { Library } from 'api-library/models/library';
import { BibEntryDto } from 'api-library/models/bib-entry-dto';

@Injectable({
  providedIn: 'root',
})
export class LibraryAndStudyService {
  constructor(
    private libraryService: LibrariesService,
    private slrService: SystematicLiteratureReviewService
  ) {}

  getLibraryEntries(serviceType: string, name: string): Observable<Library> {
    if (serviceType === 'library') {
      return this.libraryService.getLibraryEntries({ libraryName: name });
    } else if (serviceType === 'study') {
      return this.slrService.getLibraryEntries1({ studyName: name });
    }
  }

  addEntryToLibrary(
    serviceType: string,
    name: string,
    body?: BibEntryDto
  ): Observable<any> {
    if (serviceType === 'library') {
      return this.libraryService.addEntryToLibrary({ libraryName: name, body });
    } else if (serviceType === 'study') {
      return this.slrService.addEntryToLibrary1({ studyName: name, body });
    }
  }

  getBibEntryMatchingCiteKey(
    serviceType: string,
    citeKey: string,
    name: string
  ): Observable<BibEntryDto> {
    if (serviceType === 'library') {
      return this.libraryService.getBibEntryMatchingCiteKey({
        citeKey,
        libraryName: name,
      });
    } else if (serviceType === 'study') {
      return this.slrService.getBibEntryMatchingCiteKey2({
        citeKey,
        studyName: name,
      });
    }
  }

  updateEntry(
    serviceType: string,
    citeKey: string,
    name: string,
    body?: BibEntryDto
  ): Observable<any> {
    if (serviceType === 'library') {
      return this.libraryService.updateEntry({
        citeKey,
        libraryName: name,
        body,
      });
    } else if (serviceType === 'study') {
      return this.slrService.updateEntry1({ citeKey, studyName: name, body });
    }
  }

  deleteEntryFromLibrary(
    serviceType: string,
    citeKey: string,
    name: string
  ): Observable<any> {
    if (serviceType === 'library') {
      return this.libraryService.deleteEntryFromLibrary({
        citeKey,
        libraryName: name,
      });
    } else if (serviceType === 'study') {
      return this.slrService.deleteEntryFromLibrary1({
        citeKey,
        studyName: name,
      });
    }
  }
}
