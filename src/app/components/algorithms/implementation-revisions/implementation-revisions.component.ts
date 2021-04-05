import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ImplementationsService } from 'api-atlas/services/implementations.service';
import { EntityModelRevisionDto } from 'api-atlas/models/entity-model-revision-dto';
import { EntityModelImplementationDto } from 'api-atlas/models/entity-model-implementation-dto';
import { UtilService } from '../../../util/util.service';
import { GenericDataService } from '../../../util/generic-data.service';
import { QueryParams } from '../../generics/data-list/data-list.component';

@Component({
  selector: 'app-implementation-revisions',
  templateUrl: './implementation-revisions.component.html',
  styleUrls: ['./implementation-revisions.component.scss'],
})
export class ImplementationRevisionsComponent implements OnInit, OnChanges {
  @Input() implementation: EntityModelImplementationDto;
  @Output() onRevisionClicked: EventEmitter<
    EntityModelRevisionDto
  > = new EventEmitter<EntityModelRevisionDto>();

  revisions: any[] = [];
  tableColumns = ['Id', 'Date'];
  variableNames = ['id', 'creationDate'];
  pagingInfo: any = {};
  lastParams: any;
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private implementationService: ImplementationsService,
    private utilService: UtilService,
    private genericDataService: GenericDataService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchRevisions(this.lastParams);
  }

  fetchRevisions(params: QueryParams): void {
    this.lastParams = params;
    this.implementationService
      .getImplementationRevisions({
        implementationId: this.implementation.id,
        page: params.page,
        size: params.size,
      })
      .subscribe((data) => {
        this.prepareRevisionData(data);
      });
  }

  onElementClicked(revision: any): void {
    this.onRevisionClicked.emit(revision);
  }

  getRevisionsHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareRevisionData(data);
    });
  }

  prepareRevisionData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.revisions = data._embedded.revisions;
    } else {
      this.revisions = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }
}
