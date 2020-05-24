import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SetPasswordComponent } from './set-password.component';
import { SetPasswordGuard } from './set-password.guard';
import { RestoreGuard } from 'src/app/common';

const routes: Routes = [
    {
        path: ':token',
        component: SetPasswordComponent,
        canActivate: [RestoreGuard, SetPasswordGuard]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetPasswordRoutingModule { }
