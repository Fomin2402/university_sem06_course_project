import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecoveryPasswordComponent } from './recovary-password.component';
import { RestoreGuard } from 'src/app/common';

const routes: Routes = [
    {
        path: '',
        component: RecoveryPasswordComponent,
        canActivate: [RestoreGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecovaryPasswordRoutingModule { }
