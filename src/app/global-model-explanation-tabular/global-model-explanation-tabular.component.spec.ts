import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalModelExplanationTabularComponent } from './global-model-explanation-tabular.component';

describe('GlobalModelExplanationTabularComponent', () => {
  let component: GlobalModelExplanationTabularComponent;
  let fixture: ComponentFixture<GlobalModelExplanationTabularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalModelExplanationTabularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalModelExplanationTabularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
