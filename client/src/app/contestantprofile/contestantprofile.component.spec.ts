
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantprofileComponent } from './contestantprofile.component';

describe('ContestantprofileComponent', () => {
    let component: ContestantprofileComponent;
    let fixture: ComponentFixture<ContestantprofileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContestantprofileComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContestantprofileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
