
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImalistingComponent } from './imalisting.component';

describe('ImalistingComponent', () => {
    let component: ImalistingComponent;
    let fixture: ComponentFixture<ImalistingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImalistingComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImalistingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
