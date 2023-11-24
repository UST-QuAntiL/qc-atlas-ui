import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileDto } from 'api-atlas/models/file-dto';
import { ConcreteSolutionService } from 'generated/api-atlas/services/concrete-solution.service';
import { UtilService } from '../../../util/util.service';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { PagingInfo } from '../../../util/PagingInfo';

@Component({
  selector: 'app-concrete-solution-view',
  templateUrl: './concrete-solution-view.component.html',
})
export class ConcreteSolutionViewComponent implements OnInit {
  file: FileDto;
  tableColumns = ['Name'];
  variableNames = ['name'];
  pagingInfo: PagingInfo<FileDto> = {};
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

  getAttachedFile(): void {
    this.concreteSolutionService.getAttachedFile().subscribe(
      (data) => {
        // console.log('API response:', data);
        // console.log('File bevor:', this.file);
        this.loading = false;
        this.file = data;
        // console.log('File after:', this.file);
      },
      () => {
        this.loading = false;
        this.utilService.callSnackBar('Error! File could not be retrieved.');
      }
    );
  }
}
