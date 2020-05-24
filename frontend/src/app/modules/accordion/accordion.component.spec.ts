import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionComponent } from './accordion.component';
import { PipesModule } from 'src/app/common';

describe('AccordionComponent', () => {
    let component: AccordionComponent;
    let fixture: ComponentFixture<AccordionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                PipesModule
            ],
            declarations: [
                AccordionComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccordionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
