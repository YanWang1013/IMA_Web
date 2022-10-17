
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantvoteComponent } from './instantvote.component';

describe('InstantvoteComponent', () => {
    let component: InstantvoteComponent;
    let fixture: ComponentFixture<InstantvoteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InstantvoteComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InstantvoteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
