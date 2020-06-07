import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlgorithmDto, ImplementationDto, TagDto } from 'api/models';
import { ImplementationService } from 'api/services/implementation.service';
import { TagService } from 'api/services/tag.service';

@Component({
  selector: 'app-implementations',
  templateUrl: './implementations.component.html',
  styleUrls: ['./implementations.component.scss'],
})
export class ImplementationsComponent implements OnInit, OnChanges {
  @Input() selectedImplementation: ImplementationDto;
  @Input() selectedAlgorithm: AlgorithmDto;
  @Input() implementations: ImplementationDto[];

  displayedParametersColumns: string[] = [
    'name',
    'type',
    'description',
    'restriction',
  ];
  displayedTagsColumns: string[] = ['key', 'value'];

  tags: TagDto[] = [];

  constructor(
    private implementationService: ImplementationService,
    private tagService: TagService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getImplementationById(
      this.selectedAlgorithm.id,
      this.selectedImplementation.id
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleSelectedImplementationChanges(changes);
    this.handleSelectedAlgorithmChanges(changes);
    this.handleImplementationsChanges(changes);

    this.getImplementationById(
      this.selectedAlgorithm.id,
      this.selectedImplementation.id
    );
  }

  getImplementationById(algoId: string, implId: string): void {
    this.implementationService
      .getImplementation({ implId })
      .subscribe((implData) => {
        this.selectedImplementation = implData;
        this.implementationService.getTags1({ implId }).subscribe((tagData) => {
          this.tags = tagData._embedded.tagDtoes;
        });
      });
  }

  private handleSelectedAlgorithmChanges(changes: SimpleChanges): void {
    if ('selectedAlgorithm' in changes) {
      this.selectedAlgorithm = changes.selectedAlgorithm.currentValue;
    }
  }

  private handleImplementationsChanges(changes: SimpleChanges): void {
    if ('implementations' in changes) {
      this.implementations = changes.implementations.currentValue;
    }
  }

  private handleSelectedImplementationChanges(changes: SimpleChanges): void {
    if ('selectedImplementation' in changes) {
      this.selectedImplementation = changes.selectedImplementation.currentValue;
    }
  }
}
