import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseConditionSelectComponent } from './case-condition-select.component';

describe('CaseConditionSelectComponent', () => {
  let component: CaseConditionSelectComponent;
  let fixture: ComponentFixture<CaseConditionSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseConditionSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseConditionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
