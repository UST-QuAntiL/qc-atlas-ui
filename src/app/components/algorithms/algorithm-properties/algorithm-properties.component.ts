import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { EntityModelAlgorithmDto } from 'api-atlas/models/entity-model-algorithm-dto';
import {
  EntityModelApplicationAreaDto,
  EntityModelComputeResourcePropertyDto,
  EntityModelProblemTypeDto,
} from 'api-atlas/models';
import { ProblemTypeService } from 'api-atlas/services/problem-type.service';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { ApplicationAreasService } from 'api-atlas/services/application-areas.service';
import {
  FileNode,
  ProblemTypeTreeComponent,
} from '../problem-type-tree/problem-type-tree.component';
import { Option } from '../../generics/property-input/select-input.component';
import { AddProblemTypeDialogComponent } from '../dialogs/add-problem-type-dialog.component';
import { RemoveProblemTypeDialogComponent } from '../dialogs/remove-problem-type-dialog.component';
import { UtilService } from '../../../util/util.service';
import {
  quantumComputationModelOptions,
  sketchOptions,
} from '../../../util/options';
import { LinkObject } from '../../generics/data-list/data-list.component';

@Component({
  selector: 'app-algorithm-properties',
  templateUrl: './algorithm-properties.component.html',
  styleUrls: ['./algorithm-properties.component.scss'],
})
export class AlgorithmPropertiesComponent implements OnInit, OnChanges {
  @Output() addApplicationArea: EventEmitter<
    EntityModelApplicationAreaDto
  > = new EventEmitter<EntityModelApplicationAreaDto>();
  @Output() removeApplicationArea: EventEmitter<
    EntityModelApplicationAreaDto
  > = new EventEmitter<EntityModelApplicationAreaDto>();
  @Output() addProblemType: EventEmitter<
    EntityModelProblemTypeDto
  > = new EventEmitter<EntityModelProblemTypeDto>();
  @Output() removeProblemType: EventEmitter<
    EntityModelProblemTypeDto[]
  > = new EventEmitter<EntityModelProblemTypeDto[]>();
  @Output() updateAlgorithmField: EventEmitter<{
    field;
    value;
  }> = new EventEmitter<{ field; value }>();

  @Input() algorithm: EntityModelAlgorithmDto;
  @Input() linkedApplicationAreas: EntityModelApplicationAreaDto[];
  @Input() problemTypes: EntityModelProblemTypeDto[];

  @ViewChild('problemTypeTree')
  problemTypeTreeComponent: ProblemTypeTreeComponent;

  availableSketchOptions: Option[] = sketchOptions;
  availableQuantumComputationModelOptions: Option[] = quantumComputationModelOptions;

  computeResourceProperties: EntityModelComputeResourcePropertyDto[] = [];

  applicationAreaLinkObject: LinkObject = {
    title: 'Link application area with ',
    subtitle: 'Search application area by name',
    displayVariable: 'name',
    data: [],
  };

  problemTypeTreeData: FileNode[] = [];

