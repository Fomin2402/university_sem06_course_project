import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecovaryPasswordRoutingModule } from './recovary-password-routing.module';
import { RecoveryPasswordComponent } from './recovary-password.component';
import { RestoreGuard } from '../../common';

@NgModule({
    declarations: [RecoveryPasswordComponent],
    imports: [
        CommonModule,
        RecovaryPasswordRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        RestoreGuard
    ]
})
export class RecoveryPasswordModule { }
