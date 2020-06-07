/* tslint:disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AlgoRelationTypeControllerService } from './services/algo-relation-type-controller.service';
import { AlgorithmService } from './services/algorithm.service';
import { CloudServicesService } from './services/cloud-services.service';
import { ImplementationService } from './services/implementation.service';
import { ProblemTypeControllerService } from './services/problem-type-controller.service';
import { ProviderService } from './services/provider.service';
import { QpuService } from './services/qpu.service';
import { RootService } from './services/root.service';
import { SoftwarePlatformService } from './services/software-platform.service';
import { TagService } from './services/tag.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AlgoRelationTypeControllerService,
    AlgorithmService,
    CloudServicesService,
    ImplementationService,
    ProblemTypeControllerService,
    ProviderService,
    QpuService,
    RootService,
    SoftwarePlatformService,
    TagService,
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
