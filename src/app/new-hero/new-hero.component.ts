import { Component, OnInit, DoCheck } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { Hero } from '../hero';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { HeroChangeService } from '../services/heroChange.service';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.css']
})
export class NewHeroComponent implements OnInit, DoCheck {
  hero: Hero;
  allowAdd = false;

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog,
    private isHeroChange: HeroChangeService
  ) { }

  ngOnInit() {
    this.hero = {HeroID: '', HeroName: '', HeroJob: '', HeroClass: '', HeroRace: '', HeroLevel: 0, DescriptionInfo: ''};
  }

  ngDoCheck() {
    this.checkInfo();
  }

  goBack() {
    this.dialog.closeAll();
  }

  addHero() {
    this.heroService.addhero(this.hero).subscribe(res =>
      this.isHeroChange.setFlag(true));
    this.confirmDialog();
  }

  checkInfo() {
    if (this.hero.HeroName.length !== 0 &&
        this.hero.HeroJob !== '' &&
        this.hero.HeroClass !== '' &&
        this.hero.HeroRace !== '' &&
        this.hero.HeroLevel > 0) {
      this.allowAdd = true;
    } else {
      this.allowAdd = false;
    }
  }

  confirmDialog(): void {
    const message = `Are you sure you want to recruit this Hero?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.addHero();
        this.isHeroChange.setFlag(true);
      }
      this.goBack();
    });
  }
}
