import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProblemTypeService } from 'api/services/problem-type.service';
import { ProblemTypeDto } from 'api/models/problem-type-dto';
import { GenericDataService } from '../../../util/generic-data.service';
import { AddProblemTypeDialogComponent } from '../../algorithms/dialogs/add-problem-type-dialog.component';

@Component({
  selector: 'app-problem-types-list',
  templateUrl: './problem-types-list.component.html',
  styleUrls: ['./problem-types-list.component.scss'],
})
export class ProblemTypesListComponent implements OnInit {
  problemTypes: any[] = [];
  tableColumns = ['Name', 'Parent'];
  variableNames = ['name', 'parent'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private problemTypeService: ProblemTypeService,
    private genericDataService: GenericDataService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getProblemTypes(params: any): void {
    this.problemTypeService.getProblemTypes(params).subscribe((data) => {
      this.prepareProblemTypeData(JSON.parse(JSON.stringify(data)));
    });
  }

  getProblemTypesHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareProblemTypeData(data);
    });
  }

  prepareProblemTypeData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.problemTypes = data._embedded.problemTypes;
    } else {
      this.problemTypes = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  onElementClicked(problemType: any): void {
    console.log(problemType);
    this.router.navigate(['problem-types', problemType.id]);
  }

  onAddElement(): void {
    const params: any = {};
    const dialogRef = this.dialog.open(AddProblemTypeDialogComponent, {
      width: '400px',
      data: { title: 'Add new problem type' },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const problemTypeDto: any = {
          name: dialogResult.name,
        };
        if (
          dialogResult.parentProblemType != null &&
          dialogResult.parentProblemType.id != null
        ) {
          problemTypeDto.parentProblemType = dialogResult.parentProblemType.id;
        }

        params.body = problemTypeDto as ProblemTypeDto;

        this.problemTypeService.createProblemType(params).subscribe((data) => {
          this.router.navigate(['problem-types', data.id]);
        });
      }
    });
  }

  onDeleteElements(event): void {
    // Iterate all selected algorithms and delete them
    for (const problemType of event.elements) {
      this.problemTypeService
        .deleteProblemType(this.generateDeleteParams(problemType.id))
        .subscribe(() => {
          // Refresh Problem Types after delete
          this.getProblemTypes(event.queryParams);
        });
    }
  }

  generateDeleteParams(problemTypeId: string): any {
    const params: any = {};
    params.id = problemTypeId;
    return params;
  }
}
