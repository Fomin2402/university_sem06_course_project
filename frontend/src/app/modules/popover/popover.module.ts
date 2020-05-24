import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';
import { PopoverInsertionDirective } from './popover-insertion.directive';

@NgModule({
    declarations: [PopoverComponent, PopoverInsertionDirective],
    imports: [
        CommonModule
    ],
    exports: [
        PopoverComponent, PopoverInsertionDirective
    ]
})
export class PopoverModule { }
