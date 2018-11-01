import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorSetOverviewComponent } from './anchor-set-overview.component';

describe('AnchorSetOverviewComponent', () => {
  let component: AnchorSetOverviewComponent;
  let fixture: ComponentFixture<AnchorSetOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnchorSetOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorSetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
