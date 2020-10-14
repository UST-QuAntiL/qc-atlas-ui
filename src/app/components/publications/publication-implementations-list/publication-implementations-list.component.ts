import { Component, Input, OnInit } from '@angular/core';
import { EntityModelPublicationDto } from 'api-atlas/models/entity-model-publication-dto';
import { Router } from '@angular/router';
import { PublicationService } from 'api-atlas/services/publication.service';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { EntityModelImplementationDto } from 'api-atlas/models/entity-model-implementation-dto';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { ImplementationService } from 'api-nisq/services/implementation.service';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from '../../../util/util.service';
import { LinkItemListDialogComponent } from '../../generics/dialogs/link-item-list-dialog.component';

@Component({
  selector: 'app-publication-implementations-list',
  templateUrl: './publication-implementations-list.component.html',
  styleUrls: ['./publication-implementations-list.component.scss'],
})
export class PublicationImplementationsListComponent implements OnInit {
  @Input() publication: EntityModelPublicationDto;
  linkedImplementations: EntityModelImplementationDto[] = [];
  tableColumns = ['Name', 'Description', 'Contributors', 'Assumptions', 'Link'];
  variableNames = [
    'name',
    'description',
    'contributors',
    'assumptions',
    'link',
  ];
  tableAddAllowed = true;
  linkObject: any = {
    title: 'Link publication with ',
    subtitle: 'Search implementation by name',
    displayVariable: 'name',
    data: [],
    linkedData: [],
  };
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private publicationService: PublicationService,
    private algorithmService: AlgorithmService,
    private implementationService: ImplementationService,
    private utilService: UtilService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getLinkedImplementations({ publicationId: this.publication.id });
  }

  onDatalistConfigChanged(event): void {
    this.getLinkedImplementations({ publicationId: this.publication.id });
  }

  getLinkedImplementations(params: {
    publicationId: string;
    search?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }): void {
    this.publicationService
      .getImplementationsOfPublication(params)
      .subscribe((data) => {
        // Read all incoming data
        if (data._embedded) {
          this.linkedImplementations = data._embedded.implementations;
        } else {
          this.linkedImplementations = [];
        }
      });
  }

  onElementClicked(implementation: ImplementationDto): void {
    this.router.navigate([
      'algorithms',
      implementation.implementedAlgorithmId,
      'implementations',
      implementation.id,
    ]);
  }

  linkImplementation(implementation: ImplementationDto): void {
    // Empty unlinked implementations
    this.linkObject.data = [];
    // Link algorithm
    this.algorithmService
      .linkImplementationAndPublication({
        algorithmId: implementation.implementedAlgorithmId,
        implementationId: implementation.id,
        body: this.publication,
      })
      .subscribe(() => {
        this.getLinkedImplementations({ publicationId: this.publication.id });
        this.utilService.callSnackBar('Successfully linked Implementation');
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

  unlinkImplementations(event): void {
    const promises: Array<Promise<void>> = [];
    for (const implementation of event.elements) {
      promises.push(
        this.algorithmService
          .unlinkImplementationAndPublication({
            algorithmId: implementation.implementedAlgorithmId,
            implementationId: implementation.id,
            publicationId: this.publication.id,
          })
          .toPromise()
      );
    }
    Promise.all(promises).then(() => {
      this.getLinkedImplementations({ publicationId: this.publication.id });
      this.utilService.callSnackBar('Successfully unlinked implementation(s)');
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
          tableColumns: [
            'Name',
            'Description',
            'Contributors',
            'Assumptions',
            'Link',
          ],
          variableNames: [
            'name',
            'description',
            'contributors',
            'assumptions',
            'link',
          ],
          noButtonText: 'Cancel',
        },
      });

      dialogRef.afterClosed().subscribe((dialogResult) => {});
    });
  }
}
