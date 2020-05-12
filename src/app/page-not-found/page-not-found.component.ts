import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
})
export class PageNotFoundComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {
    // do nothing
  }

  goBack(): void {
    this.location.back();
  }
}
