import {async, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ListRenderComponent} from './list-render.component';

describe('CheckboxRenderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        ListRenderComponent
      ],
      providers: []

    }).compileComponents();
  }));

  it('should create the component', async () => {
    const fixture = TestBed.createComponent(ListRenderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render checkbox', async(() => {
    const fixture = TestBed.createComponent(ListRenderComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[type="checkbox"]')).toBeTruthy();
  }));
});
