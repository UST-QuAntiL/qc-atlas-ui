/* tslint:disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { ActuatorService } from './services/actuator.service';
import { BasicErrorControllerService } from './services/basic-error-controller.service';
import { ProfileControllerService } from './services/profile-controller.service';
import { QpuEntityControllerService } from './services/qpu-entity-controller.service';
import { QpuSearchControllerService } from './services/qpu-search-controller.service';
import { QubitEntityControllerService } from './services/qubit-entity-controller.service';
import { QubitSearchControllerService } from './services/qubit-search-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ActuatorService,
    BasicErrorControllerService,
    ProfileControllerService,
    QpuEntityControllerService,
    QpuSearchControllerService,
    QubitEntityControllerService,
    QubitSearchControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
