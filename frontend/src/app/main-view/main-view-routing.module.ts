import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { MainViewComponent } from "./main-view.component";
/*
import {
    StripeResolver,
    AdminGuard
} from '../common';
*/

const routes: Routes = [
  {
    path: "",
    component: MainViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainViewRoutingModule {}
