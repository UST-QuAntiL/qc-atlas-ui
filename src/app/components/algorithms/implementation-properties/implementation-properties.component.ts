import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { EntityModelComputeResourcePropertyDto } from 'api-atlas/models/entity-model-compute-resource-property-dto';
import { EntityModelRevisionDto } from 'api-atlas/models/entity-model-revision-dto';
import { ImplementationsService } from 'api-atlas/services/implementations.service';
import { QueryParams } from '../../generics/data-list/data-list.component';
import { GenericDataService } from '../../../util/generic-data.service';
import { UtilService } from '../../../util/util.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-implementation-properties',
  templateUrl: './implementation-properties.component.html',
  styleUrls: ['./implementation-properties.component.scss'],
})
export class ImplementationPropertiesComponent implements OnInit, OnChanges {
  @Input() implementation: ImplementationDto;
  @Input() frontendImplementation: ImplementationDto;
  @Input()
  computeResourceProperties: EntityModelComputeResourcePropertyDto[] = [];
  @Output() addComputeResourceProperty: EventEmitter<
    EntityModelComputeResourcePropertyDto
  > = new EventEmitter<EntityModelComputeResourcePropertyDto>();
  @Output() deleteComputeResourceProperty: EventEmitter<
    EntityModelComputeResourcePropertyDto
  > = new EventEmitter<EntityModelComputeResourcePropertyDto>();
  @Output() updateComputeResourceProperty: EventEmitter<
    EntityModelComputeResourcePropertyDto
  > = new EventEmitter<EntityModelComputeResourcePropertyDto>();
  @Output() updateImplementationField: EventEmitter<{
    field;
    value;
  }> = new EventEmitter<{ field; value }>();
  @Output() onRevisionClicked: EventEmitter<
    EntityModelRevisionDto
  > = new EventEmitter<EntityModelRevisionDto>();

  revisions: any[] = [];
  tableColumns = ['Id', 'Date'];
  variableNames = ['id', 'creationDate'];
  pagingInfo: any = {};
  lastParams: any;
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };
  constructor(
    private implementationService: ImplementationsService,
    private genericDataService: GenericDataService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchRevisions(this.lastParams);
  }

  onChangesSaved(value: any, field: string): void {
    this.updateImplementationField.emit({ field, value });
  }

  onPropertyChanged(value: any, field: string): void {
    this.frontendImplementation[field] = value;
  }

  onAddComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.addComputeResourceProperty.emit(property);
  }
  onDeleteComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.deleteComputeResourceProperty.emit(property);
  }
  onUpdateComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.updateComputeResourceProperty.emit(property);
  }

  fetchRevisions(params: QueryParams): void {
    this.lastParams = params;
    this.implementationService
      .getImplementationRevisions({
        implementationId: this.implementation.id,
        page: params.page,
        size: params.size,
      })
      .subscribe((data) => {
        this.prepareRevisionData(data);
      });
  }

  onElementClicked(revision: any): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Loading Revision',
      message:
        'You are about to load an implementation revision. Do you want to continue? ',
      yesButtonText: 'yes',
      noButtonText: 'no',
    };
    const dialogRef = this.utilService.createDialog(
      ConfirmDialogComponent,
      dialogData
    );
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.onRevisionClicked.emit(revision);
      }
    });
  }

  getRevisionsHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareRevisionData(data);
    });
  }

  prepareRevisionData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.revisions = data._embedded.revisions;
    } else {
      this.revisions = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }
}
