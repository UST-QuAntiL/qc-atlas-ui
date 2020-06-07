import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TagDto } from 'api/models';
import { TagService } from 'api/services/tag.service';
import { JsonImportDialogComponent } from '../dialogs/json-import-dialog.component';
import { UtilService } from '../../util/util.service';
import { AddTagDialogComponent } from './dialogs/add-tag-dialog.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  tags: TagDto[] = [];

  displayedTagsColumns: string[] = ['key', 'value'];

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
    this.tagService.getTags2().subscribe((tags) => {
      this.tags = tags._embedded.tagDtoes;
    });
  }

  createTagWithJson(): void {
    const dialogRef = this.utilService.createDialog(
      JsonImportDialogComponent,
      'JSON Tag'
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.tagService
          .createTag({ body: JSON.parse(dialogResult) })
          .subscribe(() => {
            this.handleTagCreationResult();
          });
      }
    });
  }

  createTag(): void {
    const dialogRef = this.utilService.createDialog(
      AddTagDialogComponent,
      'Tag'
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const tag: TagDto = {
          key: dialogResult.key,
          value: dialogResult.value,
        };
        this.tagService.createTag({ body: tag }).subscribe(() => {
          this.handleTagCreationResult();
        });
      }
    });
  }

  private handleTagCreationResult(): void {
    this.getAllTags();
    this.utilService.callSnackBar('Tag');
  }
}
