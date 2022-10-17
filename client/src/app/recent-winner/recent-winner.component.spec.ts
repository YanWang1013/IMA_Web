import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentWinnerComponent } from './recent-winner.component';

describe('RecentWinnerComponent', () => {
  let component: RecentWinnerComponent;
  let fixture: ComponentFixture<RecentWinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentWinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentWinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
