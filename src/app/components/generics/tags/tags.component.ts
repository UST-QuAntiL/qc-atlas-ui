import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TagService } from 'api-atlas/services/tag.service';
import { TagDto } from 'api-atlas/models/tag-dto';
import { TagsDialogComponent } from './dialog/tags-dialog.component';

@Component({
  selector: 'app-tags-component',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  @Input() allowRemoving = true;
  @Input() tags: TagDto[] = [];

  @Output() onRemove: EventEmitter<TagDto> = new EventEmitter<TagDto>();
  @Output() onAdd: EventEmitter<TagDto> = new EventEmitter<TagDto>();

  allTags: TagDto[] = [];

  localStorageKey = 'atlas-tag-categories';
  showCategories = false;
  categoryToColor: Record<string, string>;
  assignedColors: string[] = [];
  // unfortunately there is no quick way to extract angular mat-colors form sass
  colorPalette: string[] = [
    '#e57373', // corresponds to mat colors mat-* 300
    '#f06292',
    '#ba68c8',
    '#9575cd',
    '#7986cb',
    '#64b5f6',
    '#4fc3f7',
    '#4dd0e1',
    '#4db6ac',
    '#81c784',
    '#aed581',
    '#dce775',
    '#fff176',
    '#ffd54f',
    '#ffb74d',
    '#ff8a65',
    '#a1887f',
    '#e0e0e0',
    '#90a4ae',
  ];

  constructor(private dialog: MatDialog, private tagsService: TagService) {
    tagsService.getTags({ search: '', page: 0, size: 20 }).subscribe((next) => {
      if (next._embedded?.tags) {
        this.allTags = next._embedded.tags.map((entityModelTag) => ({
          value: entityModelTag.value,
          category: entityModelTag.category,
        }));
      }

      // retrieve generated colors from local storage or set them if empty
      if (localStorage.getItem(this.localStorageKey)) {
        this.refreshColors();
      } else if (!this.categoryToColor) {
        this.categoryToColor = this.toColorMap(this.allTags);
        localStorage.setItem(
          this.localStorageKey,
          JSON.stringify(this.categoryToColor)
        );
      }
    });
  }

  refreshColors(): void {
    if (!this.hasStorageAllCategories()) {
      const tmp = this.toColorMap(this.allTags);
      this.categoryToColor = tmp;
      localStorage.removeItem(this.localStorageKey);
      localStorage.setItem(this.localStorageKey, JSON.stringify(tmp));
    } else {
      this.categoryToColor = JSON.parse(
        localStorage.getItem(this.localStorageKey)
      );
    }
  }

  /**
   * quick comparison of tags which were fetched and assigned
   * category colors in the local storage
   * e.g. the local storage contains not all categories
   */
  hasStorageAllCategories(): boolean {
    const localStorageKeys = Object.keys(
      JSON.parse(localStorage.getItem(this.localStorageKey))
    ).sort();
    const localKeys = Object.keys(this.toColorMap(this.allTags)).sort();

    if (localKeys.length > localStorageKeys.length) {
      return false;
    }

    for (let i = 0; i <= localKeys.length; i++) {
      if (localStorageKeys[i] !== localKeys[i]) {
        return false;
      }
    }
    return true;
  }

  toColorMap(tags: TagDto[]): Record<string, string> {
    const result: Record<string, string> = this.categoryToColor || {};
    for (const tag of tags) {
      if (!(tag.category in result)) {
        result[tag.category] = this.generateColor(Object.values(result));
      }
    }
    return result;
  }

  generateColor(usedColors: string[]): string {
    const rand = Math.floor(Math.random() * (this.colorPalette.length - 1)) + 1;
    if (usedColors.length >= this.colorPalette.length) {
      // too many categories, some have the same color now
      return this.colorPalette[rand];
    } else {
      if (this.colorPalette[rand] in usedColors) {
        return this.generateColor(usedColors);
      }
    }
    this.colorPalette.push(this.colorPalette[rand]);
    return this.colorPalette[rand];
  }

  removeTag(tag: Tag): void {
    this.tags = this.tags.filter((t) => t.value !== tag.value);
    this.onRemove.emit(tag);
  }

  addTag(): void {
    this.dialog
      .open(TagsDialogComponent, {
        width: '400px',
        autoFocus: false,
        data: {
          allTags: this.allTags,
          categoryToColor: this.categoryToColor,
        },
      })
      .afterClosed()
      .subscribe((addedTag: TagDto) => {
        if (addedTag) {
          const tmp = this.tags.find((tag) => tag.value === addedTag.value);
          if (!tmp) {
            this.tags.push(addedTag);
            // TODO this is really bad, will be removed anyway once backend callbacks are built
            const tmp2 = this.allTags.find(
              (tag) => tag.value === addedTag.value
            );
            if (!tmp2) {
              this.allTags.push(addedTag);
            }
            this.refreshColors();
          }
        }
        this.onAdd.emit(addedTag);
        console.log(addedTag);
      });
  }

  /**
   * workaround see: https://github.com/angular/angular/issues/17725
   */
  getCategories(): string[] {
    return Object.keys(this.categoryToColor).filter((s) =>
      this.tags.find((t) => t.category === s)
    );
  }

  toggleCategories(): void {
    this.showCategories = !this.showCategories;
  }
}

export interface Tag {
  value: string;
  category: string;
}
