import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { Tag } from "../../../model/tag.model";
import { Parameters } from "../../../model/parameters.model";
import { AddParameterDialogComponent } from "../../parameters/dialogs/add-parameter-dialog.component";
import { Parameter } from "../../../model/parameter.model";
import { MatTable } from "@angular/material/table";
import { Sdk } from "../../../model/sdk.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EntityCreator } from "../../../util/entity.creator";
import { UtilService } from "../../../util/util.service";

@Component({
  selector: "app-add-implementation-dialog-component",
  templateUrl: "add-implementation-dialog.html",
})
export class AddImplementationDialogComponent implements OnInit {
  implementationForm: FormGroup;

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
    public dialogRef: MatDialogRef<AddImplementationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private utilService: UtilService
  ) {
    this.inputParameters.parameters = [];
    this.outputParameters.parameters = [];
  }

  get name() {
    return this.implementationForm.get("name");
  }

  get fileLocation() {
    return this.implementationForm.get("fileLocation");
  }

  get selectionRule() {
    return this.implementationForm.get("selectionRule");
  }

  get programmingLanguage() {
    return this.implementationForm.get("programmingLanguage");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isRequiredDataMissing(): boolean {
    return (
      this.name.errors?.required ||
      this.programmingLanguage.errors?.required ||
      this.selectionRule.errors?.required ||
      this.fileLocation.errors?.required ||
      this.fileLocation.errors?.pattern
    );
  }

  ngOnInit(): void {
    this.implementationForm = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      fileLocation: new FormControl(this.data.fileLocation, [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(
          "^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$"
        ),
      ]),
      selectionRule: new FormControl(this.data.selectionRule, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      programmingLanguage: new FormControl(this.data.programmingLanguage, [
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.implementationForm.get("name").value;
      this.data.fileLocation = this.implementationForm.get(
        "fileLocation"
      ).value;
      this.data.selectionRule = this.implementationForm.get(
        "selectionRule"
      ).value;
      this.data.programmingLanguage = this.implementationForm.get(
        "programmingLanguage"
      ).value;
    });
  }

  addParameter(parameterType: string) {
    const dialogRef = this.utilService.createDialog(
      AddParameterDialogComponent,
      parameterType + "parameter"
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const parameter: Parameter = EntityCreator.createParameterFromDialogResult(
          dialogResult
        );
        parameterType === "input"
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
}

export interface DialogData {
  title: string;
  name: string;
  description: string;
  fileLocation: string;
  inputParameters: Parameters;
  outputParameters: Parameters;
  programmingLanguage: string;
  sdk: string;
  sdks: Sdk[];
  selectionRule: string;
  tag: Tag;
  tags: Tag[];
}
