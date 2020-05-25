import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { ProductsComponent } from "./products/products.component";
import { EditComponent } from "./edit/edit.component";
import { AdminGuard } from "src/app/common";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
  },
  {
    path: "create",
    canActivate: [AdminGuard],
    component: EditComponent,
    data: { createMode: true, updateMode: false },
  },
  {
    path: ":productId",
    canActivate: [AdminGuard],
    component: EditComponent,
    data: { createMode: false, updateMode: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
