import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { PatternRelationTypeService } from 'api-atlas/services/pattern-relation-type.service';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { PatternRelationTypeDto } from 'api-atlas/models/pattern-relation-type-dto';
import { PatternRelationDto } from 'api-atlas/models';
import { PatternControllerService } from 'api-patternatlas/services/pattern-controller.service';
import { EntityModelPattern } from 'api-patternatlas/models/entity-model-pattern';
import { EntityModelPatternLanguage } from 'api-patternatlas/models';
import { forkJoin } from 'rxjs';
import { PatternLanguageControllerService } from 'api-patternatlas/services/pattern-language-controller.service';
import { AddPatternRelationDialogComponent } from '../dialogs/add-pattern-relation-dialog.component';
import { UtilService } from '../../../util/util.service';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';
import { UrlData } from '../../generics/data-list/data-list.component';
import { environment as Env } from '../../../../environments/environment';

@Component({
  selector: 'app-algorithm-related-patterns',
  templateUrl: './algorithm-related-patterns.component.html',
  styleUrls: ['./algorithm-related-patterns.component.scss'],
})
export class AlgorithmRelatedPatternsComponent implements OnInit {
  @Input() algorithm: AlgorithmDto;

  patternRelations: PatternRelationDto[];
  tableObjects: PatternRelationTableObject[] = [];
  variableNames: string[] = ['patternName', 'patternType', 'description'];
  tableColumns: string[] = ['Pattern', 'Relation Type', 'Description'];
  externalLinkVariables: string[] = ['pattern'];

  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private patternRelationTypeService: PatternRelationTypeService,
    private algorithmService: AlgorithmService,
    private patternService: PatternControllerService,
    private patternLanguageService: PatternLanguageControllerService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getPatternRelations(params: {
    algorithmId: string;
    search?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }): void {
    this.algorithmService.getPatternRelationsOfAlgorithm(params).subscribe(
      (relations) => {
        this.prepareRelations(relations);
      },
      () => {
        this.utilService.callSnackBar(
          'Error! Pattern relations could not be retrieved.'
        );
      }
    );
  }

  prepareRelations(relations): void {
    if (relations.content) {
      this.patternRelations = relations.content;
      this.generateTableObjects();
    } else {
      this.patternRelations = [];
      this.tableObjects = [];
    }
    this.pagingInfo.totalPages = relations.totalPages;
    this.pagingInfo.totalElements = relations.totalElements;
    this.pagingInfo.number = relations.number;
    this.pagingInfo.size = relations.size;
    this.pagingInfo.sort = relations.sort;
    this.pagingInfo.search = relations.search;
  }

