import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Implementation } from '../../model/implementation.model';
import { ImplementationService } from '../../services/implementation.service';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../model/tag.model';
import { Algorithm } from '../../model/algorithm.model';

@Component({
  selector: 'app-implementations',
  templateUrl: './implementations.component.html',
  styleUrls: ['./implementations.component.scss'],
})
export class ImplementationsComponent implements OnInit, OnChanges {
  @Input() selectedImplementation: Implementation;
  @Input() selectedAlgorithm: Algorithm;
  @Input() implementations: Implementation[];

  displayedParametersColumns: string[] = [
    'name',
    'type',
    'description',
    'restriction',
  ];
  displayedTagsColumns: string[] = ['key', 'value'];

  tags: Tag[] = [];

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

  getImplementationById(algoId: number, implId: number): void {
    this.implementationService
      .getImplementationById(algoId, implId)
      .subscribe((implData) => {
        this.selectedImplementation = implData;
        this.tagService
          .getTagsForImplementation(algoId, implId)
          .subscribe((tagData) => {
            this.tags = tagData.tagsDtos;
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
