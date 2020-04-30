import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlgorithmService } from '../../services/algorithm.service';
import { Algorithm } from '../../model/algorithm.model';
import { ImplementationService } from '../../services/implementation.service';
import { Implementation } from '../../model/implementation.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddAlgorithmDialogComponent } from './dialogs/add-algorithm-dialog.component';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../model/tag.model';
import { Content } from '../../model/content.model';
import { AddImplementationDialogComponent } from '../implementations/dialogs/add-implementation-dialog.component';
import { Sdk } from '../../model/sdk.model';
import { SdkService } from '../../services/sdk.service';
import { JsonImportDialogComponent } from '../dialogs/json-import-dialog.component';
import { MissingEntityDialogComponent } from '../dialogs/missing-entity-dialog.component';
import { Util } from '../../util/Util';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.scss']
})
export class AlgorithmsComponent implements OnInit {

  algorithms: Algorithm[] = [];

  tags: Tag[] = [];
  sdks: Sdk[] = [];

  implementations: Implementation[] = [];
  implementationOpened = false;

  isSelectedColor = 'primary';

  selectedAlgorithm: Algorithm;
  selectedImplementation: Implementation;


  displayedTagsColumns: string[] = ['key', 'value'];
  displayedImplementationColumns: string[] = ['name', 'sdk'];


  constructor(private router: Router, private algorithmService: AlgorithmService, private snackbarService: SnackbarService,
              private implementationService: ImplementationService, public dialog: MatDialog,
              private snackBar: MatSnackBar, private tagService: TagService, private sdkService: SdkService) {
  }

  ngOnInit(): void {
    this.getAllAlgorithms();
    this.getTags();
    this.getSdks();
  }

  getSdks(): void {
    this.sdkService.getAllSdks().subscribe(
      data => {
        this.sdks = data.sdkDtos;
      }
    );
  }

  getAllAlgorithms(): void {
    this.algorithmService.getAllAlgorithms().subscribe(
      data => {
        this.algorithms = data.algorithmDtos;
        // set initial selected algorithm
        if (this.algorithms.length > 0) {
          this.onAlgorithmSelected(this.algorithms[0]);
        }
      }
    );
  }

  onAlgorithmSelected(algorithm: Algorithm): void {
    this.implementationOpened = false;
    this.selectedAlgorithm = algorithm;
    this.getImplementations();
    this.getTagsForAlgorithm();
  }

  getImplementations(): void {
    this.implementationService.getImplementationsForAlgorithm(this.selectedAlgorithm.id).subscribe(
      implementations => {
        this.implementations = implementations.implementationDtos;
      }
    );
  }

  createImplementationWithJson(): void {
    const dialogRef = this.dialog.open(JsonImportDialogComponent, {
      width: '250px',
      data: {title: 'Import new implementation'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.implementationService.createImplementationWithJson(this.selectedAlgorithm.id, result).subscribe(
          implementationResult => {
            this.processImplementationResult(implementationResult);
          }
        );
      }
    });
  }

  createImplementation(): void {
    const dialogRef = this.dialog.open(AddImplementationDialogComponent, {
      width: '600px',
      data: {title: 'Add new implementation', tags: this.tags, sdks: this.sdks}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.selectedImplementation = null;
        const resultContent: Content = Util.createContentFromDialogResult(dialogResult);
        const implementation: Implementation = Util.createImplementationFromDialogResult(dialogResult, resultContent);
        this.implementationService.createImplementation(this.selectedAlgorithm.id, implementation).subscribe(
          implementationResult => {
            this.processImplementationResult(implementationResult);
          }
        );
      }
    });
  }

  openImplementation(implementation: Implementation): void {
    this.implementationOpened = true;
    this.selectedImplementation = implementation;
  }

  getColorOfAlgorithmButton(id: number): string {
    if (!this.selectedAlgorithm) {
      return null;
    }
    if (id === this.selectedAlgorithm.id) {
      return this.isSelectedColor;
    }
  }

  getColorOfImplementationButton(id: number): string {
    if (!this.selectedImplementation) {
      return null;
    }
    if (id === this.selectedImplementation.id) {
      return this.isSelectedColor;
    }
    return null;
  }

  createAlgorithmWithJson(): void {
    if (this.tags.length === 0) {
      this.createMissingEntityDialog();
      return;
    }
    const dialogRef = this.dialog.open(JsonImportDialogComponent, {
      width: '250px',
      data: {title: 'Import new algorithm'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.algorithmService.createAlgorithmWithJson(result).subscribe(
          algorithmResult => {
            this.processAlgorithmResult(algorithmResult);
          }
        );
      }
    });
  }

  getTags(): void {
    this.tagService.getAllTags().subscribe(
      data => {
        this.tags = data.tagsDtos;
      }
    );
  }

  createAlgorithm(): void {
    if (this.tags.length === 0) {
      this.createMissingEntityDialog();
      return;
    }
    const dialogRef = this.dialog.open(AddAlgorithmDialogComponent, {
      width: '600px',
      data: {title: 'Add new algorithm', tags: this.tags}
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.selectedAlgorithm = null;
        this.implementations = null;
        const resultContent: Content = Util.createContentFromDialogResult(dialogResult);
        const algorithm: Algorithm = Util.createAlgorithmFromDialogResult(dialogResult, resultContent);
        this.algorithmService.createAlgorithm(algorithm).subscribe(
          algorithmResult => {
            this.processAlgorithmResult(algorithmResult);
          }
        );
      }
    });
  }

  private processImplementationResult(implementationResult: Implementation): void {
    this.implementations.push(implementationResult);
    this.selectedImplementation = implementationResult;
    this.implementationOpened = true;
    this.snackbarService.callSnackBar('implementation');
  }

  private getTagsForAlgorithm(): void {
    this.tagService.getTagsForAlgorithm(this.selectedAlgorithm.id).subscribe(
      tagData => {
        this.tags = tagData.tagsDtos;
      }
    );
  }

  private createMissingEntityDialog(): void {
    const missingDialog = this.dialog.open(MissingEntityDialogComponent, {
      width: '600px',
      data: {missingEntity: 'tags', currentEntity: 'algorithms'}
    });
  }

  private processAlgorithmResult(algorithmResult: Algorithm): void {
    this.algorithms.push(algorithmResult);
    this.onAlgorithmSelected(algorithmResult);
    this.snackbarService.callSnackBar('algorithm');
  }
}