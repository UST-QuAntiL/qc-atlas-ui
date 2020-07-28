import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-link-input',
  templateUrl: './link-input.component.html',
  styleUrls: ['./link-input.component.scss'],
})
export class LinkInputComponent implements OnInit {
  @Input() linkObject: any;
  @Input() isDisableable: boolean;
  @Output() linkElement = new EventEmitter<any>();
  @Output() searchTextChanged = new EventEmitter<string>();
  @Output() disable = new EventEmitter<void>();
  linkSearchText = '';

  constructor() {}

  ngOnInit(): void {}

  onLinkElement(element: any): void {
    this.linkElement.emit(element);
    this.linkSearchText = '';
  }

  onLinkSearchChange(): void {
    this.searchTextChanged.emit(this.linkSearchText);
  }

  onDisable(): void {
    this.disable.emit();
  }
}
