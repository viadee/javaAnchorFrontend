import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOverviewComponent } from './data-overview.component';

describe('DataOverviewComponent', () => {
  let component: DataOverviewComponent;
  let fixture: ComponentFixture<DataOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
