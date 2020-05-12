import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TagService } from "../../services/tag.service";
import { Tag } from "../../model/tag.model";
import { JsonImportDialogComponent } from "../dialogs/json-import-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AddTagDialogComponent } from "./dialogs/add-tag-dialog.component";
import { EntityCreator } from "../../util/entity.creator";
import { UtilService } from "../../util/util.service";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["./tags.component.scss"],
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];

  displayedTagsColumns: string[] = ["key", "value"];

  constructor(
    private router: Router,
    private tagService: TagService,
    public dialog: MatDialog,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getAllTags();
  }

  getAllTags(): void {
    this.tagService.getAllTags().subscribe((tags) => {
      this.tags = tags.tagsDtos;
    });
  }

  createTagWithJson(): void {
    const dialogRef = this.utilService.createDialog(
      JsonImportDialogComponent,
      "JSON Tag"
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.tagService.createTagWithJson(dialogResult).subscribe(() => {
          this.handleTagCreationResult();
        });
      }
    });
  }

  createTag(): void {
    const dialogRef = this.utilService.createDialog(
      AddTagDialogComponent,
      "Tag"
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const tag: Tag = EntityCreator.createTagFromDialogResult(dialogResult);
        this.tagService.createTag(tag).subscribe(() => {
          this.handleTagCreationResult();
        });
      }
    });
  }

  private handleTagCreationResult(): void {
    this.getAllTags();
    this.utilService.callSnackBar("Tag");
  }
}
