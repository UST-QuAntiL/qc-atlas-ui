import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmDto } from 'api/models/algorithm-dto';
import { EntityModelAlgorithmRelationDto } from 'api/models/entity-model-algorithm-relation-dto';
import { EntityModelPatternRelationDto } from 'api/models/entity-model-pattern-relation-dto';

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

  constructor() {}

  ngOnInit(): void {
    console.log(this.algorithm);
  }

  onAddElement(): void {}

  onDeleteElements(event): void {}

  onDatalistConfigChanged(event): void {}

  onElementClicked(event): void {}
}
