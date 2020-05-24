import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortSelectComponent } from './sort-select.component';

@NgModule({
    declarations: [
        SortSelectComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SortSelectComponent
    ]
})
export class SortSelectModule { }
