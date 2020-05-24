import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShortcutPipe } from './shortcut.pipe';

@NgModule({
    declarations: [
        ShortcutPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ShortcutPipe
    ]
})
export class PipesModule { }
