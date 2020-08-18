// eslint-disable-next-line max-classes-per-file
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { EntityModelProblemTypeDto } from 'generated/api/models/entity-model-problem-type-dto';
import { LinkObject } from '../../generics/data-list/data-list.component';

export class TreeNode {
  problemType: EntityModelProblemTypeDto;
  parents?: TreeNode[];
  hasParents: boolean;
  isLowestLevelNode: boolean;
}

@Component({
  selector: 'app-problem-type-tree',
  templateUrl: './problem-type-tree.component.html',
  styleUrls: ['./problem-type-tree.component.scss'],
})
export class ProblemTypeTreeComponent implements OnInit, OnChanges {
  @Output() onAddElement: EventEmitter<
    EntityModelProblemTypeDto
  > = new EventEmitter<EntityModelProblemTypeDto>();
  @Output() onRemoveElement: EventEmitter<
    EntityModelProblemTypeDto
  > = new EventEmitter<EntityModelProblemTypeDto>();
  @Output() onExpandParents: EventEmitter<
    EntityModelProblemTypeDto
  > = new EventEmitter<EntityModelProblemTypeDto>();
  @Output() onSearchTextChanged: EventEmitter<string> = new EventEmitter<
    string
  >();

  @Input() title = '';
  @Input() treeData: TreeNode[];
  @Input() linkObject: LinkObject;
  @Input() allowDelete = false;
  @Input() deleteIcon = 'delete';

  inputValue = '';

  nestedTreeControl: NestedTreeControl<TreeNode> = new NestedTreeControl<
    TreeNode
  >((node) => node.parents);
  nestedDataSource: MatTreeNestedDataSource<
    TreeNode
  > = new MatTreeNestedDataSource<TreeNode>();
  dataChange: BehaviorSubject<TreeNode[]> = new BehaviorSubject<TreeNode[]>([]);

  constructor() {}

  ngOnInit(): void {
    this.dataChange.subscribe((data) => (this.nestedDataSource.data = data));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('treeData')) {
      this.dataChange.next(this.treeData);
    }
  }

  isTreeDataInvalid(): boolean {
    return this.treeData == null || this.treeData.length < 1;
  }

  expandNode(node: TreeNode): void {
    if (
      node.isLowestLevelNode &&
      this.nestedTreeControl.isExpanded(node) &&
      node.parents.length < 1
    ) {
      this.onExpandParents.emit(node.problemType);
    }
  }

  hasNestedChild = (_: number, nodeData: TreeNode): boolean =>
    nodeData.hasParents;

  onSingleDelete(element: TreeNode) {
    this.onRemoveElement.emit(element.problemType);
  }
}
