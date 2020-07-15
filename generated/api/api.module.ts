/* tslint:disable */
import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AlgorithmService } from './services/algorithm.service';
import { AlgorithmRelationTypeService } from './services/algorithm-relation-type.service';
import { ApplicationAreasService } from './services/application-areas.service';
import { ComputingResourcePropertiesTypesService } from './services/computing-resource-properties-types.service';
import { PatternRelationService } from './services/pattern-relation.service';
import { PatternRelationTypeService } from './services/pattern-relation-type.service';
import { ProblemTypeService } from './services/problem-type.service';
import { PublicationService } from './services/publication.service';
import { RootService } from './services/root.service';
import { SoftwarePlatformService } from './services/software-platform.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AlgorithmService,
    AlgorithmRelationTypeService,
    ApplicationAreasService,
    ComputingResourcePropertiesTypesService,
    PatternRelationService,
    PatternRelationTypeService,
    ProblemTypeService,
    PublicationService,
    RootService,
    SoftwarePlatformService,
    ApiConfiguration,
  ],
})
export class ApiModule {
  static forRoot(
    params: ApiConfigurationParams
  ): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params,
        },
      ],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error(
        'ApiModule is already loaded. Import in your base AppModule only.'
      );
    }
    if (!http) {
      throw new Error(
        'You need to import the HttpClientModule in your AppModule! \n' +
          'See also https://github.com/angular/angular/issues/20575'
      );
    }
  }
}
