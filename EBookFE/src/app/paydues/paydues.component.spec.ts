import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayduesComponent } from './paydues.component';

describe('PayduesComponent', () => {
  let component: PayduesComponent;
  let fixture: ComponentFixture<PayduesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayduesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayduesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
