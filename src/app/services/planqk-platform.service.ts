import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pageable } from '../../../generated/api-atlas/models/pageable';
import { Sort } from '../../../generated/api-atlas/models/sort';

@Injectable({
  providedIn: 'root',
})
export class PlanqkPlatformService {
  constructor(private http: HttpClient) {}

  public getImplementationFileIdOfPlanqkPlatform(
    algorithmId: string,
    implementationId: string
  ): Observable<PageFileDto> {
    return this.http
      .get<PageFileDto>(
        'https://platform.planqk.de/qc-catalog/algorithms/' +
          algorithmId +
          '/implementations/' +
          implementationId +
          '/files'
      )
      .pipe(map((files) => files));
  }
}

export interface PageFileDto {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  pageable?: Pageable;
  size?: number;
  content?: FileDto[];
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  last?: boolean;
  empty?: boolean;
}

export interface FileDto {
  id: string;
  name: string;
  mimeType?: string;
  fileURL?: string;
  creationDate: string;
  lastModifiedAt: string;
}
