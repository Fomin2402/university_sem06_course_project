import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { MainViewComponent } from "./main-view.component";
import { StripeResolver, AdminGuard } from "../common";

const routes: Routes = [
  {
    path: "",
    component: MainViewComponent,
    children: [
      {
        path: "cart",
        resolve: { stripe: StripeResolver },
        loadChildren: () =>
          import("../pages/cart/cart.module").then((m: any) => m.CartModule),
      },
      {
        path: "orders",
        loadChildren: () =>
          import("../pages/orders/orders.module").then(
            (m: any) => m.OrdersModule
          ),
      },
      {
        path: "products",
        loadChildren: () =>
          import("../pages/products/products.module").then(
            (m: any) => m.ProductsModule
          ),
      },
      {
        path: "users",
        canActivate: [AdminGuard],
        loadChildren: () =>
          import("../pages/users/users.module").then((m: any) => m.UsersModule),
      },
      {
        path: "",
        redirectTo: "/products",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainViewRoutingModule {}
