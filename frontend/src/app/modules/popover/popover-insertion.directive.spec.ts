import { PopoverInsertionDirective } from './popover-insertion.directive';
import { ViewContainerRef } from '@angular/core';

describe('PopoverInsertionDirective', () => {
    it('should create an instance', () => {
        const directive: PopoverInsertionDirective = new PopoverInsertionDirective({} as ViewContainerRef);
        expect(directive).toBeTruthy();
    });
});
