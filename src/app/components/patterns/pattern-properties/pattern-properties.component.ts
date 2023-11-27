import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pattern-properties',
  templateUrl: './pattern-properties.component.html',
  styleUrls: ['./pattern-properties.component.scss'],
})
export class PatternPropertiesComponent implements OnInit {
  patternLanguageId: string;
  patternId: string;

  ngOnInit(): void {
    this.patternLanguageId = 'af7780d5-1f97-4536-8da7-4194b093ab1d';
    this.patternId = '2229a430-fe92-4411-9d72-d10dd1d8da14';
  }
}
