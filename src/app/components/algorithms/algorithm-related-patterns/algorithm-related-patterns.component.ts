import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmDto } from 'api/models/algorithm-dto';
import { EntityModelPatternRelationDto } from 'api/models/entity-model-pattern-relation-dto';
import { MatDialog } from '@angular/material/dialog';
import { AddPatternRelationDialogComponent } from '../dialogs/add-pattern-relation-dialog.component';

@Component({
  selector: 'app-algorithm-related-patterns',
  templateUrl: './algorithm-related-patterns.component.html',
  styleUrls: ['./algorithm-related-patterns.component.scss'],
})
export class AlgorithmRelatedPatternsComponent implements OnInit {
  @Input() algorithm: AlgorithmDto;

  patternRelations: EntityModelPatternRelationDto[];
  variableNames: string[] = [
    'description',
    'pattern',
    'patternRelationType.name',
  ];
  tableColumns: string[] = ['Description', 'Link', 'Relation Type']; // 'Name', 'Type', 'Relation'
  externalLinkVariables: string[] = ['pattern'];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.algorithm);
  }

  onAddElement(): void {
    const dialogRef = this.dialog.open(AddPatternRelationDialogComponent, {
      width: '400px',
      data: { title: 'Add new pattern relation', algoId: this.algorithm.id },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        console.log(dialogResult);
      }
    });
  }

  onDeleteElements(event): void {}

  onDatalistConfigChanged(event): void {}

  onElementClicked(event): void {}
}
