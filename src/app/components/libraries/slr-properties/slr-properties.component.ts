import { Component, Input, OnInit } from '@angular/core';
import { Study } from 'api-library/models/study';

@Component({
  selector: 'app-slr-properties',
  templateUrl: './slr-properties.component.html',
  styleUrls: ['./slr-properties.component.scss'],
})
export class SlrPropertiesComponent implements OnInit {
  @Input() study: Study;

  constructor() {}

  ngOnInit(): void {}

  getProperty(property): string {
    if (this.study && this.study[property]) {
      return this.study[property];
    }
    return '';
  }

  getArrayProperty(property: string): string[] {
    if (this.study) {
      return this.study[property];
    }
    return [];
  }
}
