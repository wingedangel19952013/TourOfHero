import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { HeroChangeService } from '../services/heroChange.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  heroFunction = '';

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    public dialog: MatDialog,
    private isHeroChange: HeroChangeService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.spinner.show();
  }

  goBack(): void {
    this.location.back();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero;
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    });
  }

  editHero(): void {
    this.heroFunction = 'edit';
    this.confirmDialog();
  }

  deleteHero(): void {
    this.heroFunction = 'delete';
    this.confirmDialog();
  }

  confirmDialog(): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (this.heroFunction === 'edit') {
        this.heroService.editHeroInfo(this.hero).subscribe(res =>
          this.isHeroChange.setFlag(true)
        );

      } else if (this.heroFunction === 'delete') {
        const id = this.route.snapshot.paramMap.get('id');
        this.heroService.deleteHero(id).subscribe(res =>
          this.isHeroChange.setFlag(true)
        );
      }
        this.goBack();
      }
    });
  }

  showIcon(): string {
    if (this.hero.HeroClass === 'Warrior') {
      return 'warrior';
    } else if (this.hero.HeroClass === 'Mage') {
      return 'wizard';
    } else if (this.hero.HeroClass === 'Supporter') {
      return 'supporter';
    } else {
      return '';
    }
  }
}
