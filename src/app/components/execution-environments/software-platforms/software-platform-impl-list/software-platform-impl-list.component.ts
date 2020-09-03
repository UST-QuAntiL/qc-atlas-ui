import { Component, Input, OnInit } from '@angular/core';
import { EntityModelSoftwarePlatformDto } from 'api-atlas/models/entity-model-software-platform-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { EntityModelImplementationDto } from 'api-atlas/models/entity-model-implementation-dto';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import {
  DeleteParams,
  LinkObject,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';

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
    title: 'Link implementation with ',
    subtitle: 'Search implementation by name',
    displayVariable: 'name',
    data: [],
  };
  tableAddAllowed = true;
  isLinkingEnabled = false;

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private algorithmService: AlgorithmService,
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.softwarePlatform.name;
    this.getImplementations();
    this.getLinkedImplementations({ id: this.softwarePlatform.id });
  }

  getImplementations(): void {
    this.algorithmService
      .getAllImplementations({ page: -1 })
      .subscribe((implementations) => {
        if (implementations._embedded) {
          this.implementations = implementations._embedded.implementations;
        } else {
          this.implementations = [];
        }
      });
  }

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
        this.utilService.callSnackBar('Successfully linked implementation');
      });
  }

  async unlinkImplementations(event: DeleteParams): Promise<void> {
    for (const implementation of event.elements) {
      await this.executionEnvironmentsService
        .deleteImplementationReferenceFromSoftwarePlatform({
          id: this.softwarePlatform.id,
          implId: implementation.id,
        })
        .toPromise();
      this.getLinkedImplementations({ id: this.softwarePlatform.id });
      this.utilService.callSnackBar('Successfully unlinked implementation');
    }
  }

  onAddElement(): void {}

  onDatalistConfigChanged(): void {
    this.getLinkedImplementations({ id: this.softwarePlatform.id });
  }

  onElementClicked(implementation: ImplementationDto): void {
    this.algorithmService
      .getImplementedAlgorithm({ id: implementation.id })
      .subscribe((algo) => {
        this.router.navigate([
          'algorithms',
          algo.id,
          'implementations',
          implementation.id,
        ]);
      });
  }

  onToggleLink(): void {
    this.isLinkingEnabled = !this.isLinkingEnabled;
    this.tableAddAllowed = !this.tableAddAllowed;
  }
}
