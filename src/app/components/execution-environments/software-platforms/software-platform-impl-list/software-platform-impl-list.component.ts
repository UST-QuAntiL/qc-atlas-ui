import { Component, Input, OnInit } from '@angular/core';
import { EntityModelSoftwarePlatformDto } from 'api-atlas/models/entity-model-software-platform-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { ImplementationsService } from 'api-atlas/services/implementations.service';
import { MatDialog } from '@angular/material/dialog';
import {
  SelectParams,
  LinkObject,
  QueryParams,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import { GenericDataService } from '../../../../util/generic-data.service';
import { LinkItemListDialogComponent } from '../../../generics/dialogs/link-item-list-dialog.component';

@Component({
  selector: 'app-software-platform-impl-list',
  templateUrl: './software-platform-impl-list.component.html',
  styleUrls: ['./software-platform-impl-list.component.scss'],
})
export class SoftwarePlatformImplListComponent implements OnInit {
  @Input() softwarePlatform: EntityModelSoftwarePlatformDto;

  variableNames: string[] = ['name', 'description', 'dependencies'];
  tableColumns: string[] = ['Name', 'Description', 'Dependencies'];
  linkObject: LinkObject = {
    title: 'Link implementation with ',
    subtitle: 'Search implementation by name',
    displayVariable: 'name',
    data: [],
    linkedData: [],
  };
  tableAddAllowed = true;
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private algorithmService: AlgorithmService,
    private implementationService: ImplementationsService,
    private genericDataService: GenericDataService,
    private router: Router,
    private utilService: UtilService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.softwarePlatform.name;
    this.getImplementations();
    this.getLinkedImplementations({
      softwarePlatformId: this.softwarePlatform.id,
    });
  }

  getImplementations(): void {
    this.implementationService
      .getImplementations({ page: -1 })
      .subscribe((implementations) => {
        this.linkObject.linkedData = [];
        if (implementations._embedded) {
          this.linkObject.linkedData =
            implementations._embedded.implementations;
        }
      });
  }

  updateImplementationData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If implementations found
    if (data._embedded) {
      this.linkObject.data = data._embedded.implementations;
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  getLinkedImplementations(params: {
    softwarePlatformId: string;
    search?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }): void {
    this.executionEnvironmentsService
      .getImplementationsOfSoftwarePlatform(params)
      .subscribe((implementations) => {
        this.linkObject.linkedData = [];
        if (implementations._embedded) {
          this.linkObject.linkedData =
            implementations._embedded.implementations;
        }
      });
  }

  openLinkImplementationDialog() {
    this.implementationService.getImplementations().subscribe((data) => {
      this.updateImplementationData(data);
      const dialogRef = this.dialog.open(LinkItemListDialogComponent, {
        width: '800px',
        data: {
          title: 'Link existing implementation',
          linkObject: this.linkObject,
          tableColumns: ['Name', 'Acronym', 'Type'],
          variableNames: ['name', 'acronym', 'computationModel'],
          pagingInfo: this.pagingInfo,
          paginatorConfig: this.paginatorConfig,
          noButtonText: 'Cancel',
        },
      });
      const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
        (search: QueryParams) => {
          this.implementationService
            .getImplementations(search)
            .subscribe((updatedData) => {
              this.updateImplementationData(updatedData);
              dialogRef.componentInstance.data.linkObject = this.linkObject;
            });
        }
      );
      const pagingSub = dialogRef.componentInstance.onPageChanged.subscribe(
        (page: string) => {
          this.genericDataService.getData(page).subscribe((pageData) => {
            this.updateImplementationData(pageData);
            dialogRef.componentInstance.data.linkObject = this.linkObject;
          });
        }
      );
      const elementClickedSub = dialogRef.componentInstance.onElementClicked.subscribe(
        (element: ImplementationDto) => {
          this.routeToImplementation(element);
          dialogRef.close();
        }
      );

      dialogRef.afterClosed().subscribe((dialogResult) => {
        searchTextSub.unsubscribe();
        pagingSub.unsubscribe();
        elementClickedSub.unsubscribe();
        if (dialogResult) {
          for (const implementation of dialogResult.selectedItems) {
            this.linkImplementation(implementation);
          }
        }
      });
    });
  }

  linkImplementation(implementation: ImplementationDto): void {
    this.linkObject.data = [];
    this.executionEnvironmentsService
      .linkSoftwarePlatformAndImplementation({
        softwarePlatformId: this.softwarePlatform.id,
        body: implementation,
      })
      .subscribe(() => {
        this.getLinkedImplementations({
          softwarePlatformId: this.softwarePlatform.id,
        });
        this.utilService.callSnackBar('Successfully linked implementation');
      });
  }

  unlinkImplementations(event: SelectParams): void {
    const promises: Array<Promise<void>> = [];
    for (const implementation of event.elements) {
      promises.push(
        this.executionEnvironmentsService
          .unlinkSoftwarePlatformAndImplementation({
            softwarePlatformId: this.softwarePlatform.id,
            implementationId: implementation.id,
          })
          .toPromise()
      );
    }
    Promise.all(promises).then(() => {
      this.getLinkedImplementations({
        softwarePlatformId: this.softwarePlatform.id,
      });
      this.utilService.callSnackBar('Successfully unlinked implementation');
    });
  }

  onDatalistConfigChanged(): void {
    this.getLinkedImplementations({
      softwarePlatformId: this.softwarePlatform.id,
    });
  }

  onElementClicked(implementation: ImplementationDto): void {
    this.routeToImplementation(implementation);
  }

  routeToImplementation(implementation: ImplementationDto): void {
    this.router.navigate([
      'algorithms',
      implementation.implementedAlgorithmId,
      'implementations',
      implementation.id,
    ]);
  }
}
