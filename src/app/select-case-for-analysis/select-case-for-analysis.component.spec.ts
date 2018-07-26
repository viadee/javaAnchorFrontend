import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCaseForAnalysisComponent } from './select-case-for-analysis.component';

describe('SelectCaseForAnalysisComponent', () => {
  let component: SelectCaseForAnalysisComponent;
  let fixture: ComponentFixture<SelectCaseForAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCaseForAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCaseForAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
