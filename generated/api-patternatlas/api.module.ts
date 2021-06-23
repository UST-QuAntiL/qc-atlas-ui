/* tslint:disable */
import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { CandidateControllerService } from './services/candidate-controller.service';
import { ConcreteSolutionEntityControllerService } from './services/concrete-solution-entity-controller.service';
import { ConcreteSolutionSearchControllerService } from './services/concrete-solution-search-controller.service';
import { DesignModelControllerService } from './services/design-model-controller.service';
import { DesignModelEdgeTypeEntityControllerService } from './services/design-model-edge-type-entity-controller.service';
import { DesignModelEdgeTypeSearchControllerService } from './services/design-model-edge-type-search-controller.service';
import { DesignModelEntityControllerService } from './services/design-model-entity-controller.service';
import { DesignModelSearchControllerService } from './services/design-model-search-controller.service';
import { DiscussionControllerService } from './services/discussion-controller.service';
import { ImageControllerService } from './services/image-controller.service';
import { IssueControllerService } from './services/issue-controller.service';
import { PatternControllerService } from './services/pattern-controller.service';
import { PatternLanguageControllerService } from './services/pattern-language-controller.service';
import { PatternRelationDescriptorControllerService } from './services/pattern-relation-descriptor-controller.service';
import { PatternViewControllerService } from './services/pattern-view-controller.service';
import { ProfileControllerService } from './services/profile-controller.service';
import { UserControllerService } from './services/user-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    CandidateControllerService,
    ConcreteSolutionEntityControllerService,
    ConcreteSolutionSearchControllerService,
    DesignModelControllerService,
    DesignModelEdgeTypeEntityControllerService,
    DesignModelEdgeTypeSearchControllerService,
    DesignModelEntityControllerService,
    DesignModelSearchControllerService,
    DiscussionControllerService,
    ImageControllerService,
    IssueControllerService,
    PatternControllerService,
    PatternLanguageControllerService,
    PatternRelationDescriptorControllerService,
    PatternViewControllerService,
    ProfileControllerService,
    UserControllerService,
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