  constructor(
    private algorithmService: AlgorithmService,
    private applicationAreaService: ApplicationAreasService,
    private problemTypeService: ProblemTypeService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.applicationAreaLinkObject.title += this.algorithm.name;
    this.fetchComputeResourceProperties();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('problemTypes') && this.problemTypes != null) {
      this.problemTypeTreeData = [];
      this.createInitTreeData();
    }
  }

  createInitTreeData(): void {
    this.problemTypes.forEach((problemType) => {
      const node: FileNode = {
        problemType,
        parents: [],
        hasParents: problemType.parentProblemType != null,
        isLowestLevelNode: true,
      };
      this.problemTypeTreeData.push(node);
      this.problemTypeTreeData = this.problemTypeTreeData.slice();
    });
  }

  addParentTreeToProblemType(problemType: EntityModelProblemTypeDto): void {
    this.problemTypeService
      .getProblemTypeParentList({ id: problemType.id })
      .subscribe(
        (parents) => {
          if (parents._embedded) {
            const parentProblemTypes = parents._embedded.problemTypes;
            let parentNodes: FileNode[] = [];
            if (parentProblemTypes.length > 1) {
              parentNodes = this.buildProblemTypeParentTree(parentProblemTypes);
            }
            const problemTypeNode = this.problemTypeTreeData.find(
              (node) => node.problemType.id === problemType.id
            );
            const index = this.problemTypeTreeData.indexOf(problemTypeNode);
            this.problemTypeTreeData[index] = {
              problemType,
              parents: parentNodes,
              hasParents: true,
              isLowestLevelNode: true,
            };
            this.problemTypeTreeData = this.problemTypeTreeData.slice();
            this.problemTypeTreeComponent.nestedTreeControl.expand(
              this.problemTypeTreeData[index]
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  buildProblemTypeParentTree(parents: EntityModelProblemTypeDto[]): FileNode[] {
    parents.shift();
    const type = parents.pop();
    let parent: FileNode[] = [
      {
        problemType: type,
        parents: [],
        hasParents: type.parentProblemType != null,
        isLowestLevelNode: false,
      },
    ];
    parents.reverse().forEach((problemType) => {
      parent = [
        {
          problemType,
          parents: parent,
          hasParents: problemType.parentProblemType != null,
          isLowestLevelNode: false,
        },
      ];
    });
    return parent;
  }

  onChangesSaved(value: any, field: string): void {
    this.updateAlgorithmField.emit({ field, value });
  }

  addApplicationAreaEvent(
    applicationArea: EntityModelApplicationAreaDto
  ): void {
    this.addApplicationArea.emit(applicationArea);
  }

  searchUnlinkedApplicationAreas(search: string): void {
    // Search for unlinked algorithms if search-text is not empty
    if (search) {
      this.applicationAreaService
        .getApplicationAreas({ search })
        .subscribe((data) => {
          this.updateLinkableApplicationAreas(data._embedded);
        });
    } else {
      this.applicationAreaLinkObject.data = [];
    }
  }

  updateLinkableApplicationAreas(applicationAreasData): void {
    // Clear list of linkable algorithms
    this.applicationAreaLinkObject.data = [];
    // If linkable algorithms found
    if (applicationAreasData) {
      // Search algorithms and filter only those that are not already linked
      for (const applicationArea of applicationAreasData.applicationAreas) {
        if (
          !this.linkedApplicationAreas.some(
            (applArea) => applArea.id === applicationArea.id
          )
        ) {
          this.applicationAreaLinkObject.data.push(applicationArea);
        }
      }
    }
  }

  removeApplicationAreaEvent(applicationArea: any): void {
    this.removeApplicationArea.emit(applicationArea);
  }

  getParentsForNode(problemType: EntityModelProblemTypeDto): void {
    this.addParentTreeToProblemType(problemType);
  }

  addProblemTypeEvent(): void {
    this.utilService
      .createDialog(AddProblemTypeDialogComponent, {
        title: 'Add new problem type',
        usedProblemTypes: this.problemTypes,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const problemTypeDto: EntityModelProblemTypeDto = {
            name: dialogResult.name,
          };
          if (
            dialogResult.parentProblemType != null &&
            dialogResult.parentProblemType.id != null
          ) {
            problemTypeDto.parentProblemType =
              dialogResult.parentProblemType.id;
          }

          this.addProblemType.emit(problemTypeDto);
        }
      });
  }

  removeProblemTypeEvent(): void {
    this.utilService
      .createDialog(RemoveProblemTypeDialogComponent, {
        title: 'Remove problem types',
        existingProblemTypes: this.problemTypes,
        selectedProblemTypes: [],
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.removeProblemType.emit(dialogResult.selectedProblemTypes);
        }
      });
  }

  addComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    console.log('add compute resource property');
    console.log(property);
    this.algorithmService
      .addComputingResource({
        algoId: this.algorithm.id,
        body: property,
      })
      .subscribe((e) => {
        this.fetchComputeResourceProperties();
      });
  }

  updateComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.algorithmService
      .updateComputingResource({
        algoId: this.algorithm.id,
        resourceId: property.id,
        body: property,
      })
      .subscribe((e) => {
        this.fetchComputeResourceProperties();
      });
  }

  deleteComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.algorithmService
      .deleteComputingResource({
        algoId: this.algorithm.id,
        resourceId: property.id,
      })
      .subscribe((e) => {
        this.computeResourceProperties = this.computeResourceProperties.filter(
          (elem: EntityModelComputeResourcePropertyDto) =>
            elem.id !== property.id
        );
        this.fetchComputeResourceProperties();
      });
  }

  fetchComputeResourceProperties(): void {
    this.algorithmService
      .getComputingResourcesByAlgorithm({
        algoId: this.algorithm.id,
        size: -1,
      })
      .subscribe((e) => {
        if (e._embedded != null) {
          this.computeResourceProperties =
            e._embedded.computeResourceProperties;
        }
      });
  }
}
