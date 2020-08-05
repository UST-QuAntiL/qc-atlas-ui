import { Component, Input, OnInit } from '@angular/core';
import { EntityModelSoftwarePlatformDto } from 'api/models/entity-model-software-platform-dto';
import { ExecutionEnvironmentsService } from 'api/services/execution-environments.service';
import { Router } from '@angular/router';
import { EntityModelImplementationDto } from 'api/models/entity-model-implementation-dto';
import { ImplementationDto } from 'api/models/implementation-dto';
import { AlgorithmService } from 'api/services/algorithm.service';
import {
  DeleteParams,
  LinkObject,
} from '../../../generics/data-list/data-list.component';

@Component({
  selector: 'app-software-platform-impl-list',
  templateUrl: './software-platform-impl-list.component.html',
  styleUrls: ['./software-platform-impl-list.component.scss'],
})
export class SoftwarePlatformImplListComponent implements OnInit {
  @Input() softwarePlatform: EntityModelSoftwarePlatformDto;
  implementations: EntityModelImplementationDto[];
  linkedImplementations: EntityModelImplementationDto[] = [];

  variableNames: string[] = ['name', 'description', 'dependencies'];
  tableColumns: string[] = ['Name', 'Description', 'Dependencies'];
  linkObject: LinkObject = {
    title: 'Link software platform with ',
    subtitle: 'Search implementation by name',
    displayVariable: 'name',
    data: [],
  };
  tableAddAllowed = true;
  isLinkingEnabled = false;

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private algorithmService: AlgorithmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.softwarePlatform.name;
    this.getImplementations();
    this.getLinkedImplementations({ id: this.softwarePlatform.id });
  }

  getImplementations(): void {}

  getLinkedImplementations(params: any): void {
    this.executionEnvironmentsService
      .getImplementationsForSoftwarePlatform(params)
      .subscribe((implementations) => {
        if (implementations._embedded) {
          this.linkedImplementations =
            implementations._embedded.implementations;
        } else {
          this.linkedImplementations = [];
        }
      });
  }

  searchUnlinkedImplementations(search: string): void {
    if (search) {
      search = search.toLocaleLowerCase();
      this.linkObject.data = this.implementations.filter(
        (implementation: EntityModelImplementationDto) =>
          implementation.name.toLocaleLowerCase().startsWith(search) &&
          !this.linkedImplementations.includes(implementation)
      );
    } else {
      this.linkObject.data = [];
    }
  }

  linkImplementation(implementation: ImplementationDto): void {
    this.linkObject.data = [];
    this.executionEnvironmentsService
      .addImplementationReferenceToSoftwarePlatform({
        id: this.softwarePlatform.id,
        implId: implementation.id,
      })
      .subscribe((data) => {
        this.getLinkedImplementations({ id: this.softwarePlatform.id });
      });
  }

  async unlinkImplementations(event: DeleteParams): Promise<void> {
    for (const implementation of event.elements) {
      await this.executionEnvironmentsService
        .deleteCloudServiceReferenceFromSoftwarePlatform({
          id: this.softwarePlatform.id,
          csId: implementation.id,
        })
        .toPromise();
      this.getLinkedImplementations({ id: this.softwarePlatform.id });
    }
  }

  onAddElement(): void {}

  onDatalistConfigChanged(): void {
    this.getLinkedImplementations({ id: this.softwarePlatform.id });
  }

  onElementClicked(implementation: ImplementationDto): void {
    this.router.navigate(['algorithms', 'implementations', implementation.id]);
  }

  onToggleLink(): void {
    this.isLinkingEnabled = !this.isLinkingEnabled;
    this.tableAddAllowed = !this.tableAddAllowed;
  }
}
