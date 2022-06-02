import { Injectable } from '@angular/core';
import { LibrariesService } from 'api-library/services/libraries.service';
import { SystematicLiteratureReviewService } from 'api-library/services/systematic-literature-review.service';
import { Observable } from 'rxjs';
import { Library } from 'api-library/models/library';
import { BibEntryDto } from 'api-library/models/bib-entry-dto';

export enum ServiceType {
  LIBRARY,
  STUDY,
}

@Injectable({
  providedIn: 'root',
})
export class LibraryAndStudyService {
  constructor(
    private libraryService: LibrariesService,
    private slrService: SystematicLiteratureReviewService
  ) {}

  getLibraryEntries(
    serviceType: ServiceType,
    name: string
  ): Observable<Library> {
    if (serviceType === ServiceType.LIBRARY) {
      return this.libraryService.getLibraryEntries({ libraryName: name });
    } else if (serviceType === ServiceType.STUDY) {
      return this.slrService.getLibraryEntries1({ studyName: name });
    }
  }

  addEntryToLibrary(
    serviceType: ServiceType,
    name: string,
    body?: BibEntryDto
  ): Observable<any> {
    if (serviceType === ServiceType.LIBRARY) {
      return this.libraryService.addEntryToLibrary({ libraryName: name, body });
    } else if (serviceType === ServiceType.STUDY) {
      return this.slrService.addEntryToLibrary1({ studyName: name, body });
    }
  }

  getBibEntryMatchingCiteKey(
    serviceType: ServiceType,
    citeKey: string,
    name: string
  ): Observable<BibEntryDto> {
    if (serviceType === ServiceType.LIBRARY) {
      return this.libraryService.getBibEntryMatchingCiteKey({
        citeKey,
        libraryName: name,
      });
    } else if (serviceType === ServiceType.STUDY) {
      return this.slrService.getBibEntryMatchingCiteKey2({
        citeKey,
        studyName: name,
      });
    }
  }

  updateEntry(
    serviceType: ServiceType,
    citeKey: string,
    name: string,
    body?: BibEntryDto
  ): Observable<any> {
    if (serviceType === ServiceType.LIBRARY) {
      return this.libraryService.updateEntry({
        citeKey,
        libraryName: name,
        body,
      });
    } else if (serviceType === ServiceType.STUDY) {
      return this.slrService.updateEntry1({ citeKey, studyName: name, body });
    }
  }

  deleteEntryFromLibrary(
    serviceType: ServiceType,
    citeKey: string,
    name: string
  ): Observable<any> {
    if (serviceType === ServiceType.LIBRARY) {
      return this.libraryService.deleteEntryFromLibrary({
        citeKey,
        libraryName: name,
      });
    } else if (serviceType === ServiceType.STUDY) {
      return this.slrService.deleteEntryFromLibrary1({
        citeKey,
        studyName: name,
      });
    }
  }
}
