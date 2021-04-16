import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'api-atlas/base-service';
import { ApiConfiguration } from 'api-atlas/api-configuration';

@Injectable({
  providedIn: 'root',
})
export class GenericDataService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getData(url: string) {
    return this.http.get(url);
  }
}
