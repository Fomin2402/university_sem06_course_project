import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgModule } from "@angular/core";

import { CartRoutingModule } from "./cart-routing.module";
import { CartComponent } from "./cart/cart.component";
import { cartReducer } from "./store/cart.reducer";
import { CartEffect } from "./store/cart.effects";
import { CartService } from "src/app/common";

@NgModule({
  declarations: [CartComponent],
  providers: [CartService],
  imports: [
    CommonModule,
    CartRoutingModule,
    StoreModule.forFeature("cartState", cartReducer),
    EffectsModule.forFeature([CartEffect]),
  ],
})
export class CartModule {}
