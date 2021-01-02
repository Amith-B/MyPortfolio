import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderbackgroundComponent } from './headerbackground.component';

describe('HeaderbackgroundComponent', () => {
  let component: HeaderbackgroundComponent;
  let fixture: ComponentFixture<HeaderbackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderbackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderbackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
