import { Component, Input, OnInit } from '@angular/core';
import { EntityModelSoftwarePlatformDto } from 'api/models/entity-model-software-platform-dto';
import { EntityModelImplementationDto } from 'api/models/entity-model-implementation-dto';
import { ExecutionEnvironmentsService } from 'api/services/execution-environments.service';
import { LinkObject } from '../../../generics/data-list/data-list.component';

@Component({
  selector: 'app-implementation-softwareplatform-list',
  templateUrl: './implementation-softwareplatform-list.component.html',
  styleUrls: ['./implementation-softwareplatform-list.component.scss'],
})
export class ImplementationSoftwareplatformListComponent implements OnInit {
  @Input() implementation: EntityModelImplementationDto;
  @Input() linkedSoftwarePlatforms: EntityModelSoftwarePlatformDto[] = [];

  publications: EntityModelSoftwarePlatformDto[];
  variableNames: string[] = ['name', 'link', 'license', 'version'];
  tableColumns: string[] = ['Name', 'Link', 'License', 'Version'];
  linkObject: LinkObject = {
    title: 'Link implementation with ',
    subtitle: 'Search software platform by name',
    displayVariable: 'name',
    data: [],
  };
  tableAddAllowed = true;
  isLinkingEnabled = false;

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService
  ) {}

  ngOnInit(): void {}

  searchUnlinkedSoftwarePlatforms(search: string): void {}
}
