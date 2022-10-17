import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantSuccessComponent } from './instant-success.component';

describe('InstantSuccessComponent', () => {
  let component: InstantSuccessComponent;
  let fixture: ComponentFixture<InstantSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
