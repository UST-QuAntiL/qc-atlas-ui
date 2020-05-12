import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  activeLinkIndex = -1;
  navLinks: any[] = [];

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: "Algorithms",
        link: "./algorithms",
        index: 0,
      },
      {
        label: "Providers",
        link: "./providers",
        index: 1,
      },
      {
        label: "SDKs",
        link: "./sdks",
        index: 2,
      },
      {
        label: "Tags",
        link: "./tags",
        index: 3,
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === "." + this.router.url)
      );
    });
  }

  goToHome(): void {
    this.router.navigate(["/"]);
  }
}
