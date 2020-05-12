import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { Tag } from "../../../model/tag.model";
import { Parameters } from "../../../model/parameters.model";
import { Content } from "../../../model/content.model";
import { AddParameterDialogComponent } from "../../parameters/dialogs/add-parameter-dialog.component";
import { Parameter } from "../../../model/parameter.model";
import { MatTable } from "@angular/material/table";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-algorithm-dialog-component",
  templateUrl: "add-algorithm-dialog.html",
})
export class AddAlgorithmDialogComponent implements OnInit {
  algorithmForm: FormGroup;

  inputParameters: Parameters = new Parameters();
  outputParameters: Parameters = new Parameters();

  @ViewChild("inputTable") tableIn: MatTable<any>;
  @ViewChild("outputTable") tableOut: MatTable<any>;

  displayedParametersColumns: string[] = [
    "name",
    "type",
    "description",
    "restriction",
  ];

  constructor(
    public dialogRef: MatDialogRef<AddAlgorithmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {
    this.inputParameters.parameters = [];
    this.outputParameters.parameters = [];
  }

  get name() {
    return this.algorithmForm.get("name");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addParameter(type: string) {
    const dialogRef = this.dialog.open(AddParameterDialogComponent, {
      width: "400px",
      data: { title: "Add new " + type + " parameter" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const parameter: Parameter = {
          name: result.name,
          description: result.description,
          type: result.type,
          restriction: result.restriction,
        };
        type === "input"
          ? this.addToInputParams(parameter)
          : this.addToOutputParams(parameter);
        if (this.tableIn) {
          this.tableIn.renderRows();
        }
        if (this.tableOut) {
          this.tableOut.renderRows();
        }
      }
    });
  }

  addToInputParams(parameter: Parameter) {
    this.inputParameters.parameters.push(parameter);
    this.data.inputParameters = this.inputParameters;
  }

  addToOutputParams(parameter: Parameter) {
    this.outputParameters.parameters.push(parameter);
    this.data.outputParameters = this.outputParameters;
  }

  ngOnInit(): void {
    this.algorithmForm = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.algorithmForm.get("name").value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.name.errors?.required || !this.data.tag;
  }
}

export interface DialogData {
  title: string;
  name: string;
  inputParameters: Parameters;
  content: Content;
  outputParameters: Parameters;
  tag: Tag;
  tags: Tag[];
}
