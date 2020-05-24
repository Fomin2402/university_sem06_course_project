import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToastComponent } from './toasts/toast/toast.component';
import { ToastsComponent } from './toasts/toasts.component';
import { ToastService } from './toast.service';

@NgModule({
    declarations: [
        ToastsComponent,
        ToastComponent
    ],
    providers: [
        ToastService
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ToastsComponent,
        ToastComponent
    ]
})
export class ToastModule {}
