import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTextComponent } from './processtext.component';

describe('ProcesstextComponent', () => {
  let component: ProcessTextComponent;
  let fixture: ComponentFixture<ProcessTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
