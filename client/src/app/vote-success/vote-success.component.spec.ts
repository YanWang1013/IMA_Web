import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteSuccessComponent } from './vote-success.component';

describe('VoteSuccessComponent', () => {
  let component: VoteSuccessComponent;
  let fixture: ComponentFixture<VoteSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
