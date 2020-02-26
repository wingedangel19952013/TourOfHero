import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroStatusComponent } from './hero-status.component';

describe('HeroStatusComponent', () => {
  let component: HeroStatusComponent;
  let fixture: ComponentFixture<HeroStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
