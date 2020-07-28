import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlgorithmService } from 'api/services/algorithm.service';
import { EntityModelPatternRelationTypeDto } from 'api/models/entity-model-pattern-relation-type-dto';
import { PatternRelationTypeDto } from 'api/models/pattern-relation-type-dto';
import { PatternRelationTypeService } from 'api/services/pattern-relation-type.service';

@Component({
  selector: 'app-add-pattern-relation-dialog',
  templateUrl: './add-pattern-relation-dialog.component.html',
  styleUrls: ['./add-pattern-relation-dialog.component.scss'],
})
export class AddPatternRelationDialogComponent implements OnInit {
  patternRelationForm: FormGroup;
  patternRelationTypes: EntityModelPatternRelationTypeDto[] = [];
  selectedRelationType: PatternRelationTypeDto;

  constructor(
    private algorithmService: AlgorithmService,
    private patternRelationTypeService: PatternRelationTypeService,
    public dialogRef: MatDialogRef<AddPatternRelationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.patternRelationForm = new FormGroup({
      description: new FormControl(this.data.description),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      pattern: new FormControl(this.data.pattern, [Validators.required]),
      patternRelationType: new FormControl(this.data.patternRelationType, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
    });
    this.patternRelationTypeService
      .getPatternRelationTypes1({})
      .subscribe((relationTypes) => {
        if (relationTypes._embedded) {
          this.patternRelationTypes =
            relationTypes._embedded.patternRelationTypes;
        }
      });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.pattern = this.pattern.value;
      this.data.description = this.description.value;
      this.data.patternRelationType = this.selectedRelationType;
    });
  }

  get pattern(): AbstractControl | null {
    return this.patternRelationForm.get('pattern');
  }

  get patternRelationType(): AbstractControl | null {
    return this.patternRelationForm.get('patternRelationType');
  }

  get description(): AbstractControl | null {
    return this.patternRelationForm.get('description');
  }

  onPatternRelationTypeSelect(type: EntityModelPatternRelationTypeDto): void {
    this.selectedRelationType = type;
    this.data.patternRelationType = type;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  title: string;
  algoId: string;
  pattern: string;
  patternRelationType: EntityModelPatternRelationTypeDto;
  description: string;
}
