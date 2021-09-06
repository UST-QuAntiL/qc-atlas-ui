import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComputeResourcePropertyDto } from 'api-atlas/models/compute-resource-property-dto';
import {
  EditComputeResourcePropertyDialogComponent,
  EditComputeResourcePropertyDialogData,
} from '../dialogs/edit-compute-resource-property-dialog.component';
import { UtilService } from '../../../util/util.service';
import {
  QcAtlasUiConfiguration,
  QcAtlasUiRepositoryConfigurationService,
  UiFeatures,
} from '../../../directives/qc-atlas-ui-repository-configuration.service';

@Component({
  selector: 'app-compute-resource-property-list',
  templateUrl: './compute-resource-property-list.component.html',
  styleUrls: ['./compute-resource-property-list.component.scss'],
})
export class ComputeResourcePropertyListComponent implements OnInit {
  @Input() title: string;
  @Input()
  resourceProperties: ComputeResourcePropertyDto[] = [];

  @Output()
  addProperty: EventEmitter<ComputeResourcePropertyDto> = new EventEmitter<
    ComputeResourcePropertyDto
  >();
  @Output()
  deleteProperty: EventEmitter<ComputeResourcePropertyDto> = new EventEmitter<
    ComputeResourcePropertyDto
  >();
  @Output()
  updateProperty: EventEmitter<ComputeResourcePropertyDto> = new EventEmitter<
    ComputeResourcePropertyDto
  >();

  hoveredEntry = '';

  readonly UiFeatures = UiFeatures;
  uiConfig: QcAtlasUiConfiguration;

  constructor(
    private utilService: UtilService,
    private configService: QcAtlasUiRepositoryConfigurationService
  ) {}

  ngOnInit(): void {
    this.uiConfig = this.configService.configuration;
  }

  onAdd(): void {
    this.showEditDialog(
      null,
      'Create Computing Resource Property',
      this.addProperty
    );
  }

  onDelete(element: ComputeResourcePropertyDto): void {
    this.deleteProperty.emit(element);
  }

  onEdit(element: ComputeResourcePropertyDto): void {
    this.showEditDialog(
      element,
      'Edit Computing Resource Property',
      this.updateProperty
    );
  }

  showEditDialog(
    element: ComputeResourcePropertyDto,
    dialogTitle: string,
    emmiter: EventEmitter<ComputeResourcePropertyDto>
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
      .subscribe((dialogResult: ComputeResourcePropertyDto) => {
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
