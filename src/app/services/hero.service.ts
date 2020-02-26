import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Hero } from '../hero';
import { HeroStatus } from '../hero-status';

import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HeroService {
  url = 'https://localhost:44394/api/';
  heroes: Hero[];

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    // this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.url + 'AllHeroes/');
  }

  getHero(id: string): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.http.get<Hero>(this.url + 'Hero/' + id);
  }

  addhero(h: Hero): Observable<void> {
    return this.http.post<void>(this.url + 'Hero/New/', h);
  }

  editHeroInfo(info: Hero): Observable<void> {
    return this.http.put<void>(this.url + 'Hero/Edit/', info);
  }

  deleteHero(id: string): Observable<void> {
    return this.http.delete<void>(this.url + 'Hero/Delete?id=' + id);
  }

  getHeroStatus(id: string): Observable<HeroStatus> {
    return this.http.get<HeroStatus>(this.url + 'Hero/Status/' + id);
  }

  addHeroStatus(s: HeroStatus): Observable<void> {
    return this.http.post<void>(this.url + 'Hero/Status/New/', s);
  }

  editHeroStatus(s: HeroStatus): Observable<void> {
    return this.http.put<void>(this.url + 'Hero/Status/Edit/', s);
  }

  deleteHeroStatus(id: string): Observable<HeroStatus> {
    return this.http.get<HeroStatus>(this.url + 'Hero/Status/Delete?id=' + id);
  }
}
