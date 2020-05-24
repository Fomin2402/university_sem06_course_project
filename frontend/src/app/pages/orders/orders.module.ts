import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgModule } from "@angular/core";

import { OrdersRoutingModule } from "./orders-routing.module";
import { OrdersComponent } from "./orders/orders.component";
import { orderReducer } from "./store/orders.reducer";
import { OrderEffect } from "./store/orders.effects";
import { OrderService } from "src/app/common";

@NgModule({
  declarations: [OrdersComponent],
  providers: [OrderService],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    StoreModule.forFeature("orderState", orderReducer),
    EffectsModule.forFeature([OrderEffect]),
  ],
})
export class OrdersModule {}
