import { Component, OnInit, DoCheck } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';
import { HeroChangeService } from '../services/heroChange.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { HeroStatusComponent } from '../hero-status/hero-status.component';
import { HeroStatus } from '../hero-status';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit, DoCheck {
  heroes: Hero[];
  topHeroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private isRefresh: HeroChangeService,
    private spinner: NgxSpinnerService,
    public heroStatusDialog: MatDialog) {
  }

  ngOnInit() {
    this.spinner.show();
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(res => {
      if (res) {
        this.heroes = res.slice(0, 3);
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      }
    });
  }

  ngDoCheck() {
    if (this.isRefresh.getFlag()) {
      this.isRefresh.setFlag(false);
      this.getHeroes();
    }
  }
  showStatus(heroID: string) {
      this.heroStatusDialog.open(HeroStatusComponent, {
        panelClass: 'my-panel',
        data: {
          dataKey: heroID
        }
      });
  }

  showIcon(hero: Hero): string {
    if (hero.HeroClass === 'Warrior') {
      return 'sword';
    } else if (hero.HeroClass === 'Mage') {
      return 'magic';
    } else if (hero.HeroClass === 'Supporter') {
      return 'potion';
    }
    return '';
  }
}
