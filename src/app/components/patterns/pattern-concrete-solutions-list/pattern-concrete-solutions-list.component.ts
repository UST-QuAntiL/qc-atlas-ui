import { Component, Input, OnInit } from '@angular/core';
import { PatternDto } from 'api-atlas/models/pattern-dto';
import { Router } from '@angular/router';
import { PatternService } from 'api-atlas/services/pattern.service';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { forkJoin, Observable } from 'rxjs';
import { ConcreteSolutionService } from 'api-atlas/services/concrete-solution.service';
import { PageImplementationDto } from 'api-atlas/models/page-implementation-dto';
import {
  LinkObject,
  QueryParams,
} from '../../generics/data-list/data-list.component';
import { DialogData } from '../../generics/dialogs/link-item-list-dialog.component';
import { UtilService } from '../../../util/util.service';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { PagingInfo } from '../../../util/PagingInfo';

@Component({
  selector: 'app-pattern-concrete-solutions-list',
  templateUrl: './pattern-concrete-solutions-list.component.html',
  styleUrls: ['./pattern-concrete-solutions-list.component.scss'],
})
export class PatternConcreteSolutionsListComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
