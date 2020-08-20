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
import { EntityModelProblemTypeDto } from 'generated/api-atlas/models/entity-model-problem-type-dto';

export class FileNode {
  problemType: EntityModelProblemTypeDto;
  parents?: FileNode[];
  hasParents: boolean;
  isLowestLevelNode: boolean;
}

@Component({
  selector: 'app-problem-type-tree',
  templateUrl: './problem-type-tree.component.html',
  styleUrls: ['./problem-type-tree.component.scss'],
})
export class ProblemTypeTreeComponent implements OnInit, OnChanges {
  @Output() onAddElement: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveElement: EventEmitter<any> = new EventEmitter<any>();
  @Output() onExpandParents: EventEmitter<
    EntityModelProblemTypeDto
  > = new EventEmitter<EntityModelProblemTypeDto>();

  @Input() name = '';
  @Input() treeData: FileNode[];

  nestedTreeControl: NestedTreeControl<FileNode> = new NestedTreeControl<
    FileNode
  >((node) => node.parents);
  nestedDataSource: MatTreeNestedDataSource<
    FileNode
  > = new MatTreeNestedDataSource<FileNode>();
  dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);

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

  addElement(): void {
    this.onAddElement.emit();
  }

  removeElement(): void {
    this.onRemoveElement.emit();
  }

  expandNode(node: FileNode): void {
    if (
      node.isLowestLevelNode &&
      this.nestedTreeControl.isExpanded(node) &&
      node.parents.length < 1
    ) {
      this.onExpandParents.emit(node.problemType);
    }
  }

  hasNestedChild = (_: number, nodeData: FileNode): boolean =>
    nodeData.hasParents;
}
