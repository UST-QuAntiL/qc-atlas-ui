import { Component, Input, OnInit } from '@angular/core';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import { AlgorithmService } from 'api/services/algorithm.service';
import { EntityModelAlgorithmRelationDto } from 'api/models/entity-model-algorithm-relation-dto';

@Component({
  selector: 'app-algorithm-related-algos-list',
  templateUrl: './algorithm-related-algos-list.component.html',
  styleUrls: ['./algorithm-related-algos-list.component.scss'],
})
export class AlgorithmRelatedAlgosListComponent implements OnInit {
  @Input() algorithm: EntityModelAlgorithmDto;

  algorithmRelations: EntityModelAlgorithmRelationDto[];
  variableNames: string[] = [];
  tableColumns: string[] = []; // 'Name', 'Type', 'Relation'
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(private algorithmService: AlgorithmService) {}

  ngOnInit(): void {
    this.algorithmService
      .getAlgorithmRelations({ algoId: this.algorithm.id })
      .subscribe(
        (relations) => {
          if (relations._embedded) {
            this.algorithmRelations = relations._embedded.algorithmRelations;
          } else {
            this.algorithmRelations = [];
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onAddElement(): void {}

  onDeleteElements(event): void {}

  onDatalistConfigChanged(event): void {}

  onPageChanged(event): void {}

  onElementClicked(event): void {}
}
