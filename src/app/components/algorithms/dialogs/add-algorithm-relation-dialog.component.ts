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
  selectedRelationType: AlgoRelationTypeDto;
  selectedTargetAlg: AlgorithmDto;

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
      this.selectedRelationType = this.data.relationType;
    }
    if (this.data.targetAlg) {
      this.setTargetAlg(this.data.targetAlg.name);
      this.selectedTargetAlg = this.data.targetAlg;
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
      this.data.relationType = this.selectedRelationType;
      this.data.relationTypeName = this.relationTypeName.value;
      this.data.description = this.description.value;
      this.data.targetAlg = this.selectedTargetAlg;
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

  refreshAlgorithms(): void {
    if (this.targetAlgName.value) {
      this.algorithmService
        .getAlgorithms({ page: 0, size: 25, search: this.targetAlgName.value })
        .subscribe((algorithms) => {
          if (algorithms._embedded) {
            this.linkableAlgorithms = algorithms._embedded.algorithms;
          } else {
            this.linkableAlgorithms = [];
          }
        });
    } else {
      this.linkableAlgorithms = [];
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isRequiredDataMissing(): boolean {
    // TODO: Fix this part
    return this.description.errors?.required;
  }

  onRelationTypeSelect(type: AlgoRelationTypeDto): void {
    this.selectedRelationType = type;
    this.data.relationType = type;
  }

  onTargetAlgorithmSelect(algorithm: AlgorithmDto): void {
    this.selectedTargetAlg = algorithm;
    this.data.targetAlg = algorithm;
    this.setTargetAlg(algorithm);
  }

  onRelationInputChanged(): void {
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
        this.onRelationTypeSelect(this.stateGroups[0].algoRelationTypes[0]);
      } else if (this.stateGroups[0].optionName === 'New Algorithm-Relation') {
        this.stateGroups[0].algoRelationTypes[0].name = this.relationTypeName.value;
        this.onRelationTypeSelect(this.stateGroups[0].algoRelationTypes[0]);
      } else {
      }
    } else {
      if (this.stateGroups[0].optionName === 'New Algorithm-Relation') {
        this.stateGroups.shift();
        this.onRelationTypeSelect(existingRelationType);
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
