import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ImplementationService } from '../../services/implementation.service';
import { Implementation } from '../../model/implementation.model';
import { Algorithm } from '../../model/algorithm.model';
import { AlgorithmService } from '../../services/algorithm.service';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../model/tag.model';
import { Content } from '../../model/content.model';
import { AddImplementationDialogComponent } from '../implementations/dialogs/add-implementation-dialog.component';
import { JsonImportDialogComponent } from '../dialogs/json-import-dialog.component';
import { EntityCreator } from '../../util/entity.creator';
import { UtilService } from '../../util/util.service';
import { AddAlgorithmDialogComponent } from './dialogs/add-algorithm-dialog.component';

@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.scss'],
})
export class AlgorithmsComponent implements OnInit {
  algorithms: Algorithm[] = [];
  tags: Tag[] = [];
  implementations: Implementation[] = [];
  implementationOpened = false;

  selectedAlgorithm: Algorithm;
  selectedImplementation: Implementation;

  displayedTagsColumns: string[] = ['key', 'value'];
  displayedImplementationColumns: string[] = ['name'];
  currentEntity = 'Algorithm';
  implEntity = 'Implementation';
  tagEntity = 'Tags';

  constructor(
    private router: Router,
    private algorithmService: AlgorithmService,
    private utilService: UtilService,
    private implementationService: ImplementationService,
    public dialog: MatDialog,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.getAllAlgorithms();
    this.getTags();
  }

  getAllAlgorithms(): void {
    this.algorithmService.getAllAlgorithms().subscribe((data) => {
      this.algorithms = data.algorithmDtos;
      // set initial selected algorithm
      if (this.algorithms.length > 0) {
        this.onAlgorithmSelected(this.algorithms[0]);
      }
    });
  }

  onAlgorithmSelected(algorithm: Algorithm): void {
    this.implementationOpened = false;
    this.selectedAlgorithm = algorithm;
    this.getImplementations();
    this.getTagsForAlgorithm();
  }

  getImplementations(): void {
    this.implementationService
      .getImplementationsForAlgorithm(this.selectedAlgorithm.id)
      .subscribe((implementations) => {
        this.implementations = implementations.implementationDtos;
      });
  }

  createImplementationWithJson(): void {
    const dialogRef = this.utilService.createDialog(
      JsonImportDialogComponent,
      'JSON ' + this.implEntity
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.implementationService
          .createImplementationWithJson(this.selectedAlgorithm.id, result)
          .subscribe((implementationResult) => {
            this.processImplementationResult(implementationResult);
          });
      }
    });
  }

  createImplementation(): void {
    const dialogRef = this.utilService.createDialog(
      AddImplementationDialogComponent,
      this.implEntity,
      this.tags
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.selectedImplementation = null;
        const resultContent: Content = EntityCreator.createContentFromDialogResult(
          dialogResult
        );
        const implementation: Implementation = EntityCreator.createImplementationFromDialogResult(
          dialogResult,
          resultContent
        );
        this.implementationService
          .createImplementation(this.selectedAlgorithm.id, implementation)
          .subscribe((implementationResult) => {
            this.processImplementationResult(implementationResult);
          });
      }
    });
  }

  openImplementation(implementation: Implementation): void {
    this.implementationOpened = true;
    this.selectedImplementation = implementation;
  }

  getColorOfSelectedAlgorithm(id: number): string {
    return this.utilService.getColorOfSelectedButton(
      this.selectedAlgorithm,
      id
    );
  }

  getColorOfSelectedImplementation(id: number): string {
    return this.utilService.getColorOfSelectedButton(
      this.selectedImplementation,
      id
    );
  }

  createAlgorithmWithJson(): void {
    this.checkIfTagsExist();
    const dialogRef = this.utilService.createDialog(
      JsonImportDialogComponent,
      'JSON ' + this.currentEntity
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.algorithmService
          .createAlgorithmWithJson(result)
          .subscribe((algorithmResult) => {
            this.processAlgorithmResult(algorithmResult);
          });
      }
    });
  }

  getTags(): void {
    this.tagService.getAllTags().subscribe((data) => {
      this.tags = data.tagsDtos;
    });
  }

  createAlgorithm(): void {
    this.checkIfTagsExist();
    const dialogRef = this.utilService.createDialog(
      AddAlgorithmDialogComponent,
      this.currentEntity,
      this.tags
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.selectedAlgorithm = null;
        this.implementations = null;
        const resultContent: Content = EntityCreator.createContentFromDialogResult(
          dialogResult
        );
        const algorithm: Algorithm = EntityCreator.createAlgorithmFromDialogResult(
          dialogResult,
          resultContent
        );
        this.algorithmService
          .createAlgorithm(algorithm)
          .subscribe((algorithmResult) => {
            this.processAlgorithmResult(algorithmResult);
          });
      }
    });
  }

  private checkIfTagsExist(): void {
    if (this.tags.length === 0) {
      this.utilService.createMissingEntityDialog(
        this.tagEntity,
        this.currentEntity
      );
      return;
    }
  }

  private processImplementationResult(
    implementationResult: Implementation
  ): void {
    this.implementations.push(implementationResult);
    this.selectedImplementation = implementationResult;
    this.implementationOpened = true;
    this.utilService.callSnackBar(this.implEntity);
  }

  private getTagsForAlgorithm(): void {
    this.tagService
      .getTagsForAlgorithm(this.selectedAlgorithm.id)
      .subscribe((tagData) => {
        this.tags = tagData.tagsDtos;
      });
  }

  private processAlgorithmResult(algorithmResult: Algorithm): void {
    this.algorithms.push(algorithmResult);
    this.onAlgorithmSelected(algorithmResult);
    this.utilService.callSnackBar(this.currentEntity);
  }
}
