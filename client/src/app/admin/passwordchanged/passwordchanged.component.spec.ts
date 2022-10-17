
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordchangedComponent } from './passwordchanged.component';

describe('PasswordchangedComponent', () => {
    let component: PasswordchangedComponent;
    let fixture: ComponentFixture<PasswordchangedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PasswordchangedComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordchangedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
