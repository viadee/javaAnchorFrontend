import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleSetOverviewComponent } from './rule-set-overview.component';

describe('RuleSetOverviewComponent', () => {
  let component: RuleSetOverviewComponent;
  let fixture: ComponentFixture<RuleSetOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleSetOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleSetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
