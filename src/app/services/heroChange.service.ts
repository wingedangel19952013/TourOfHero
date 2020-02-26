import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class HeroChangeService {
  isHeroChange = false;

  constructor() { }

  getFlag() {
   return this.isHeroChange;
  }

  setFlag(value: boolean) {
    this.isHeroChange = value;
  }
}
