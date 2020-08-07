import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlgorithmService } from 'api/services/algorithm.service';
import { AlgorithmRelationTypeService } from 'api/services/algorithm-relation-type.service';
import { EntityModelAlgoRelationTypeDto } from 'api/models/entity-model-algo-relation-type-dto';
import { AlgorithmRelationDto } from 'api/models/algorithm-relation-dto';
import { AlgorithmDto } from 'api/models/algorithm-dto';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlgoRelationTypeDto } from 'api/models/algo-relation-type-dto';

@Component({
  selector: 'app-add-algorithm-relation-dialog',
  templateUrl: './add-algorithm-relation-dialog.component.html',
  styleUrls: ['./add-algorithm-relation-dialog.component.scss'],
})
export class AddAlgorithmRelationDialogComponent implements OnInit {
  algorithmRelationForm: FormGroup;
  stateGroups: StateGroup[] = [];
  algoRelationTypes: EntityModelAlgoRelationTypeDto[] = [];
  linkableAlgorithms: AlgorithmDto[] = [];

  constructor(
    private algorithmService: AlgorithmService,
    private algoRelationTypeService: AlgorithmRelationTypeService,
    public dialogRef: MatDialogRef<AddAlgorithmRelationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.algorithmRelationForm = new FormGroup({
      description: new FormControl(this.data.description, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      relationTypeName: new FormControl(this.data.relationTypeName, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      relationType: new FormControl(this.data.relationType, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      targetAlgName: new FormControl(this.data.targetAlgName, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      targetAlg: new FormControl(this.data.targetAlg, [Validators.required]),
    });

    // Fill PatternRelationType if dialog is used for editing
    if (this.data.relationType) {
      this.setRelationType(this.data.relationType.name);
    }
    if (this.data.targetAlg) {
      this.setTargetAlg(this.data.targetAlg.name);
    }

    // Init list of available relation types
    this.algoRelationTypeService
      .getAlgoRelationTypes({})
      .subscribe((relationTypes) => {
        if (relationTypes._embedded) {
          this.algoRelationTypes = relationTypes._embedded.algoRelationTypes;
          this.stateGroups.push({
            optionName: 'Existing Algorithm-Relations',
            algoRelationTypes: this.algoRelationTypes,
          });
        }
      });

    // On close
    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.relationType = this.relationType.value;
      this.data.relationTypeName = this.relationTypeName.value;
      this.data.description = this.description.value;
      this.data.targetAlg = this.targetAlg.value;
      this.data.targetAlgName = this.targetAlgName.value;
    });
  }

  get description(): AbstractControl | null {
    return this.algorithmRelationForm.get('description');
  }

  get targetAlgName(): AbstractControl | null {
    return this.algorithmRelationForm.get('targetAlgName');
  }

  get targetAlg(): AbstractControl | null {
    return this.algorithmRelationForm.get('targetAlg');
  }

  setTargetAlg(value): void {
    this.algorithmRelationForm.get('targetAlg').setValue(value);
  }

  setRelationType(value): void {
    this.algorithmRelationForm.get('relationType').setValue(value);
  }

  get relationType(): AbstractControl | null {
    return this.algorithmRelationForm.get('relationType');
  }

  get relationTypeName(): AbstractControl | null {
    return this.algorithmRelationForm.get('relationTypeName');
  }

  displayRelation(type: AlgoRelationTypeDto): string {
    return type && type.name ? type.name : '';
  }

  displayAlgorithm(algo: AlgorithmDto): string {
    return algo && algo.name ? algo.name : '';
  }

  refreshAlgorithms(): void {
    this.setTargetAlg(undefined);
    this.linkableAlgorithms = [];
    if (this.targetAlgName.value) {
      this.algorithmService
        .getAlgorithms({ page: 0, size: 25, search: this.targetAlgName.value })
        .subscribe((algorithms) => {
          if (algorithms._embedded) {
            this.filterLinkableAlgorithms(algorithms._embedded.algorithms);
          }
        });
    }
  }

  filterLinkableAlgorithms(algorithms: AlgorithmDto[]): void {
    for (const algorithm of algorithms) {
      if (
        algorithm.id !== this.data.algoId &&
        !this.isAlreadyLinked(algorithm)
      ) {
        this.linkableAlgorithms.push(algorithm);
      }
    }
  }

  isAlreadyLinked(algorithm: AlgorithmDto): boolean {
    for (const relation of this.data.existingRelations) {
      if (
        relation.sourceAlgorithm.id === algorithm.id ||
        relation.targetAlgorithm.id === algorithm.id
      ) {
        return true;
      }
    }
    return false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isRequiredDataMissing(): boolean {
    return (
      this.description.errors?.required ||
      this.targetAlg.errors?.required ||
      this.relationType.errors?.required
    );
  }

  onRelationInputChanged(): void {
    // Don't do anything if option selected
    if (typeof this.relationTypeName.value !== 'string') {
      return;
    }
    // Return Type from Input if it exists
    const existingRelationType = this.algoRelationTypes.find(
      (x) => x.name === this.relationTypeName.value
    );

    // If Input-Field not empty and input type does not exist
    if (!existingRelationType && this.relationTypeName.value) {
      // If pattern type does not exist and first element is existing type
      if (
        !this.stateGroups[0] ||
        this.stateGroups[0].optionName !== 'New Algorithm-Relation'
      ) {
        this.stateGroups.unshift({
          optionName: 'New Algorithm-Relation',
          algoRelationTypes: [
            {
              name: this.relationTypeName.value,
            },
          ],
        });
        this.setRelationType(this.stateGroups[0].algoRelationTypes[0]);
      } else if (this.stateGroups[0].optionName === 'New Algorithm-Relation') {
        this.stateGroups[0].algoRelationTypes[0].name = this.relationTypeName.value;
        this.setRelationType(this.stateGroups[0].algoRelationTypes[0]);
      } else {
      }
    } else {
      if (this.stateGroups[0].optionName === 'New Algorithm-Relation') {
        this.stateGroups.shift();
        this.setRelationType(existingRelationType);
      }
    }
  }
}

export interface DialogData {
  title: string;
  algoId: string;
  relationTypeName: string;
  relationType: AlgoRelationTypeDto;
  targetAlgName: string;
  targetAlg: AlgorithmDto;
  description: string;
  existingRelations: AlgorithmRelationDto[];
  relationId: string;
}

export interface StateGroup {
  optionName: string;
  algoRelationTypes: EntityModelAlgoRelationTypeDto[];
}
