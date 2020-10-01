import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface BreadcrumbLink {
  heading: string;
  subHeading: string;
  link?: string;
}

@Component({
  selector: 'navigation-breadcrumb',
  templateUrl: './navigation-breadcrumb.component.html',
  styleUrls: ['./navigation-breadcrumb.component.scss'],
})
export class NavigationBreadcrumbComponent implements OnInit {
  @Output() onSaveChanges: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickLink: EventEmitter<BreadcrumbLink> = new EventEmitter<
    BreadcrumbLink
  >();
  @Input() links: BreadcrumbLink[] = [];
  isBeingEdited = false;

  constructor() {}

  ngOnInit(): void {}

  clickLink(link: BreadcrumbLink): void {
    this.onClickLink.emit(link);
  }

  toggleEdit(): void {
    if (this.isBeingEdited) {
      this.onSaveChanges.emit();
    }
    this.isBeingEdited = !this.isBeingEdited;
  }
}
