import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesetOverviewComponent } from './ruleset-overview.component';

describe('RulesetOverviewComponent', () => {
  let component: RulesetOverviewComponent;
  let fixture: ComponentFixture<RulesetOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesetOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
