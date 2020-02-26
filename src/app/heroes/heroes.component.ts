import { Component, OnInit, DoCheck } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';
import { HeroChangeService } from '../services/heroChange.service';
import { NewHeroComponent } from '../new-hero/new-hero.component';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, DoCheck {
  heroes: Hero[];
  heroes1: Hero[] = [];
  heroes2: Hero[] = [];
  heroes3: Hero[] = [];

  constructor(private heroService: HeroService,
              private isRefresh: HeroChangeService,
              public addHeroDialog: MatDialog,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.getHeroes();
  }

  ngDoCheck() {
    if (this.isRefresh.getFlag()) {
      this.getHeroes();
    }
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(res => {
      if (res) {
        this.heroes = res;
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
        this.DivideColumn();
      }
    });
  }

  DivideColumn() {
    let index = 0;
    const listLength = this.heroes.length;
    while (index < listLength) {
      if (listLength >= 1 && index < listLength) {
        this.heroes1.push(this.heroes[index]);
        index++;
      }
      if (listLength >= 2 && index < listLength) {
        this.heroes2.push(this.heroes[index]);
        index++;
      }
      if (listLength >= 3 && index < listLength) {
        this.heroes3.push(this.heroes[index]);
        index++;
      }
    }
  }

  AddHero() {
    this.addHeroDialog.open(NewHeroComponent, {
      panelClass: 'my-panel'
    });
  }
}
