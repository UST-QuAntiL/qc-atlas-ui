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
  isUpdateDialog = false;

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
      relationType: new FormControl(this.data.relationType, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      targetAlgName: new FormControl(
        { value: this.data.targetAlgName, disabled: this.data.disableAlg },
        // eslint-disable-next-line @typescript-eslint/unbound-method
        [Validators.required]
      ),
      targetAlg: new FormControl(
        { value: this.data.targetAlg, disabled: this.data.disableAlg },
        // eslint-disable-next-line @typescript-eslint/unbound-method
        [Validators.required]
      ),
    });

    // Fill PatternRelationType if dialog is used for editing
    if (this.data.relationType) {
      this.setRelationType(this.data.relationType);
      this.isUpdateDialog = true;
    }
    if (this.data.targetAlg) {
      this.setTargetAlg(this.data.targetAlg);
      this.setTargetAlgName(this.data.targetAlg.name);
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
      this.data.relationType = this.generateRelationType(
        this.relationType.value,
        'relationType'
      );
      this.data.description = this.description.value;
      this.data.targetAlg = this.targetAlg.value;
      this.data.targetAlgName = this.targetAlgName.value;
    });
  }

  generateRelationType(type, objectType: string): AlgoRelationTypeDto {
    if (type && type.id) {
      return type;
    } else {
      return type && type.name
        ? this.findObjectByName(type.name, objectType)
        : this.findObjectByName(type, objectType);
    }
  }

  findObjectByName(name, objectType: string): AlgoRelationTypeDto {
    let foundType: AlgorithmDto | AlgoRelationTypeDto;
    if (objectType === 'relationType') {
      foundType = this.algoRelationTypes.find((x) => x.name === name);
    } else {
      foundType = this.linkableAlgorithms.find((x) => x.name === name);
    }
    return foundType ? foundType : { name };
  }

  get description(): AbstractControl | null {
    return this.algorithmRelationForm.get('description');
  }

  get targetAlgName(): AbstractControl | null {
    return this.algorithmRelationForm.get('targetAlgName');
  }

  setTargetAlgName(value): void {
    this.algorithmRelationForm.get('targetAlgName').setValue(value);
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
    const searchType = this.relationType.value.name
      ? this.relationType.value
      : { name: this.relationType.value };
    // Return Type from Input if it exists
    const existingRelationType = this.algoRelationTypes.find(
      (x) => x.name === searchType.name
    );

    // If Input-Field not empty and input type does not exist
    if (!existingRelationType && searchType.name) {
      // If pattern type does not exist and first element is existing type
      if (this.algoTypesNotEmpty() || this.isFirstTypeNew()) {
        this.pushNewRelationType(searchType);
      } else if (!this.isFirstTypeNew()) {
        this.stateGroups[0].algoRelationTypes[0] = searchType;
      }
    } else {
      if (!this.isFirstTypeNew()) {
        this.stateGroups.shift();
      }
    }
  }

  pushNewRelationType(type): void {
    this.stateGroups.unshift({
      optionName: 'New Algorithm-Relation',
      algoRelationTypes: [type],
    });
  }

  algoTypesNotEmpty(): boolean {
    return !this.stateGroups[0];
  }

  isFirstTypeNew(): boolean {
    return this.stateGroups[0].optionName !== 'New Algorithm-Relation';
  }
}

export interface DialogData {
  title: string;
  algoId: string;
  relationType: AlgoRelationTypeDto;
  targetAlgName: string;
  targetAlg: AlgorithmDto;
  description: string;
  existingRelations: AlgorithmRelationDto[];
  relationId: string;
  disableAlg: boolean;
}

export interface StateGroup {
  optionName: string;
  algoRelationTypes: EntityModelAlgoRelationTypeDto[];
}
