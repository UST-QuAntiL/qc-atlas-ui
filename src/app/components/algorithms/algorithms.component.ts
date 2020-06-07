import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlgorithmDto, ImplementationDto, TagDto } from 'api/models';
import { AlgorithmService } from 'api/services/algorithm.service';
import { ImplementationService } from 'api/services/implementation.service';
import { TagService } from 'api/services/tag.service';
import { AddImplementationDialogComponent } from '../implementations/dialogs/add-implementation-dialog.component';
import { JsonImportDialogComponent } from '../dialogs/json-import-dialog.component';
import { UtilService } from '../../util/util.service';
import { AddAlgorithmDialogComponent } from './dialogs/add-algorithm-dialog.component';

@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.scss'],
})
export class AlgorithmsComponent implements OnInit {
  algorithms: AlgorithmDto[] = [];
  tags: TagDto[] = [];
  implementations: ImplementationDto[] = [];
  implementationOpened = false;

  selectedAlgorithm: AlgorithmDto;
  selectedImplementation: ImplementationDto;

  displayedTagsColumns: string[] = ['key', 'value'];
  displayedImplementationColumns: string[] = ['name'];
  currentEntity = 'algorithm';
  implEntity = 'implementation';
  tagEntity = 'tags';

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
    this.algorithmService.getAlgorithms().subscribe((data) => {
      this.algorithms = data._embedded.algorithmDtoes;
      // set initial selected algorithm
      if (this.algorithms.length > 0) {
        this.onAlgorithmSelected(this.algorithms[0]);
      }
    });
  }

  onAlgorithmSelected(algorithm: AlgorithmDto): void {
    this.implementationOpened = false;
    this.selectedAlgorithm = algorithm;
    this.getImplementations();
    this.getTagsForAlgorithm();
  }

  getImplementations(): void {
    this.implementationService
      .getImplementations({ algoId: this.selectedAlgorithm.id })
      .subscribe((implementations) => {
        this.implementations = implementations._embedded.implementationDtoes;
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
          .createImplementation({
            algoId: this.selectedAlgorithm.id,
            body: JSON.parse(result),
          })
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
      { tags: this.tags }
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.selectedImplementation = null;
        const implementation: ImplementationDto = {
          name: dialogResult.name,
          link: dialogResult.link,
        };
        this.implementationService
          .createImplementation({
            algoId: this.selectedAlgorithm.id,
            body: implementation,
          })
          .subscribe((implementationResult) => {
            this.processImplementationResult(implementationResult);
          });
      }
    });
  }

  openImplementation(implementation: ImplementationDto): void {
    this.implementationOpened = true;
    this.selectedImplementation = implementation;
  }

  getColorOfSelectedAlgorithm(id: string): string {
    return this.utilService.getColorOfSelectedButton(
      this.selectedAlgorithm,
      id
    );
  }

  getColorOfSelectedImplementation(id: string): string {
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
          .createAlgorithm(JSON.parse(result))
          .subscribe((algorithmResult) => {
            this.processAlgorithmResult(algorithmResult);
          });
      }
    });
  }

  updateImplementation(implId: ImplementationDto): void {
    const dialogRef = this.utilService.createDialog(
      AddImplementationDialogComponent,
      this.implEntity,
      this.tags
    );
    dialogRef.beforeClosed().subscribe(() => {
      Object.assign(
        this.selectedImplementation,
        dialogRef.componentInstance.implementationForm.value
      );
    });
  }

  getTags(): void {
    this.tagService.getTags2().subscribe((data) => {
      this.tags = data._embedded.tagDtoes;
    });
  }

  createAlgorithm(): void {
    this.checkIfTagsExist();
    const dialogRef = this.utilService.createDialog(
      AddAlgorithmDialogComponent,
      this.currentEntity,
      { tags: this.tags }
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.selectedAlgorithm = null;
        this.implementations = null;
        const algorithm: AlgorithmDto = {
          name: dialogResult.name,
          tags: [dialogResult.tag],
          computationModel: dialogResult.computationModel,
        };
        this.algorithmService
          .createAlgorithm({ body: algorithm })
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
    implementationResult: ImplementationDto
  ): void {
    this.implementations.push(implementationResult);
    this.selectedImplementation = implementationResult;
    this.implementationOpened = true;
    this.utilService.callSnackBar(this.implEntity);
  }

  private getTagsForAlgorithm(): void {
    this.algorithmService
      .getTags({ id: this.selectedAlgorithm.id })
      .subscribe((tagData) => {
        this.tags = tagData._embedded.tagDtoes;
      });
  }

  private processAlgorithmResult(algorithmResult: AlgorithmDto): void {
    this.algorithms.push(algorithmResult);
    this.onAlgorithmSelected(algorithmResult);
    this.utilService.callSnackBar(this.currentEntity);
  }
}
