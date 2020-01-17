import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmeReviewerComponent } from './confirme-reviewer.component';

describe('ConfirmeReviewerComponent', () => {
  let component: ConfirmeReviewerComponent;
  let fixture: ComponentFixture<ConfirmeReviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmeReviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmeReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
