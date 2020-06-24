import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  activeLinkIndex = -1;
  navLinks: any[] = [];

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Algorithms',
        link: './algorithms',
        index: 0,
      },
      {
        label: 'Software platforms',
        link: './software-platforms',
        index: 1,
      },
      {
        label: 'Cloud services',
        link: './cloud-services',
        index: 2,
      },
      {
        label: 'Publications',
        link: './publications',
        index: 3,
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  onSettings():void {

  }
}
