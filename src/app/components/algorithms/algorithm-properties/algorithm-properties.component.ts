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
  TreeNode,
  ProblemTypeTreeComponent,
} from '../problem-type-tree/problem-type-tree.component';
import { Option } from '../../generics/property-input/select-input.component';
import {
  quantumComputationModelOptions,
  sketchOptions,
} from '../../../util/options';
import { LinkObject } from '../../generics/data-list/data-list.component';
import { UtilService } from '../../../util/util.service';
import { LatexEditorDialogComponent } from '../../generics/dialogs/latex-editor-dialog.component';

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
  @Input() frontendAlgorithm: EntityModelAlgorithmDto;
  @Input() linkedProblemTypes: EntityModelProblemTypeDto[];
  @Input() linkedApplicationAreas: EntityModelApplicationAreaDto[];

  @ViewChild('problemTypeTree')
  problemTypeTreeComponent: ProblemTypeTreeComponent;
  problemTypeTreeData: TreeNode[] = [];

  problemTypeLinkObject: LinkObject = {
    title: 'Link problem type with ',
    subtitle: 'Search problem type by name',
    displayVariable: 'name',
    data: [],
  };

  availableSketchOptions: Option[] = sketchOptions;
  availableQuantumComputationModelOptions: Option[] = quantumComputationModelOptions;

  computeResourceProperties: EntityModelComputeResourcePropertyDto[] = [];

  applicationAreaLinkObject: LinkObject = {
    title: 'Link application area with ',
    subtitle: 'Search application area by name',
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

  constructor(
    private algorithmService: AlgorithmService,
    private applicationAreaService: ApplicationAreasService,
    private problemTypeService: ProblemTypeService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.problemTypeLinkObject.title += this.algorithm.name;
    this.applicationAreaLinkObject.title += this.algorithm.name;
    this.fetchComputeResourceProperties();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.hasOwnProperty('linkedProblemTypes') &&
      this.linkedProblemTypes != null
    ) {
      this.problemTypeTreeData = [];
      this.createInitTreeData();
    }
  }

  createInitTreeData(): void {
    this.linkedProblemTypes.forEach((problemType) => {
      const node: TreeNode = {
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
      .getProblemTypeParentList({ problemTypeId: problemType.id })
      .subscribe(
        (parents) => {
          if (parents._embedded) {
            const parentProblemTypes = parents._embedded.problemTypes;
            let parentNodes: TreeNode[] = [];
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

  getParentsForNode(problemType: EntityModelProblemTypeDto): void {
    this.addParentTreeToProblemType(problemType);
  }

  buildProblemTypeParentTree(parents: EntityModelProblemTypeDto[]): TreeNode[] {
    parents.shift();
    const type = parents.pop();
    let parent: TreeNode[] = [
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
    // Search for unlinked problem types if search-text is not empty
    if (search) {
      this.problemTypeService.getProblemTypes({ search }).subscribe((data) => {
        this.updateLinkableProblemTypes(data._embedded);
      });
    } else {
      this.problemTypeLinkObject.data = [];
    }
  }

  updateLinkableProblemTypes(problemTypesData): void {
    // Clear list of linkable problem types
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

  onPropertyChanged(value: any, field: string): void {
    this.frontendAlgorithm[field] = value;
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

  addComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.algorithmService
      .createComputeResourcePropertyForAlgorithm({
        algorithmId: this.algorithm.id,
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
      .updateComputeResourcePropertyOfAlgorithm({
        algorithmId: this.algorithm.id,
        computeResourcePropertyId: property.id,
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
      .deleteComputeResourcePropertyOfAlgorithm({
        algorithmId: this.algorithm.id,
        computeResourcePropertyId: property.id,
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
      .getComputeResourcePropertiesOfAlgorithm({
        algorithmId: this.algorithm.id,
        size: -1,
      })
      .subscribe((e) => {
        if (e._embedded != null) {
          this.computeResourceProperties =
            e._embedded.computeResourceProperties;
        }
      });
  }

  openLatexEditor() {
    const doalogRef = this.utilService.createDialog(
      LatexEditorDialogComponent,
      {
        title: 'LaTeX Render Editor',
        inputText:
          // eslint-disable-next-line max-len
          '\\maketitle\n\\section{Test section}\nHello World!',
        latexPackages: ['\\title{Test doc}', '\\author{Ich}'],
        output: 'png',
      }
    );

    doalogRef.afterClosed().subscribe((dialogResult) => {
      console.log(dialogResult);
    });
  }
}
