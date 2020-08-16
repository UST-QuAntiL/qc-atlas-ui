import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TagsDialogComponent } from './dialog/tags-dialog.component';

// placeholder content
const PLACEHOLDER_ALL_TAGS: Tag[] = [
  {
    category: 'Machine Learning',
    value: 'Naive Bayes',
  },
  {
    category: 'Machine Learning',
    value: 'Classification',
  },
  {
    category: 'Learning',
    value: 'Eager Learning',
  },
  {
    category: 'Cryptography',
    value: 'Factorization',
  },
  {
    category: 'Topic',
    value: 'Data Science',
  },
  {
    category: 'Topic',
    value: 'NLP',
  },
  {
    category: 'Topic',
    value: 'RSA',
  },
];
const PLACEHOLDER_INPUT_TAGS: Tag[] = [
  {
    category: 'Machine Learning',
    value: 'Naive Bayes',
  },
  {
    category: 'Machine Learning',
    value: 'Classification',
  },
  {
    category: 'Topic',
    value: 'Data Science',
  },
  {
    category: 'Learning',
    value: 'Eager Learning',
  },
];

@Component({
  selector: 'app-tags-component',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  @Input() allowRemoving = true;
  @Input() tags: Tag[] = PLACEHOLDER_INPUT_TAGS;

  @Output() onRemove: EventEmitter<Tag> = new EventEmitter<Tag>();

  // TODO fetch this as soon as backend part is finished
  all_tags: Tag[] = PLACEHOLDER_ALL_TAGS;

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

  constructor(public dialog: MatDialog) {
    // retrieve generated colors from local storage or set them if empty
    if (localStorage.getItem(this.localStorageKey)) {
      this.refreshColors();
    } else if (!this.categoryToColor) {
      this.categoryToColor = this.toColorMap(this.all_tags);
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(this.categoryToColor)
      );
    }
  }

  refreshColors(): void {
    console.log(this.hasStorageAllCategories());
    if (!this.hasStorageAllCategories()) {
      const tmp = this.toColorMap(this.all_tags);
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
    const localKeys = Object.keys(this.toColorMap(this.all_tags)).sort();

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

  toColorMap(tags: Tag[]): Record<string, string> {
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
          allTags: this.all_tags,
          categoryToColor: this.categoryToColor,
        },
      })
      .afterClosed()
      .subscribe((addedTag: Tag) => {
        if (addedTag) {
          const tmp = this.tags.find((tag) => tag.value === addedTag.value);
          if (!tmp) {
            this.tags.push(addedTag);
            // TODO this is really bad, will be removed anyway once backend callbacks are built
            const tmp2 = this.all_tags.find(
              (tag) => tag.value === addedTag.value
            );
            if (!tmp2) {
              this.all_tags.push(addedTag);
            }
            this.refreshColors();
          }
        }
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
