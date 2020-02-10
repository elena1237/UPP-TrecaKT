import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterDataOfSciWorkComponent } from './enter-data-of-sci-work.component';

describe('EnterDataOfSciWorkComponent', () => {
  let component: EnterDataOfSciWorkComponent;
  let fixture: ComponentFixture<EnterDataOfSciWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterDataOfSciWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterDataOfSciWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
