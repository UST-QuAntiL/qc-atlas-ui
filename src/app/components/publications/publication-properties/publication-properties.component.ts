import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityModelPublicationDto } from 'api/models/entity-model-publication-dto';

@Component({
  selector: 'app-publication-properties',
  templateUrl: './publication-properties.component.html',
  styleUrls: ['./publication-properties.component.scss'],
})
export class PublicationPropertiesComponent implements OnInit {
  @Input() publication: EntityModelPublicationDto;
  @Output() updatePublicationField: EventEmitter<{
    field;
    value;
  }> = new EventEmitter<{ field; value }>();

  constructor() {}

  ngOnInit(): void {}

  onChangesSaved(value: any, field: string): void {
    this.updatePublicationField.emit({ field, value });
  }

  addAuthorEvent(author: string): void {
    this.publication.authors.push(author);
    this.updatePublicationField.emit({
      field: 'authors',
      value: this.publication.authors,
    });
  }

  removeAuthorEvent(author: string): void {
    console.log('Delete Author: ' + author);
    const authorIndex = this.publication.authors.indexOf(author);
    this.publication.authors.splice(authorIndex, 1);
    this.updatePublicationField.emit({
      field: 'authors',
      value: this.publication.authors,
    });
  }
}
