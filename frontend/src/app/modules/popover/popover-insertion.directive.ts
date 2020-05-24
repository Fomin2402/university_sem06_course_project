import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[agencyappPopoverInsertion]'
})
export class PopoverInsertionDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
