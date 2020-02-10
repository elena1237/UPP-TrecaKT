import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefEditorReviewComponent } from './chief-editor-review.component';

describe('ChiefEditorReviewComponent', () => {
  let component: ChiefEditorReviewComponent;
  let fixture: ComponentFixture<ChiefEditorReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiefEditorReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiefEditorReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
