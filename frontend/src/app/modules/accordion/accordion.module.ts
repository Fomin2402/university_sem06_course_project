import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordionComponent } from './accordion.component';
import { PipesModule } from 'src/app/common';

@NgModule({
    declarations: [
        AccordionComponent
    ],
    imports: [
        CommonModule,
        PipesModule
    ],
    exports: [
        AccordionComponent
    ]
})
export class AccordionModule { }
