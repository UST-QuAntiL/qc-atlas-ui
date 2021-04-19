import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'api-atlas/base-service';
import { ApiConfiguration } from 'api-atlas/api-configuration';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericDataService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getData(url: string): Observable<any> {
    return this.http.get(url);
  }
}
