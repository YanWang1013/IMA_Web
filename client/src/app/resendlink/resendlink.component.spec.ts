
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendlinkComponent } from './resendlink.component';

describe('ResendlinkComponent', () => {
    let component: ResendlinkComponent;
    let fixture: ComponentFixture<ResendlinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ResendlinkComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResendlinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
