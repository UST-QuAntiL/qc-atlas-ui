import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PublicationDto } from 'api-atlas/models/publication-dto';

@Component({
  selector: 'app-publication-properties',
  templateUrl: './publication-properties.component.html',
  styleUrls: ['./publication-properties.component.scss'],
})
export class PublicationPropertiesComponent implements OnInit {
  @Input() publication: PublicationDto;
  @Input() frontendPublication: PublicationDto;
  @Output() updatePublicationField: EventEmitter<{
    field;
    value;
  }> = new EventEmitter<{ field; value }>();

  constructor() {}

  ngOnInit(): void {}

  onPropertyChanged(value: any, field: string): void {
    this.frontendPublication[field] = value;
  }

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
    const authorIndex = this.publication.authors.indexOf(author);
    this.publication.authors.splice(authorIndex, 1);
    this.updatePublicationField.emit({
      field: 'authors',
      value: this.publication.authors,
    });
  }
}
