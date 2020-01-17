import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateMagazineComponent } from './activate-magazine.component';

describe('ActivateMagazineComponent', () => {
  let component: ActivateMagazineComponent;
  let fixture: ComponentFixture<ActivateMagazineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateMagazineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
