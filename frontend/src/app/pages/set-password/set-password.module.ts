import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SetPasswordRoutingModule } from './set-password-routing.module';
import { SetPasswordComponent } from './set-password.component';
import { SetPasswordGuard } from './set-password.guard';
import { RestoreGuard } from 'src/app/common';

@NgModule({
    declarations: [
        SetPasswordComponent
    ],
    imports: [
        CommonModule,
        SetPasswordRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        RestoreGuard,
        SetPasswordGuard
    ]
})
export class SetPasswordModule { }
