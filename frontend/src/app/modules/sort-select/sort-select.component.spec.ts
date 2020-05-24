import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSelectComponent } from './sort-select.component';
import { MOCK_SORTS } from 'src/app/common';

describe('SortSelectComponent', () => {
    let component: SortSelectComponent;
    let fixture: ComponentFixture<SortSelectComponent>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [SortSelectComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SortSelectComponent);
        component = fixture.componentInstance;
        component.sorts = MOCK_SORTS;
        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(
        `"toogleSortSelect" should toogle isSortSelectOpen state
            and call stopImmediatePropagation on event`,
        () => {
            const mockEvent: Event = new Event('click');
            const expectedState: boolean = !component.isSortSelectOpen;
            spyOn(mockEvent, 'stopImmediatePropagation');

            component.toogleSortSelect(mockEvent);

            expect(component.isSortSelectOpen).toEqual(expectedState);
            expect(mockEvent.stopImmediatePropagation).toHaveBeenCalled();
        }
    );

    it('"closeSelectList" turn isSortSelectOpen to false', () => {
        const expectedState: boolean = false;
        component.closeSelectList();
        expect(component.isSortSelectOpen).toEqual(expectedState);
    });

    it('"setSortByIndex" turn isSortSelectOpen to false', () => {
        const expectedIndex: number = MOCK_SORTS.length - 1;
        spyOn(component.onSortChanged, 'emit');

        component.setSortByIndex(expectedIndex);

        expect(component.onSortChanged.emit)
            .toHaveBeenCalledWith(component.sorts[expectedIndex]);
    });

});
