import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalModelExplanationOverviewComponent } from './global-model-explanation-overview.component';

describe('GlobalModelExplanationOverviewComponent', () => {
  let component: GlobalModelExplanationOverviewComponent;
  let fixture: ComponentFixture<GlobalModelExplanationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalModelExplanationOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalModelExplanationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
