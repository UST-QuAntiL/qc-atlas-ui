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
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import {
  EntityModelApplicationAreaDto,
  EntityModelComputingResourcePropertyDto,
  EntityModelProblemTypeDto,
} from 'api/models';
import { ProblemTypeService } from 'api/services/problem-type.service';
import { AlgorithmService } from 'api/services/algorithm.service';
import {
  FileNode,
  ProblemTypeTreeComponent,
} from '../problem-type-tree/problem-type-tree.component';
import { Option } from '../../generics/property-input/select-input.component';
import { AddProblemTypeDialogComponent } from '../dialogs/add-problem-type-dialog.component';
import { RemoveProblemTypeDialogComponent } from '../dialogs/remove-problem-type-dialog.component';
import { UtilService } from '../../../util/util.service';
import { LinkObject } from '../../generics/data-list/data-list.component';

@Component({
  selector: 'app-algorithm-properties',
  templateUrl: './algorithm-properties.component.html',
  styleUrls: ['./algorithm-properties.component.scss'],
})
export class AlgorithmPropertiesComponent implements OnInit, OnChanges {
  @Output() addApplicationArea: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Output() removeApplicationArea: EventEmitter<
    EntityModelApplicationAreaDto
  > = new EventEmitter<EntityModelApplicationAreaDto>();
  @Output() onAddProblemType: EventEmitter<
    EntityModelProblemTypeDto
  > = new EventEmitter<EntityModelProblemTypeDto>();
  @Output() onRemoveProblemType: EventEmitter<
    EntityModelProblemTypeDto
  > = new EventEmitter<EntityModelProblemTypeDto>();
  @Output() updateAlgorithmField: EventEmitter<{
    field;
    value;
  }> = new EventEmitter<{ field; value }>();

  @Input() algorithm: EntityModelAlgorithmDto;
  @Input() applicationAreas: EntityModelApplicationAreaDto[];
  @Input() linkedProblemTypes: EntityModelProblemTypeDto[];

  @ViewChild('problemTypeTree')
  problemTypeTreeComponent: ProblemTypeTreeComponent;
  problemTypeTreeData: FileNode[] = [];

  problemTypeLinkObject: LinkObject = {
    title: 'Link problem type with ',
    subtitle: 'Search problem type by name',
    displayVariable: 'name',
    data: [],
  };

  sketchOptions: Option[] = [
    { value: 'PSEUDOCODE', label: 'Pseudocode' },
    { value: 'CIRCUIT', label: 'Circuit' },
    { value: 'ISING_MODEL', label: 'Ising model' },
  ];
  quantumComputationModelOptions: Option[] = [
    { value: 'GATE_BASED', label: 'Gate based' },
    { value: 'MEASUREMENT_BASED', label: 'Measurement based' },
    { value: 'QUANTUM_ANNEALING', label: 'Quantum Annealing' },
  ];
  computeResourceProperties: EntityModelComputingResourcePropertyDto[] = [];

  constructor(
    private algorithmService: AlgorithmService,
    private problemTypeService: ProblemTypeService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.problemTypeLinkObject.title += this.algorithm.name;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.hasOwnProperty('problemTypes') &&
      this.linkedProblemTypes != null
    ) {
      this.problemTypeTreeData = [];
      this.createInitTreeData();
    }
  }

  createInitTreeData(): void {
    this.linkedProblemTypes.forEach((problemType) => {
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

  searchUnlinkedProblemTypes(search: string): void {
    // Search for unlinked algorithms if search-text is not empty
    if (search) {
      this.problemTypeService.getProblemTypes({ search }).subscribe((data) => {
        this.updateLinkableApplicationAreas(data._embedded);
      });
    } else {
      this.problemTypeLinkObject.data = [];
    }
  }

  updateLinkableApplicationAreas(problemTypesData): void {
    // Clear list of linkable algorithms
    this.problemTypeLinkObject.data = [];
    // If linkable algorithms found
    if (problemTypesData) {
      // Search algorithms and filter only those that are not already linked
      for (const problemType of problemTypesData.problemTypes) {
        if (
          !this.linkedProblemTypes.some(
            (probType) => probType.id === problemType.id
          )
        ) {
          this.problemTypeLinkObject.data.push(problemType);
        }
      }
    }
  }

  onChangesSaved(value: any, field: string): void {
    this.updateAlgorithmField.emit({ field, value });
  }

  addApplicationAreaEvent(applicationArea: string): void {
    this.addApplicationArea.emit(applicationArea);
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
        usedProblemTypes: this.linkedProblemTypes,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          let problemTypeDto: EntityModelProblemTypeDto = {
            name: dialogResult.name,
          };
          if (
            dialogResult.parentProblemType != null &&
            dialogResult.parentProblemType.id != null
          ) {
            problemTypeDto.parentProblemType =
              dialogResult.parentProblemType.id;
          }
          if (dialogResult.selectedProblemType != null) {
            problemTypeDto = dialogResult.selectedProblemType;
          }
          this.onAddProblemType.emit(problemTypeDto);
        }
      });
  }

  removeProblemTypeEvent(): void {
    this.utilService
      .createDialog(RemoveProblemTypeDialogComponent, {
        title: 'Remove problem types',
        existingProblemTypes: this.linkedProblemTypes,
        selectedProblemTypes: [],
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.onRemoveProblemType.emit(dialogResult.selectedProblemTypes);
        }
      });
  }

  addComputeResourceProperty(
    property: EntityModelComputingResourcePropertyDto
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
    property: EntityModelComputingResourcePropertyDto
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
    property: EntityModelComputingResourcePropertyDto
  ): void {
    this.algorithmService
      .deleteComputingResource({
        algoId: this.algorithm.id,
        resourceId: property.id,
      })
      .subscribe((e) => {
        this.computeResourceProperties = this.computeResourceProperties.filter(
          (elem: EntityModelComputingResourcePropertyDto) =>
            elem.id !== property.id
        );
        this.fetchComputeResourceProperties();
      });
  }

  fetchComputeResourceProperties(): void {
    this.algorithmService
      .getComputingResourcesByAlgorithm({
        algoId: this.algorithm.id,
      })
      .subscribe((e) => {
        if (e._embedded != null) {
          this.computeResourceProperties =
            e._embedded.computingResourceProperties;
        }
      });
  }
}
