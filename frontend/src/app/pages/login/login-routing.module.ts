import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { RestoreGuard } from 'src/app/common';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [RestoreGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
