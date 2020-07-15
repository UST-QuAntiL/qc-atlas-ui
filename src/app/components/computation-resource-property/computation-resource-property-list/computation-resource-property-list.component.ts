import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityModelComputingResourcePropertyDto } from 'api/models/entity-model-computing-resource-property-dto';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import {
  EditComputeResourcePropertyDialogComponent,
  EditComputeResourcePropertyDialogData,
} from '../dialogs/edit-compute-resource-property-dialog.component';
import { UtilService } from '../../../util/util.service';

@Component({
  selector: 'app-computation-resource-property-list',
  templateUrl: './computation-resource-property-list.component.html',
  styleUrls: ['./computation-resource-property-list.component.scss'],
})
export class ComputationResourcePropertyListComponent implements OnInit {
  @Input()
  resourceProperties: EntityModelComputingResourcePropertyDto[] = [];

  @Output()
  addProperty: EventEmitter<
    EntityModelComputingResourcePropertyDto
  > = new EventEmitter<EntityModelComputingResourcePropertyDto>();
  @Output()
  deleteProperty: EventEmitter<
    EntityModelComputingResourcePropertyDto
  > = new EventEmitter<EntityModelComputingResourcePropertyDto>();
  @Output()
  updateProperty: EventEmitter<
    EntityModelComputingResourcePropertyDto
  > = new EventEmitter<EntityModelComputingResourcePropertyDto>();

  hoveredEntry = '';

  constructor(private utilService: UtilService) {}

  ngOnInit(): void {}

  onAdd(): void {
    this.showEditDialog(
      null,
      'Create Computing Resource Property',
      this.addProperty
    );
  }

  onDelete(element: EntityModelComputingResourcePropertyDto): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Delete',
      message: 'Do you really want to delete this compute resource property?',
      yesButtonText: 'Yes',
      noButtonText: 'No',
    };
    const dialogRef = this.utilService.createDialog(
      ConfirmDialogComponent,
      dialogData
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult != null) {
        this.deleteProperty.emit(element);
      }
    });
  }

  onEdit(element: EntityModelComputingResourcePropertyDto): void {
    this.showEditDialog(
      element,
      'Edit Computing Resource Property',
      this.updateProperty
    );
  }

  showEditDialog(
    element: EntityModelComputingResourcePropertyDto,
    dialogTitle: string,
    emmiter: EventEmitter<EntityModelComputingResourcePropertyDto>
  ): void {
    const dialogData: EditComputeResourcePropertyDialogData = {
      title: dialogTitle,
      entity: element,
    };
    const dialogRef = this.utilService.createDialog(
      EditComputeResourcePropertyDialogComponent,
      dialogData
    );

    dialogRef
      .afterClosed()
      .subscribe((dialogResult: EntityModelComputingResourcePropertyDto) => {
        if (dialogResult != null) {
          emmiter.emit(dialogResult);
        }
      });
  }

  onHover(id: string): void {
    this.hoveredEntry = id;
  }

  isHovered(id: string): boolean {
    return this.hoveredEntry === id;
  }

  clearHover(): void {
    this.hoveredEntry = '';
  }
}
