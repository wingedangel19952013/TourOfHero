import { Component, OnInit, Input, Inject } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';
import { MatDialog } from '@angular/material';

import { MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeroStatus } from '../hero-status';

@Component({
  selector: 'app-hero-status',
  templateUrl: './hero-status.component.html',
  styleUrls: ['./hero-status.component.css']
})
export class HeroStatusComponent implements OnInit {
  stat: HeroStatus = {HeroID: '00000000-0000-0000-0000-000000000000', HP: 0, MP: 0,
                      Strength: 0, Magic: 0, Vital: 0, Mental: 0, Accuracy: 0, Evade: 0, Luck: 0};

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public heroID: any) { }

  ngOnInit() {
    this.getStatus(this.heroID.dataKey);
  }

  getStatus(id: string) {
    if (id) {
      this.heroService.getHeroStatus(id).subscribe(res => {
        if (res) {
          this.stat = res;
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        } else {
          console.log('Status not found');
        }
      }, (err) => {
        console.log(err);
      });
    }
  }
}
