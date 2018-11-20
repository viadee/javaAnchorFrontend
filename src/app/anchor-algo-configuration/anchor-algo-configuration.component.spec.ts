import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorAlgoConfigurationComponent } from './anchor-algo-configuration.component';

describe('AnchorAlgoConfigurationComponent', () => {
  let component: AnchorAlgoConfigurationComponent;
  let fixture: ComponentFixture<AnchorAlgoConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnchorAlgoConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorAlgoConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
