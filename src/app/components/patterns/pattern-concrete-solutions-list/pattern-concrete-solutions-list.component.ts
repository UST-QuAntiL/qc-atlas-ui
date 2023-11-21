import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ConcreteSolutionDto } from 'generated/api-atlas/models/concrete-solution-dto';
import { ConcreteSolutionService } from 'generated/api-atlas/services/concrete-solution.service';
import { UtilService } from '../../../util/util.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { PagingInfo } from '../../../util/PagingInfo';
import { QueryParams } from '../../generics/data-list/data-list.component';

@Component({
  selector: 'app-pattern-concrete-solutions-list',
  templateUrl: './pattern-concrete-solutions-list.component.html',
  styleUrls: ['./pattern-concrete-solutions-list.component.scss'],
})
export class PatternConcreteSolutionListComponent implements OnInit {
  @Input() patternConcreteSolutions: ConcreteSolutionDto[];
  tableColumns = [
    'ID',
    'Name',
    'Qubit Count',
    'Header',
    'Measurement',
    'Start Pattern',
    'End Pattern',
  ];
  variableNames = [
    'id',
    'name',
    'qubitCount',
    'hasHeader',
    'hasMeasurment',
    'startPattern',
    'endPattern',
  ];
  pagingInfo: PagingInfo<ConcreteSolutionDto> = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };
  loading = true;

  constructor(
    private concreteSolutionService: ConcreteSolutionService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getPatternConcreteSolutions(params: QueryParams): void {
    this.concreteSolutionService.getPatternConcreteSolutions(params).subscribe(
      (data) => {
        this.preparePatternConcreteSolutionsData(data);
      },
      () => {
        this.utilService.callSnackBar(
          'Error! Concrete Solutions could not be retrieved.'
        );
      }
    );
  }

  preparePatternConcreteSolutionsData(data): void {
    // Read all incoming data
    if (data.content) {
      this.patternConcreteSolutions = data.content;
    } else {
      // If no content, set to empty array
      this.patternConcreteSolutions = [];
    }

    this.pagingInfo.totalPages = data.totalPages;
    this.pagingInfo.number = data.number;
    this.pagingInfo.sort = data.sort;
  }

  onElementClicked(concreteSolution: ConcreteSolutionDto): void {
    this.router.navigate(['concrete-solutions', concreteSolution.id]);
  }
}
