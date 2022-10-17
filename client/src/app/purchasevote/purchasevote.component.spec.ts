
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasevoteComponent } from './purchasevote.component';

describe('PurchasevoteComponent', () => {
    let component: PurchasevoteComponent;
    let fixture: ComponentFixture<PurchasevoteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PurchasevoteComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PurchasevoteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
