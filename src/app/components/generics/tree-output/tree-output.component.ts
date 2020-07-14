// eslint-disable-next-line max-classes-per-file
import { Component, Input, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, of as observableOf } from 'rxjs';
import { EntityModelProblemTypeDto } from 'api/models/entity-model-problem-type-dto';

export class FileNode {
  parents: FileNode[];
  problemType: EntityModelProblemTypeDto;
}

@Component({
  selector: 'app-tree-output',
  templateUrl: './tree-output.component.html',
  styleUrls: ['./tree-output.component.scss'],
})
export class TreeOutputComponent implements OnInit {
  @Input() name = '';
  @Input() treeData: FileNode[];

  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);

  constructor() {}

  ngOnInit(): void {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this.getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.dataChange.subscribe((data) => (this.nestedDataSource.data = data));
    if (this.treeData == null) {
      this.treeData = [
        {
          parents: [],
          problemType: { name: 'default problem type' },
        },
      ];
    }

    this.dataChange.next(this.treeData);
  }

  getChildren = (node: FileNode) => observableOf(node.parents);

  hasNestedChild = (_: number, nodeData: FileNode) =>
    nodeData.parents.length > 0;
}
