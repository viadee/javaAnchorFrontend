import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelFrameOverviewComponent } from './model-frame-overview.component';

describe('ModelFrameOverviewComponent', () => {
  let component: ModelFrameOverviewComponent;
  let fixture: ComponentFixture<ModelFrameOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelFrameOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelFrameOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
