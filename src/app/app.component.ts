import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slider,
  ]
})
export class AppComponent {
  title = 'Tour of Heroes';
  isClick = true;

  constructor() { }

  prepareRoute(outlet: RouterOutlet) {
    // tslint:disable-next-line: no-string-literal
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  dashboardClick() {
    if (!this.isClick) {
      this.isClick = true;
    }
  }

  heroesClick() {
    if (this.isClick) {
      this.isClick = false;
  }
  }
}
