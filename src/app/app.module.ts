import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { NewHeroComponent } from './new-hero/new-hero.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MatButtonModule, MatDialogModule } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HeroChangeService } from './services/heroChange.service';
import { HeroStatusComponent } from './hero-status/hero-status.component';
import { HeroService } from './services/hero.service';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    NewHeroComponent,
    ConfirmDialogComponent,
    HeroStatusComponent,
  ],
  entryComponents: [ConfirmDialogComponent, HeroStatusComponent],
  providers: [HeroChangeService, HeroService],

  bootstrap: [ AppComponent ]
})
export class AppModule { }
