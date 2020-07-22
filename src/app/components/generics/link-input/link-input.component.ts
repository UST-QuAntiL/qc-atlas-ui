import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-link-input',
  templateUrl: './link-input.component.html',
  styleUrls: ['./link-input.component.scss'],
})
export class LinkInputComponent implements OnInit {
  @Input() linkObject: any;
  @Output() linkElement = new EventEmitter<any>();
  @Output() linkConfigChange = new EventEmitter<string>();
  linkSearchText = '';
  constructor() {}

  ngOnInit(): void {}

  onLinkElement(element: any): void {
    this.linkElement.emit(element);
    this.linkSearchText = '';
  }

  onLinkConfigChange(): void {
    this.linkConfigChange.emit(this.linkSearchText);
  }
}