  createPatternRelation(patternRelationDto: PatternRelationDto): void {
    this.algorithmService
      .createPatternRelationForAlgorithm({
        algorithmId: this.algorithm.id,
        body: patternRelationDto,
      })
      .subscribe(
        () => {
          const correctPage = this.utilService.getLastPageAfterCreation(
            this.pagingInfo,
            1
          );
          this.getPatternRelations({
            algorithmId: this.algorithm.id,
            size: this.pagingInfo.size,
            page: correctPage,
            sort: this.pagingInfo.sort,
          });
          this.utilService.callSnackBar(
            'Pattern relation was successfully created.'
          );
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Could not create pattern relation.'
          );
        }
      );
  }

  updatePatternRelation(
    relationId: string,
    patternRelationDto: PatternRelationDto
  ): void {
    this.algorithmService
      .updatePatternRelationOfAlgorithm({
        algorithmId: this.algorithm.id,
        patternRelationId: relationId,
        body: patternRelationDto,
      })
      .subscribe(
        () => {
          this.getPatternRelations({
            algorithmId: this.algorithm.id,
            size: this.pagingInfo.size,
            page: this.pagingInfo.number,
            sort: this.pagingInfo.sort,
          });
          this.utilService.callSnackBar(
            'Pattern relation was successfully updated.'
          );
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Could not update pattern relation.'
          );
        }
      );
  }

  onAddElement(): void {
    const dialogRef = this.utilService.createDialog(
      AddPatternRelationDialogComponent,
      {
        title: 'Add new pattern relation',
        algoId: this.algorithm.id,
      },
      '1000px',
      '600px'
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        if (!dialogResult.patternRelationType.id) {
          this.patternRelationTypeService
            .createPatternRelationType({
              body: dialogResult.patternRelationType,
            })
            .subscribe((createdType) => {
              this.createPatternRelation(
                this.generatePatternRelationDto(
                  createdType,
                  dialogResult.description,
                  dialogResult.pattern,
                  undefined
                )
              );
            });
        } else {
          this.createPatternRelation(
            this.generatePatternRelationDto(
              dialogResult.patternRelationType,
              dialogResult.description,
              dialogResult.pattern,
              undefined
            )
          );
        }
      }
    });
  }

  onUpdateClicked(event: any): void {
    this.utilService
      .createDialog(
        AddPatternRelationDialogComponent,
        {
          title: 'Edit pattern relation',
          algoId: this.algorithm.id,
          pattern: event.pattern,
          patternObject: event.patternObject,
          description: event.description,
          patternRelationType: event.patternTypeObject,
        },
        '1000px'
      )
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          if (!dialogResult.patternRelationType.id) {
            this.patternRelationTypeService
              .createPatternRelationType({
                body: dialogResult.patternRelationType,
              })
              .subscribe((createdType) => {
                this.updatePatternRelation(
                  event.id,
                  this.generatePatternRelationDto(
                    createdType,
                    dialogResult.description,
                    dialogResult.pattern,
                    event.id
                  )
                );
              });
          } else {
            this.updatePatternRelation(
              event.id,
              this.generatePatternRelationDto(
                dialogResult.patternRelationType,
                dialogResult.description,
                dialogResult.pattern,
                event.id
              )
            );
          }
        }
      });
  }

  onDeleteElements(event): void {
    const dialogRef = this.utilService.createDialog(ConfirmDialogComponent, {
      title: 'Confirm Deletion',
      message:
        'Are you sure you want to delete the relations to the following pattern(s):',
      data: event.elements,
      variableName: 'patternName',
      yesButtonText: 'yes',
      noButtonText: 'no',
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const unlinkTasks = [];
        const snackbarMessages = [];
        let successfulUnlinks = 0;
        for (const relation of event.elements) {
          unlinkTasks.push(
            this.algorithmService
              .deletePatternRelationOfAlgorithm({
                algorithmId: this.algorithm.id,
                patternRelationId: relation.id,
              })
              .toPromise()
              .then(() => {
                successfulUnlinks++;
                snackbarMessages.push(
                  'Successfully unlinked pattern "' +
                    relation.patternName +
                    '".'
                );
              })
              .catch(() => {
                snackbarMessages.push(
                  'Error! Could not unlink pattern "' +
                    relation.patternName +
                    '".'
                );
              })
          );
        }
        forkJoin(unlinkTasks).subscribe(() => {
          if (
            this.utilService.isLastPageEmptyAfterDeletion(
              successfulUnlinks,
              this.tableObjects.length,
              this.pagingInfo
            )
          ) {
            event.queryParams.page--;
          }
          event.queryParams.algorithmId = this.algorithm.id;
          this.getPatternRelations(event.queryParams);
          snackbarMessages.push(
            this.utilService.generateFinishingSnackbarMessage(
              successfulUnlinks,
              dialogResult.data.length,
              'patterns',
              'unlinked'
            )
          );
          this.utilService.callSnackBarSequence(snackbarMessages);
        });
      }
    });
  }

  onDatalistConfigChanged(event): void {
    event.algorithmId = this.algorithm.id;
    this.getPatternRelations(event);
  }

  onElementClicked(event): void {
    const encodedUri =
      Env.PATTERN_ATLAS_UI_URL +
      '/pattern-languages/' +
      this.fixedEncodeURIComponent(event.languageObject.uri) +
      '/' +
      this.fixedEncodeURIComponent(event.pattern);
    window.open(encodedUri, '_blank');
  }

  fixedEncodeURIComponent(str): string {
    return encodeURIComponent(str).replace(
      /[!'()*]/g,
      (c) => '%' + c.charCodeAt(0).toString(16)
    );
  }

  onUrlClicked(urlData: UrlData): void {
    // No check needed since pattern-relations have only one url-field called 'pattern'
    window.open(urlData.element['pattern'], '_blank');
  }

  generateTableObjects(): void {
    this.tableObjects = [];
    for (const relation of this.patternRelations) {
      this.getPattern(relation);
    }
  }

  getPattern(relation: PatternRelationDto): void {
    this.patternService
      .getPatternByUri({ encodedUri: relation.pattern })
      .subscribe((pattern) => {
        this.getPatternLanguage(relation, pattern);
      });
  }

  getPatternLanguage(
    relation: PatternRelationDto,
    pattern: EntityModelPattern
  ): void {
    const languageUrl: string = JSON.parse(JSON.stringify(pattern._links))
      .patternLanguage.href;
    const languageId = languageUrl.split('/').pop();

    this.patternLanguageService
      .getPatternLanguageById({ patternLanguageId: languageId })
      .subscribe((language) => {
        this.tableObjects.push({
          id: relation.id,
          description: relation.description,
          patternType: relation.patternRelationType.name,
          pattern: relation.pattern,
          patternTypeObject: relation.patternRelationType,
          patternObject: pattern,
          languageObject: language,
          patternName: pattern.name,
        });
      });
  }

  generatePatternRelationDto(
    patternRelationType: PatternRelationTypeDto,
    description: string,
    pattern: string,
    id: string
  ): PatternRelationDto {
    return {
      id,
      algorithmId: this.algorithm.id,
      pattern,
      patternRelationType,
      description,
    };
  }

  onPageChanged(event): void {
    event.algorithmId = this.algorithm.id;
    this.getPatternRelations(event);
  }
}

export interface PatternRelationTableObject {
  id: string;
  patternType: string;
  description: string;
  pattern: string;
  patternTypeObject: PatternRelationTypeDto;
  patternObject: EntityModelPattern;
  languageObject: EntityModelPatternLanguage;
  patternName: string;
}
